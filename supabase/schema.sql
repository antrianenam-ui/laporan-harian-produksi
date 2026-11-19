-- ============================================================
-- MHI PAPER — Skema lengkap (jalankan sekali di SQL Editor)
-- ============================================================
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  kode text unique not null,
  nama text not null,
  role text not null check (role in ('kepala','admin','operator')),
  jabatan text, mesin text, warna text default '#5C6270',
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  jenis text not null check (jenis in ('pack','roll')),
  nama text not null unique,
  aktif boolean not null default true
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  tanggal date not null,
  shift text not null check (shift in ('N1','L1','L2')),
  operator_id uuid not null references public.profiles(id),
  jenis text not null check (jenis in ('pack','roll','lainnya')),
  status text not null default 'submit' check (status in ('submit','revisi','verified')),
  items jsonb not null default '[]' check (jsonb_typeof(items)='array'),
  agenda jsonb not null default '[]' check (jsonb_typeof(agenda)='array'),
  extra jsonb not null default '[]' check (jsonb_typeof(extra)='array'),
  has_agenda boolean,
  has_extra boolean not null default false,
  catatan text,
  verified_by uuid references public.profiles(id),
  verified_at timestamptz,
  deleted_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists reports_tanggal_idx on public.reports (tanggal desc);
create index if not exists reports_operator_idx on public.reports (operator_id, tanggal desc);
create index if not exists reports_status_idx on public.reports (status) where deleted_at is null;

create table if not exists public.report_seq (tgl date primary key, last_no int not null default 0);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  report_id uuid, actor_id uuid, aksi text,
  before jsonb, after jsonb, at timestamptz not null default now()
);

-- ---------- helper peran ----------
create or replace function public.auth_role() returns text
language sql stable security definer set search_path = public as
$$ select role from public.profiles where id = auth.uid() and aktif $$;

-- ---------- trigger laporan ----------
create or replace function public.reports_before() returns trigger
language plpgsql security definer set search_path = public as $$
declare n int; r text := public.auth_role();
begin
  if r is null then raise exception 'Akun tidak aktif atau tidak terdaftar'; end if;

  if TG_OP = 'INSERT' then
    if new.code is null then
      insert into report_seq(tgl,last_no) values (new.tanggal,1)
      on conflict (tgl) do update set last_no = report_seq.last_no + 1
      returning last_no into n;
      new.code := 'LH-'||to_char(new.tanggal,'YYMMDD')||'-'||lpad(n::text, greatest(3,length(n::text)), '0');
    elsif r not in ('kepala','admin') then
      raise exception 'Kode laporan dibuat oleh sistem';
    end if;
    new.created_by := coalesce(new.created_by, auth.uid());
    if r = 'operator' then
      if new.operator_id <> auth.uid() then raise exception 'Operator hanya boleh membuat laporan miliknya'; end if;
      new.status := 'submit'; new.catatan := null;
    end if;
    new.verified_by := null; new.verified_at := null; new.deleted_at := null;
  else
    new.updated_at := now();
    if r = 'operator' then
      if new.operator_id is distinct from old.operator_id
         or new.status is distinct from old.status
         or new.code is distinct from old.code
         or new.catatan is distinct from old.catatan
         or new.deleted_at is distinct from old.deleted_at
         or new.verified_by is distinct from old.verified_by
         or new.verified_at is distinct from old.verified_at
      then raise exception 'Kolom ini hanya untuk admin / kepala produksi'; end if;
    end if;
    if new.status = 'verified' and old.status is distinct from 'verified' then
      new.verified_by := auth.uid(); new.verified_at := now();
    elsif new.status <> 'verified' then
      new.verified_by := null; new.verified_at := null;
    end if;
  end if;
  new.has_extra := coalesce(jsonb_array_length(new.extra),0) > 0;
  return new;
end $$;

drop trigger if exists reports_biu on public.reports;
create trigger reports_biu before insert or update on public.reports
for each row execute function public.reports_before();

create or replace function public.reports_audit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into audit_log(report_id,actor_id,aksi,before,after)
  values (coalesce(new.id,old.id), auth.uid(), TG_OP, to_jsonb(old),
          case when TG_OP='DELETE' then null else to_jsonb(new) end);
  return null;
