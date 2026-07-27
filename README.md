# 🛒 Dalas Swalayan - Enterprise Management System

Aplikasi manajemen inventaris (*Admin Panel*) dan Katalog Produk Publik untuk **Dalas Swalayan**. Aplikasi ini telah sepenuhnya dirombak ulang (*refactored*) menjadi aplikasi **Full-Stack Monolithic** berkecepatan tinggi menggunakan *Next.js (App Router)* dan *Prisma ORM*.

---

## 🚀 1. Teknologi Utama
* **Frontend & Backend (Monolith):** Next.js 15 (App Router), React, TypeScript.
* **Styling & UI:** Tailwind CSS, Framer Motion (via Tailwind animations), Lucide Icons.
* **Database & ORM:** Prisma ORM v6+, terhubung ke basis data MySQL (atau PostgreSQL).
* **Autentikasi & Keamanan:** JSON Web Tokens (JWT) yang dienkripsi pada Server-Side Cookies.

---

## 🛠 2. Cara Instalasi & Menjalankan (Local Development)

### Syarat Sistem:
* Node.js v18+ & NPM
* MySQL Server (XAMPP / Laragon / Docker)

### Langkah Pemasangan:
1. Buka terminal di _root_ folder proyek `dalas-swalayan`.
2. Buat database di MySQL Anda bernama `dalas_swalayan`.
3. Pasang *dependencies* Node.js:
   ```bash
   npm install
   ```
4. Sinkronkan skema database dengan Prisma:
   ```bash
   npx prisma db push
   ```
   *(Atau jalankan `npx prisma migrate dev` jika Anda ingin menyimpan histori migrasi).*
5. (Opsional) Buka Prisma Studio untuk mengelola data langsung dari peramban:
   ```bash
   npx prisma studio
   ```
6. Jalankan Server Pengembangan:
   ```bash
   npm run dev
   ```
   *Aplikasi secara utuh (Klien & API Server) akan berjalan di `http://localhost:3000`.*

---

## ⚙️ 3. Konfigurasi Lingkungan (*Environment Setup*)

Anda perlu menyalin atau membuat file `.env` di direktori proyek utama (sejajar dengan `package.json`).

**Contoh file `.env`:**
```env
# Koneksi Database Prisma (Sesuaikan dengan kredensial MySQL lokal Anda)
DATABASE_URL="mysql://root:@localhost:3306/dalas_swalayan"

# Rahasia Enkripsi JWT (Wajib diisi untuk Autentikasi Admin)
JWT_SECRET="rahasia-super-dalas-2026-aman"
```

---

## 📂 4. Struktur Folder Terorganisir

Proyek ini menggunakan arsitektur folder App Router Next.js yang terpusat dan mudah di-*maintenance*:

```text
📦 dalas-swalayan
 ┣ 📂 app
 ┃ ┣ 📂 (admin)      (Area Tersembunyi khusus Dasbor & CRUD Admin)
 ┃ ┣ 📂 api          (Internal Next.js Route Handlers / API Backend)
 ┃ ┣ 📂 katalog      (Etalase Publik Pembeli & Kalkulator Belanja)
 ┃ ┗ 📂 login        (Gerbang Masuk Admin)
 ┣ 📂 components
 ┃ ┣ 📂 admin        (Tabel, Modal Edit, Sidebar Dasbor)
 ┃ ┣ 📂 landing      (Hero, Navbar, Footer Publik)
 ┃ ┗ 📂 ui           (Komponen UI Reusable)
 ┣ 📂 lib            (Fungsi Pembantu: db.ts untuk Prisma, utilitas token)
 ┣ 📂 prisma         (Skema Database schema.prisma)
 ┗ 📂 public         (Aset Gambar & Video statis)
```

---

## 🌐 5. Keunggulan Fitur

1. **E-Katalog Interaktif:** Menampilkan galeri produk publik dengan fitur *Search*, Filter Kategori, dan pengurutan responsif.
2. **Kalkulator / Perkiraan Belanja:** Keranjang simulasi harga (*Floating Cart Drawer*) yang interaktif dengan kemudahan mencetak (*print*) struk perkiraan untuk pembeli luring.
3. **Dasbor Admin *Real-time*:** Panel manajemen produk, kategori, dan promo. Termasuk analitik jumlah entitas di layar *Dashboard*.
4. **Keamanan Ekstra:** Halaman _Admin_ sepenuhnya dilindungi pada lapis jaringan (Middleware) dan pelindung *Layout* lokal. Tidak ada yang bisa menembusnya tanpa _Cookie_ Sesi JWT yang sah.
5. **Kinerja Optimal (*Zero-Config* CORS):** Karena ini aplikasi monolitik (API dan Panel tayang di _origin_ yang sama `localhost:3000`), kita terbebas dari kutukan kesalahan perlintasan domain (CORS) yang memperumit infrastruktur.

---

## 🌍 6. Panduan Deployment (Rilis Produksi)

Aplikasi *Full-Stack* berbasis Next.js sangat luar biasa mudah dirilis, dan wadah terbaiknya adalah **Vercel**.

1. Dorong (*push*) seluruh *codebase* ini ke GitHub.
2. Jika Anda menggunakan database mandiri (VPS MySQL), catat `DATABASE_URL` yang dapat diakses publik. Jika tidak punya, Anda bisa membuat Prisma Postgres secara gratis di *Prisma Data Platform* atau *Supabase*.
3. Masuk ke [Vercel](https://vercel.com/) dan *Import Project*.
4. Masukkan *Environment Variables*:
   * `DATABASE_URL` = (URL database publik Anda)
   * `JWT_SECRET` = (Kode rahasia rumit Anda)
5. Pada *Build Command* di Vercel, pastikan perintah ini tertulis:
   ```bash
   npx prisma generate && next build
   ```
6. Klik **Deploy** dan tonton mahakarya Anda ditayangkan secara global!
