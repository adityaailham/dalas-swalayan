# Next.js Monolith Refactor Design Spec
**Date:** 2026-07-27
**Topic:** Migrasi Backend Golang ke Next.js Monolith (API Routes + Prisma)

## 1. Context & Goals
**Current State:** Sistem terpisah dengan Backend menggunakan Golang (Gin, GORM) dan Frontend menggunakan Next.js App Router (React 19).
**Pain Points:** Mengelola dua environment server (port 8080 & 3000) merepotkan dalam development maupun proses *deployment* ke Cloud nantinya.
**Goal:** Merestrukturisasi proyek secara keseluruhan menjadi 1 wadah monolith menggunakan Next.js.
**Approach Chosen:** Menggunakan Next.js API Routes (REST) + Prisma ORM. Hal ini menjamin komponen frontend tetap bekerja 100% tanpa ubahan ekstrem, namun menghilangkan dependensi pada layanan Golang.

## 2. Architecture & Database
- **Database Engine:** Tetap menggunakan MySQL.
- **ORM:** Migrasi dari GORM ke **Prisma**. Prisma akan mendefinisikan kembali 4 struktur model utama:
  1. `Admin` (Username, Password Hash)
  2. `Category` (Name, Description)
  3. `Product` (Name, SKU, Description, Price, Status, Category Relation, dsb)
  4. `Promo` (Title, Description, Status, ImageUrl)
- **Singleton Database:** Membuat file `lib/db.ts` yang menampung instance PrismaClient agar proses HMR (*Hot Module Replacement*) di Next.js tidak membuka ratusan koneksi paralel ke MySQL saat mode development.

## 3. API Routes Migration Strategy
Setiap *endpoint* Golang akan diduplikasi fungsinya (1:1) ke Next.js Route Handlers:

- **Auth Routes (`app/api/auth/route.ts`):** 
  - Menerima `POST` dengan body username & password.
  - Membandingkan hash menggunakan package `bcrypt` atau yang setara (misal: `bcryptjs` untuk Node).
  - Mengeluarkan *response JSON* berisi token JWT.
- **Data Routes (`app/api/products`, `/api/categories`, `/api/promos`):**
  - Menerima method GET, POST, PUT, DELETE.
  - Untuk method GET (Publik): Langsung menarik data dari Prisma.
  - Khusus untuk `GET /api/products`: Harus menyertakan logika ekstra (*global latest updated timestamp*) di properti `meta.latest_updated_at` untuk menyesuaikan standar Frontend (Sistem Auto Reset 24 Jam).
  - Untuk POST, PUT, DELETE (Private): Harus melewati Middleware (Pengecekan Header Authorization / JWT).

## 4. Authentication & Middleware
- Menggunakan pustaka **`jose`** (JSON Object Signing and Encryption) untuk men-generate dan memverifikasi token JWT. 
- Alasan pemilihan `jose`: `jose` sangat stabil digunakan di Node.js Edge Runtime / Next.js Middleware jika dibandingkan dengan paket lawas `jsonwebtoken`.

## 5. Client Integrations (Frontend)
- **Environment Adjustment:** Menghapus atau mengubah `NEXT_PUBLIC_API_URL` di dalam `.env.local` sehingga tidak menunjuk lagi ke server `http://192.168.1.3:8080`, melainkan menggunakan Relative Fetching (langsung `/api/products`).
- Tidak perlu mengubah *logic* komponen React sama sekali karena format struktur JSON `data` dan `meta` diusahakan persis 100% sama dengan format balasan Gin Framework.

## 6. Self-Review Checklist
- [x] Placeholder/Vague rules: Tidak ada TBD. Pilihan *library* seperti Prisma dan `jose` diikat mati.
- [x] Scope: Sangat terfokus pada pemindahan routing & ORM. Tidak ada refactor UI/komponen E-Katalog.
- [x] Consistency: API Response dijamin konsisten, karena kita tetap melempar `data` dan `meta`.
