const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admins.findMany();
  console.log("Daftar Admin di Database:", admins.map(a => ({
    id: a.id.toString(),
    username: a.username,
    password: a.password
  })));
  
  if (admins.length > 0) {
    const bcrypt = require('bcryptjs');
    console.log("Mencoba validasi password 'admin' terhadap admin pertama...");
    const isValid = await bcrypt.compare('admin', admins[0].password);
    console.log("Apakah password 'admin' cocok?", isValid);
  } else {
    console.log("TABEL ADMIN KOSONG! Tolong tambahkan satu admin.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
