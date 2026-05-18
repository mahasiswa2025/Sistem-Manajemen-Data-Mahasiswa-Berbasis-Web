# Sistem Manajemen Data Mahasiswa (SPA)

Sistem ini adalah aplikasi **Single Page Application (SPA)** berbasis client-side untuk melakukan manajemen data mahasiswa (CRUD). Aplikasi ini dibangun murni menggunakan **HTML, CSS Vanilla, dan JavaScript** tanpa framework eksternal, dan memanfaatkan **LocalStorage** browser sebagai basis datanya.

Antarmuka dirancang menggunakan konsep modern dengan sentuhan _Glassmorphism_, transisi yang mulus, dan sangat responsif.

## Fitur Utama

*   **Formulir Input Lengkap**: Mencakup Nama, NIM, Alamat, Jenis Kelamin, dan Password (dengan fitur *toggle* tampilkan/sembunyikan kata sandi).
*   **CRUD Data Lokal**:
    *   **Create**: Menambah data mahasiswa baru.
    *   **Read**: Menampilkan data dalam bentuk tabel dinamis.
    *   **Update**: Memperbarui/mengedit data yang sudah ada.
    *   **Delete**: Menghapus data dari penyimpanan.
*   **Pencarian (Search)**: Filter tabel secara real-time berdasarkan Nama Mahasiswa atau NIM.
*   **Pengurutan (Sort)**: Mengurutkan tabel berdasarkan data terbaru, alfabetis Nama (A-Z, Z-A), atau NIM.
*   **Pagination Sederhana**: Membatasi tampilan tabel dengan batas 5 data per halaman agar rapi.
*   **Ekspor Excel (CSV)**: Mengekstrak seluruh data mahasiswa ke dalam format spreadsheet (`.csv`).
*   **Tema Gelap / Terang (Dark/Light Mode)**: Mode tema ganda yang otomatis menyimpan preferensi warna layar Anda di browser.

## Teknologi yang Digunakan

*   **HTML5** (Struktur Antarmuka)
*   **CSS3** (Variabel CSS, Flexbox/Grid, Animasi, Glassmorphism UI)
*   **Vanilla JavaScript (ES6)** (Manipulasi DOM, Logika CRUD, Pagination, Ekspor)
*   **LocalStorage API** (Penyimpanan Data Sisi-Klien)

## Struktur File

*   `index.html`: Berisi seluruh kerangka antarmuka, formulir, dan tabel data.
*   `style.css`: Berkas gaya visual, termasuk semua animasi dan variabel tema terang/gelap.
*   `script.js`: Menangani logika program secara keseluruhan (CRUD, Search, Pagination, dll).
*   `README.md`: Dokumentasi proyek ini.

## Cara Menjalankan Aplikasi

Karena aplikasi ini sepenuhnya berjalan di sisi klien (Client-Side), Anda **tidak memerlukan web server** (seperti XAMPP atau Apache) untuk menjalankannya.

1. Buka folder proyek ini (`d:\xampp\htdocs\absensi`).
2. Klik ganda (double-click) pada file **`index.html`**.
3. Aplikasi akan otomatis terbuka di browser *default* Anda (Google Chrome, Mozilla Firefox, Microsoft Edge, dll).

> **Tips Reset Data**: Jika Anda ingin menghapus seluruh data yang sudah Anda tambahkan secara manual, tekan `F12` di browser, masuk ke tab **Application** (Chrome) atau **Storage** (Firefox) -> **Local Storage**, lalu hapus item `studentData`. Muat ulang (Refresh) halaman.
