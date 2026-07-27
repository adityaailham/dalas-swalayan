# Next.js Monolith Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memigrasi Backend Golang ke dalam ekosistem Next.js sebagai Monolith sepenuhnya menggunakan Route Handlers dan Prisma ORM.

**Architecture:** Pembuatan REST API internal di Next.js (pada `/api/...`) yang 100% kompatibel dengan komponen Frontend E-Katalog saat ini. Prisma digunakan sebagai pengganti GORM. JWT diamankan menggunakan package `jose` untuk kompatibilitas Edge Runtime Next.js.

**Tech Stack:** Next.js (App Router), Prisma ORM, jose, bcryptjs.

## Global Constraints

Semua Route Handler API harus mengembalikan format objek JSON `{ data, meta }` atau `{ message, data }` sesuai kesepakatan skema Golang sebelumnya agar tidak memecahkan aplikasi klien (frontend).

---

### Task 1: Setup Prisma ORM & Skema Database

**Files:**
- Create: `frontend/prisma/schema.prisma`
- Create: `frontend/lib/db.ts`
- Modify: `frontend/package.json`

**Interfaces:**
- Produces: Koneksi global `prisma` untuk digunakan oleh rute API berikutnya.

- [ ] **Step 1: Install Prisma dependencies**
```bash
cd frontend
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

- [ ] **Step 2: Konfigurasi schema.prisma**
Salin tabel Golang (Admins, Categories, Products, Promos) ke Prisma Schema di file `frontend/prisma/schema.prisma` yang baru digenerate.

- [ ] **Step 3: Setup Singleton db.ts**
Buat file `frontend/lib/db.ts` untuk mengekspor instance global PrismaClient agar mencegah kebocoran koneksi.

- [ ] **Step 4: Sinkronisasi database**
```bash
cd frontend
npx prisma db pull
npx prisma generate
```

- [ ] **Step 5: Commit task 1**
```bash
git add frontend/prisma frontend/lib/db.ts frontend/package.json
git commit -m "chore: setup prisma orm and schema for next.js monolith"
```

---

### Task 2: Setup Authentication & JWT Middleware

**Files:**
- Create: `frontend/app/api/auth/route.ts`
- Create: `frontend/middleware.ts`
- Modify: `frontend/package.json`

**Interfaces:**
- Consumes: `prisma` dari `lib/db.ts`.
- Produces: API `/api/auth` (POST) dan proteksi rute di Middleware.

- [ ] **Step 1: Install keamanan tambahan**
```bash
cd frontend
npm install jose bcryptjs
npm install -D @types/bcryptjs
```

- [ ] **Step 2: Buat Login API Route**
Buat file `frontend/app/api/auth/route.ts` (Implementasikan `POST` login yang mencari Admin di database via Prisma, membandingkan hash menggunakan `bcryptjs`, lalu membuat dan menandatangani JWT menggunakan `jose`).

- [ ] **Step 3: Buat Next.js Middleware**
Buat file `frontend/middleware.ts` (Verifikasi JWT menggunakan `jose.jwtVerify` pada request yang mengarah ke `POST/PUT/DELETE` API, dan kembalikan 401 jika tidak valid).

- [ ] **Step 4: Commit task 2**
```bash
git add frontend/app/api/auth frontend/middleware.ts frontend/package.json
git commit -m "feat: implement monolith auth endpoint and jwt middleware"
```

---

### Task 3: Data Routes untuk Kategori & Promo

**Files:**
- Create: `frontend/app/api/categories/route.ts`
- Create: `frontend/app/api/categories/[id]/route.ts`
- Create: `frontend/app/api/promos/route.ts`
- Create: `frontend/app/api/promos/[id]/route.ts`

**Interfaces:**
- Consumes: `prisma` dari `lib/db.ts`.

- [ ] **Step 1: Rute Kategori (Categories)**
Buat `app/api/categories/route.ts` untuk GET semua kategori dan POST kategori baru.
Buat `app/api/categories/[id]/route.ts` untuk PUT dan DELETE.

- [ ] **Step 2: Rute Promo (Promos)**
Buat `app/api/promos/route.ts` untuk GET semua promo dan POST promo baru.
Buat `app/api/promos/[id]/route.ts` untuk PUT dan DELETE.

- [ ] **Step 3: Commit task 3**
```bash
git add frontend/app/api/categories frontend/app/api/promos
git commit -m "feat: migrate categories and promos logic to route handlers"
```

---

### Task 4: Data Routes untuk Produk & Global Timestamp Logic

**Files:**
- Create: `frontend/app/api/products/route.ts`
- Create: `frontend/app/api/products/[id]/route.ts`

**Interfaces:**
- Consumes: `prisma` dari `lib/db.ts`.

- [ ] **Step 1: Rute Produk Utama**
Buat `frontend/app/api/products/route.ts`. 
Tangkap query `limit`, `page`, `category`, `search`, `status`, `sort`.
Lakukan Query Prisma dengan kombinasi `where` kondisi. 
Jangan lupa lakukan sub-query `prisma.product.findFirst({ orderBy: { updated_at: 'desc' }})` untuk mendapatkan waktu pembaruan terakhir.

- [ ] **Step 2: Kembalikan respons yang akurat**
Kembalikan payload JSON berupa `{ data: products, meta: { total_items, page, limit, latest_updated_at } }`. 

- [ ] **Step 3: Rute Produk Detail**
Buat `frontend/app/api/products/[id]/route.ts` untuk PUT, DELETE, dan GET produk by ID.

- [ ] **Step 4: Commit task 4**
```bash
git add frontend/app/api/products
git commit -m "feat: migrate products logic to route handlers with meta update"
```

---

### Task 5: Penyesuaian Frontend Env & Uji Coba

**Files:**
- Modify: `frontend/.env.local`

**Interfaces:**
- Consumes: API URL Env.

- [ ] **Step 1: Hapus URL Absolut**
Ubah nilai `NEXT_PUBLIC_API_URL` di dalam `frontend/.env.local` menjadi `NEXT_PUBLIC_API_URL=` (kosong) atau hapus saja agar *frontend component* langsung mengarah ke URL relatif (misalnya langsung nge-*fetch* ke `/api/products` tanpa *domain prefix*).

- [ ] **Step 2: Commit task 5**
```bash
git add frontend/.env.local
git commit -m "chore: point frontend environment to local relative API"
```
