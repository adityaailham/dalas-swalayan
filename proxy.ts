import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dalas-swalayan-super-secret-key-2026"
);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 1. LOGIKA HALAMAN DASHBOARD (Eks proxy.ts)
  const tokenCookie = request.cookies.get('admin_token')?.value;
  const isLoginPage = pathname === '/login';
  const isLandingPage = pathname === '/';
  const isKatalogPage = pathname.startsWith('/katalog');
  
  // Tolak akses dashboard tanpa token
  if (!tokenCookie && !isLoginPage && !isLandingPage && !isKatalogPage && !pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/login', request.url));
  }
  // Redirect ke dashboard jika sudah login
  if (tokenCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. LOGIKA MUTASI API (API Routes)
  if (
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth") &&
    ["POST", "PUT", "DELETE"].includes(request.method)
  ) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Akses ditolak: Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: "Akses ditolak: Token tidak valid atau kedaluwarsa" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Lindungi semua rute, kecuali aset publik (gambar, css, dsb)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
