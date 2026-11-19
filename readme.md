# MHI PAPER — Laporan Harian Produksi Kertas ECG/EKG

Multi-user: **Kepala Produksi** (akses penuh + manajemen pengguna), **Admin** (verifikasi + master data), **8 Operator** (hanya laporan miliknya).

Aplikasi berjalan dalam dua mode:
- **Mode Lokal** — tanpa konfigurasi apa pun, data di localStorage perangkat. Langsung jalan setelah deploy.
- **Mode Cloud** — Supabase (Postgres + Auth + Row Level Security). Semua perangkat memakai data yang sama.

---

## 1. Deploy ke Vercel (5 menit)

```bash
# dari folder mhi-paper
git init && git add . && git commit -m "MHI PAPER v3"
git branch -M main
git remote add origin https://github.com/USERNAME/mhi-paper.git
git push -u origin main