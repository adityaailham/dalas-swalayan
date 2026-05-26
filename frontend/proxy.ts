import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Ambil token dari cookie (bernama 'admin_token')
  const token = request.cookies.get('admin_token')?.value;

  // 2. Cek apakah user sedang berada di halaman public (login atau landing page)
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isLandingPage = request.nextUrl.pathname === '/';
  const isKatalogPage = request.nextUrl.pathname.startsWith('/katalog');

  // 3. Jika TIDAK ada token dan mencoba masuk ke halaman rahasia, lempar ke /login
  if (!token && !isLoginPage && !isLandingPage && !isKatalogPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Jika SUDAH ada token tapi mencoba mengakses halaman login, lempar ke /dashboard
  // (Namun tetap izinkan Admin mengakses Landing Page / untuk preview)
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika kondisi aman, persilakan lewat
  return NextResponse.next();
}

// Tentukan rute mana saja yang akan diproteksi oleh Middleware/Proxy ini
export const config = {
  matcher: [
    /*
     * Awasi semua rute, KECUALI yang diawali dengan:
     * - api (API routes milik Golang dsb)
     * - _next/static (file statis CSS/JS bawaan Next)
     * - _next/image (file optimasi gambar Next)
     * - favicon.ico (ikon browser)
     * - .*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$ (semua file gambar dan video statis di folder /public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
