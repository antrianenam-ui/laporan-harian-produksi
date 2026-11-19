'use strict';
/* ==========================================================================
   MHI PAPER — Laporan Harian Produksi Kertas ECG/EKG
   Dual-mode: LOKAL (localStorage) · CLOUD (Supabase + RLS)
   ========================================================================== */

/* ---------------- ICONS ---------------- */
const I={
activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
package:'<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
roll:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',
trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
pencil:'<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
check:'<polyline points="20 6 9 17 4 12"/>',
checkCircle:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
alert:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
arrowLeft:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
arrowRight:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
chevUp:'<polyline points="18 15 12 9 6 15"/>',chevDown:'<polyline points="6 9 12 15 18 9"/>',
eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
rotate:'<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>',
bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
grip:'<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
barChart:'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
volume:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
volumeX:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>',
wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
key:'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>'
};
const icon=(n,s=16)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]||''}</svg>`;

/* ---------------- UTIL ---------------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>(window.crypto&&crypto.randomUUID)?crypto.randomUUID():'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
const pad=n=>String(n).padStart(2,'0');
const pad3=n=>String(n).padStart(3,'0');
const num=v=>{const n=Number(v);return isFinite(n)?n:0};
const todayStr=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const addDays=(ds,n)=>{const[y,m,d]=ds.split('-').map(Number);const t=new Date(y,m-1,d+n);return t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate())};
const fmtDate=ds=>{if(!ds)return '—';const[y,m,d]=ds.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'short',year:'numeric'})};
const fmtDateShort=ds=>{const[y,m,d]=ds.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'numeric'})};
const fmtNum=n=>new Intl.NumberFormat('id-ID').format(Math.round(n||0));
const fmtMin=m=>{m=Math.round(m||0);if(m<60)return m+' mnt';const h=Math.floor(m/60),r=m%60;return r?h+'j '+r+'m':h+' jam'};
const fmtTS=ts=>{if(!ts)return '—';const d=new Date(ts);return d.toLocaleDateString('id-ID',{day:'2-digit',month:'short'})+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})};
const debounce=(fn,ms)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}};
const rejRate=(h,j)=>(h+j)>0?j/(h+j)*100:0;
const rateCls=r=>r>=5?'bad':r>=2?'warn':'ok';
const initials=n=>esc(String(n||'?').slice(0,2).toUpperCase());
const autoShift=()=>{const h=new Date().getHours();return h>=8&&h<17?'N1':h>=17&&h<20?'L1':'L2'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------------- DOMAIN ---------------- */
const JENIS={
pack:{label:'Produksi Paper Pack',short:'Paper Pack',unit:'pack',icon:'package',cls:'pack',example:'ENDO Paper Pack 210 x 140/180_EIECG12CH'},
roll:{label:'Produksi Paper Roll',short:'Paper Roll',unit:'roll',icon:'roll',cls:'roll',example:'ENDO Paper Roll 210 x 25m_Var 12 Ch'},
lainnya:{label:'Kegiatan Lainnya',short:'Lainnya',unit:'',icon:'users',cls:'lainnya',example:''}
};
const KATEGORI=['Membantu Teknisi','Membantu Sesama Operator','Pekerjaan Lintas Divisi','Lainnya'];
const SHIFTS={N1:'Shift 1 · 08.00–17.00',L1:'Long Shift · Shift 1 · 08.00–20.00',L2:'Long Shift · Shift 2 · 20.00–08.00'};
const SHIFT_SHORT={N1:'S1',L1:'LS1',L2:'LS2'};
const SHIFT_BADGE={N1:'SHIFT 1 · 08.00–17.00',L1:'LONG SHIFT 1 · 08.00–20.00',L2:'LONG SHIFT 2 · 20.00–08.00'};
const shiftModeOf=s=>String(s||'').startsWith('L')?'LONG':'N1';
const normShift=s=>({'1':'N1','2':'L2','3':'L2'}[s]||(SHIFTS[s]?s:'N1'));
const shiftLabel=s=>SHIFTS[s]||SHIFTS.N1;
const shiftShort=s=>SHIFT_SHORT[s]||'S1';
const ROLES={kepala:{label:'Kepala Produksi',short:'KEPALA',cls:'b-kepala'},admin:{label:'Admin Produksi',short:'ADMIN',cls:'b-admin'},operator:{label:'Operator',short:'OPERATOR',cls:'b-operator'}};
const STATUS={submit:{label:'Menunggu Verifikasi',short:'MENUNGGU',cls:'b-submit',icon:'clock'},revisi:{label:'Perlu Revisi',short:'REVISI',cls:'b-revisi',icon:'alert'},verified:{label:'Terverifikasi',short:'VERIFIED',cls:'b-verified',icon:'checkCircle'}};
const ACCESS={form:['kepala','admin','operator'],detail:['kepala','admin','operator'],other:['kepala','admin','operator'],history:['kepala','admin','operator'],verify:['kepala','admin'],master:['kepala','admin'],users:['kepala']};
const ROUTES={form:'#/laporan',detail:'#/detail-produksi',other:'#/kegiatan-lain',history:'#/riwayat',verify:'#/verifikasi',master:'#/master-produk',users:'#/pengguna'};
const PACK_SEED=['ENDO Paper Pack 210 x 140/180_EIECG12CH','ENDO Paper Pack 210 x 140/150_EIECG3CH','ENDO Paper Pack 210 x 140/180_EIECG6CH','Fukuda Paper Pack 210 x 140/150_FDECG3CH','Nihon Kohden Paper Pack 210 x 140/180_NKECG12CH','Schiller Paper Pack 210 x 140/140_SCECG12CH','GE Marquette Paper Pack 210 x 140/180_GEECG12CH','Bistos Paper Pack 210 x 140/145_BTECG3CH'];
const ROLL_SEED=['ENDO Paper Roll 210 x 25m_Var 12 Ch','ENDO Paper Roll 110 x 20m_Var 3 Ch','Nihon Kohden Paper Roll 210 x 30m_NKECG12CH','Schiller Paper Roll 112 x 20m_SCECG3CH','GE Marquette Paper Roll 210 x 25m_GEECG12CH','Fukuda Paper Roll 110 x 20m_FDECG3CH','Contec Paper Roll 110 x 20m_CTECG3CH'];
const PEOPLE=[
{kode:'kepala',nama:'Rajiv',role:'kepala',jabatan:'Kepala Divisi Konversi',mesin:'Manajemen',warna:'#B22F2C'},
{kode:'admin',nama:'Nurhayati',role:'admin',jabatan:'Admin Produksi',mesin:'Administrasi',warna:'#236FD6'},
{kode:'yanto',nama:'Yanto',role:'operator',jabatan:'Operator Mesin Flexo',mesin:'Flexo',warna:'#D6403C'},
{kode:'sofa',nama:'Sofa',role:'operator',jabatan:'Operator Mesin Slitter 2',mesin:'Slitter 2',warna:'#236FD6'},
{kode:'dian',nama:'Dian',role:'operator',jabatan:'Operator Mesin Slitter 1',mesin:'Slitter 1',warna:'#129D72'},
{kode:'bodi',nama:'Bodi',role:'operator',jabatan:'Operator Mesin Continuous Form',mesin:'Continuous Form',warna:'#E8940F'},
{kode:'indra',nama:'Indra',role:'operator',jabatan:'Operator Mesin Offset 1',mesin:'Offset 1',warna:'#7B4FC0'},
{kode:'yoga',nama:'Yoga',role:'operator',jabatan:'Operator Mesin Offset 3',mesin:'Offset 3',warna:'#0FA3A3'},
{kode:'ridwan',nama:'Ridwan',role:'operator',jabatan:'Operator Mesin Auto Paper',mesin:'Auto Paper',warna:'#B22F2C'},
{kode:'fachri',nama:'Fachri',role:'operator',jabatan:'Asisten Operator Mesin Auto Paper',mesin:'Auto Paper · Asisten',warna:'#5A7E1F'}
];
let lastLong='L1';

/* ---------------- CONFIG ---------------- */
const CFG_KEY='mhi_cloud_cfg', PREF_KEY='mhi_prefs', DB_KEY='mhi_local_db';
function readCfg(){
  try{const s=localStorage.getItem(CFG_KEY);if(s){const c=JSON.parse(s);if(c&&c.url&&c.key)return c}}catch(e){}
  const w=window.MHI_CONFIG||{};
  if(w.SUPABASE_URL&&w.SUPABASE_ANON_KEY)return{url:w.SUPABASE_URL.trim(),key:w.SUPABASE_ANON_KEY.trim(),domain:w.EMAIL_DOMAIN||'mhi.local'};
  return null;
}
function writeCfg(c){try{c?localStorage.setItem(CFG_KEY,JSON.stringify(c)):localStorage.removeItem(CFG_KEY)}catch(e){}}
const DEMO_PASS=(window.MHI_CONFIG&&window.MHI_CONFIG.DEMO_PASSWORD)||'mhi2026';

/* ---------------- STATE ---------------- */
const blankItem=()=>({key:uid(),nama:'',po:'',spk:'',prep:'',setting:'',ops:'',hasil:'',reject:''});
const blankAgenda=()=>({key:uid(),kategori:'',deskripsi:'',waktu:''});
const blankExtra=()=>({key:uid(),waktu:'',keterangan:''});
const blankForm=()=>({mode:'create',editId:null,operatorId:(S.me&&S.me.role==='operator')?S.me.kode:'',date:todayStr(),shift:autoShift(),jenis:'pack',multi:false,items:[blankItem()],hasAgenda:'ya',agenda:[blankAgenda()],hasExtra:'tidak',extra:[blankExtra()]});
let S={mode:'local',me:null,view:'login',profiles:[],products:[],reports:[],audit:[],savedViews:[],sound:true,
filters:{q:'',operator:'all',jenis:'all',status:'all',period:'all',sort:'dateDesc',archived:false},
selection:new Set(),vSel:new Set(),vTab:'submit',uTab:'pengguna',drawerId:null,highlightId:null,form:null,busy:false,lastSync:null};
S.form=blankForm();
const byId=id=>S.reports.find(r=>r.id===id);
const profByKode=k=>S.profiles.find(p=>p.kode===k);
const opOf=r=>profByKode(r.operatorId)||{nama:'—',jabatan:'',mesin:'',warna:'#999',kode:r.operatorId};
const canVerify=()=>S.me&&(S.me.role==='admin'||S.me.role==='kepala');
const isKepala=()=>S.me&&S.me.role==='kepala';
const canEdit=r=>{if(!S.me||r.deletedAt)return false;if(canVerify())return true;return r.operatorId===S.me.kode&&r.status!=='verified'};
const canArchive=()=>canVerify();
const rHasil=r=>(r.items||[]).reduce((a,i)=>a+num(i.hasil),0);
const rReject=r=>(r.items||[]).reduce((a,i)=>a+num(i.reject),0);
const rWaktu=r=>(r.items||[]).reduce((a,i)=>a+num(i.prep)+num(i.setting)+num(i.ops),0)+(r.agenda||[]).reduce((a,x)=>a+num(x.waktu),0)+(r.extra||[]).reduce((a,x)=>a+num(x.waktu),0);
const rExtraWaktu=r=>(r.extra||[]).reduce((a,x)=>a+num(x.waktu),0);
const jenisBadge=j=>{const m=JENIS[j]||JENIS.pack;return `<span class="badge b-${m.cls}">${icon(m.icon,11)} ${m.short}</span>`};
const statusBadge=s=>{const m=STATUS[s]||STATUS.submit;return `<span class="badge ${m.cls}">${icon(m.icon,11)} ${m.short}</span>`};
const roleBadge=r=>{const m=ROLES[r]||ROLES.operator;return `<span class="badge ${m.cls}">${m.short}</span>`};
function visibleReports(){
  if(!S.me)return[];
  let arr=S.reports;
  if(S.me.role==='operator')arr=arr.filter(r=>r.operatorId===S.me.kode&&!r.deletedAt);
  else arr=arr.filter(r=>S.filters.archived?!!r.deletedAt:!r.deletedAt);
  return arr;
}
function savePrefs(){try{localStorage.setItem(PREF_KEY,JSON.stringify({savedViews:S.savedViews,sound:S.sound}))}catch(e){}}
function loadPrefs(){try{const d=JSON.parse(localStorage.getItem(PREF_KEY)||'{}');S.savedViews=d.savedViews||[];S.sound=d.sound!==false}catch(e){}}

/* ---------------- LOCAL BACKEND ---------------- */
const Local={
  data:null,
  load(){
    try{const raw=localStorage.getItem(DB_KEY);if(raw){this.data=JSON.parse(raw);return}}catch(e){}
    this.data=this.seed();this.save();
  },
  save(){try{localStorage.setItem(DB_KEY,JSON.stringify(this.data))}catch(e){toast('Penyimpanan perangkat penuh.',{type:'error',icon:'alert'})}},
  seed(){
    const profiles=PEOPLE.map(p=>({id:uid(),...p,aktif:true,password:DEMO_PASS}));
    const products=[...PACK_SEED.map(n=>({id:uid(),jenis:'pack',nama:n,aktif:true})),...ROLL_SEED.map(n=>({id:uid(),jenis:'roll',nama:n,aktif:true}))];
    const reports=this.seedReports();
    return{profiles,products,reports,audit:[],seq:{}};
  },
  seedReports(){
    const T=todayStr(),R=[],seq={};
    const it=(nama,po,spk,prep,setting,ops,hasil,reject)=>({nama,po,spk,prep,setting,ops,hasil,reject});
    const ag=(kategori,deskripsi,waktu)=>({kategori,deskripsi,waktu});
    const ex=(waktu,keterangan)=>({waktu,keterangan});
    const mk=(off,op,jenis,shift,items,agenda,extra,status,catatan)=>{
      const date=addDays(T,-off);seq[date]=(seq[date]||0)+1;
      const h=shift==='L2'?20:8;
      const ts=new Date(date+'T00:00:00').getTime()+h*36e5+seq[date]*17*6e4;
      const st=status||(off>=2?'verified':'submit');
      R.push({id:uid(),code:'LH-'+date.replace(/-/g,'').slice(2)+'-'+pad3(seq[date]),date,shift,operatorId:op,jenis,
        items:items||[],agenda:agenda||[],extra:extra||[],hasAgenda:jenis==='lainnya'?!!(agenda&&agenda.length):null,
        status:st,catatan:catatan||'',verifiedBy:st==='verified'?'admin':null,verifiedAt:st==='verified'?ts+36e5:null,
        deletedAt:null,createdBy:op,createdAt:ts,updatedAt:ts});
    };
    mk(0,'yanto','pack','N1',[it(PACK_SEED[0],'7100006123','00220',25,45,310,420,14),it(PACK_SEED[2],'7100006124','00221',15,30,120,180,6)],null,[ex(30,'Membantu teknisi setting ulang pisau potong Flexo')],'submit');
    mk(0,'sofa','roll','L1',[it(ROLL_SEED[0],'7100006131','00224',20,35,330,240,8)],null,null,'submit');
    mk(0,'dian','lainnya','N1',null,[ag('Membantu Teknisi','Membantu teknisi mengganti bearing roller mesin Slitter 1, dilanjutkan uji coba jalan mesin hingga normal.',45),ag('Membantu Sesama Operator','Membantu operator Auto Paper melakukan packing & labeling hasil produksi shift 1.',30)],null,'submit');
    mk(0,'ridwan','pack','L1',[it(PACK_SEED[7],'7100006140','00228',20,40,300,390,12)],null,null,'revisi','Reject 12 pack belum ada rincian penyebab. Mohon tambahkan keterangan di kegiatan lainnya.');
    mk(1,'indra','pack','L2',[it(PACK_SEED[4],'7100006102','00216',30,50,300,360,12)],null,null,'verified');
    mk(1,'ridwan','roll','L1',[it(ROLL_SEED[2],'7100006098','00214',25,40,320,210,9),it(ROLL_SEED[1],'7100006099','00215',15,25,110,95,4)],null,null,'verified');
    mk(1,'fachri','pack','N1',[it(PACK_SEED[1],'7100006105','00217',20,35,330,450,18)],null,null,'submit');
    mk(2,'yoga','pack','N1',[it(PACK_SEED[5],'7100006087','00211',35,55,290,310,10)],null,null,'verified');
    mk(2,'bodi','pack','L2',[it(PACK_SEED[6],'7100006090','00212',25,45,315,380,15)],null,null,'verified');
    mk(2,'dian','roll','L1',[it(ROLL_SEED[4],'7100006093','00213',20,30,340,260,7)],null,null,'verified');
    mk(3,'yanto','pack','N1',[it(PACK_SEED[3],'7100006071','00207',30,40,320,400,11)],null,null,'verified');
    mk(3,'sofa','lainnya','L2',null,[ag('Pekerjaan Lintas Divisi','Membantu tim Gudang melakukan stock opname bahan baku kertas thermal dan pemindahan palet ke rak bahan.',120)],null,'verified');
    mk(4,'ridwan','pack','N1',[it(PACK_SEED[0],'7100006055','00203',25,45,300,430,13),it(PACK_SEED[7],'7100006056','00204',15,30,130,150,5)],null,null,'verified');
    mk(4,'indra','roll','L2',[it(ROLL_SEED[3],'7100006060','00205',20,35,325,220,10)],null,null,'verified');
    mk(5,'yoga','roll','L1',[it(ROLL_SEED[5],'7100006041','00199',25,40,310,190,6)],null,null,'verified');
    mk(5,'fachri','lainnya','N1',null,[ag('Membantu Sesama Operator','Membantu operator Offset 3 membersihkan area mesin dan menyiapkan bahan baku untuk shift berikutnya.',60)],null,'verified');
    mk(6,'bodi','pack','N1',[it(PACK_SEED[2],'7100006033','00196',30,50,300,350,12)],null,null,'verified');
    mk(6,'sofa','pack','L2',[it(PACK_SEED[4],'7100006035','00197',20,40,315,370,9)],null,null,'verified');
    return R;
  },
  log(aksi,reportId,detail){
    this.data.audit.unshift({id:uid(),reportId,actor:S.me?S.me.kode:'sistem',aksi,detail,at:Date.now()});
    this.data.audit=this.data.audit.slice(0,400);
  },
  nextCode(date){
    const base='LH-'+date.replace(/-/g,'').slice(2)+'-';
    this.data.seq[date]=(this.data.seq[date]||0)+1;
    return base+pad3(this.data.seq[date]);
  },
  async signIn(kode,pass){
    const p=this.data.profiles.find(x=>x.kode===kode);
    if(!p)throw new Error('Akun tidak ditemukan.');
    if(!p.aktif)throw new Error('Akun dinonaktifkan. Hubungi kepala produksi.');
    if(p.password!==pass)throw new Error('Kata sandi salah.');
    try{sessionStorage.setItem('mhi_local_user',p.id)}catch(e){}
    return p;
  },
  async session(){try{const id=sessionStorage.getItem('mhi_local_user');return this.data.profiles.find(p=>p.id===id&&p.aktif)||null}catch(e){return null}},
  async signOut(){try{sessionStorage.removeItem('mhi_local_user')}catch(e){}},
  async profiles(){return this.data.profiles.map(p=>({...p}))},
  async products(){return this.data.products.map(p=>({...p}))},
  async reports(){return this.data.reports.map(r=>({...r}))},
  async audit(){return this.data.audit.map(a=>({...a}))},
  async saveReport(payload,id){
    if(id){
      const r=this.data.reports.find(x=>x.id===id);if(!r)throw new Error('Laporan tidak ditemukan.');
      Object.assign(r,payload,{updatedAt:Date.now()});
      this.log('UPDATE',r.id,`Laporan ${r.code} diperbarui`);this.save();return{...r};
    }
    const r={...payload,id:uid(),code:this.nextCode(payload.date),status:'submit',catatan:'',verifiedBy:null,verifiedAt:null,deletedAt:null,createdBy:S.me.kode,createdAt:Date.now(),updatedAt:Date.now()};
    this.data.reports.push(r);this.log('INSERT',r.id,`Laporan ${r.code} dibuat`);this.save();return{...r};
  },
  async setStatus(ids,status,catatan){
    ids.forEach(id=>{const r=this.data.reports.find(x=>x.id===id);if(!r)return;
      r.status=status;r.catatan=catatan||'';r.verifiedBy=status==='verified'?S.me.kode:null;r.verifiedAt=status==='verified'?Date.now():null;r.updatedAt=Date.now();
      this.log('UPDATE',r.id,`${r.code} → ${STATUS[status].label}`);});
    this.save();
  },
  async archive(ids,undo){
    ids.forEach(id=>{const r=this.data.reports.find(x=>x.id===id);if(!r)return;
      r.deletedAt=undo?null:new Date().toISOString();r.updatedAt=Date.now();
      this.log('UPDATE',r.id,`${r.code} ${undo?'dipulihkan':'diarsipkan'}`);});
    this.save();
  },
  async purge(ids){
    ids.forEach(id=>{const r=this.data.reports.find(x=>x.id===id);if(r)this.log('DELETE',id,`Laporan ${r.code} dihapus permanen`)});
    this.data.reports=this.data.reports.filter(r=>!ids.includes(r.id));this.save();
  },
  async addProduct(jenis,nama){
    if(this.data.products.some(p=>p.nama.toLowerCase()===nama.toLowerCase()))throw new Error('Nama produk sudah ada.');
    const p={id:uid(),jenis,nama,aktif:true};this.data.products.push(p);this.save();return p;
  },
  async updProduct(id,patch){const p=this.data.products.find(x=>x.id===id);if(p)Object.assign(p,patch);this.save()},
  async delProduct(id){this.data.products=this.data.products.filter(p=>p.id!==id);this.save()},
  async addUser(u){
    if(this.data.profiles.some(p=>p.kode===u.kode))throw new Error('Kode akun sudah dipakai.');
    const p={id:uid(),kode:u.kode,nama:u.nama,role:u.role,jabatan:u.jabatan,mesin:u.mesin,warna:u.warna,aktif:true,password:u.password};
    this.data.profiles.push(p);this.log('UPDATE',null,`Akun ${u.kode} dibuat`);this.save();return p;
  },
  async updUser(id,patch){const p=this.data.profiles.find(x=>x.id===id);if(p)Object.assign(p,patch);this.log('UPDATE',null,`Akun ${p?p.kode:id} diperbarui`);this.save()},
  async resetPass(id,pass){const p=this.data.profiles.find(x=>x.id===id);if(p)p.password=pass;this.save()},
  async resetDemo(){this.data=this.seed();this.save()},
  exportAll(){return this.data}
};

/* ---------------- CLOUD BACKEND ---------------- */
function loadSDK(){
  if(window.supabase&&window.supabase.createClient)return Promise.resolve();
  return new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
    s.async=true;s.onload=()=>res();s.onerror=()=>rej(new Error('Gagal memuat Supabase SDK. Periksa koneksi internet.'));
    document.head.appendChild(s);
  });
}
const Cloud={
  sb:null,cfg:null,map:{},rmap:{},
  async init(cfg){
    await loadSDK();
    this.cfg=cfg;
    this.sb=window.supabase.createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
  },
  email(k){return k+'@'+(this.cfg.domain||'mhi.local')},
  async signIn(kode,pass){
    const{error}=await this.sb.auth.signInWithPassword({email:this.email(kode),password:pass});
    if(error)throw new Error(/invalid/i.test(error.message)?'Kode akun atau kata sandi salah.':error.message);
    const{data:{user}}=await this.sb.auth.getUser();
    const{data,error:e2}=await this.sb.from('profiles').select('*').eq('id',user.id).single();
    if(e2||!data)throw new Error('Profil tidak ditemukan. Jalankan SQL insert profiles untuk akun ini.');
    if(!data.aktif)throw new Error('Akun dinonaktifkan. Hubungi kepala produksi.');
    return this.pFrom(data);
  },
  async session(){
    const{data:{session}}=await this.sb.auth.getSession();
    if(!session)return null;
    const{data,error}=await this.sb.from('profiles').select('*').eq('id',session.user.id).single();
    if(error||!data||!data.aktif)return null;
    return this.pFrom(data);
  },
  async signOut(){await this.sb.auth.signOut()},
  pFrom:d=>({id:d.id,kode:d.kode,nama:d.nama,role:d.role,jabatan:d.jabatan||'',mesin:d.mesin||'',warna:d.warna||'#5C6270',aktif:d.aktif!==false}),
  async profiles(){
    const{data,error}=await this.sb.from('profiles').select('*').order('nama');
    if(error)throw new Error(error.message);
    this.map={};this.rmap={};
    const out=data.map(d=>{const p=this.pFrom(d);this.map[p.kode]=p.id;this.rmap[p.id]=p.kode;return p});
    return out;
  },
  async products(){
    const{data,error}=await this.sb.from('products').select('*').order('nama');
    if(error)throw new Error(error.message);
    return data.map(d=>({id:d.id,jenis:d.jenis,nama:d.nama,aktif:d.aktif!==false}));
  },
  rFrom(d){return{id:d.id,code:d.code,date:d.tanggal,shift:d.shift,operatorId:this.rmap[d.operator_id]||'',jenis:d.jenis,
    items:d.items||[],agenda:d.agenda||[],extra:d.extra||[],hasAgenda:d.has_agenda,status:d.status,catatan:d.catatan||'',
    verifiedBy:d.verified_by?(this.rmap[d.verified_by]||null):null,verifiedAt:d.verified_at?new Date(d.verified_at).getTime():null,
    deletedAt:d.deleted_at,createdAt:new Date(d.created_at).getTime(),updatedAt:new Date(d.updated_at).getTime()}},
  rTo(p){return{tanggal:p.date,shift:p.shift,operator_id:this.map[p.operatorId],jenis:p.jenis,
    items:p.items||[],agenda:p.agenda||[],extra:p.extra||[],has_agenda:p.jenis==='lainnya'?!!p.hasAgenda:null,has_extra:(p.extra||[]).length>0}},
  async reports(){
    const{data,error}=await this.sb.from('reports').select('*').order('tanggal',{ascending:false}).order('created_at',{ascending:false}).limit(3000);
    if(error)throw new Error(error.message);
    return data.map(d=>this.rFrom(d));
  },
  async audit(){
    const{data,error}=await this.sb.from('audit_log').select('*').order('at',{ascending:false}).limit(200);
    if(error)return[];
    return data.map(d=>{
      const row=d.after||d.before||{};
      let detail=row.code?`Laporan ${row.code}`:'—';
      if(d.aksi==='UPDATE'&&d.after&&d.before&&d.after.status!==d.before.status)detail+=` → ${(STATUS[d.after.status]||{}).label||d.after.status}`;
      else if(d.aksi==='INSERT')detail+=' dibuat';
      else if(d.aksi==='DELETE')detail+=' dihapus permanen';
      else detail+=' diperbarui';
      return{id:String(d.id),reportId:d.reportId,actor:this.rmap[d.actor_id]||'sistem',aksi:d.aksi,detail,at:new Date(d.at).getTime()};
    });
  },
  async saveReport(payload,id){
    const body=this.rTo(payload);
    if(!body.operator_id)throw new Error('Operator tidak dikenali sistem.');
    const q=id?this.sb.from('reports').update(body).eq('id',id).select().single()
              :this.sb.from('reports').insert(body).select().single();
    const{data,error}=await q;
    if(error)throw new Error(error.message);
    return this.rFrom(data);
  },
  async setStatus(ids,status,catatan){
    const{error}=await this.sb.from('reports').update({status,catatan:catatan||''}).in('id',ids);
    if(error)throw new Error(error.message);
  },
  async archive(ids,undo){
    const{error}=await this.sb.from('reports').update({deleted_at:undo?null:new Date().toISOString()}).in('id',ids);
    if(error)throw new Error(error.message);
  },
  async purge(ids){const{error}=await this.sb.from('reports').delete().in('id',ids);if(error)throw new Error(error.message)},
  async addProduct(jenis,nama){
    const{data,error}=await this.sb.from('products').insert({jenis,nama,aktif:true}).select().single();
    if(error)throw new Error(error.message);
    return{id:data.id,jenis:data.jenis,nama:data.nama,aktif:data.aktif};
  },
  async updProduct(id,patch){const{error}=await this.sb.from('products').update(patch).eq('id',id);if(error)throw new Error(error.message)},
  async delProduct(id){const{error}=await this.sb.from('products').delete().eq('id',id);if(error)throw new Error(error.message)},
  async invoke(body){
    const{data,error}=await this.sb.functions.invoke('manage-user',{body});
    if(error)throw new Error('Edge Function manage-user belum ter-deploy. Lihat README langkah 4. ('+error.message+')');
    if(data&&data.error)throw new Error(data.error);
    return data;
  },
  async addUser(u){await this.invoke({action:'create',...u,email:this.email(u.kode)})},
  async updUser(id,patch){const{error}=await this.sb.from('profiles').update(patch).eq('id',id);if(error)throw new Error(error.message)},
  async resetPass(id,pass){await this.invoke({action:'reset',id,password:pass})},
  async resetDemo(){throw new Error('Reset data demo hanya tersedia di mode lokal.')},
  exportAll(){return{profiles:S.profiles,products:S.products,reports:S.reports,audit:S.audit}}
};
let DB=Local;

/* ---------------- SOUND ---------------- */
let audioCtx=null;
function tone(f,t=0.07,type='sine',g=0.05,when=0){
  if(!S.sound)return;
  try{
    audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended')audioCtx.resume();
    const o=audioCtx.createOscillator(),gn=audioCtx.createGain(),t0=audioCtx.currentTime+when;
    o.type=type;o.frequency.value=f;
    gn.gain.setValueAtTime(0.0001,t0);gn.gain.exponentialRampToValueAtTime(g,t0+0.012);gn.gain.exponentialRampToValueAtTime(0.0001,t0+t);
    o.connect(gn);gn.connect(audioCtx.destination);o.start(t0);o.stop(t0+t+0.03);
  }catch(e){}
}
const sfx={
  save(){tone(880,.09,'sine',.06);tone(1318,.13,'sine',.05,.1)},
  tick(){tone(660,.045,'triangle',.028)},
  del(){tone(300,.08,'sine',.05);tone(180,.12,'sine',.05,.08)},
  error(){tone(196,.12,'square',.028);tone(147,.15,'square',.028,.11)},
  open(){tone(523,.05,'triangle',.022)},
  ok(){tone(659,.08,'sine',.05);tone(988,.12,'sine',.045,.09);tone(1318,.16,'sine',.04,.19)}
};
function updateSoundBtn(){
  $('#soundIc').innerHTML=icon(S.sound?'volume':'volumeX',15);
  $('#soundLbl').textContent=S.sound?'BUNYI ON':'BUNYI OFF';
  $('#soundBtn').classList.toggle('off',!S.sound);
  $('#soundBtn').setAttribute('aria-pressed',String(S.sound));
}

/* ---------------- TOAST / MODAL ---------------- */
function toast(msg,{type='success',icon:ic='checkCircle',action=null,onAction=null,duration=3600,bar=false}={}){
  const wrap=$('#toasts');
  while(wrap.children.length>=3)wrap.firstChild.remove();
  const el=document.createElement('div');
  el.className='toast t-'+type;el.setAttribute('role','status');
  el.innerHTML=`<span class="t-ic">${icon(ic,16)}</span><div class="t-msg">${msg}</div>${action?`<button class="t-act">${esc(action)}</button>`:''}<button class="t-x" aria-label="Tutup">${icon('x',13)}</button>${bar?`<span class="t-bar" style="animation-duration:${duration}ms"></span>`:''}`;
  wrap.appendChild(el);
  const kill=()=>{el.classList.add('out');setTimeout(()=>el.remove(),260)};
  const timer=setTimeout(kill,duration);
  el.querySelector('.t-x').onclick=()=>{clearTimeout(timer);kill()};
  if(action)el.querySelector('.t-act').onclick=()=>{clearTimeout(timer);kill();if(onAction)onAction()};
  return el;
}
let modalResolve=null,modalIsPrompt=false;
function openConfirm({title,msg,ok='Hapus',danger=true}){
  return new Promise(res=>{
    if(modalResolve)modalResolve(false);
    modalResolve=res;modalIsPrompt=false;
    $('#modalTitle').textContent=title;$('#modalMsg').innerHTML=msg;
    $('#modalInputWrap').hidden=true;
    $('#modalOk').textContent=ok;$('#modalOk').className='btn '+(danger?'btn-danger':'btn-primary');
    $('#modalWrap').classList.add('show');$('#modalOk').focus();
  });
}
function openPrompt({title,msg='',label,placeholder='',ok='Simpan'}){
  return new Promise(res=>{
    if(modalResolve)modalResolve(null);
    modalResolve=res;modalIsPrompt=true;
    $('#modalTitle').textContent=title;$('#modalMsg').innerHTML=msg;
    $('#modalInputWrap').hidden=false;$('#modalInputLabel').textContent=label;
    $('#modalInput').value='';$('#modalInput').placeholder=placeholder;
    $('#modalOk').textContent=ok;$('#modalOk').className='btn btn-primary';
    $('#modalWrap').classList.add('show');setTimeout(()=>$('#modalInput').focus(),40);
  });
}
function closeModal(val){$('#modalWrap').classList.remove('show');const r=modalResolve;modalResolve=null;if(r)r(val)}

/* ---------------- ECG ---------------- */
function ecgD(w,h,n){
  const m=h/2,s=w/n;let d=`M0 ${m}`;
  const P=(x,y)=>` L${x.toFixed(1)} ${y.toFixed(1)}`;
  for(let i=0;i<n;i++){const x=i*s;
    d+=P(x+s*.14,m)+` Q${(x+s*.19).toFixed(1)} ${(m-h*.13).toFixed(1)} ${(x+s*.24).toFixed(1)} ${m.toFixed(1)}`
    +P(x+s*.33,m)+P(x+s*.37,m+h*.08)+P(x+s*.41,m-h*.38)+P(x+s*.45,m+h*.2)+P(x+s*.49,m)+P(x+s*.60,m)
    +` Q${(x+s*.66).toFixed(1)} ${(m-h*.14).toFixed(1)} ${(x+s*.72).toFixed(1)} ${m.toFixed(1)}`+P(x+s,m);
  }
  return d;
}

/* ---------------- LOGIN SCREEN ---------------- */
let tickerTimer=null;
function renderLoginScreen(){
  const cfg=readCfg();
  $('#lgMode').textContent=cfg?'SUPABASE TERHUBUNG':'MODE LOKAL · DEMO';
  $('#lgMode').classList.toggle('cloud',!!cfg);
  $('#lgQuick').hidden=!!cfg;
  $('#lgPass').value=cfg?'':DEMO_PASS;
  const list=cfg?PEOPLE:Local.data.profiles;
  const groups=[['kepala','Kepala Produksi'],['admin','Admin'],['operator','Operator']];
  $('#lgKode').innerHTML=groups.map(([r,l])=>{
    const arr=list.filter(p=>p.role===r);
    if(!arr.length)return'';
    return `<optgroup label="${l}">${arr.map(p=>`<option value="${esc(p.kode)}">${esc(p.nama)} — ${esc(p.jabatan||p.mesin||'')}</option>`).join('')}</optgroup>`;
  }).join('');
  $('#lgKode').value='kepala';
  const reps=cfg?[]:Local.data.reports.filter(r=>!r.deletedAt);
  const T=todayStr();
  const today=reps.filter(r=>r.date===T);
  const units=reps.filter(r=>r.date>=addDays(T,-6)).reduce((a,r)=>a+rHasil(r),0);
  $('#monStats').innerHTML=cfg?
    `<div class="ms-cell g"><label>KEAMANAN</label><b>RLS</b></div><div class="ms-cell a"><label>AKSES</label><b>3 PERAN</b></div><div class="ms-cell b"><label>SINKRON</label><b>REALTIME</b></div>`
    :`<div class="ms-cell g"><label>LAPORAN HARI INI</label><b>${today.length}</b></div><div class="ms-cell a"><label>UNIT · 7 HARI</label><b>${fmtNum(units)}</b></div><div class="ms-cell b"><label>OPERATOR AKTIF</label><b>${list.filter(p=>p.role==='operator'&&p.aktif).length}</b></div>`;
  const feed=(reps.slice().sort((a,b)=>b.createdAt-a.createdAt).slice(0,5));
  $('#monTicker').innerHTML=feed.length?feed.map((r,i)=>{
    const p=Local.data.profiles.find(x=>x.kode===r.operatorId)||{nama:r.operatorId};
    return `<div class="mf-row${i===0?' on':''}"><span class="c">${esc(r.code)}</span><span class="n">${esc(p.nama)}</span><span class="v">${r.jenis==='lainnya'?(r.agenda||[]).length+' agenda':fmtNum(rHasil(r))+' '+(JENIS[r.jenis]||{}).unit}</span></div>`;
  }).join(''):`<div class="mf-row"><span class="n">Menunggu koneksi & autentikasi…</span></div>`;
  clearInterval(tickerTimer);
  if(feed.length>1){
    let k=0;
    tickerTimer=setInterval(()=>{
      const rows=$$('#monTicker .mf-row');if(!rows.length){clearInterval(tickerTimer);return}
      rows.forEach(r=>r.classList.remove('on'));k=(k+1)%rows.length;rows[k].classList.add('on');
    },2200);
  }
}
function loginError(msg){
  const e=$('#lgErr');e.textContent=msg;e.hidden=false;
  e.classList.remove('shake');void e.offsetWidth;e.classList.add('shake');
  sfx.error();
}
async function doLogin(kode,pass){
  const btn=$('#lgSubmit');btn.disabled=true;btn.innerHTML='Memeriksa…';
  $('#lgErr').hidden=true;
  try{
    const me=await DB.signIn(kode,pass);
    S.me=me;
    await bootApp();
    sfx.ok();
    toast(`Selamat datang, <b>${esc(me.nama)}</b> — ${ROLES[me.role].label}.`,{icon:'shield'});
  }catch(err){loginError(err.message||'Gagal masuk.')}
  finally{btn.disabled=false;btn.innerHTML='Masuk '+icon('arrowRight',15)}
}
async function doLogout(){
  try{await DB.signOut()}catch(e){}
  S.me=null;S.reports=[];S.selection.clear();S.vSel.clear();closeDrawer();
  clearInterval(tickerTimer);
  $('#topbar').hidden=true;$('#appMain').hidden=true;
  document.body.dataset.view='login';S.view='login';
  try{history.replaceState(null,'',location.pathname)}catch(e){}
  renderLoginScreen();
  toast('Anda telah keluar dari sistem.',{type:'info',icon:'undo'});
}

/* ---------------- BOOT ---------------- */
async function reloadAll(){
  S.profiles=await DB.profiles();
  S.products=await DB.products();
  S.reports=await DB.reports();
  S.audit=isKepala()?await DB.audit():[];
  S.lastSync=Date.now();
}
async function bootApp(){
  await reloadAll();
  if(S.me.role==='operator'){S.filters.operator=S.me.kode;S.filters.archived=false}
  S.form=blankForm();
  $('#topbar').hidden=false;$('#appMain').hidden=false;
  clearInterval(tickerTimer);
  buildTabs();buildSelects();applyRoleUI();syncIdentity();syncToolbar();updateSyncChip();
  renderFormDynamic();renderOtherDynamic();
  const hashV=Object.keys(ROUTES).find(k=>ROUTES[k]===location.hash);
  setView(hashV&&ACCESS[hashV].includes(S.me.role)?hashV:'history',true);
}
function buildTabs(){
  const pending=S.reports.filter(r=>r.status==='submit'&&!r.deletedAt).length;
  const tabs=[
    {v:'form',ic:'fileText',l:'Laporan Baru',n:'1'},
    {v:'detail',ic:'package',l:'Detail Produksi',n:'2'},
    {v:'history',ic:'barChart',l:S.me.role==='operator'?'Riwayat Saya':'Riwayat & Rekap',badge:visibleReports().length},
    {v:'verify',ic:'checkCircle',l:'Verifikasi',badge:pending},
    {v:'master',ic:'roll',l:'Master Produk'},
    {v:'users',ic:'users',l:'Pengguna'}
  ].filter(t=>ACCESS[t.v].includes(S.me.role));
  $('#mainTabs').innerHTML=tabs.map(t=>`<button class="tab" data-act="nav" data-nav="${t.v}">${icon(t.ic,15)}<span class="lbl">${t.n?`<span class="mono" style="font-size:10px;opacity:.7">${t.n} · </span>`:''}${t.l}</span>${t.badge!==undefined?`<span class="tab-badge${t.badge?'':' zero'}">${t.badge}</span>`:''}</button>`).join('');
}
function applyRoleUI(){
  const op=S.me.role==='operator';
  $('#umAvatar').textContent=initials(S.me.nama);$('#umAvatar').style.setProperty('--av',S.me.warna);
  $('#umName').textContent=S.me.nama;$('#umRole').textContent=ROLES[S.me.role].short;
  $('#umeName').textContent=S.me.nama;$('#umeMeta').textContent=`${S.me.kode} · ${ROLES[S.me.role].label}`;
  ['#f-operator','#o-operator'].forEach(s=>{const el=$(s);if(el)el.disabled=op});
  $('#fl-operator').disabled=op;
  $('#archChip').hidden=op;
  $('#histScope').textContent=op?'ARSIP PRIBADI · '+S.me.nama.toUpperCase():'REKAP & ARSIP · DIVISI KONVERSI';
  $('#histSub').textContent=op?'Semua laporan yang pernah Anda kirim. Laporan terverifikasi terkunci dan tidak dapat diubah lagi.':'Cari, filter, urutkan, edit, export CSV, dan cetak rekap bertanda tangan.';
  $('#opChartTitle').textContent=op?'PRODUKSI SAYA · 7 HARI':'OPERATOR TERAKTIF · 7 HARI';
  $('#sysCard').hidden=!isKepala();
}
function updateSyncChip(){
  const c=$('#syncChip');
  c.classList.toggle('cloud',S.mode==='cloud');
  $('#syncLbl').textContent=S.mode==='cloud'?'CLOUD':'LOKAL';
  c.title=S.mode==='cloud'?`Supabase terhubung · sinkron ${fmtTS(S.lastSync)}`:'Mode lokal — data tersimpan di perangkat ini saja';
}
function buildSelects(){
  const ops=S.profiles.filter(p=>p.aktif);
  const opOpts=ops.map(o=>`<option value="${esc(o.kode)}">${esc(o.nama)} — ${esc(o.jabatan||o.mesin)}</option>`).join('');
  $('#f-operator').innerHTML='<option value="">— Pilih Operator —</option>'+opOpts;
  $('#o-operator').innerHTML='<option value="">— Pilih Operator —</option>'+opOpts;
  $('#fl-operator').innerHTML='<option value="all">Semua Operator</option>'+ops.map(o=>`<option value="${esc(o.kode)}">${esc(o.nama)} · ${esc(o.mesin)}</option>`).join('');
  $('#dl-pack').innerHTML=S.products.filter(p=>p.jenis==='pack'&&p.aktif).map(p=>`<option value="${esc(p.nama)}">`).join('');
  $('#dl-roll').innerHTML=S.products.filter(p=>p.jenis==='roll'&&p.aktif).map(p=>`<option value="${esc(p.nama)}">`).join('');
}

/* ---------------- ROUTER ---------------- */
function setView(v,skipHash){
  if(!S.me)return;
  if(!ACCESS[v]||!ACCESS[v].includes(S.me.role)){toast('Halaman itu di luar hak akses Anda.',{type:'warn',icon:'shield'});v='history'}
  S.view=v;document.body.dataset.view=v;
  $$('.view').forEach(s=>s.classList.toggle('active',s.id==='view-'+v));
  $$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.nav===v||(v==='other'&&t.dataset.nav==='form')));
  if(!skipHash&&location.hash!==ROUTES[v]){try{location.hash=ROUTES[v]}catch(e){}}
  window.scrollTo({top:0,behavior:'auto'});
  closeDrawer();$('#userMenu').hidden=true;
  if(v==='history')renderHistory();
  if(v==='verify')renderVerify();
  if(v==='master')renderMaster();
  if(v==='users')renderUsers();
  if(v==='form'||v==='detail')renderFormDynamic();
  if(v==='other')renderOtherDynamic();
}
window.addEventListener('hashchange',()=>{
  if(!S.me)return;
  const v=Object.keys(ROUTES).find(k=>ROUTES[k]===location.hash);
  if(v&&v!==S.view)setView(v,true);
});

/* ---------------- SHARED RENDER ---------------- */
function renderShiftSubs(){
  const f=S.form,long=shiftModeOf(f.shift)==='LONG';
  [['f-shift-sub','f-longseg'],['o-shift-sub','o-longseg']].forEach(([a,b])=>{
    const sub=document.getElementById(a);if(sub)sub.hidden=!long;
    const seg=document.getElementById(b);
    if(seg)seg.querySelectorAll('button').forEach(x=>{const on=x.dataset.val===f.shift;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});
  });
}
function syncIdentity(){
  const f=S.form;
  ['f-operator','o-operator'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=f.operatorId});
  ['f-date','o-date'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=f.date});
  ['f-shift','o-shift'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=shiftModeOf(f.shift)});
  renderShiftSubs();
}
function renderOperatorPreviews(stamp){
  const op=profByKode(S.form.operatorId);
  const html=op?
  `<div class="op-card ${stamp?'stamp':''}"><span class="auto-tag">TERISI OTOMATIS</span><span class="avatar" style="--av:${op.warna}">${initials(op.nama)}</span><div class="op-fields"><div class="op-f"><label>NAMA OPERATOR</label><b>${esc(op.nama)}</b></div><div class="op-f"><label>JABATAN / POSISI</label><b>${esc(op.jabatan)}</b></div></div><span class="machine-chip">MESIN: ${esc(op.mesin)}</span></div>`
  :`<div class="op-empty">${icon('users',15)} Pilih nama operator di atas — nama &amp; jabatan terisi otomatis.</div>`;
  $('#opPreviewF').innerHTML=html;$('#opPreviewO').innerHTML=html;
}
const bdSegments=(p,s,o)=>(p+s+o)<=0?'<span class="bd-empty"></span>':`<span class="bd-p" style="flex:${p}"></span><span class="bd-s" style="flex:${s}"></span><span class="bd-o" style="flex:${o}"></span>`;
const bdLegend=(p,s,o)=>`<div class="bl"><i style="background:var(--amber)"></i>Persiapan<b>${fmtMin(p)}</b></div><div class="bl"><i style="background:var(--blue)"></i>Setting<b>${fmtMin(s)}</b></div><div class="bl"><i style="background:var(--green)"></i>Operasional<b>${fmtMin(o)}</b></div>`;

/* ---------------- FORM RENDER ---------------- */
function itemHTML(it,idx){
  const j=JENIS[S.form.jenis==='roll'?'roll':'pack'];
  const n=S.form.items.length,v=x=>esc(String(x??''));
  return `<article class="item-card" data-key="${it.key}">
