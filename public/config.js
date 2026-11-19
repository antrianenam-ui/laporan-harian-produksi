/* ============================================================
   MHI PAPER — Konfigurasi koneksi
   Kosongkan keduanya = MODE LOKAL (demo, data di perangkat).
   Isi untuk mengaktifkan MODE CLOUD multi-user.
   Bisa juga diisi langsung dari aplikasi: tombol "Koneksi Cloud"
   di halaman login, atau Master → Sistem (kepala produksi).
   ============================================================ */
window.MHI_CONFIG = {
  SUPABASE_URL: 'https://qokbaijzxzfpymojfoux.supabase.co',        // cth: https://abcdefgh.supabase.co
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva2JhaWp6eHpmcHltb2pmb3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNjY0NjYsImV4cCI6MjExMDY0MjQ2Nn0.ltQLJ_c__Z5rgdFmCR6tEIu37S96M6RfcJspGkbjvBI',   // anon public key (AMAN di frontend, RLS yang menjaga)
  EMAIL_DOMAIN: 'mhi.local',
  DEMO_PASSWORD: 'mhi2026'
};
