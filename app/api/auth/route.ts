import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Secret JWT (harus dijaga kuat)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dalas-swalayan-super-secret-key-2026");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi!" },
        { status: 400 }
      );
    }

    // 1. Cari Admin
    const admin = await prisma.admins.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Kredensial salah. Username tidak ditemukan." },
        { status: 401 }
      );
    }

    // 2. Verifikasi Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Kredensial salah. Password tidak valid." },
        { status: 401 }
      );
    }

    // 3. Buat Token Menggunakan Jose (Kompatibel dengan Next.js Edge Runtime)
    const token = await new SignJWT({ username: admin.username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    return NextResponse.json({
      message: "Login berhasil!",
      token: token,
    });
  } catch (error: any) {
    console.error("Auth Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses autentikasi" },
      { status: 500 }
    );
  }
}