<header class="item-head">
${n>1?`<span class="grip" data-grip title="Seret untuk mengubah urutan">${icon('grip',15)}</span>`:''}
<span class="item-idx">ITEM ${pad(idx+1)}</span>
<span class="calc-chips" data-calc="${it.key}"></span>
<span class="item-acts">
${n>1?`<button type="button" class="icon-btn" data-act="item-up" data-key="${it.key}" title="Naikkan" ${idx===0?'disabled':''}>${icon('chevUp',15)}</button><button type="button" class="icon-btn" data-act="item-down" data-key="${it.key}" title="Turunkan" ${idx===n-1?'disabled':''}>${icon('chevDown',15)}</button>`:''}
${S.form.multi&&n>1?`<button type="button" class="icon-btn danger" data-act="item-remove" data-key="${it.key}" title="Hapus item">${icon('trash',15)}</button>`:''}
</span></header>
<div class="item-body">
<div class="field"><label>Nama Produk / Item <b class="req">*</b></label><input class="inp" data-item="${it.key}" data-field="nama" list="dl-${j.cls}" placeholder="cth: ${esc(j.example)}" value="${v(it.nama)}"><div class="err"></div></div>
<div class="g-2">
<div class="field"><label>Nomor PO <b class="req">*</b></label><input class="inp num" inputmode="numeric" data-item="${it.key}" data-field="po" placeholder="cth: 7100006123" value="${v(it.po)}"><div class="err"></div></div>
<div class="field"><label>Nomor SPK <b class="req">*</b></label><input class="inp num" inputmode="numeric" data-item="${it.key}" data-field="spk" placeholder="cth: 00220" value="${v(it.spk)}"><div class="err"></div></div>
</div>
<div class="g-3">
<div class="field"><label>Waktu Persiapan (mnt) <b class="req">*</b></label><input type="number" min="0" max="1440" step="1" class="inp num" data-item="${it.key}" data-field="prep" placeholder="0" value="${v(it.prep)}"><div class="help">Ambil bahan baku &amp; persiapan.</div><div class="err"></div></div>
<div class="field"><label>Waktu Setting (mnt) <b class="req">*</b></label><input type="number" min="0" max="1440" step="1" class="inp num" data-item="${it.key}" data-field="setting" placeholder="0" value="${v(it.setting)}"><div class="err"></div></div>
<div class="field"><label>Waktu Operasional (mnt) <b class="req">*</b></label><input type="number" min="0" max="1440" step="1" class="inp num" data-item="${it.key}" data-field="ops" placeholder="0" value="${v(it.ops)}"><div class="err"></div></div>
</div>
<div class="g-2">
<div class="field"><label>Hasil Produksi (${j.unit}) <b class="req">*</b></label><div class="with-unit"><input type="number" min="0" step="1" class="inp num" data-item="${it.key}" data-field="hasil" placeholder="0" value="${v(it.hasil)}"><span class="unit">${j.unit}</span></div><div class="err"></div></div>
<div class="field"><label>Reject (${j.unit}) <b class="req">*</b></label><div class="with-unit"><input type="number" min="0" step="1" class="inp num" data-item="${it.key}" data-field="reject" placeholder="0" value="${v(it.reject)}"><span class="unit">${j.unit}</span></div><div class="err"></div></div>
</div></div></article>`;
}
function extraHTML(ex,idx){
  const n=S.form.extra.length;
  return `<article class="item-card" data-key="${ex.key}">
