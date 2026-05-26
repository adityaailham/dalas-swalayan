# 🛒 Dalas Swalayan - Enterprise Management System

Aplikasi manajemen inventaris (*Admin Panel*) dan Katalog Produk Publik untuk **Dalas Swalayan**, dibangun dengan arsitektur modern berkecepatan tinggi menggunakan *Golang (Gin)* di sisi Server dan *Next.js (App Router)* di sisi Klien.

---

## 🚀 1. Teknologi Utama
* **Frontend:** Next.js 15 (React), Tailwind CSS, SWR (Data Fetching), TypeScript.
* **Backend:** Golang (Go), Gin Web Framework, GORM, JWT Authentication.
* **Database:** MySQL.

---

## 🛠 2. Cara Instalasi & Menjalankan (Local Development)

### Syarat Sistem:
* Node.js v18+ & NPM
* Golang v1.21+
* MySQL Server (XAMPP / Laragon / Docker)

### Menjalankan Backend (Golang)
1. Buka terminal di folder `backend/`.
2. Buat database di MySQL Anda bernama `dalas_swalayan`.
3. Pasang *dependencies* Go:
   ```bash
   go mod tidy
   ```
4. Jalankan Server:
   ```bash
   # Gunakan Air untuk auto-reload (Disarankan)
   air
   # Atau gunakan cara reguler
   go run main.go
   ```
   *Backend akan berjalan di `http://localhost:8080`.*

### Menjalankan Frontend (Next.js)
1. Buka terminal di folder `frontend/`.
2. Pasang *dependencies* Node:
   ```bash
   npm install
   ```
3. Jalankan Server Klien:
   ```bash
   npm run dev
   ```
   *Frontend akan terbuka di `http://localhost:3000`.*

---

## ⚙️ 3. Konfigurasi Lingkungan (*Environment Setup*)

Anda wajib membuat file `.env` di kedua folder (Frontend & Backend).

**Di folder `backend/.env`:**
```env
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=dalas_swalayan
JWT_SECRET=rahasia-super-dalas-2026
```

**Di folder `frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 📂 4. Struktur Folder Terorganisir

Proyek ini sangat bersih (100% *Clean Codebase* tanpa *boilerplate* sisa). 

```text
📦 dalas-swalayan
 ┣ 📂 backend
 ┃ ┣ 📂 config       (Koneksi Database)
 ┃ ┣ 📂 controllers  (Logika Bisnis API)
 ┃ ┣ 📂 middleware   (Keamanan & JWT Route Guard)
 ┃ ┣ 📂 models       (Struktur Database GORM)
 ┃ ┣ 📂 routes       (Definisi Jalur API)
 ┃ ┗ 📜 main.go      (Titik Masuk Server)
 ┃
 ┗ 📂 frontend
   ┣ 📂 app
   ┃ ┣ 📂 (admin)    (Area Tersembunyi khusus Dasbor)
   ┃ ┣ 📂 katalog    (Etalase Publik Pembeli)
   ┃ ┗ 📂 login      (Gerbang Masuk Admin)
   ┣ 📂 components
   ┃ ┣ 📂 admin      (Tabel, Modal Edit, Sidebar)
   ┃ ┗ 📂 landing    (Hero, Navbar, Footer Publik)
   ┣ 📂 lib          (SWR Fetcher dengan Injeksi JWT)
   ┗ 📂 public       (Aset Gambar & Video)
```

---

## 🌐 5. Daftar API Endpoints Utama

Semua rute di bawah kelompok `/api/` dilindungi oleh **Middleware JWT** (membutuhkan header `Authorization: Bearer <token>`), kecuali rute Publik.

| Metode | Jalur Endpoint            | Deskripsi / Fungsi                           | Akses    |
|--------|---------------------------|----------------------------------------------|----------|
| POST   | `/api/login`              | Autentikasi Admin & Cetak Token JWT          | Publik   |
| GET    | `/api/categories`         | Ambil daftar semua Kategori Etalase          | Publik   |
| GET    | `/api/products`           | Ambil Katalog Produk (Mendukung Paginasi)    | Publik   |
| GET    | `/api/promos`             | Ambil daftar Promo yang sedang berjalan      | Publik   |
| POST   | `/api/upload`             | Unggah aset gambar dari Panel Admin          | Admin    |
| GET    | `/api/dashboard/stats`    | Kalkulasi ringkasan angka Dasbor             | Admin    |
| POST   | `/api/products`           | Tambah produk baru ke inventaris             | Admin    |
| PUT    | `/api/products/:id`       | Ubah rincian produk (Harga/Kategori/Gambar)  | Admin    |
| DELETE | `/api/products/:id`       | Hapus produk dari gudang                     | Admin    |

*(Catatan: Rute CRUD serupa juga tersedia untuk entitas `categories` dan `promos`)*.

---

## 🌍 6. Panduan Deployment (Rilis Produksi)

### Deploy Frontend (Vercel)
Cara paling mulus untuk merilis Frontend Next.js adalah menggunakan **Vercel**:
1. Buat repositori Git dan dorong (push) *codebase* ini ke GitHub.
2. Masuk ke [Vercel](https://vercel.com/) dan "Import Project".
3. Pilih *Root Directory* ke folder `frontend`.
4. Tambahkan Environment Variable: `NEXT_PUBLIC_API_URL` -> (URL Backend Publik Anda).
5. Klik **Deploy**.

### Deploy Backend (Railway / VPS)
Untuk Golang, platform seperti **Railway.app**, **Render**, atau **VPS Tradisional (Ubuntu + Nginx)** sangat direkomendasikan.
1. Pada platform Railway, tambahkan layanan baru dari GitHub Repo Anda (pilih root `backend`).
2. Tambahkan Plugin MySQL di platform tersebut untuk Database.
3. Masukkan variabel lingkungan (.env) rahasia Anda ke menu Variables di platform.
4. (Penting) Ubah konfigurasi CORS di `backend/main.go` jika URL Frontend produksi Anda sudah jadi, izinkan domain tersebut (contoh: `https://dalas-swalayan.vercel.app`).
5. Platform akan secara otomatis mengompilasi `go build` dan menjalankan server Anda.
