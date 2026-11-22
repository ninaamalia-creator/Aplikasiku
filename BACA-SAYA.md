# Lensa PDF (versi PWA)

Pembaca PDF dengan pencarian kata, plus pengubah Word, Excel, dan gambar ke PDF. Bisa dipasang di HP dan muncul di menu **Bagikan** WhatsApp.

## Isi folder
- `index.html`: aplikasinya
- `manifest.webmanifest`: nama, ikon, dan pendaftaran ke menu Bagikan
- `sw.js`: agar bisa dibuka offline dan menerima file dari WhatsApp
- `icon-*.png`, `apple-touch-icon.png`: ikon kotak merah "Lensa PDF"

Semua file harus diunggah bersama, dalam satu folder.

## Cara memasang di GitHub Pages (gratis, bisa dari HP)
1. Buat akun di github.com, lalu buat repository baru (misalnya `lensa-pdf`), pilih **Public**.
2. Ketuk **Add file → Upload files**, pilih semua file di folder ini, lalu **Commit changes**.
3. Buka **Settings → Pages**. Di bagian *Branch* pilih `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Alamatnya: `https://NAMA-AKUN.github.io/lensa-pdf/`

Dari laptop ada cara yang lebih cepat: buka app.netlify.com/drop lalu seret folder ini ke sana.

## Cara memasang ke HP (Android, Chrome)
1. Buka alamat tadi di **Chrome**.
2. Ketuk tombol **Pasang** di aplikasi, atau menu ⋮ → **Instal aplikasi** / **Tambahkan ke layar utama**.
3. Ikon Lensa PDF muncul di layar HP.

## Membuka PDF dari WhatsApp
1. Di WhatsApp, tekan lama pesan PDF-nya, lalu ketuk ikon **Bagikan** (atau buka PDF → ⋮ → Bagikan).
2. Pilih **Lensa PDF**.
3. Dokumen langsung terbuka dan siap dicari.

Kalau Lensa PDF belum muncul di daftar Bagikan, tutup Chrome sepenuhnya lalu buka lagi aplikasinya sekali.

## Ubah ke PDF
- Buka tab **Ubah ke PDF**, pilih Word, Excel, atau Gambar, pilih file, lalu ketuk **Ubah ke PDF**.
- Bisa juga langsung dari WhatsApp: tekan lama file Word/Excel/foto → Bagikan → Lensa PDF.
- Hasilnya bisa **Simpan PDF** (masuk ke folder Download), **Bagikan** (misalnya kirim balik ke WhatsApp), atau **Lihat di Lensa**.
- Hasil dari Excel berupa teks dan bisa dicari. Hasil dari Word dan gambar berupa gambar halaman.
- File Word lama (.doc) belum didukung. Simpan ulang sebagai .docx dulu.

## Catatan
- File dari menu Bagikan hanya ditampung sesaat untuk dibuka, lalu langsung dihapus. Tidak ada dokumen yang disimpan.
- Menu Bagikan hanya bekerja di Android dengan Chrome (atau Edge/Samsung Internet). Di iPhone aplikasinya tetap bisa dipasang, tetapi PDF dibuka lewat tombol **Buka PDF**.
- Fitur PWA tidak berjalan kalau `index.html` dibuka langsung sebagai file. Aplikasi harus dibuka dari alamat https.