<header class="item-head"><span class="item-idx" style="background:var(--plum)">KEGIATAN LAINNYA ${pad(idx+1)}</span><span class="calc-chips"><span class="chip-calc" data-ecalc="${ex.key}">${icon('clock',11)} ${fmtMin(num(ex.waktu))}</span></span><span class="item-acts">${n>1?`<button type="button" class="icon-btn danger" data-act="extra-remove" data-key="${ex.key}">${icon('trash',15)}</button>`:''}</span></header>
<div class="item-body"><div class="g-2">
<div class="field"><label>Waktu (menit) <b class="req">*</b></label><div class="with-unit"><input type="number" min="1" max="1440" step="1" class="inp num" data-extra="${ex.key}" data-field="waktu" placeholder="0" value="${esc(String(ex.waktu??''))}"><span class="unit">mnt</span></div><div class="err"></div></div>
<div class="field"><label>Kegiatan Pengerjaan <b class="req">*</b></label><input class="inp" data-extra="${ex.key}" data-field="keterangan" placeholder="cth: Membantu teknisi ganti bearing roller" value="${esc(ex.keterangan||'')}"><div class="err"></div></div>
</div></div></article>`;
}
function agendaHTML(a,idx){
  const n=S.form.agenda.length;
  return `<article class="item-card agenda-card" data-key="${a.key}">
