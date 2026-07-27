"use client";

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname();

  const navLinkClass = (path: string) => {
    const active = path === '/' ? pathname === '/' : pathname?.startsWith(path);
    return active 
      ? "text-orange-500 border-b-2 border-orange-500 pb-1 font-bold" 
      : "text-gray-700 hover:text-orange-500 font-medium transition-colors";
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.png" alt="Dalas Swalayan" width={200} height={80} className="w-auto h-12 md:h-16 object-contain" priority={true} />
        </Link>
      </div>
      
      <div className="hidden md:flex gap-8 items-center text-base">
        <Link href="/" className={navLinkClass("/")}>Beranda</Link>
        <Link href="/#tentang" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Tentang Kami</Link>
        <Link href="/#keunggulan" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Keunggulan</Link>
        <Link href="/#informasi" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Informasi</Link>
        <Link href="/katalog" className={navLinkClass("/katalog")}>Produk</Link>
      </div>

      <Link href="/#informasi">
        <button className="hidden sm:block bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 md:px-6 py-2 rounded-xl md:rounded-full font-medium text-sm md:text-base cursor-pointer shadow-sm">
          Kontak Kami
        </button>
      </Link>
    </nav>
  )
}
