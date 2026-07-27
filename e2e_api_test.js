const BASE_URL = 'http://localhost:3000/api';
let authToken = '';
let categoryId = null;
let productId = null;
let promoId = null;

async function runTest(name, promise) {
  try {
    process.stdout.write(`\x1b[36m[TEST]\x1b[0m ${name} ... `);
    const result = await promise;
    console.log(`\x1b[32mSUCCESS\x1b[0m`);
    return result;
  } catch (error) {
    console.log(`\x1b[31mFAILED\x1b[0m`);
    console.error(`       => ${error.message}`);
    throw error;
  }
}

async function startAPIe2e() {
  console.log("==========================================");
  console.log("🚀 MEMULAI AUTO API END-TO-END TESTING 🚀");
  console.log("==========================================\n");

  // 1. AUTH LOGIN
  await runTest("Login sebagai admin & dapatkan Token", async () => {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin" })
    });
    if (!res.ok) throw new Error("Gagal login, status HTTP " + res.status);
    const data = await res.json();
    if (!data.token) throw new Error("Token tidak ditemukan di respons");
    authToken = data.token;
  });

  const headersAuth = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`
  };

  // 2. CRUD CATEGORIES
  await runTest("POST /api/categories (Tambah Kategori Test)", async () => {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify({ name: "Kategori Test Auto", description: "Deskripsi kategori" })
    });
    if (!res.ok) throw new Error("Gagal tambah kategori");
    const data = await res.json();
    categoryId = data.data.id;
  });

  await runTest("PUT /api/categories/:id (Update Kategori Test)", async () => {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify({ name: "Kategori Test Auto Diupdate", description: "Deskripsi update" })
    });
    if (!res.ok) throw new Error("Gagal update kategori");
  });

  // 3. CRUD PRODUCTS
  await runTest("POST /api/products (Tambah Produk Test)", async () => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify({ 
        name: "Produk Test Auto", 
        sku: "SKU-AUTO-01", 
        price: 50000, 
        category_id: categoryId,
        status: "aktif"
      })
    });
    if (!res.ok) throw new Error("Gagal tambah produk");
    const data = await res.json();
    productId = data.data.id;
  });

  await runTest("PUT /api/products/:id (Update Harga Produk Test)", async () => {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify({ price: 65000, name: "Produk Test Auto", status: "aktif" })
    });
    if (!res.ok) throw new Error("Gagal update produk");
  });

  await runTest("GET /api/products (View data & check Type Relation)", async () => {
    const res = await fetch(`${BASE_URL}/products?search=Test Auto`);
    if (!res.ok) throw new Error("Gagal memuat list produk");
    const json = await res.json();
    const found = json.data.find(p => p.id == productId);
    if (!found) throw new Error("Produk test yang dibuat tidak ditemukan di list");
    if (!found.CategoryName || found.CategoryName !== "Kategori Test Auto Diupdate") {
      throw new Error(`Relasi kategori gagal. Diharapkan: 'Kategori Test Auto Diupdate', didapat: ${found.CategoryName}`);
    }
  });

  // 4. CRUD PROMOS
  await runTest("POST /api/promos (Tambah Promo Test)", async () => {
    const res = await fetch(`${BASE_URL}/promos`, {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify({ title: "Promo Auto Test", description: "Deskripsi", status: "aktif" })
    });
    if (!res.ok) throw new Error("Gagal tambah promo");
    const data = await res.json();
    promoId = data.data.id;
  });

  // 5. TEARDOWN (DELETE DATA TEST)
  await runTest("DELETE /api/products/:id (Hapus Produk Test)", async () => {
    const res = await fetch(`${BASE_URL}/products/${productId}`, { method: "DELETE", headers: headersAuth });
    if (!res.ok) throw new Error("Gagal hapus produk");
  });

  await runTest("DELETE /api/categories/:id (Hapus Kategori Test)", async () => {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, { method: "DELETE", headers: headersAuth });
    if (!res.ok) throw new Error("Gagal hapus kategori");
  });

  await runTest("DELETE /api/promos/:id (Hapus Promo Test)", async () => {
    const res = await fetch(`${BASE_URL}/promos/${promoId}`, { method: "DELETE", headers: headersAuth });
    if (!res.ok) throw new Error("Gagal hapus promo");
  });

  // 6. UJI KEAMANAN (PROXY INTERCEPTOR)
  await runTest("TEST KEAMANAN: Coba ubah data (POST) tanpa JWT Token", async () => {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Hacker Kategori" })
    });
    if (res.ok) throw new Error("Sistem BOCOR! Seharusnya menolak request tanpa token!");
    if (res.status !== 401) throw new Error(`Status tidak tepat, diharapkan 401, dapat ${res.status}`);
  });

  console.log("\n==========================================");
  console.log("🎉 SEMUA TEST BERHASIL DENGAN SEMPURNA! 🎉");
  console.log("==========================================");
}

startAPIe2e().catch(() => process.exit(1));
