import Image from "next/image";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white pt-16 pb-8 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white p-3 rounded-lg inline-block mb-4 shadow-sm">
            <Image src="/logo.png" alt="Dalas Swalayan" width={150} height={40} className="w-auto h-8" />
          </div>
          <p className="text-orange-50 text-sm max-w-sm mt-4 leading-relaxed">
            Dalas Swalayan berkomitmen menjadi swalayan pilihan utama masyarakat dengan produk berkualitas dan pelayanan terbaik.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="bg-orange-600 p-2 rounded-full hover:bg-orange-400 transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" className="bg-orange-600 p-2 rounded-full hover:bg-orange-400 transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" className="bg-orange-600 p-2 rounded-full hover:bg-orange-400 transition-colors">
              <TwitterIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-bold text-lg mb-4">Menu</h4>
          <ul className="flex flex-col gap-3 text-sm text-orange-100">
            <li><Link href="#" className="hover:text-white hover:underline transition-all">Beranda</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline transition-all">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline transition-all">Produk</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline transition-all">Keunggulan</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline transition-all">Informasi</Link></li>
          </ul>
        </div>

        {/* Jam Operasional */}
        <div>
          <h4 className="font-bold text-lg mb-4">Jam Operasional</h4>
          <ul className="flex flex-col gap-2 text-sm text-orange-100">
            <li className="font-semibold text-white">Setiap Hari</li>
            <li>08.00 - 22.00 WIB</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-orange-400/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-orange-200">
        <p>&copy; 2026 Dalas Swalayan. All rights reserved.</p>
      </div>
    </footer>
  );
}
