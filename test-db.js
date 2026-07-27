const mariadb = require('mariadb');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' }); // Load .env fallback

async function testConnection() {
  const connectionString = process.env.DATABASE_URL || "mysql://root:@127.0.0.1:3306/dalas_swalayan";
  const url = new URL(connectionString);
  
  const config = {
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: url.password || undefined,
    database: url.pathname.substring(1),
    connectTimeout: 5000 // 5 detik saja agar tidak nunggu lama
  };
  
  console.log("Mencoba koneksi dengan config:", JSON.stringify({...config, password: config.password ? "***" : "KOSONG"}));

  let pool;
  try {
    pool = mariadb.createPool(config);
    const conn = await pool.getConnection();
    console.log("✅ BERHASIL TERHUBUNG KE DATABASE");
    const rows = await conn.query("SELECT 1 as val");
    console.log("✅ TEST QUERY BERHASIL:", rows);
    conn.release();
  } catch (err) {
    console.error("❌ GAGAL TERHUBUNG:", err.message);
    console.error(err);
  } finally {
    if (pool) pool.end();
  }
}

testConnection();
