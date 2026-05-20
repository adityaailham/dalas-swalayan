import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Dalas Swalayan" width={150} height={40} className="w-auto h-10" />
      </div>
      
      <div className="hidden md:flex gap-8 items-center text-base font-medium">
        <Link href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">Beranda</Link>
        <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Tentang Kami</Link>
        <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Produk</Link>
        <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Keunggulan</Link>
        <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Informasi</Link>
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 py-2 rounded-md md:rounded-full font-medium text-base">
        Kontak Kami
      </button>
    </nav>
  )
}