<header class="item-head"><span class="item-idx">AGENDA ${pad(idx+1)}</span><span class="calc-chips"><span class="chip-calc" data-acalc="${a.key}">${icon('clock',11)} ${fmtMin(num(a.waktu))}</span></span><span class="item-acts">${n>1?`<button type="button" class="icon-btn danger" data-act="agenda-remove" data-key="${a.key}">${icon('trash',15)}</button>`:''}</span></header>
<div class="item-body">
<div class="g-2">
<div class="field"><label>Kategori Kegiatan <b class="req">*</b></label><select class="inp" data-agenda="${a.key}" data-field="kategori"><option value="">— Pilih Kategori —</option>${KATEGORI.map(k=>`<option value="${esc(k)}" ${a.kategori===k?'selected':''}>${esc(k)}</option>`).join('')}</select><div class="err"></div></div>
<div class="field"><label>Waktu (menit) <b class="req">*</b></label><div class="with-unit"><input type="number" min="1" max="1440" step="1" class="inp num" data-agenda="${a.key}" data-field="waktu" placeholder="0" value="${esc(String(a.waktu??''))}"><span class="unit">mnt</span></div><div class="err"></div></div>
</div>
<div class="field"><label>Apa kegiatan yang dikerjakan? <b class="req">*</b></label><textarea class="inp" rows="3" data-agenda="${a.key}" data-field="deskripsi" placeholder="Jelaskan pekerjaan yang dilakukan…">${esc(a.deskripsi)}</textarea><div class="err"></div></div>
</div></article>`;
}
function renderItems(){$('#itemList').innerHTML=S.form.items.map(itemHTML).join('');S.form.items.forEach(it=>updateItemCalc(it.key));$('#addItemBtn').hidden=!S.form.multi}
function renderExtra(){$('#extraList').innerHTML=S.form.extra.map(extraHTML).join('')}
function renderAgenda(){$('#agendaList').innerHTML=S.form.agenda.map(agendaHTML).join('')}
function updateItemCalc(key){
  const el=$(`[data-calc="${key}"]`);if(!el)return;
  const it=S.form.items.find(x=>x.key===key);if(!it)return;
  const j=JENIS[S.form.jenis==='roll'?'roll':'pack'];
  const w=num(it.prep)+num(it.setting)+num(it.ops),h=num(it.hasil),r=num(it.reject),rt=rejRate(h,r);
  const any=['prep','setting','ops','hasil','reject'].some(k=>it[k]!=='');
  el.innerHTML=any?`<span class="chip-calc">${icon('clock',11)} ${fmtMin(w)}</span><span class="chip-calc">${icon(j.icon,11)} ${fmtNum(h)} ${j.unit}</span><span class="chip-calc ${rateCls(rt)}">${icon('alert',11)} ${rt.toFixed(1)}%</span>`:'<span class="chip-calc muted">belum diisi</span>';
}
function updateFormSummary(){
  const f=S.form,j=JENIS[f.jenis==='roll'?'roll':'pack'],op=profByKode(f.operatorId);
  $('#sumOp').innerHTML=op?`<b>${esc(op.nama)}</b><small>${esc(op.jabatan)}</small>`:'<small class="muted">Operator belum dipilih</small>';
  $('#sumMeta').innerHTML=`${jenisBadge(f.jenis)}<span class="mono sm">${fmtDate(f.date||todayStr())} · ${shiftShort(f.shift)}</span>`;
  let h=0,r=0,p=0,s=0,o=0;
  f.items.forEach(it=>{h+=num(it.hasil);r+=num(it.reject);p+=num(it.prep);s+=num(it.setting);o+=num(it.ops)});
  $('#sumHasil').textContent=fmtNum(h);
  $('#sumHasilUnit').textContent=j.unit+' · '+f.items.length+' item';
  $('#sumReject').textContent=fmtNum(r);
  $('#sumRate').textContent='rate '+rejRate(h,r).toFixed(1)+'%';
  $('#sumWaktu').textContent=fmtMin(p+s+o);
  $('#bdBar').innerHTML=bdSegments(p,s,o);
  $('#bdLegend').innerHTML=bdLegend(p,s,o);
  $('#sumItems').innerHTML=f.items.map((it,i)=>`<div class="si-row"><span class="si-idx">${pad(i+1)}</span><span class="si-name">${esc(it.nama)||'<i>belum diisi</i>'}</span><span class="si-val">${fmtNum(num(it.hasil))}</span></div>`).join('');
  const exList=f.hasExtra==='ya'?f.extra:[],exTot=exList.reduce((a,x)=>a+num(x.waktu),0);
  $('#sumExtraCount').textContent=`${exList.length} kegiatan · ${fmtMin(exTot)}`;
  $('#sumExtraList').innerHTML=f.hasExtra==='ya'?(exList.length?exList.map((ex,i)=>`<div class="si-row"><span class="si-idx" style="background:var(--plum);color:#fff">L${pad(i+1)}</span><span class="si-name">${esc(ex.keterangan)||'<i>belum diisi</i>'}</span><span class="si-val">${fmtMin(num(ex.waktu))}</span></div>`).join(''):'<div class="si-row"><span class="si-name muted">Belum ada kegiatan</span></div>'):'<div class="si-row"><span class="si-name muted">Tidak ada kegiatan lainnya</span></div>';
  $('#mbSumF').innerHTML=`<b>${fmtNum(h)}</b> ${j.unit} · <b>${fmtNum(r)}</b> reject · ${fmtMin(p+s+o)}`;
  $('#mbSumD').innerHTML=`<b>${fmtNum(h)}</b> ${j.unit} · <b>${fmtNum(r)}</b> reject · ${fmtMin(p+s+o)}${exTot?` · +${fmtMin(exTot)} lain`:''}`;
}
function renderFormDynamic(){
  const f=S.form,j=JENIS[f.jenis==='roll'?'roll':'pack'],edit=f.mode==='edit';
  $('#editBanner').hidden=!edit;$('#editBannerD').hidden=!edit;$('#editBannerO').hidden=!edit;
  if(edit){const r=byId(f.editId);const c=r?r.code:'—';$('#editCode').textContent=c;$('#editCodeD').textContent=c;$('#editCodeO').textContent=c}
  $$('#view-form .jenis-card').forEach(c=>{const on=c.dataset.jenis===f.jenis;c.classList.toggle('active',on);c.setAttribute('aria-checked',String(on))});
  $('#itemsTitle').textContent='Detail Produksi — '+j.short;
  $('#itemsSub').textContent=`Waktu dalam menit, hasil & reject dalam ${j.unit}.`;
  $('#unitTag').textContent='SATUAN: '+j.unit.toUpperCase();
  $$('#multiSeg button').forEach(b=>{const on=b.dataset.val===(f.multi?'ya':'tidak');b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
  const yaEx=f.hasExtra==='ya';
  $$('#extraSeg button').forEach(b=>{const on=b.dataset.val===f.hasExtra;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
  $('#extraList').hidden=!yaEx;$('#addExtraBtn').hidden=!yaEx;$('#extraNote').hidden=yaEx;
  renderItems();renderExtra();renderOperatorPreviews(false);updateFormSummary();
  const lbl=edit?'Simpan Perubahan':'Simpan Laporan';
  $('#saveBtnD').innerHTML=icon('save',15)+' '+lbl;
  $('#saveBtnDM').innerHTML=icon('save',15)+' Simpan';
  $('#saveBtnDInline').innerHTML=icon('save',15)+' '+lbl;
  $$('.wizard').forEach(w=>{
    const step=S.view==='detail'?'2':'1';w.dataset.step=step;
    w.querySelectorAll('.wizard-step').forEach(s=>{
      const isD=s.dataset.view==='detail';
      s.classList.toggle('active',(step==='2')===isD);
      s.classList.toggle('done',step==='2'&&!isD);
      const n=s.querySelector('.wizard-num');
      if(n&&!isD)n.textContent=step==='2'?'✓':'1';
    });
  });
}
function updateOtherSummary(){
  const f=S.form,op=profByKode(f.operatorId);
  $('#sumOpO').innerHTML=op?`<b>${esc(op.nama)}</b><small>${esc(op.jabatan)}</small>`:'<small class="muted">Operator belum dipilih</small>';
  $('#sumMetaO').innerHTML=`${jenisBadge('lainnya')}<span class="mono sm">${fmtDate(f.date||todayStr())} · ${shiftShort(f.shift)}</span>`;
  const list=f.hasAgenda==='ya'?f.agenda:[],tot=list.reduce((a,x)=>a+num(x.waktu),0);
  $('#sumAgendaCount').textContent=String(list.length);
  $('#sumWaktuO').textContent=fmtMin(tot);
  $('#sumAgendaList').innerHTML=f.hasAgenda==='ya'?list.map((a,i)=>`<div class="si-row"><span class="si-idx">A${pad(i+1)}</span><span class="si-name">${esc(a.kategori)||'<i>belum dipilih</i>'}</span><span class="si-val">${fmtMin(num(a.waktu))}</span></div>`).join(''):'<div class="si-row"><span class="si-name muted">Tanpa agenda di luar jobdesk</span></div>';
  $('#mbSumO').innerHTML=`<b>${list.length}</b> agenda · <b>${fmtMin(tot)}</b>`;
}
function renderOtherDynamic(){
  const f=S.form,ya=f.hasAgenda==='ya';
  $$('#agendaSeg button').forEach(b=>{const on=b.dataset.val===f.hasAgenda;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
  $('#agendaList').hidden=!ya;$('#addAgendaBtn').hidden=!ya;$('#agendaNote').hidden=ya;
  renderAgenda();renderOperatorPreviews(false);updateOtherSummary();
  $('#saveBtnO').innerHTML=icon('save',15)+' '+(f.mode==='edit'?'Simpan Perubahan':'Simpan Laporan Kegiatan');
  $('#saveBtnOM').innerHTML=icon('save',15)+' Simpan';
}

/* ---------------- VALIDATION ---------------- */
function markInvalid(el,msg,bad){if(!el)return;el.classList.add('invalid');const fl=el.closest('.field'),er=fl&&fl.querySelector('.err');if(er){er.textContent=msg;er.classList.add('show')}bad.push(el)}
function clearInvalid(el){el.classList.remove('invalid');const fl=el.closest('.field'),er=fl&&fl.querySelector('.err');if(er)er.classList.remove('show')}
function finishValidate(bad){
  if(!bad.length)return true;
  toast(`${bad.length} isian belum valid — periksa kolom bertanda merah.`,{type:'error',icon:'alert'});sfx.error();
  const el=bad[0];el.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>{try{el.focus({preventScroll:true})}catch(e){}},350);
  const fl=el.closest('.field');if(fl){fl.classList.add('shake');setTimeout(()=>fl.classList.remove('shake'),500)}
  return false;
}
function validateIdentitas(){
  const f=S.form,bad=[];
  if(!f.operatorId)markInvalid($('#f-operator'),'Pilih nama operator.',bad);
  if(!f.date)markInvalid($('#f-date'),'Tanggal wajib diisi.',bad);
  return finishValidate(bad);
}
function validateProduction(){
  const f=S.form,bad=[];
  if(!f.operatorId)markInvalid($('#f-operator'),'Pilih nama operator.',bad);
  if(!f.date)markInvalid($('#f-date'),'Tanggal wajib diisi.',bad);
  f.items.forEach(it=>{
    const q=k=>$(`#itemList [data-item="${it.key}"][data-field="${k}"]`);
    if(String(it.nama).trim().length<3)markInvalid(q('nama'),'Nama produk wajib diisi (min. 3 karakter).',bad);
    if(!/^\d{6,14}$/.test(String(it.po).trim()))markInvalid(q('po'),'Nomor PO: 6–14 digit angka.',bad);
    if(!/^\d{3,10}$/.test(String(it.spk).trim()))markInvalid(q('spk'),'Nomor SPK: 3–10 digit angka.',bad);
    [['prep','Waktu persiapan'],['setting','Waktu setting'],['ops','Waktu operasional']].forEach(([k,l])=>{
      const v=it[k];if(v===''||!Number.isInteger(Number(v))||num(v)<0||num(v)>1440)markInvalid(q(k),l+': bulat 0–1440 menit.',bad);
    });
    [['hasil','Hasil produksi'],['reject','Reject']].forEach(([k,l])=>{
      const v=it[k];if(v===''||!Number.isInteger(Number(v))||num(v)<0||num(v)>1000000)markInvalid(q(k),l+': angka bulat ≥ 0.',bad);
    });
    if(num(it.hasil)===0&&num(it.reject)===0&&(it.hasil!==''||it.reject!==''))markInvalid(q('hasil'),'Hasil dan reject tidak boleh keduanya 0.',bad);
  });
  if(f.hasExtra==='ya')f.extra.forEach(ex=>{
    const q=k=>$(`#extraList [data-extra="${ex.key}"][data-field="${k}"]`);
    const v=ex.waktu;if(v===''||!Number.isInteger(Number(v))||num(v)<1||num(v)>1440)markInvalid(q('waktu'),'Waktu: bulat 1–1440 menit.',bad);
    if(String(ex.keterangan).trim().length<5)markInvalid(q('keterangan'),'Keterangan min. 5 karakter.',bad);
  });
  return finishValidate(bad);
}
function validateOther(){
  const f=S.form,bad=[];
  if(!f.operatorId)markInvalid($('#o-operator'),'Pilih nama operator.',bad);
  if(!f.date)markInvalid($('#o-date'),'Tanggal wajib diisi.',bad);
  if(f.hasAgenda==='ya')f.agenda.forEach(a=>{
    const q=k=>$(`#agendaList [data-agenda="${a.key}"][data-field="${k}"]`);
    if(!a.kategori)markInvalid(q('kategori'),'Pilih kategori kegiatan.',bad);
    if(String(a.deskripsi).trim().length<5)markInvalid(q('deskripsi'),'Jelaskan kegiatan (min. 5 karakter).',bad);
    const v=a.waktu;if(v===''||!Number.isInteger(Number(v))||num(v)<1||num(v)>1440)markInvalid(q('waktu'),'Waktu: bulat 1–1440 menit.',bad);
  });
  return finishValidate(bad);
}
function lockSave(on){
  ['#saveBtnD','#saveBtnDM','#saveBtnDInline','#saveBtnO','#saveBtnOM'].forEach(s=>{const b=$(s);if(b){b.disabled=on;if(on)b.dataset.old=b.innerHTML,b.innerHTML='Menyimpan…';else if(b.dataset.old)b.innerHTML=b.dataset.old}});
}
function afterSave(id,msg){
  const keep={operatorId:S.form.operatorId,date:S.form.date,shift:S.form.shift};
  if(S.me.role==='operator')keep.operatorId=S.me.kode;
  sfx.save();
  S.form={...blankForm(),...keep};
  S.highlightId=id;
  syncIdentity();renderFormDynamic();renderOtherDynamic();buildTabs();
  setView('history');
  toast(msg,{icon:'checkCircle'});
  setTimeout(()=>openDrawer(id),380);
}
async function saveProduction(){
  if(!validateProduction())return;
  const f=S.form;
  const payload={date:f.date,shift:f.shift,operatorId:f.operatorId,jenis:f.jenis,
    items:f.items.map(it=>({nama:it.nama.trim(),po:String(it.po).trim(),spk:String(it.spk).trim(),prep:num(it.prep),setting:num(it.setting),ops:num(it.ops),hasil:num(it.hasil),reject:num(it.reject)})),
    agenda:[],hasAgenda:null,
    extra:f.hasExtra==='ya'?f.extra.map(ex=>({waktu:num(ex.waktu),keterangan:ex.keterangan.trim()})):[]};
  const editId=f.mode==='edit'?f.editId:null;
  lockSave(true);
  try{
    const r=await DB.saveReport(payload,editId);
    upsertLocal(r);
    afterSave(r.id,`Laporan <b>${esc(r.code)}</b> ${editId?'diperbarui':'tersimpan'} — menunggu verifikasi admin.`);
  }catch(err){toast('Gagal menyimpan: '+esc(err.message),{type:'error',icon:'alert'});sfx.error()}
  finally{lockSave(false)}
}
async function saveOther(){
  if(!validateOther())return;
  const f=S.form;
  const payload={date:f.date,shift:f.shift,operatorId:f.operatorId,jenis:'lainnya',items:[],extra:[],
    hasAgenda:f.hasAgenda==='ya',
    agenda:f.hasAgenda==='ya'?f.agenda.map(a=>({kategori:a.kategori,deskripsi:a.deskripsi.trim(),waktu:num(a.waktu)})):[]};
  const editId=f.mode==='edit'?f.editId:null;
  lockSave(true);
  try{
    const r=await DB.saveReport(payload,editId);
    upsertLocal(r);
    afterSave(r.id,`Laporan kegiatan <b>${esc(r.code)}</b> ${editId?'diperbarui':'tersimpan'}.`);
  }catch(err){toast('Gagal menyimpan: '+esc(err.message),{type:'error',icon:'alert'});sfx.error()}
  finally{lockSave(false)}
}
function upsertLocal(r){const i=S.reports.findIndex(x=>x.id===r.id);if(i>=0)S.reports[i]=r;else S.reports.unshift(r)}
function startEdit(id){
  const r=byId(id);if(!r)return;
  if(!canEdit(r)){toast(r.status==='verified'?'Laporan sudah terverifikasi dan terkunci.':'Anda tidak berhak mengubah laporan ini.',{type:'warn',icon:'shield'});return}
  S.form={mode:'edit',editId:id,operatorId:r.operatorId,date:r.date,shift:normShift(r.shift),jenis:r.jenis,
    multi:(r.items||[]).length>1,
    items:(r.items&&r.items.length)?r.items.map(i=>({...i,key:uid()})):[blankItem()],
    hasAgenda:r.hasAgenda===false?'tidak':'ya',
    agenda:(r.agenda&&r.agenda.length)?r.agenda.map(a=>({...a,key:uid()})):[blankAgenda()],
    hasExtra:(r.extra&&r.extra.length)?'ya':'tidak',
    extra:(r.extra&&r.extra.length)?r.extra.map(e=>({...e,key:uid()})):[blankExtra()]};
  syncIdentity();closeDrawer();
  setView(r.jenis==='lainnya'?'other':'detail');
  toast(`Mode edit aktif — <b>${esc(r.code)}</b>.`,{type:'info',icon:'pencil'});sfx.open();
}
function duplicateReport(id){
  const r=byId(id);if(!r)return;
  S.form={mode:'create',editId:null,operatorId:S.me.role==='operator'?S.me.kode:r.operatorId,date:todayStr(),shift:normShift(r.shift),jenis:r.jenis,
    multi:(r.items||[]).length>1,
    items:(r.items&&r.items.length)?r.items.map(i=>({...i,key:uid()})):[blankItem()],
    hasAgenda:r.hasAgenda===false?'tidak':'ya',
    agenda:(r.agenda&&r.agenda.length)?r.agenda.map(a=>({...a,key:uid()})):[blankAgenda()],
    hasExtra:(r.extra&&r.extra.length)?'ya':'tidak',
    extra:(r.extra&&r.extra.length)?r.extra.map(e=>({...e,key:uid()})):[blankExtra()]};
  syncIdentity();closeDrawer();
  setView(r.jenis==='lainnya'?'other':'detail');
  toast('Laporan disalin ke formulir baru — periksa tanggal, lalu simpan.',{type:'info',icon:'copy'});sfx.tick();
}
const formDirty=()=>S.form.mode==='edit'||(S.me.role!=='operator'&&!!S.form.operatorId)||S.form.items.some(it=>['nama','po','spk','prep','setting','ops','hasil','reject'].some(k=>String(it[k]).trim()!==''))||S.form.agenda.some(a=>a.kategori||String(a.deskripsi).trim()||a.waktu!=='')||S.form.hasExtra==='ya';