end $$;

drop trigger if exists reports_aiud on public.reports;
create trigger reports_aiud after update or delete on public.reports
for each row execute function public.reports_audit();

-- ---------- RLS ----------
alter table public.profiles   enable row level security;
alter table public.products   enable row level security;
alter table public.reports    enable row level security;
alter table public.audit_log  enable row level security;
alter table public.report_seq enable row level security;

drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated
using (id = auth.uid() or public.auth_role() in ('kepala','admin'));

drop policy if exists profiles_write on public.profiles;
create policy profiles_write on public.profiles for update to authenticated
using (public.auth_role()='kepala') with check (public.auth_role()='kepala');

drop policy if exists products_read on public.products;
create policy products_read on public.products for select to authenticated using (true);
drop policy if exists products_write on public.products;
create policy products_write on public.products for all to authenticated
using (public.auth_role() in ('kepala','admin')) with check (public.auth_role() in ('kepala','admin'));

drop policy if exists reports_read on public.reports;
create policy reports_read on public.reports for select to authenticated
using (public.auth_role() in ('kepala','admin')
       or (operator_id = auth.uid() and deleted_at is null));

drop policy if exists reports_insert on public.reports;
create policy reports_insert on public.reports for insert to authenticated
with check (public.auth_role() in ('kepala','admin') or operator_id = auth.uid());

drop policy if exists reports_update on public.reports;
create policy reports_update on public.reports for update to authenticated
using (public.auth_role()='kepala'
       or (public.auth_role()='admin' and deleted_at is null)
       or (operator_id = auth.uid() and status in ('submit','revisi') and deleted_at is null))
with check (public.auth_role() in ('kepala','admin')
       or (operator_id = auth.uid() and deleted_at is null));

drop policy if exists reports_delete on public.reports;
create policy reports_delete on public.reports for delete to authenticated
using (public.auth_role()='kepala');

drop policy if exists audit_read on public.audit_log;
create policy audit_read on public.audit_log for select to authenticated
using (public.auth_role()='kepala');

-- ---------- master produk ----------
insert into public.products (jenis,nama) values
('pack','ENDO Paper Pack 210 x 140/180_EIECG12CH'),
('pack','ENDO Paper Pack 210 x 140/150_EIECG3CH'),
('pack','ENDO Paper Pack 210 x 140/180_EIECG6CH'),
('pack','Fukuda Paper Pack 210 x 140/150_FDECG3CH'),
('pack','Nihon Kohden Paper Pack 210 x 140/180_NKECG12CH'),
('pack','Schiller Paper Pack 210 x 140/140_SCECG12CH'),
('pack','GE Marquette Paper Pack 210 x 140/180_GEECG12CH'),
('pack','Bistos Paper Pack 210 x 140/145_BTECG3CH'),
('roll','ENDO Paper Roll 210 x 25m_Var 12 Ch'),
('roll','ENDO Paper Roll 110 x 20m_Var 3 Ch'),
('roll','Nihon Kohden Paper Roll 210 x 30m_NKECG12CH'),
('roll','Schiller Paper Roll 112 x 20m_SCECG3CH'),
('roll','GE Marquette Paper Roll 210 x 25m_GEECG12CH'),
('roll','Fukuda Paper Roll 110 x 20m_FDECG3CH'),
('roll','Contec Paper Roll 110 x 20m_CTECG3CH')
on conflict (nama) do nothing;

-- ============================================================
-- BOOTSTRAP KEPALA PRODUKSI
-- 1. Dashboard → Authentication → Users → Add user
--    Email: kepala@mhi.local  ·  Password: (pilih sendiri)
--    Centang "Auto Confirm User".
-- 2. Salin UUID user tsb, lalu jalankan:
--
-- insert into public.profiles (id,kode,nama,role,jabatan,mesin,warna)
-- values ('UUID-DARI-DASHBOARD','kepala','Rajiv','kepala',
--         'Kepala Divisi Konversi','Manajemen','#B22F2C');
--
-- 3. Login di aplikasi sebagai "kepala", lalu buat akun admin
--    dan 8 operator lewat menu Pengguna.
-- ============================================================
