"use client";
import { Home, Package, Grid, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Produk", href: "/products", icon: Package },
  { name: "Kategori", href: "#", icon: Grid },
  { name: "Pengaturan", href: "#", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <Image src="/logo.png" alt="Dalas Swalayan" width={140} height={40} className="w-auto h-12" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive 
                  ? "bg-orange-600 text-white" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Illustration & Logout */}
      <div className="p-6">
        <div className="flex justify-center mb-4">
           {/* Menggunakan dummy illustration */}
           <Image src="/grocery_bag.png" alt="Illustration" width={100} height={100} className="w-24 h-auto opacity-80" />
        </div>
        
        <button className="flex w-full items-center gap-3 text-gray-500 hover:text-red-600 px-4 py-3 rounded-xl font-medium transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        <div className="mt-4 px-4">
          <p className="text-sm font-bold text-gray-900">Dalas Swalayan</p>
          <p className="text-xs text-gray-500">Panel Admin</p>
          <p className="text-[10px] text-gray-400 mt-1">© 2024 Dalas Swalayan</p>
        </div>
      </div>
    </aside>
  );
}