/* ---------------- FILTER ---------------- */
const CMP={
dateDesc:(a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt,
dateAsc:(a,b)=>a.date.localeCompare(b.date)||a.createdAt-b.createdAt,
hasilDesc:(a,b)=>rHasil(b)-rHasil(a),hasilAsc:(a,b)=>rHasil(a)-rHasil(b),
rejectDesc:(a,b)=>rReject(b)-rReject(a),rejectAsc:(a,b)=>rReject(a)-rReject(b),
waktuDesc:(a,b)=>rWaktu(b)-rWaktu(a),waktuAsc:(a,b)=>rWaktu(a)-rWaktu(b),
operatorAsc:(a,b)=>opOf(a).nama.localeCompare(opOf(b).nama)
};
const hay=r=>{const op=opOf(r);return [r.code,r.date,shiftLabel(r.shift),op.nama,op.jabatan,(JENIS[r.jenis]||{}).label,(STATUS[r.status]||{}).label,...(r.items||[]).flatMap(i=>[i.nama,i.po,i.spk]),...(r.agenda||[]).flatMap(a=>[a.kategori,a.deskripsi]),...(r.extra||[]).flatMap(e=>[e.keterangan])].join(' ').toLowerCase()};
function getFiltered(){
  let arr=visibleReports();const f=S.filters,T=todayStr();
  if(f.period!=='all'){const cut=f.period==='today'?T:addDays(T,-(Number(f.period)-1));arr=arr.filter(r=>r.date>=cut)}
  if(f.operator!=='all')arr=arr.filter(r=>r.operatorId===f.operator);
  if(f.jenis!=='all')arr=arr.filter(r=>r.jenis===f.jenis);
  if(f.status!=='all')arr=arr.filter(r=>r.status===f.status);
  if(f.q){const q=f.q.toLowerCase();arr=arr.filter(r=>hay(r).includes(q))}
  return arr.sort(CMP[f.sort]||CMP.dateDesc);
}
function syncToolbar(){$('#fl-q').value=S.filters.q;$('#fl-operator').value=S.filters.operator;$('#fl-jenis').value=S.filters.jenis;$('#fl-status').value=S.filters.status;$('#fl-sort').value=S.filters.sort}

/* ---------------- HISTORY ---------------- */
function summaryText(r){
  if(r.jenis==='lainnya'){
    if(r.agenda&&r.agenda.length){const a=r.agenda[0];return `<b>${r.agenda.length} agenda</b> · ${esc(a.kategori)}${r.agenda.length>1?` <span class="more">+${r.agenda.length-1}</span>`:''}`}
    return '<span class="muted">Tanpa agenda di luar jobdesk</span>';
  }
  const it=(r.items||[])[0];
  const ex=(r.extra||[]).length?` <span class="more">+${r.extra.length} keg. lain</span>`:'';
  return `<b>${(r.items||[]).length} item</b> · ${esc(it?it.nama:'—')}${r.items.length>1?` <span class="more">+${r.items.length-1}</span>`:''}${ex}`;
}
function rowActs(r){
  const ed=canEdit(r),ar=canArchive();
  return `<button class="icon-btn" data-act="row-eye" data-id="${r.id}" title="Lihat detail">${icon('eye',15)}</button>
  ${ed?`<button class="icon-btn" data-act="row-edit" data-id="${r.id}" title="Edit">${icon('pencil',15)}</button>`:''}
  ${canVerify()&&r.status==='submit'&&!r.deletedAt?`<button class="icon-btn good" data-act="row-verify" data-id="${r.id}" title="Verifikasi">${icon('checkCircle',15)}</button>`:''}
  ${ar?`<button class="icon-btn danger" data-act="row-del" data-id="${r.id}" title="${r.deletedAt?'Pulihkan':'Arsipkan'}">${icon(r.deletedAt?'undo':'trash',15)}</button>`:''}`;
}
function rowHTML(r){
  const op=opOf(r),h=rHasil(r),j=rReject(r),w=rWaktu(r),rt=rejRate(h,j),sel=S.selection.has(r.id),prod=r.jenis!=='lainnya';
  return `<tr data-row="${r.id}" class="${sel?'selected':''}">
<td class="td-chk"><input type="checkbox" data-chk="${r.id}" ${sel?'checked':''} aria-label="Pilih ${esc(r.code)}"></td>
<td><div class="cell-date"><b>${fmtDate(r.date)}</b><span class="code">${esc(r.code)} · ${shiftShort(r.shift)}</span></div></td>
<td><div class="cell-op"><span class="avatar sm" style="--av:${op.warna}">${initials(op.nama)}</span><div><b>${esc(op.nama)}</b><small>${esc(op.jabatan)}</small></div></div></td>
<td>${jenisBadge(r.jenis)}</td>
<td>${statusBadge(r.status)}${r.deletedAt?' <span class="badge b-arch">ARSIP</span>':''}</td>
<td class="cell-sum" title="${esc((r.items||[]).map(i=>i.nama).join(', '))}">${summaryText(r)}</td>
<td class="ta-r"><span class="mono big">${prod?fmtNum(h):'—'}</span> ${prod?`<small class="muted">${JENIS[r.jenis].unit}</small>`:''}</td>
<td class="ta-r"><span class="mono">${prod?fmtNum(j):'—'}</span>${prod?`<span class="rate ${rateCls(rt)}">${rt.toFixed(1)}%</span>`:''}</td>
<td class="ta-r"><span class="mono" title="${w} menit">${fmtMin(w)}</span></td>
<td class="ta-r"><div class="row-acts">${rowActs(r)}</div></td></tr>`;
}
function cardHTML(r){
  const op=opOf(r),h=rHasil(r),j=rReject(r),w=rWaktu(r),rt=rejRate(h,j),sel=S.selection.has(r.id),prod=r.jenis!=='lainnya';
  return `<article class="rcard ${sel?'selected':''}" data-row="${r.id}">
<div class="rc-top"><input type="checkbox" data-chk="${r.id}" ${sel?'checked':''} aria-label="Pilih ${esc(r.code)}"><div class="cell-date"><b>${fmtDate(r.date)}</b><span class="code">${esc(r.code)} · ${shiftShort(r.shift)}</span></div>${jenisBadge(r.jenis)}${statusBadge(r.status)}</div>
<div class="rc-op"><span class="avatar sm" style="--av:${op.warna}">${initials(op.nama)}</span><b>${esc(op.nama)}</b><small>${esc(op.mesin)}</small></div>
<div class="rc-sum">${summaryText(r)}</div>
<div class="rc-stats">
<div class="rc-stat"><label>HASIL</label><b>${prod?fmtNum(h):'—'} <small>${prod?JENIS[r.jenis].unit:''}</small></b></div>
<div class="rc-stat"><label>REJECT</label><b>${prod?fmtNum(j):'—'} ${prod?`<small>${rt.toFixed(1)}%</small>`:''}</b></div>
<div class="rc-stat"><label>WAKTU</label><b>${fmtMin(w)}</b></div>
</div>
<div class="rc-acts"><button class="btn btn-ghost btn-sm" data-act="row-eye" data-id="${r.id}">${icon('eye',13)} Detail</button>${canEdit(r)?`<button class="btn btn-ghost btn-sm" data-act="row-edit" data-id="${r.id}">${icon('pencil',13)} Edit</button>`:''}${canVerify()&&r.status==='submit'&&!r.deletedAt?`<button class="btn btn-green btn-sm" data-act="row-verify" data-id="${r.id}">${icon('check',13)} Verifikasi</button>`:''}${canArchive()?`<button class="icon-btn danger" data-act="row-del" data-id="${r.id}">${icon(r.deletedAt?'undo':'trash',15)}</button>`:''}</div>
</article>`;
}
const statCard=(cls,ic,label,val,sub)=>`<div class="stat-card ${cls}"><div class="st-top"><span class="st-label">${label}</span><span class="st-ic">${icon(ic,16)}</span></div><div class="st-val" data-count="${val}">0</div><div class="st-sub">${sub}</div></div>`;
function countUp(el,to){
  const dur=650,t0=performance.now();
  const step=t=>{if(!el.isConnected)return;const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=fmtNum(to*e);if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
function buildBarChart(){
  const src=visibleReports(),T=todayStr(),days=[...Array(7)].map((_,i)=>addDays(T,i-6));
  const data=days.map(d=>{let p=0,r=0,j=0;src.forEach(x=>{if(x.date===d){if(x.jenis==='pack')p+=rHasil(x);if(x.jenis==='roll')r+=rHasil(x);j+=rReject(x)}});return{d,p,r,j}});
  if(data.every(x=>!x.p&&!x.r&&!x.j))return `<div class="chart-empty">${icon('barChart',24)}<p>Belum ada produksi 7 hari terakhir.<br>Grafik terisi setelah laporan disimpan.</p></div>`;
  const nice=Math.ceil(Math.max(50,...data.map(x=>Math.max(x.p,x.r,x.j)))/50)*50;
  const W=720,H=250,L=46,R=10,Tp=18,B=30,pw=W-L-R,ph=H-Tp-B,gw=pw/7;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Grafik produksi 7 hari"><defs><pattern id="hatchB" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#236FD6"/><rect width="2.2" height="6" fill="rgba(255,255,255,.45)"/></pattern></defs>`;
  for(let k=0;k<=4;k++){const y=Tp+ph-ph*k/4;s+=`<line class="gl" x1="${L}" y1="${y}" x2="${W-R}" y2="${y}"/><text class="gt" x="${L-7}" y="${y+3}" text-anchor="end">${fmtNum(nice*k/4)}</text>`}
  data.forEach((x,i)=>{
    const cx=L+gw*i+gw/2,isT=x.d===T;
    if(isT)s+=`<rect x="${L+gw*i+2}" y="${Tp}" width="${gw-4}" height="${ph}" rx="6" fill="rgba(214,64,60,.06)"/>`;
    const bw=15,rw=8,gap=5,tot=bw*2+rw+gap*2;let bx=cx-tot/2;
    [{v:x.p,f:'#D6403C',l:'Pack',w:bw},{v:x.r,f:'url(#hatchB)',l:'Roll',w:bw},{v:x.j,f:'#E8940F',l:'Reject',w:rw}].forEach((b,bi)=>{
      const h=ph*b.v/nice,y=Tp+ph-h;
      if(b.v>0){s+=`<rect class="bar" style="animation-delay:${i*60+bi*45}ms" x="${bx.toFixed(1)}" y="${y.toFixed(1)}" width="${b.w}" height="${Math.max(h,2).toFixed(1)}" rx="2.5" fill="${b.f}"><title>${fmtDateShort(x.d)} — ${b.l}: ${fmtNum(b.v)}</title></rect><text class="cv" x="${(bx+b.w/2).toFixed(1)}" y="${(y-4).toFixed(1)}" text-anchor="middle">${b.v}</text>`}
      bx+=b.w+gap;
    });
    const dd=new Date(x.d+'T00:00:00');
    s+=`<text class="cl ${isT?'today':''}" x="${cx.toFixed(1)}" y="${H-8}" text-anchor="middle">${dd.toLocaleDateString('id-ID',{weekday:'short'})} ${dd.getDate()}/${dd.getMonth()+1}</text>`;
  });
  return s+'</svg>';
}
function buildOpChart(){
  const T=todayStr(),last7=visibleReports().filter(r=>r.date>=addDays(T,-6)),map={};
  last7.forEach(r=>{const m=map[r.operatorId]||(map[r.operatorId]={units:0,count:0});m.units+=rHasil(r);m.count++});
  const arr=Object.entries(map).map(([id,m])=>({op:profByKode(id)||{nama:id,warna:'#999',mesin:''},...m})).sort((a,b)=>b.units-a.units||b.count-a.count).slice(0,6);
  if(!arr.length)return `<div class="chart-empty">${icon('users',24)}<p>Belum ada aktivitas 7 hari terakhir.</p></div>`;
  const max=Math.max(...arr.map(a=>a.units),1);
  return arr.map((a,i)=>`<div class="oc-row"><span class="oc-rank">${i+1}</span><span class="avatar sm" style="--av:${a.op.warna}">${initials(a.op.nama)}</span><div class="oc-mid"><div class="oc-name"><b>${esc(a.op.nama)}</b><small>${esc(a.op.mesin)}</small></div><div class="oc-bar"><span style="width:${Math.max(a.units/max*100,a.units>0?3:0).toFixed(1)}%;background:${a.op.warna};animation-delay:${i*70}ms"></span></div></div><div class="oc-val">${fmtNum(a.units)}<small>${a.count} lap.</small></div></div>`).join('');
}
function renderSavedChips(){
  $('#savedChips').innerHTML=S.savedViews.map(sv=>{
    const active=JSON.stringify(sv.filters)===JSON.stringify(S.filters);
    return `<span class="chip saved ${active?'active':''}" role="button" tabindex="0" data-act="view-apply" data-id="${sv.id}">${icon('bookmark',11)} ${esc(sv.name)}<button class="chip-x" data-act="view-remove" data-id="${sv.id}" title="Hapus tampilan">${icon('x',10)}</button></span>`;
  }).join('');
}
function renderHistory(){
  const all=visibleReports(),rows=getFiltered(),T=todayStr();
  const sum=(arr,fn)=>arr.reduce((a,r)=>a+fn(r),0);
  const today=all.filter(r=>r.date===T),last7=all.filter(r=>r.date>=addDays(T,-6));
  const pack7=sum(last7.filter(r=>r.jenis==='pack'),rHasil),roll7=sum(last7.filter(r=>r.jenis==='roll'),rHasil);
  const rej7=sum(last7,rReject),has7=sum(last7,rHasil);
  const tPack=sum(today.filter(r=>r.jenis==='pack'),rHasil),tRoll=sum(today.filter(r=>r.jenis==='roll'),rHasil);
  const opsToday=new Set(today.map(r=>r.operatorId)).size;
  $('#statsGrid').innerHTML=
    statCard('st-green','fileText','LAPORAN HARI INI',today.length,`${opsToday} operator melapor · total ${all.length}`)+
    statCard('st-red','package','PACK · 7 HARI',pack7,`hari ini ${fmtNum(tPack)} pack`)+
    statCard('st-blue','roll','ROLL · 7 HARI',roll7,`hari ini ${fmtNum(tRoll)} roll`)+
    statCard('st-amber','alert','REJECT · 7 HARI',rej7,`rate ${rejRate(has7,rej7).toFixed(1)}% dari ${fmtNum(has7+rej7)} unit`);
  $$('#statsGrid [data-count]').forEach(el=>countUp(el,Number(el.dataset.count)));
  $('#barChart').innerHTML=buildBarChart();
  $('#opChart').innerHTML=buildOpChart();
  $$('#periodChips .chip[data-period]').forEach(c=>c.classList.toggle('active',c.dataset.period===S.filters.period));
  $('#archChip').classList.toggle('active',S.filters.archived);
  renderSavedChips();
  $$('#histTable th[data-sort]').forEach(th=>{const s=th.dataset.sort,cur=S.filters.sort;th.classList.toggle('sorted',cur.startsWith(s));th.querySelector('.s-arr').textContent=cur===s+'Asc'?'▲':cur===s+'Desc'?'▼':''});
  $('#histBody').innerHTML=rows.map(rowHTML).join('');
  $('#histCards').innerHTML=rows.map(cardHTML).join('');
  const none=all.length===0,noRes=!none&&rows.length===0,hide=none||noRes;
  $('#histTable').style.display=hide?'none':'';
  $('#histCards').style.display=hide?'none':'';
  $('#histEmpty').hidden=!hide;
  if(hide)$('#histEmpty').innerHTML=none?
    `<svg class="flatline" viewBox="0 0 320 44"><path d="M0 22 L120 22 L128 14 L136 30 L142 22 L320 22" fill="none" stroke="#D8C9B2" stroke-width="2" stroke-linecap="round"/></svg><h3>${S.filters.archived?'Arsip kosong':'Belum ada laporan'}</h3><p>${S.filters.archived?'Laporan yang diarsipkan akan muncul di sini dan dapat dipulihkan.':'Mulai laporan harian pertama untuk shift ini.'}</p><div class="empty-btns"><button class="btn btn-primary" data-act="empty-create">${icon('plus',14)} Buat Laporan</button></div>`
    :`<svg class="flatline" viewBox="0 0 320 44"><path d="M0 22 L320 22" fill="none" stroke="#D8C9B2" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6"/></svg><h3>Tidak ada hasil untuk filter ini</h3><p>Coba ubah kata kunci, operator, jenis, status, atau periode.</p><div class="empty-btns"><button class="btn btn-ghost" data-act="filter-reset">${icon('rotate',14)} Reset Filter</button></div>`;
  const sel=S.selection,bb=$('#bulkBar');
  bb.hidden=sel.size===0;
  if(sel.size){
    const arch=S.filters.archived;
    bb.innerHTML=`${icon('check',15)} <b>${sel.size} laporan dipilih</b><span class="bb-actions">
    <button class="btn btn-ghost btn-sm" data-act="bulk-export">${icon('download',13)} Export CSV</button>
    ${canVerify()&&!arch?`<button class="btn btn-green btn-sm" data-act="bulk-verify">${icon('checkCircle',13)} Verifikasi</button>`:''}
    ${canArchive()?`<button class="btn ${arch?'btn-ghost':'btn-danger'} btn-sm" data-act="bulk-delete">${icon(arch?'undo':'trash',13)} ${arch?'Pulihkan':'Arsipkan'}</button>`:''}
    ${isKepala()&&arch?`<button class="btn btn-danger btn-sm" data-act="bulk-purge">${icon('trash',13)} Hapus Permanen</button>`:''}
    <button class="btn btn-ghost btn-sm" data-act="bulk-clear">Batal</button></span>`;
  }
  const visIds=rows.map(r=>r.id),selVis=visIds.filter(id=>sel.has(id)).length,ca=$('#chkAll');
  ca.checked=rows.length>0&&selVis===rows.length;ca.indeterminate=selVis>0&&selVis<rows.length;
  $('#histFoot').textContent=`MENAMPILKAN ${rows.length} DARI ${all.length} LAPORAN · HASIL TERFILTER ${fmtNum(sum(rows,rHasil))} UNIT · REJECT ${fmtNum(sum(rows,rReject))}`;
  $('#histCount').textContent=`${all.length} LAPORAN`;
  buildTabs();
  if(S.highlightId){
    const tr=$(`#histBody tr[data-row="${S.highlightId}"]`);if(tr)tr.classList.add('flash');
    const rc=$(`#histCards [data-row="${S.highlightId}"]`);if(rc)rc.classList.add('flash');
    S.highlightId=null;
  }
}
function refreshDataViews(){
  buildTabs();
  if(S.view==='history')renderHistory();
  if(S.view==='verify')renderVerify();
  if(S.view==='users')renderUsers();
  if(S.drawerId){const r=byId(S.drawerId);if(r){$('#drawerBody').innerHTML=drawerHTML(r);$('#drawerFoot').innerHTML=drawerFoot(r)}else closeDrawer()}
}

/* ---------------- VERIFY ---------------- */
function renderVerify(){
  const live=S.reports.filter(r=>!r.deletedAt);
  const c={submit:0,revisi:0,verified:0};live.forEach(r=>c[r.status]=(c[r.status]||0)+1);
  $('#cSubmit').textContent=c.submit;$('#cRevisi').textContent=c.revisi;$('#cVerified').textContent=c.verified;
  $$('#vTabs .chip').forEach(b=>b.classList.toggle('active',b.dataset.tab===S.vTab));
  const T=todayStr();
  const todayV=live.filter(r=>r.status==='verified'&&r.verifiedAt&&new Date(r.verifiedAt).toISOString().slice(0,10)===T).length;
  const ops=new Set(live.filter(r=>r.status==='submit').map(r=>r.operatorId)).size;
  $('#vStats').innerHTML=
    statCard('st-amber','clock','MENUNGGU VERIFIKASI',c.submit,`${ops} operator menunggu`)+
    statCard('st-red','alert','PERLU REVISI',c.revisi,'dikembalikan ke operator')+
    statCard('st-green','checkCircle','TERVERIFIKASI',c.verified,`${todayV} diverifikasi hari ini`)+
    statCard('st-blue','fileText','TOTAL LAPORAN AKTIF',live.length,'di luar arsip');
  $$('#vStats [data-count]').forEach(el=>countUp(el,Number(el.dataset.count)));
  const rows=live.filter(r=>r.status===S.vTab).sort(CMP.dateDesc);
  $('#vQueue').innerHTML=rows.map(vCard).join('');
  $('#vEmpty').hidden=rows.length>0;
  if(!rows.length)$('#vEmpty').innerHTML=`<svg class="flatline" viewBox="0 0 320 44"><path d="M0 22 L120 22 L128 14 L136 30 L142 22 L320 22" fill="none" stroke="#BFE6D6" stroke-width="2" stroke-linecap="round"/></svg><h3>${S.vTab==='submit'?'Antrean bersih — semua laporan sudah diperiksa':S.vTab==='revisi'?'Tidak ada laporan yang perlu revisi':'Belum ada laporan terverifikasi'}</h3><p>${S.vTab==='submit'?'Kerja bagus. Laporan baru akan muncul di sini begitu operator mengirim.':'Ganti tab untuk melihat status lainnya.'}</p>`;
  const bb=$('#vBulk');
  bb.hidden=S.vSel.size===0;
  if(S.vSel.size)bb.innerHTML=`${icon('check',15)} <b>${S.vSel.size} laporan dipilih</b><span class="bb-actions"><button class="btn btn-green btn-sm" data-act="vbulk-verify">${icon('checkCircle',13)} Verifikasi</button><button class="btn btn-ghost btn-sm" data-act="vbulk-revisi">${icon('alert',13)} Minta Revisi</button><button class="btn btn-ghost btn-sm" data-act="vsel-clear">Batal</button></span>`;
}
function vCard(r){
  const op=opOf(r),prod=r.jenis!=='lainnya',h=rHasil(r),j=rReject(r),w=rWaktu(r),sel=S.vSel.has(r.id);
  const vb=r.verifiedBy?(profByKode(r.verifiedBy)||{nama:r.verifiedBy}):null;
  return `<article class="v-card s-${r.status} ${sel?'sel':''}" data-vrow="${r.id}">
<div class="v-top"><input type="checkbox" data-vchk="${r.id}" ${sel?'checked':''} aria-label="Pilih ${esc(r.code)}"><div class="cell-date"><b>${fmtDate(r.date)}</b><span class="code">${esc(r.code)} · ${shiftShort(r.shift)}</span></div>${jenisBadge(r.jenis)}</div>
<div class="v-op"><span class="avatar" style="--av:${op.warna}">${initials(op.nama)}</span><div><b>${esc(op.nama)}</b><small>${esc(op.mesin)}</small></div></div>
<div class="v-sum">${summaryText(r)}</div>
<div class="v-nums">
<div class="v-num"><label>HASIL</label><b>${prod?fmtNum(h):'—'} <small>${prod?JENIS[r.jenis].unit:''}</small></b></div>
<div class="v-num"><label>REJECT</label><b>${prod?fmtNum(j):'—'} <small>${prod?rejRate(h,j).toFixed(1)+'%':''}</small></b></div>
<div class="v-num"><label>WAKTU</label><b>${fmtMin(w)}</b></div>
</div>
${r.catatan?`<div class="v-note ${r.status==='verified'?'ok':''}"><b>${r.status==='verified'?'Catatan verifikasi':'Catatan revisi'}:</b> ${esc(r.catatan)}</div>`:''}
${vb?`<div class="mono sm muted">Diverifikasi ${esc(vb.nama)} · ${fmtTS(r.verifiedAt)}</div>`:''}
<div class="v-acts">
<button class="btn btn-ghost btn-sm" data-act="row-eye" data-id="${r.id}">${icon('eye',13)} Detail</button>
${r.status!=='verified'?`<button class="btn btn-green btn-sm" data-act="row-verify" data-id="${r.id}">${icon('check',13)} Verifikasi</button>`:`<button class="btn btn-ghost btn-sm" data-act="row-unverify" data-id="${r.id}">${icon('undo',13)} Batalkan</button>`}
${r.status==='submit'?`<button class="btn btn-ghost btn-sm" data-act="row-revisi" data-id="${r.id}">${icon('alert',13)} Revisi</button>`:''}
</div></article>`;
}
async function applyStatus(ids,status,catatan){
  if(!canVerify()||!ids.length)return;
  const before=S.reports.filter(r=>ids.includes(r.id)).map(r=>({id:r.id,status:r.status,catatan:r.catatan,verifiedBy:r.verifiedBy,verifiedAt:r.verifiedAt}));
  S.reports.forEach(r=>{if(ids.includes(r.id)){r.status=status;r.catatan=catatan||'';r.verifiedBy=status==='verified'?S.me.kode:null;r.verifiedAt=status==='verified'?Date.now():null}});
  ids.forEach(id=>{S.selection.delete(id);S.vSel.delete(id)});
  refreshDataViews();
  try{
    await DB.setStatus(ids,status,catatan);
    if(status==='verified')sfx.ok();else sfx.tick();
    const label=status==='verified'?`${ids.length} laporan terverifikasi — angka terkunci.`:status==='revisi'?`${ids.length} laporan dikembalikan untuk revisi.`:`Status ${ids.length} laporan dikembalikan ke antrean.`;
    toast(label,{type:status==='revisi'?'warn':'success',icon:status==='verified'?'checkCircle':'alert',duration:6000,bar:true,action:'Urungkan',onAction:async()=>{
      try{for(const b of before)await DB.setStatus([b.id],b.status,b.catatan);await reloadAll();refreshDataViews();toast('Perubahan diurungkan.',{icon:'undo'})}catch(e){toast('Gagal mengurungkan: '+esc(e.message),{type:'error',icon:'alert'})}
    }});
  }catch(err){
    before.forEach(b=>{const r=byId(b.id);if(r)Object.assign(r,b)});
    refreshDataViews();
    toast('Gagal: '+esc(err.message),{type:'error',icon:'alert'});sfx.error();
  }
}
async function doArchive(ids,undo){
  if(!canArchive()||!ids.length)return;
  const stamp=undo?null:new Date().toISOString();
  S.reports.forEach(r=>{if(ids.includes(r.id))r.deletedAt=stamp});
  ids.forEach(id=>{S.selection.delete(id);S.vSel.delete(id)});
  if(S.drawerId&&ids.includes(S.drawerId))closeDrawer();
  refreshDataViews();
  try{
    await DB.archive(ids,undo);
    undo?sfx.tick():sfx.del();
    toast(undo?`${ids.length} laporan dipulihkan.`:`${ids.length} laporan diarsipkan.`,{type:undo?'success':'warn',icon:undo?'undo':'trash',duration:8000,bar:true,action:'Urungkan',onAction:()=>doArchive(ids,!undo)});
  }catch(err){
    S.reports.forEach(r=>{if(ids.includes(r.id))r.deletedAt=undo?stamp:null});
    refreshDataViews();toast('Gagal: '+esc(err.message),{type:'error',icon:'alert'});sfx.error();
  }
}
async function doPurge(ids){
  if(!isKepala()||!ids.length)return;
  const ok=await openConfirm({title:`Hapus permanen ${ids.length} laporan?`,msg:'Data akan hilang dari database dan <b>tidak dapat dipulihkan</b>. Audit log tetap mencatat tindakan ini.',ok:'Hapus Permanen'});
  if(!ok)return;
  try{await DB.purge(ids);S.reports=S.reports.filter(r=>!ids.includes(r.id));ids.forEach(id=>S.selection.delete(id));closeDrawer();await reloadAll();refreshDataViews();sfx.del();toast(`${ids.length} laporan dihapus permanen.`,{type:'warn',icon:'trash'})}
  catch(err){toast('Gagal: '+esc(err.message),{type:'error',icon:'alert'})}
}

/* ---------------- MASTER ---------------- */
function renderMaster(){
  const pack=S.products.filter(p=>p.jenis==='pack'),roll=S.products.filter(p=>p.jenis==='roll');
  $('#masterCount').textContent=`${S.products.length} PRODUK TERDAFTAR`;
  const row=p=>`<div class="prod-row ${p.aktif?'':'off'}"><span class="pn">${esc(p.nama)}<small>${p.aktif?'AKTIF · muncul di saran':'NONAKTIF · disembunyikan'}</small></span>
  <button class="icon-btn" data-act="prod-toggle" data-id="${p.id}" title="${p.aktif?'Nonaktifkan':'Aktifkan'}">${icon(p.aktif?'eye':'check',15)}</button>
  <button class="icon-btn" data-act="prod-rename" data-id="${p.id}" title="Ubah nama">${icon('pencil',15)}</button>
  <button class="icon-btn danger" data-act="prod-del" data-id="${p.id}" title="Hapus">${icon('trash',15)}</button></div>`;
  $('#prodPackList').innerHTML=pack.length?pack.map(row).join(''):'<p class="muted sm">Belum ada produk pack.</p>';
  $('#prodRollList').innerHTML=roll.length?roll.map(row).join(''):'<p class="muted sm">Belum ada produk roll.</p>';
  if(isKepala()){
    const cloud=S.mode==='cloud';
    $('#sysPanel').innerHTML=`<div class="sys-grid">
<div class="sys-cell"><h4>${icon('building',15)} Koneksi Data</h4><p>${cloud?'Terhubung ke Supabase. Seluruh perangkat memakai data yang sama dengan RLS.':'Mode lokal — data hanya di perangkat ini. Hubungkan Supabase untuk dipakai bersama.'}</p><button class="btn btn-ghost btn-sm" data-act="open-setup">${cloud?'Ubah Koneksi':'Hubungkan Supabase'}</button></div>
<div class="sys-cell"><h4>${icon('download',15)} Cadangan Data</h4><p>Unduh seluruh laporan, pengguna, dan produk sebagai berkas JSON. Simpan berkala sebagai arsip pabrik.</p><button class="btn btn-ghost btn-sm" data-act="backup-json">Unduh Cadangan JSON</button></div>
<div class="sys-cell"><h4>${icon('rotate',15)} Muat Ulang</h4><p>Ambil data terbaru dari sumber aktif. Gunakan bila perangkat lain baru saja menambah laporan.</p><button class="btn btn-ghost btn-sm" data-act="reload-data">Sinkronkan Sekarang</button></div>
${cloud?'':`<div class="sys-cell"><h4>${icon('alert',15)} Reset Data Demo</h4><p>Kembalikan seluruh data lokal ke contoh bawaan. Semua laporan yang Anda buat di perangkat ini akan hilang.</p><button class="btn btn-danger btn-sm" data-act="reset-demo">Reset Data Demo</button></div>`}
</div>`;
  }
}

/* ---------------- USERS ---------------- */
function renderUsers(){
  const p=S.profiles;
  const c={kepala:0,admin:0,operator:0};p.forEach(x=>c[x.role]=(c[x.role]||0)+1);
  $('#usersCount').textContent=`${p.length} AKUN · ${p.filter(x=>x.aktif).length} AKTIF`;
  $('#usersStats').innerHTML=
    statCard('st-red','shield','KEPALA PRODUKSI',c.kepala,'akses penuh + manajemen user')+
    statCard('st-blue','checkCircle','ADMIN PRODUKSI',c.admin,'verifikasi & master data')+
    statCard('st-green','users','OPERATOR',c.operator,'hanya laporan miliknya')+
    statCard('st-amber','alert','AKUN NONAKTIF',p.filter(x=>!x.aktif).length,'akses dicabut sementara');
  $$('#usersStats [data-count]').forEach(el=>countUp(el,Number(el.dataset.count)));
  $$('#uTabs .chip').forEach(b=>b.classList.toggle('active',b.dataset.tab===S.uTab));
  $('#uPaneUsers').hidden=S.uTab!=='pengguna';
  $('#uPaneAudit').hidden=S.uTab!=='audit';
  if(S.uTab==='pengguna'){
    const order={kepala:0,admin:1,operator:2};
    $('#uPaneUsers').innerHTML=p.slice().sort((a,b)=>order[a.role]-order[b.role]||a.nama.localeCompare(b.nama)).map(uCard).join('');
  }else{
    $('#auditBody').innerHTML=S.audit.length?S.audit.slice(0,150).map(a=>{
      const who=profByKode(a.actor)||{nama:a.actor};
      const cls=a.aksi==='INSERT'?'ins':a.aksi==='DELETE'?'del':'upd';
      return `<div class="au-row"><span class="au-ic ${cls}">${icon(a.aksi==='INSERT'?'plus':a.aksi==='DELETE'?'trash':'pencil',14)}</span><span class="au-t"><b>${esc(a.detail)}</b><small>oleh ${esc(who.nama)}</small></span><span class="au-time">${fmtTS(a.at)}</span></div>`;
    }).join(''):'<p class="muted sm">Belum ada aktivitas tercatat.</p>';
  }
}
function uCard(u){
  const mine=S.me.id===u.id;
  const laps=S.reports.filter(r=>r.operatorId===u.kode&&!r.deletedAt).length;
  return `<article class="u-card ${u.aktif?'':'off'}">
<div class="u-top"><span class="avatar lg" style="--av:${u.warna}">${initials(u.nama)}</span><div class="u-t"><b>${esc(u.nama)}</b><small>@${esc(u.kode)}</small></div>${roleBadge(u.role)}</div>
<div class="u-meta">
<div class="um-cell"><label>JABATAN</label><b title="${esc(u.jabatan)}">${esc(u.jabatan||'—')}</b></div>
<div class="um-cell"><label>MESIN / AREA</label><b>${esc(u.mesin||'—')}</b></div>
<div class="um-cell"><label>LAPORAN</label><b>${laps} laporan</b></div>
<div class="um-cell"><label>STATUS</label><b style="color:${u.aktif?'var(--green)':'var(--red-deep)'}">${u.aktif?'AKTIF':'NONAKTIF'}</b></div>
</div>
<div class="u-switch"><span>Akun dapat masuk ke sistem</span><button class="sw ${u.aktif?'on':''}" data-act="user-toggle" data-id="${u.id}" ${mine?'disabled title="Tidak dapat menonaktifkan diri sendiri"':''} aria-label="Aktifkan/nonaktifkan"></button></div>
<div class="u-acts">
<button class="btn btn-ghost btn-sm" data-act="user-edit" data-id="${u.id}">${icon('pencil',13)} Ubah</button>
<button class="btn btn-ghost btn-sm" data-act="user-pass" data-id="${u.id}">${icon('key',13)} Sandi</button>
</div></article>`;
}
let editingUserId=null;
function openUserModal(id){
  editingUserId=id||null;
  const u=id?S.profiles.find(x=>x.id===id):null;
  $('#userModalTitle').textContent=u?'Ubah Pengguna':'Tambah Pengguna';
  $('#userModalSub').textContent=u?`Mengubah akun @${u.kode}. Kosongkan sandi bila tidak ingin mengganti.`:'Akun baru langsung aktif dan dapat digunakan untuk masuk.';
  $('#uuKode').value=u?u.kode:'';$('#uuKode').disabled=!!u;
  $('#uuNama').value=u?u.nama:'';
  $('#uuRole').value=u?u.role:'operator';
  $('#uuMesin').value=u?u.mesin:'';
  $('#uuJabatan').value=u?u.jabatan:'';
  $('#uuWarna').value=u?u.warna:'#0FA3A3';
  $('#uuPass').value='';
  $('#uuPassWrap').hidden=!!u&&S.mode==='cloud';
  $('#uuMsg').hidden=true;
  $('#userWrap').classList.add('show');
  setTimeout(()=>$(u?'#uuNama':'#uuKode').focus(),40);
}
function userMsg(msg,cls){const e=$('#uuMsg');e.className='setup-msg'+(cls?' '+cls:'');e.innerHTML=msg;e.hidden=false}
async function saveUser(){
  const kode=$('#uuKode').value.trim().toLowerCase().replace(/[^a-z0-9._-]/g,'');
  const nama=$('#uuNama').value.trim();
  const role=$('#uuRole').value;
  const mesin=$('#uuMesin').value.trim();
  const jabatan=$('#uuJabatan').value.trim()||(role==='operator'?'Operator '+mesin:ROLES[role].label);
  const warna=$('#uuWarna').value;
  const pass=$('#uuPass').value;
  if(!kode||kode.length<3)return userMsg('Kode akun minimal 3 karakter (huruf/angka).','err');
  if(!nama)return userMsg('Nama lengkap wajib diisi.','err');
  if(!editingUserId&&pass.length<6)return userMsg('Kata sandi minimal 6 karakter.','err');
  if(editingUserId&&pass&&pass.length<6)return userMsg('Kata sandi baru minimal 6 karakter.','err');
  const btn=$('#uuSave');btn.disabled=true;btn.textContent='Menyimpan…';
  try{
    if(editingUserId){
      await DB.updUser(editingUserId,{nama,role,mesin,jabatan,warna});
      if(pass)await DB.resetPass(editingUserId,pass);
      toast(`Pengguna <b>${esc(nama)}</b> diperbarui.`,{icon:'checkCircle'});
    }else{
      await DB.addUser({kode,nama,role,mesin,jabatan,warna,password:pass});
      toast(`Akun <b>${esc(kode)}</b> dibuat dan siap digunakan.`,{icon:'checkCircle'});
    }
    $('#userWrap').classList.remove('show');
    await reloadAll();buildSelects();renderUsers();refreshDataViews();sfx.ok();
  }catch(err){userMsg(esc(err.message),'err');sfx.error()}
  finally{btn.disabled=false;btn.textContent='Simpan Pengguna'}
}

/* ---------------- DRAWER ---------------- */
const metaCell=(l,v)=>`<div class="dm-cell"><label>${l}</label><div>${v}</div></div>`;
function drawerHTML(r){
  const op=opOf(r),j=JENIS[r.jenis],h=rHasil(r),rej=rReject(r),w=rWaktu(r);
  const st=STATUS[r.status]||STATUS.submit;
  const vb=r.verifiedBy?(profByKode(r.verifiedBy)||{nama:r.verifiedBy}):null;
  let s=`<div class="d-sec"><div class="d-op"><span class="avatar lg" style="--av:${op.warna}">${initials(op.nama)}</span><div class="d-op-t"><b>${esc(op.nama)}</b><small>${esc(op.jabatan)}</small></div><span class="machine-chip">${esc(op.mesin)}</span></div></div>`;
  s+=`<div class="d-sec"><div class="d-verify ${r.status}">${icon(st.icon,18)}<div><b>${st.label}${r.deletedAt?' · DIARSIPKAN':''}</b><p>${r.status==='verified'?`Diverifikasi oleh ${esc(vb?vb.nama:'admin')} · ${fmtTS(r.verifiedAt)}. Angka terkunci untuk operator.`:r.status==='revisi'?'Admin mengembalikan laporan ini untuk diperbaiki operator.':'Menunggu pemeriksaan admin produksi. Operator masih dapat mengubah isinya.'}${r.catatan?`<br><b>Catatan:</b> ${esc(r.catatan)}`:''}</p></div></div></div>`;
  s+=`<div class="d-sec d-meta">${metaCell('TANGGAL',fmtDate(r.date))}${metaCell('SHIFT',esc(shiftLabel(r.shift)))}${metaCell('JENIS KEGIATAN',jenisBadge(r.jenis))}${metaCell('KODE LAPORAN',`<span class="mono">${esc(r.code)}</span>`)}</div>`;
  if(r.jenis==='lainnya'){
    if(r.agenda&&r.agenda.length){
      s+=`<div class="d-label">AGENDA DI LUAR JOBDESK (${r.agenda.length})</div>`;
      s+=r.agenda.map((a,i)=>`<div class="d-item"><div class="d-item-head"><span class="item-idx" style="background:var(--plum)">A${pad(i+1)}</span><span class="badge b-lainnya">${icon('users',11)} ${esc(a.kategori)}</span><span class="chip-calc">${icon('clock',11)} ${fmtMin(num(a.waktu))}</span></div><p class="d-desc">${esc(a.deskripsi)}</p></div>`).join('');
    }else s+=`<div class="d-note">${icon('info',15)}<span>Operator melaporkan <b>tidak ada agenda di luar jobdesk</b> pada tanggal ini.</span></div>`;
    s+=`<div class="d-total"><label>TOTAL WAKTU KEGIATAN</label><div class="dt-num">${fmtMin(w)}</div></div>`;
  }else{
    s+=`<div class="d-label">ITEM PRODUKSI (${(r.items||[]).length})</div>`;
    let p=0,st2=0,o=0;
    s+=(r.items||[]).map((it,i)=>{
      p+=num(it.prep);st2+=num(it.setting);o+=num(it.ops);
      const rt=rejRate(num(it.hasil),num(it.reject));
      return `<div class="d-item"><div class="d-item-head"><span class="item-idx">ITEM ${pad(i+1)}</span><span class="chip-calc ${rateCls(rt)}">${rt.toFixed(1)}% reject</span></div><div class="d-name">${esc(it.nama)}</div><div class="d-grid two"><div class="d-cell"><label>NO. PO</label><b>${esc(it.po)}</b></div><div class="d-cell"><label>NO. SPK</label><b>${esc(it.spk)}</b></div></div><div class="d-grid"><div class="d-cell"><label>PERSIAPAN</label><b>${num(it.prep)}′</b></div><div class="d-cell"><label>SETTING</label><b>${num(it.setting)}′</b></div><div class="d-cell"><label>OPERASIONAL</label><b>${num(it.ops)}′</b></div></div><div class="d-grid two"><div class="d-cell hl"><label>HASIL</label><b>${fmtNum(num(it.hasil))} <small>${j.unit}</small></b></div><div class="d-cell warn"><label>REJECT</label><b>${fmtNum(num(it.reject))} <small>${j.unit}</small></b></div></div></div>`;
    }).join('');
    if(r.extra&&r.extra.length){
      s+=`<div class="d-label">KEGIATAN LAINNYA (${r.extra.length}) — ${fmtMin(rExtraWaktu(r))}</div>`;
      s+=r.extra.map((ex,i)=>`<div class="d-item"><div class="d-item-head"><span class="item-idx" style="background:var(--plum)">L${pad(i+1)}</span><span class="chip-calc">${icon('clock',11)} ${fmtMin(num(ex.waktu))}</span></div><p class="d-desc">${esc(ex.keterangan)}</p></div>`).join('');
    }
    s+=`<div class="d-total"><div class="dt-nums"><div><label>HASIL TOTAL</label><div class="dt-num">${fmtNum(h)} <small>${j.unit}</small></div></div><div><label>REJECT</label><div class="dt-num amber-t">${fmtNum(rej)}</div></div><div><label>REJECT RATE</label><div class="dt-num">${rejRate(h,rej).toFixed(1)}%</div></div><div><label>TOTAL WAKTU</label><div class="dt-num">${fmtMin(w)}</div></div></div><div class="bd-bar dark">${bdSegments(p,st2,o)}</div><div class="bd-legend dark">${bdLegend(p,st2,o)}</div></div>`;
  }
  s+=`<div class="d-stamps"><span>DIBUAT: ${fmtTS(r.createdAt)}</span>${r.updatedAt&&r.updatedAt!==r.createdAt?`<span>DIUBAH: ${fmtTS(r.updatedAt)}</span>`:''}${r.deletedAt?`<span>DIARSIPKAN: ${fmtTS(new Date(r.deletedAt).getTime())}</span>`:''}</div>`;
  return s;
}
function drawerFoot(r){
  let s=`<button class="btn btn-ghost" data-act="drawer-print">${icon('printer',14)} Cetak</button>`;
  if(canEdit(r))s+=`<button class="btn btn-ghost" data-act="drawer-edit">${icon('pencil',14)} Edit</button>`;
  s+=`<button class="btn btn-ghost" data-act="drawer-dup">${icon('copy',14)} Duplikat</button>`;
  if(canVerify()&&!r.deletedAt){
    if(r.status!=='verified')s+=`<button class="btn btn-green" data-act="row-verify" data-id="${r.id}">${icon('check',14)} Verifikasi</button>`;
    else s+=`<button class="btn btn-ghost" data-act="row-unverify" data-id="${r.id}">${icon('undo',14)} Batalkan</button>`;
    if(r.status==='submit')s+=`<button class="btn btn-ghost" data-act="row-revisi" data-id="${r.id}">${icon('alert',14)} Revisi</button>`;
  }
  if(canArchive())s+=`<button class="btn btn-danger" data-act="row-del" data-id="${r.id}" title="${r.deletedAt?'Pulihkan':'Arsipkan'}">${icon(r.deletedAt?'undo':'trash',14)}</button>`;
  if(isKepala()&&r.deletedAt)s+=`<button class="btn btn-danger" data-act="row-purge" data-id="${r.id}" title="Hapus permanen">${icon('alert',14)}</button>`;
  return s;
}
function openDrawer(id){
  const r=byId(id);if(!r)return;
  S.drawerId=id;
  $('#drawerCode').textContent=r.code;
  $('#drawerBody').innerHTML=drawerHTML(r);
  $('#drawerFoot').innerHTML=drawerFoot(r);
  $('#drawerBody').scrollTop=0;
  $('#drawer').classList.add('open');$('#scrim').classList.add('show');
  document.body.classList.add('locked');sfx.open();
}
function closeDrawer(){
  if(!$('#drawer').classList.contains('open'))return;
  $('#drawer').classList.remove('open');$('#scrim').classList.remove('show');
  document.body.classList.remove('locked');S.drawerId=null;
}

/* ---------------- EXPORT / PRINT / BACKUP ---------------- */
function exportCSV(rows){
  if(!rows.length){toast('Tidak ada data untuk diexport.',{type:'warn',icon:'alert'});return}
  const head=['Kode Laporan','Tanggal','Shift','Nama Operator','Jabatan','Jenis Kegiatan','Status','Verifikator','Item / Kegiatan','Nomor PO','Nomor SPK','Persiapan (mnt)','Setting (mnt)','Operasional (mnt)','Total Waktu (mnt)','Hasil','Satuan','Reject','Keterangan'];
  const lines=[head];
  rows.forEach(r=>{
    const op=opOf(r),sh=shiftLabel(r.shift),st=(STATUS[r.status]||{}).label,vb=r.verifiedBy?(profByKode(r.verifiedBy)||{nama:r.verifiedBy}).nama:'';
    const base=[r.code,r.date,sh,op.nama,op.jabatan,JENIS[r.jenis].label,st,vb];
    if(r.jenis==='lainnya'){
      if(r.agenda&&r.agenda.length)r.agenda.forEach(a=>lines.push([...base,a.kategori,'','','','','',num(a.waktu),'','','',a.deskripsi]));
      else lines.push([...base,'','','','','','','','','','','Tanpa agenda di luar jobdesk']);
    }else{
      const u=JENIS[r.jenis].unit;
      r.items.forEach(it=>lines.push([...base,it.nama,it.po,it.spk,num(it.prep),num(it.setting),num(it.ops),num(it.prep)+num(it.setting)+num(it.ops),num(it.hasil),u,num(it.reject),'']));
      (r.extra||[]).forEach(ex=>lines.push([...base,'Kegiatan Lainnya','','','','','',num(ex.waktu),'','','',ex.keterangan]));
    }
  });
  const csv='\uFEFF'+lines.map(l=>l.map(c=>'"'+String(c??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');
  downloadBlob(csv,'text/csv;charset=utf-8','laporan-produksi-ecg_'+todayStr()+'.csv');
  toast(`${rows.length} laporan diexport (${lines.length-1} baris data).`,{icon:'download'});sfx.tick();
}
function downloadBlob(content,type,filename){
  try{
    const blob=new Blob([content],{type});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  }catch(e){toast('Unduhan gagal di perangkat ini.',{type:'error',icon:'alert'})}
}
const printHead=(title,sub)=>`<div class="p-head"><div class="p-brand"><div class="p-logo">M</div><div><b>MHI PAPER</b><small>Produksi Kertas ECG/EKG dan Plain</small></div></div><div class="p-doc">FORM LH-ECG-01<br>REV. 03</div></div><div class="p-title">${title}</div><p class="p-sub">${sub}</p>`;
const printFoot=()=>`<div class="p-foot">Dicetak: ${new Date().toLocaleString('id-ID')} · ${S.me?S.me.nama+' ('+ROLES[S.me.role].label+')':''} · ${S.mode==='cloud'?'Sumber: Supabase':'Sumber: perangkat lokal'} · MHI PAPER.</div>`;
const signBlock=(opName,verName)=>`<table class="p-sign"><tr><td>Dibuat oleh,<br><br><br><br><u>&nbsp;&nbsp;${esc(opName||'________________')}&nbsp;&nbsp;</u><br><small>Operator</small></td><td>Diperiksa oleh,<br><br><br><br><u>&nbsp;&nbsp;${esc(verName||'________________')}&nbsp;&nbsp;</u><br><small>Admin Produksi</small></td><td>Disetujui oleh,<br><br><br><br><u>&nbsp;&nbsp;________________&nbsp;&nbsp;</u><br><small>Kepala Divisi</small></td></tr></table>`;
function printRecap(){
  const rows=getFiltered();
  if(!rows.length){toast('Tidak ada data untuk dicetak.',{type:'warn',icon:'alert'});return}
  const periode={all:'Semua Periode',today:'Hari Ini ('+fmtDate(todayStr())+')','7':'7 Hari Terakhir','30':'30 Hari Terakhir'}[S.filters.period]||'Semua Periode';
  let th=0,tj=0,tw=0;
  const trs=rows.map(r=>{
    const op=opOf(r),j=JENIS[r.jenis],h=rHasil(r),rej=rReject(r),w=rWaktu(r);th+=h;tj+=rej;tw+=w;
    const prod=r.jenis!=='lainnya';
    const extraDetail=(r.extra&&r.extra.length)?'<br><b>Kegiatan Lainnya ('+fmtMin(rExtraWaktu(r))+'):</b><br>'+r.extra.map(ex=>`${esc(ex.keterangan)} (${num(ex.waktu)} mnt)`).join('<br>'):'';
    const detail=prod?r.items.map(it=>`${esc(it.nama)} — <b>${fmtNum(num(it.hasil))} ${j.unit}</b>${num(it.reject)?`, reject ${fmtNum(num(it.reject))}`:''}`).join('<br>')+extraDetail
      :(r.agenda.length?r.agenda.map(a=>`${esc(a.kategori)}: ${esc(a.deskripsi)} (${num(a.waktu)} mnt)`).join('<br>'):'Tanpa agenda di luar jobdesk');
    const refs=prod?r.items.map(it=>`PO ${esc(it.po)} / SPK ${esc(it.spk)}`).join('<br>'):'—';
    const times=prod?r.items.map(it=>`${num(it.prep)}/${num(it.setting)}/${num(it.ops)}`).join('<br>'):'—';
    return `<tr><td>${fmtDate(r.date)}<br><small>${shiftShort(r.shift)} · ${esc(r.code)}</small></td><td>${esc(op.nama)}<br><small>${esc(op.jabatan)}</small></td><td>${j.short}<br><small>${(STATUS[r.status]||{}).short}</small></td><td>${detail}</td><td><small>${refs}</small></td><td><small>${times}</small></td><td class="r">${prod?fmtNum(h)+' '+j.unit:'—'}</td><td class="r">${prod?fmtNum(rej):'—'}</td><td class="r">${fmtMin(w)}</td></tr>`;
  }).join('');
  $('#printArea').innerHTML=printHead('Rekap Laporan Harian Produksi Kertas ECG/EKG',periode+' · '+rows.length+' laporan'+(S.me.role==='operator'?' · '+S.me.nama:''))+
  `<table class="p-tbl"><thead><tr><th>Tanggal</th><th>Operator</th><th>Jenis / Status</th><th>Item / Kegiatan</th><th>PO / SPK</th><th>P/S/O (mnt)</th><th class="r">Hasil</th><th class="r">Reject</th><th class="r">Σ Waktu</th></tr></thead><tbody>${trs}</tbody><tfoot><tr><td colspan="6"><b>TOTAL</b></td><td class="r"><b>${fmtNum(th)} unit</b></td><td class="r"><b>${fmtNum(tj)}</b></td><td class="r"><b>${fmtMin(tw)}</b></td></tr></tfoot></table>`+signBlock(S.me.role==='operator'?S.me.nama:'','')+printFoot();
  doPrint();
}
function printSingle(id){
  const r=byId(id);if(!r)return;
  const op=opOf(r),j=JENIS[r.jenis],prod=r.jenis!=='lainnya';
  const vb=r.verifiedBy?(profByKode(r.verifiedBy)||{nama:r.verifiedBy}):null;
  let s=printHead('Laporan Harian Produksi — '+r.code,fmtDate(r.date)+' · '+shiftLabel(r.shift)+' · '+j.label+(r.status==='verified'?' · <span class="p-stamp">TERVERIFIKASI</span>':' · '+STATUS[r.status].label.toUpperCase()));
  s+=`<table class="p-id"><tr><td>Nama Operator</td><td>${esc(op.nama)}</td></tr><tr><td>Jabatan / Posisi</td><td>${esc(op.jabatan)}</td></tr><tr><td>Tanggal / Shift</td><td>${fmtDate(r.date)} — ${esc(shiftLabel(r.shift))}</td></tr><tr><td>Jenis Kegiatan</td><td>${j.label}</td></tr><tr><td>Status Verifikasi</td><td>${STATUS[r.status].label}${vb?' oleh '+esc(vb.nama)+' · '+fmtTS(r.verifiedAt):''}${r.catatan?' — '+esc(r.catatan):''}</td></tr></table>`;
  if(prod){
    s+=r.items.map((it,i)=>`<div class="p-sec-title">Item ${i+1} — ${esc(it.nama)}</div><table class="p-tbl"><thead><tr><th>No. PO</th><th>No. SPK</th><th>Persiapan</th><th>Setting</th><th>Operasional</th><th class="r">Hasil (${j.unit})</th><th class="r">Reject (${j.unit})</th><th class="r">Rate</th></tr></thead><tbody><tr><td>${esc(it.po)}</td><td>${esc(it.spk)}</td><td>${num(it.prep)} mnt</td><td>${num(it.setting)} mnt</td><td>${num(it.ops)} mnt</td><td class="r"><b>${fmtNum(num(it.hasil))}</b></td><td class="r">${fmtNum(num(it.reject))}</td><td class="r">${rejRate(num(it.hasil),num(it.reject)).toFixed(1)}%</td></tr></tbody></table>`).join('');
    s+=`<table class="p-tbl"><tbody><tr><td><b>TOTAL — ${r.items.length} item</b></td><td class="r"><b>Hasil: ${fmtNum(rHasil(r))} ${j.unit}</b></td><td class="r"><b>Reject: ${fmtNum(rReject(r))}</b></td><td class="r"><b>Waktu: ${fmtMin(rWaktu(r))}</b></td></tr></tbody></table>`;
    if(r.extra&&r.extra.length)s+=`<div class="p-sec-title">Kegiatan Lainnya — ${r.extra.length} kegiatan · ${fmtMin(rExtraWaktu(r))}</div><table class="p-tbl"><thead><tr><th>No</th><th>Kegiatan Pengerjaan</th><th class="r">Waktu (mnt)</th></tr></thead><tbody>${r.extra.map((ex,i)=>`<tr><td>${i+1}</td><td>${esc(ex.keterangan)}</td><td class="r">${num(ex.waktu)}</td></tr>`).join('')}</tbody></table>`;
  }else{
    if(r.agenda.length)s+=`<table class="p-tbl"><thead><tr><th>No</th><th>Kategori</th><th>Kegiatan &amp; Penjelasan</th><th class="r">Waktu (mnt)</th></tr></thead><tbody>${r.agenda.map((a,i)=>`<tr><td>${i+1}</td><td>${esc(a.kategori)}</td><td>${esc(a.deskripsi)}</td><td class="r">${num(a.waktu)}</td></tr>`).join('')}</tbody><tfoot><tr><td colspan="3"><b>TOTAL WAKTU DI LUAR JOBDESK</b></td><td class="r"><b>${fmtMin(rWaktu(r))}</b></td></tr></tfoot></table>`;
    else s+=`<p class="p-sub"><b>Tidak ada agenda di luar jobdesk</b> pada tanggal ini.</p>`;
  }
  s+=signBlock(op.nama,vb?vb.nama:'')+printFoot();
  $('#printArea').innerHTML=s;
  doPrint();
}
function doPrint(){toast('Menyiapkan halaman cetak…',{type:'info',icon:'printer',duration:2200});setTimeout(()=>{try{window.print()}catch(e){}},80)}
function backupJSON(){
  const d=DB.exportAll();
  downloadBlob(JSON.stringify({app:'MHI PAPER',version:3,mode:S.mode,exportedAt:new Date().toISOString(),...d},null,2),'application/json','mhi-paper-backup_'+todayStr()+'.json');
  toast('Cadangan JSON diunduh.',{icon:'download'});sfx.tick();
}

/* ---------------- SETUP MODAL ---------------- */
function openSetup(){
  const c=readCfg();
  $('#suUrl').value=c?c.url:'';$('#suKey').value=c?c.key:'';$('#suDomain').value=c?c.domain:'mhi.local';
  $('#suMsg').hidden=true;
  $('#setupWrap').classList.add('show');
}
function setupMsg(m,cls){const e=$('#suMsg');e.className='setup-msg'+(cls?' '+cls:'');e.innerHTML=m;e.hidden=false}
async function saveSetup(){
  const url=$('#suUrl').value.trim().replace(/\/$/,''),key=$('#suKey').value.trim(),domain=$('#suDomain').value.trim()||'mhi.local';
  if(!url||!key)return setupMsg('URL dan anon key wajib diisi.','err');
  if(!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(url))return setupMsg('Format URL harus https://xxxx.supabase.co','err');
  if(key.length<40)return setupMsg('Anon key tampak terlalu pendek. Salin kunci lengkap dari dashboard.','err');
  const btn=$('#suSave');btn.disabled=true;btn.textContent='Menghubungkan…';
  try{
    const test=Object.create(Cloud);
    await test.init({url,key,domain});
    const{error}=await test.sb.from('products').select('id').limit(1);
    if(error)throw new Error('Tabel belum siap: '+error.message+'. Jalankan supabase/schema.sql terlebih dahulu.');
    writeCfg({url,key,domain});
    setupMsg('Berhasil terhubung. Memuat ulang aplikasi…','ok');
    await sleep(700);location.reload();
  }catch(err){setupMsg(esc(err.message),'err');sfx.error()}
  finally{btn.disabled=false;btn.textContent='Simpan & Hubungkan'}
}

/* ---------------- DRAG REORDER ---------------- */
function bindReorder(listEl,getArr,after){
  let dragKey=null;
  const clearDrop=()=>listEl.querySelectorAll('.drop-before,.drop-after').forEach(x=>x.classList.remove('drop-before','drop-after'));
  const cleanup=()=>{clearDrop();listEl.querySelectorAll('.item-card').forEach(c=>{c.classList.remove('dragging');c.draggable=false});dragKey=null};
  listEl.addEventListener('mousedown',e=>{const g=e.target.closest('[data-grip]');if(g){const c=g.closest('.item-card');if(c)c.draggable=true}});
  document.addEventListener('mouseup',()=>{if(!dragKey)listEl.querySelectorAll('.item-card[draggable="true"]').forEach(c=>c.draggable=false)});
  listEl.addEventListener('dragstart',e=>{const c=e.target.closest('.item-card');if(!c||!c.draggable){e.preventDefault();return}dragKey=c.dataset.key;c.classList.add('dragging');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',dragKey)}catch(_){}});
  listEl.addEventListener('dragover',e=>{if(!dragKey)return;e.preventDefault();clearDrop();const c=e.target.closest('.item-card');if(!c||c.dataset.key===dragKey)return;const r=c.getBoundingClientRect();c.classList.add(e.clientY<r.top+r.height/2?'drop-before':'drop-after')});
  listEl.addEventListener('drop',e=>{
    if(!dragKey)return;e.preventDefault();
    const c=e.target.closest('.item-card'),arr=getArr(),from=arr.findIndex(x=>x.key===dragKey);
    if(from<0){cleanup();return}
    let to=c?arr.findIndex(x=>x.key===c.dataset.key):arr.length-1;
    if(c){const r=c.getBoundingClientRect();if(e.clientY>=r.top+r.height/2)to++}
    if(to>from)to--;
    if(to!==from&&to>=0){const[m]=arr.splice(from,1);arr.splice(to,0,m);after();sfx.tick()}
    cleanup();
  });
  listEl.addEventListener('dragend',cleanup);
}

/* ---------------- EVENTS ---------------- */
const debouncedSearch=debounce(v=>{S.filters.q=v;renderHistory()},220);
function bindGlobal(){
  $('#loginForm').addEventListener('submit',e=>{e.preventDefault();doLogin($('#lgKode').value,$('#lgPass').value)});
  $('#lgEye').addEventListener('click',()=>{const p=$('#lgPass');p.type=p.type==='password'?'text':'password';$('#lgEye').innerHTML=icon(p.type==='password'?'eye':'volumeX',16)});
  document.addEventListener('input',e=>{
    const el=e.target;
    if(el.matches('[data-extra]')){
      const ex=S.form.extra.find(x=>x.key===el.dataset.extra);if(!ex)return;
      ex[el.dataset.field]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;
      clearInvalid(el);
      const chip=document.querySelector(`[data-ecalc="${ex.key}"]`);if(chip)chip.innerHTML=icon('clock',11)+' '+fmtMin(num(ex.waktu));
      updateFormSummary();
    }else if(el.matches('[data-item]')){
      const it=S.form.items.find(x=>x.key===el.dataset.item);if(!it)return;
      it[el.dataset.field]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;
      clearInvalid(el);updateItemCalc(it.key);updateFormSummary();
    }else if(el.matches('[data-agenda]')){
      const a=S.form.agenda.find(x=>x.key===el.dataset.agenda);if(!a)return;
      a[el.dataset.field]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;
      clearInvalid(el);
      const chip=$(`[data-acalc="${a.key}"]`);if(chip)chip.innerHTML=icon('clock',11)+' '+fmtMin(num(a.waktu));
      updateOtherSummary();
    }else if(el.id==='f-date'||el.id==='o-date'){S.form.date=el.value;clearInvalid(el);updateFormSummary();updateOtherSummary()}
    else if(el.id==='fl-q')debouncedSearch(el.value);
  });
  document.addEventListener('change',e=>{
    const el=e.target;
    if(el.id==='f-operator'||el.id==='o-operator'){
      S.form.operatorId=el.value;clearInvalid(el);syncIdentity();renderOperatorPreviews(true);updateFormSummary();updateOtherSummary();if(el.value)sfx.tick();
    }else if(el.id==='f-shift'||el.id==='o-shift'){
      S.form.shift=el.value==='LONG'?(shiftModeOf(S.form.shift)==='LONG'?S.form.shift:lastLong):'N1';
      syncIdentity();updateFormSummary();updateOtherSummary();sfx.tick();
    }
    else if(el.id==='fl-operator'){S.filters.operator=el.value;renderHistory()}
    else if(el.id==='fl-jenis'){S.filters.jenis=el.value;renderHistory()}
    else if(el.id==='fl-status'){S.filters.status=el.value;renderHistory()}
    else if(el.id==='fl-sort'){S.filters.sort=el.value;renderHistory()}
    else if(el.id==='chkAll'){const ids=getFiltered().map(r=>r.id);if(el.checked)ids.forEach(i=>S.selection.add(i));else ids.forEach(i=>S.selection.delete(i));renderHistory()}
    else if(el.matches('[data-chk]')){const id=el.dataset.chk;el.checked?S.selection.add(id):S.selection.delete(id);renderHistory()}
    else if(el.matches('[data-vchk]')){const id=el.dataset.vchk;el.checked?S.vSel.add(id):S.vSel.delete(id);renderVerify()}
  });
  document.addEventListener('submit',e=>{
    const f=e.target;
    if(f.dataset&&f.dataset.form==='prod'){
      e.preventDefault();
      const inp=f.querySelector('input'),nama=inp.value.trim();
      if(nama.length<3){toast('Nama produk minimal 3 karakter.',{type:'warn',icon:'alert'});return}
      DB.addProduct(f.dataset.jenis,nama).then(p=>{S.products.push(p);buildSelects();renderMaster();inp.value='';sfx.tick();toast(`Produk <b>${esc(p.nama)}</b> ditambahkan.`,{icon:'checkCircle'})})
        .catch(err=>{toast(esc(err.message),{type:'error',icon:'alert'});sfx.error()});
    }
  });
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-act]');
    if(t){handleAction(t,e);return}
    if(!e.target.closest('.user-wrap'))$('#userMenu').hidden=true;
    const vrow=e.target.closest('[data-vrow]');
    if(vrow&&!e.target.closest('input,button')){openDrawer(vrow.dataset.vrow);return}
    const row=e.target.closest('[data-row]');
    if(row&&!e.target.closest('input,select,button,a,label'))openDrawer(row.dataset.row);
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if($('#userWrap').classList.contains('show')){$('#userWrap').classList.remove('show');return}
      if($('#setupWrap').classList.contains('show')){$('#setupWrap').classList.remove('show');return}
      if($('#modalWrap').classList.contains('show')){closeModal(modalIsPrompt?null:false);return}
      if($('#drawer').classList.contains('open')){closeDrawer();return}
      $('#userMenu').hidden=true;
      if(e.target.id==='fl-q'&&e.target.value){e.target.value='';S.filters.q='';renderHistory()}
    }
    if(e.key==='Enter'&&e.target.id==='modalInput'&&!e.shiftKey){e.preventDefault();closeModal(e.target.value.trim()||null)}
    if(e.key==='Enter'&&e.target.matches&&e.target.matches('.chip.saved'))e.target.click();
    if(e.key==='/'&&S.view==='history'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#fl-q').focus()}
  });
  $('#scrim').addEventListener('click',closeDrawer);
  $('#modalWrap').addEventListener('click',e=>{if(e.target.id==='modalWrap')closeModal(modalIsPrompt?null:false)});
  $('#setupWrap').addEventListener('click',e=>{if(e.target.id==='setupWrap')$('#setupWrap').classList.remove('show')});
  $('#userWrap').addEventListener('click',e=>{if(e.target.id==='userWrap')$('#userWrap').classList.remove('show')});
  $('#reportForm').addEventListener('submit',e=>{e.preventDefault();goToDetail()});
  $('#detailForm').addEventListener('submit',e=>{e.preventDefault();saveProduction()});
  $('#otherForm').addEventListener('submit',e=>{e.preventDefault();saveOther()});
  bindReorder($('#itemList'),()=>S.form.items,()=>{renderItems();updateFormSummary()});
}
function goToDetail(){
  if(!validateIdentitas())return;
  setView('detail');
  setTimeout(()=>{const inp=document.querySelector('#itemList [data-field="nama"]');if(inp){try{inp.focus({preventScroll:true})}catch(e){}}},140);
}
async function handleAction(t,e){
  const act=t.dataset.act;
  switch(act){
  case 'quick-login':{await doLogin(t.dataset.kode,DEMO_PASS);break}
  case 'open-setup':{openSetup();break}
  case 'setup-close':{$('#setupWrap').classList.remove('show');break}
  case 'setup-save':{await saveSetup();break}
  case 'setup-local':{writeCfg(null);toast('Beralih ke mode lokal. Memuat ulang…',{type:'info',icon:'rotate'});await sleep(600);location.reload();break}
  case 'logout':{await doLogout();break}
  case 'user-menu':{const m=$('#userMenu');m.hidden=!m.hidden;t.setAttribute('aria-expanded',String(!m.hidden));break}
  case 'nav':{const v=t.dataset.nav;
    if(v==='form'&&S.form.jenis==='lainnya')S.form.jenis='pack';
    if(v==='detail'){
      if(S.form.jenis==='lainnya'){toast('Detail Produksi hanya untuk Paper Pack / Paper Roll.',{type:'info',icon:'info'});setView('form');break}
      if(!S.form.operatorId||!S.form.date){toast('Lengkapi Identitas dulu.',{type:'info',icon:'info'});setView('form');break}
    }
    setView(v);break}
  case 'go-detail':{goToDetail();break}
  case 'back-to-identitas':{setView('form');break}
  case 'wizard':{t.dataset.view==='detail'?goToDetail():setView('form');break}
  case 'sound':{S.sound=!S.sound;savePrefs();updateSoundBtn();if(S.sound)sfx.tick();toast(S.sound?'Bunyi efek aktif.':'Semua bunyi dimatikan.',{type:'info',icon:S.sound?'volume':'volumeX',duration:2000});break}
  case 'jenis':{const jn=t.dataset.jenis;S.form.jenis=jn;sfx.tick();jn==='lainnya'?setView('other'):renderFormDynamic();break}
  case 'multi':{
    const v=t.dataset.val;
    if(v==='tidak'&&S.form.items.length>1){
      const ok=await openConfirm({title:'Kembalikan ke 1 item?',msg:`<b>${S.form.items.length-1} item tambahan</b> akan dihapus dari formulir.`,ok:'Ya, sisakan 1'});
      if(ok){S.form.multi=false;S.form.items=S.form.items.slice(0,1);renderFormDynamic();sfx.tick()}
    }else{S.form.multi=v==='ya';renderFormDynamic();sfx.tick()}
    break}
  case 'item-add':{S.form.items.push(blankItem());renderItems();updateFormSummary();sfx.tick();const last=S.form.items[S.form.items.length-1];const inp=$(`#itemList [data-item="${last.key}"][data-field="nama"]`);if(inp){inp.focus();inp.scrollIntoView({behavior:'smooth',block:'center'})}break}
  case 'item-remove':{S.form.items=S.form.items.filter(i=>i.key!==t.dataset.key);if(!S.form.items.length)S.form.items.push(blankItem());renderItems();updateFormSummary();sfx.del();break}
  case 'item-up':case 'item-down':{const arr=S.form.items,i=arr.findIndex(x=>x.key===t.dataset.key),d=act==='item-up'?-1:1;if(i>=0&&i+d>=0&&i+d<arr.length){const[m]=arr.splice(i,1);arr.splice(i+d,0,m);renderItems();updateFormSummary();sfx.tick()}break}
  case 'long-shift':{lastLong=t.dataset.val;S.form.shift=lastLong;syncIdentity();updateFormSummary();updateOtherSummary();sfx.tick();break}
  case 'reset-form':{
    if(!formDirty()){toast('Formulir masih kosong.',{type:'info',icon:'info',duration:2200});break}
    const ok=await openConfirm({title:'Reset formulir?',msg:'Semua isian yang belum disimpan akan dikosongkan.',ok:'Reset'});
    if(ok){S.form=blankForm();syncIdentity();renderFormDynamic();renderOtherDynamic();setView('form');toast('Formulir direset.',{type:'info',icon:'rotate'});sfx.del()}
    break}
  case 'cancel-edit':{S.form=blankForm();syncIdentity();renderFormDynamic();renderOtherDynamic();setView('form');toast('Edit dibatalkan.',{type:'info',icon:'undo'});break}
  case 'back-to-form':{S.form.jenis='pack';setView('form');break}
  case 'has-agenda':{S.form.hasAgenda=t.dataset.val;renderOtherDynamic();sfx.tick();break}
  case 'has-extra':{S.form.hasExtra=t.dataset.val;renderFormDynamic();sfx.tick();break}
  case 'extra-add':{S.form.extra.push(blankExtra());renderExtra();updateFormSummary();sfx.tick();const l=S.form.extra[S.form.extra.length-1];const i=$(`#extraList [data-extra="${l.key}"][data-field="waktu"]`);if(i){i.focus();i.scrollIntoView({behavior:'smooth',block:'center'})}break}
  case 'extra-remove':{S.form.extra=S.form.extra.filter(x=>x.key!==t.dataset.key);if(!S.form.extra.length)S.form.extra.push(blankExtra());renderExtra();updateFormSummary();sfx.del();break}
  case 'agenda-add':{S.form.agenda.push(blankAgenda());renderAgenda();updateOtherSummary();sfx.tick();const l=S.form.agenda[S.form.agenda.length-1];const i=$(`#agendaList [data-agenda="${l.key}"][data-field="kategori"]`);if(i){i.focus();i.scrollIntoView({behavior:'smooth',block:'center'})}break}
  case 'agenda-remove':{S.form.agenda=S.form.agenda.filter(x=>x.key!==t.dataset.key);if(!S.form.agenda.length)S.form.agenda.push(blankAgenda());renderAgenda();updateOtherSummary();sfx.del();break}
  case 'period':{S.filters.period=t.dataset.period;renderHistory();break}
  case 'toggle-arch':{S.filters.archived=!S.filters.archived;S.selection.clear();renderHistory();sfx.tick();break}
  case 'view-apply':{const sv=S.savedViews.find(x=>x.id===t.dataset.id);if(sv){S.filters={...S.filters,...sv.filters};if(S.me.role==='operator')S.filters.operator=S.me.kode;syncToolbar();renderHistory();sfx.tick()}break}
  case 'view-remove':{e.stopPropagation();S.savedViews=S.savedViews.filter(x=>x.id!==t.dataset.id);savePrefs();renderHistory();toast('Tampilan tersimpan dihapus.',{type:'info',icon:'bookmark',duration:2200});break}
  case 'view-save':{const name=await openPrompt({title:'Simpan Tampilan Filter',msg:'Kombinasi filter saat ini akan disimpan sebagai pintasan.',label:'Nama tampilan',placeholder:'cth: Pack Menunggu Verifikasi'});if(name){S.savedViews.push({id:uid(),name,filters:{...S.filters}});savePrefs();renderHistory();toast(`Tampilan “${esc(name)}” disimpan.`,{icon:'bookmark'})}break}
  case 'filter-reset':{S.filters={q:'',operator:S.me.role==='operator'?S.me.kode:'all',jenis:'all',status:'all',period:'all',sort:'dateDesc',archived:false};syncToolbar();renderHistory();break}
  case 'export-csv':{exportCSV(getFiltered());break}
  case 'print-recap':{printRecap();break}
  case 'backup-json':{backupJSON();break}
  case 'reload-data':{t.disabled=true;try{await reloadAll();buildSelects();refreshDataViews();updateSyncChip();toast('Data disinkronkan.',{icon:'rotate',duration:2200});sfx.tick()}catch(err){toast('Gagal memuat: '+esc(err.message),{type:'error',icon:'alert'})}t.disabled=false;break}
  case 'reset-demo':{const ok=await openConfirm({title:'Reset seluruh data lokal?',msg:'Semua laporan, pengguna, dan produk di perangkat ini kembali ke contoh bawaan.',ok:'Reset Data'});if(ok){await DB.resetDemo();await reloadAll();buildSelects();refreshDataViews();renderMaster();toast('Data demo dikembalikan.',{type:'warn',icon:'rotate'})}break}
  case 'bulk-clear':{S.selection.clear();renderHistory();break}
  case 'bulk-delete':{const ids=[...S.selection];const arch=S.filters.archived;const ok=await openConfirm({title:arch?`Pulihkan ${ids.length} laporan?`:`Arsipkan ${ids.length} laporan?`,msg:arch?'Laporan kembali ke daftar aktif.':'Laporan disembunyikan dari daftar aktif dan dapat dipulihkan kapan saja.',ok:arch?'Pulihkan':'Arsipkan',danger:!arch});if(ok)await doArchive(ids,arch);break}
  case 'bulk-verify':{const ids=[...S.selection];const ok=await openConfirm({title:`Verifikasi ${ids.length} laporan?`,msg:'Angka produksi terkunci dan tidak dapat diubah lagi oleh operator.',ok:'Verifikasi',danger:false});if(ok)await applyStatus(ids,'verified','');break}
  case 'bulk-purge':{await doPurge([...S.selection]);break}
  case 'bulk-export':{exportCSV(S.reports.filter(r=>S.selection.has(r.id)));break}
  case 'sort-th':{const s=t.dataset.sort;S.filters.sort=S.filters.sort===s+'Desc'?s+'Asc':s+'Desc';syncToolbar();renderHistory();break}
  case 'row-eye':{openDrawer(t.dataset.id);break}
  case 'row-edit':{startEdit(t.dataset.id);break}
  case 'row-del':{const r=byId(t.dataset.id);if(!r)break;const undo=!!r.deletedAt;const ok=await openConfirm({title:undo?'Pulihkan laporan ini?':'Arsipkan laporan ini?',msg:`<b>${esc(r.code)}</b> — ${undo?'kembali ke daftar aktif.':'disembunyikan dari daftar aktif, dapat dipulihkan.'}`,ok:undo?'Pulihkan':'Arsipkan',danger:!undo});if(ok)await doArchive([r.id],undo);break}
  case 'row-purge':{await doPurge([t.dataset.id]);break}
  case 'row-verify':{const r=byId(t.dataset.id);if(!r)break;const ok=await openConfirm({title:'Verifikasi laporan ini?',msg:`<b>${esc(r.code)}</b> — ${esc(opOf(r).nama)}. Hasil ${fmtNum(rHasil(r))} ${JENIS[r.jenis].unit||''}, reject ${fmtNum(rReject(r))}. Setelah diverifikasi operator tidak dapat mengubahnya.`,ok:'Verifikasi',danger:false});if(ok)await applyStatus([r.id],'verified','');break}
  case 'row-unverify':{const r=byId(t.dataset.id);if(!r)break;const ok=await openConfirm({title:'Batalkan verifikasi?',msg:`<b>${esc(r.code)}</b> kembali ke antrean dan dapat diubah operator.`,ok:'Batalkan Verifikasi',danger:false});if(ok)await applyStatus([r.id],'submit','');break}
  case 'row-revisi':{const r=byId(t.dataset.id);if(!r)break;const note=await openPrompt({title:'Minta revisi laporan',msg:`<b>${esc(r.code)}</b> — jelaskan apa yang harus diperbaiki operator.`,label:'Catatan untuk operator',placeholder:'cth: Reject 12 pack belum ada rincian penyebab.',ok:'Kirim Revisi'});if(note)await applyStatus([r.id],'revisi',note);break}
  case 'vtab':{S.vTab=t.dataset.tab;S.vSel.clear();renderVerify();sfx.tick();break}
  case 'vsel-all':{const live=S.reports.filter(r=>!r.deletedAt&&r.status===S.vTab);if(S.vSel.size===live.length)S.vSel.clear();else live.forEach(r=>S.vSel.add(r.id));renderVerify();break}
  case 'vsel-clear':{S.vSel.clear();renderVerify();break}
  case 'vbulk-verify':{const ids=[...S.vSel];if(!ids.length){toast('Pilih laporan dulu.',{type:'info',icon:'info'});break}const ok=await openConfirm({title:`Verifikasi ${ids.length} laporan?`,msg:'Angka produksi terkunci untuk operator.',ok:'Verifikasi',danger:false});if(ok)await applyStatus(ids,'verified','');break}
  case 'vbulk-revisi':{const ids=[...S.vSel];if(!ids.length){toast('Pilih laporan dulu.',{type:'info',icon:'info'});break}const note=await openPrompt({title:`Minta revisi ${ids.length} laporan`,label:'Catatan untuk operator',placeholder:'Jelaskan yang perlu diperbaiki…',ok:'Kirim Revisi'});if(note)await applyStatus(ids,'revisi',note);break}
  case 'drawer-close':{closeDrawer();break}
  case 'drawer-edit':{if(S.drawerId)startEdit(S.drawerId);break}
  case 'drawer-dup':{if(S.drawerId)duplicateReport(S.drawerId);break}
  case 'drawer-print':{if(S.drawerId)printSingle(S.drawerId);break}
  case 'empty-create':{setView('form');break}
  case 'prod-toggle':{const p=S.products.find(x=>x.id===t.dataset.id);if(!p)break;try{await DB.updProduct(p.id,{aktif:!p.aktif});p.aktif=!p.aktif;buildSelects();renderMaster();sfx.tick()}catch(err){toast(esc(err.message),{type:'error',icon:'alert'})}break}
  case 'prod-rename':{const p=S.products.find(x=>x.id===t.dataset.id);if(!p)break;const nama=await openPrompt({title:'Ubah nama produk',label:'Nama produk',placeholder:p.nama});if(nama&&nama.length>=3){try{await DB.updProduct(p.id,{nama});p.nama=nama;buildSelects();renderMaster();toast('Nama produk diperbarui.',{icon:'checkCircle'})}catch(err){toast(esc(err.message),{type:'error',icon:'alert'})}}break}
  case 'prod-del':{const p=S.products.find(x=>x.id===t.dataset.id);if(!p)break;const ok=await openConfirm({title:'Hapus produk ini?',msg:`<b>${esc(p.nama)}</b> tidak lagi muncul sebagai saran. Laporan lama tetap utuh.`,ok:'Hapus'});if(ok){try{await DB.delProduct(p.id);S.products=S.products.filter(x=>x.id!==p.id);buildSelects();renderMaster();sfx.del();toast('Produk dihapus.',{type:'warn',icon:'trash'})}catch(err){toast(esc(err.message),{type:'error',icon:'alert'})}}break}
  case 'utab':{S.uTab=t.dataset.tab;if(S.uTab==='audit'&&isKepala()){try{S.audit=await DB.audit()}catch(e){}}renderUsers();sfx.tick();break}
  case 'user-add':{openUserModal(null);break}
  case 'user-edit':{openUserModal(t.dataset.id);break}
  case 'user-cancel':{$('#userWrap').classList.remove('show');break}
  case 'user-save':{await saveUser();break}
  case 'user-toggle':{const u=S.profiles.find(x=>x.id===t.dataset.id);if(!u)break;if(u.id===S.me.id){toast('Tidak dapat menonaktifkan akun sendiri.',{type:'warn',icon:'shield'});break}
    try{await DB.updUser(u.id,{aktif:!u.aktif});u.aktif=!u.aktif;buildSelects();renderUsers();sfx.tick();toast(`Akun <b>${esc(u.nama)}</b> ${u.aktif?'diaktifkan':'dinonaktifkan'}.`,{type:u.aktif?'success':'warn',icon:'shield'})}catch(err){toast(esc(err.message),{type:'error',icon:'alert'})}break}
  case 'user-pass':{const u=S.profiles.find(x=>x.id===t.dataset.id);if(!u)break;const pass=await openPrompt({title:`Reset sandi ${u.nama}`,msg:'Berikan kata sandi baru kepada yang bersangkutan secara langsung.',label:'Kata sandi baru (min. 6 karakter)',placeholder:'••••••',ok:'Reset Sandi'});
    if(pass&&pass.length>=6){try{await DB.resetPass(u.id,pass);toast(`Sandi <b>${esc(u.nama)}</b> diperbarui.`,{icon:'key'});sfx.ok()}catch(err){toast(esc(err.message),{type:'error',icon:'alert'})}}
    else if(pass)toast('Kata sandi minimal 6 karakter.',{type:'warn',icon:'alert'});
    break}
  case 'modal-ok':{closeModal(modalIsPrompt?($('#modalInput').value.trim()||null):true);break}
  case 'modal-cancel':{closeModal(modalIsPrompt?null:false);break}
  }
}

/* ---------------- CLOCK ---------------- */
function tickClock(){
  const d=new Date();
  $('#clock').textContent=d.toLocaleDateString('id-ID',{weekday:'short',day:'2-digit',month:'short'})+' · '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const sl=$('#shiftLive');if(sl)sl.textContent=SHIFT_BADGE[autoShift()]+' · BERJALAN';
}

/* ---------------- INIT ---------------- */
async function init(){
  $$('[data-ic]').forEach(el=>{el.innerHTML=icon(el.dataset.ic,Number(el.dataset.sz)||16)});
  loadPrefs();
  const dF=ecgD(1200,64,6),dL=ecgD(1200,120,5);
  ['ecgBaseF','ecgRunF','ecgBaseD','ecgRunD','ecgBaseO','ecgRunO'].forEach(id=>{const p=document.getElementById(id);if(p)p.setAttribute('d',dF)});
  ['ecgLoginBase','ecgLoginRun'].forEach(id=>{const p=document.getElementById(id);if(p)p.setAttribute('d',dL)});
  const a=autoShift();if(shiftModeOf(a)==='LONG')lastLong=a;
  updateSoundBtn();bindGlobal();tickClock();setInterval(tickClock,1000);
  Local.load();
  const cfg=readCfg();
  if(cfg){
    try{
      await Cloud.init(cfg);
      DB=Cloud;S.mode='cloud';
      const me=await Cloud.session();
      renderLoginScreen();
      if(me){S.me=me;await bootApp();return}
    }catch(err){
      DB=Local;S.mode='local';
      toast('Supabase tidak dapat dijangkau — memakai mode lokal. '+esc(err.message),{type:'warn',icon:'alert',duration:6000});
    }
  }else{DB=Local;S.mode='local'}
  renderLoginScreen();
  const me=await Local.session();
  if(me&&S.mode==='local'){S.me=me;await bootApp()}
}
init().catch(err=>{
  console.error(err);
  document.body.dataset.view='login';
  const e=$('#lgErr');if(e){e.hidden=false;e.textContent='Gagal memuat aplikasi: '+(err.message||err)}
});
