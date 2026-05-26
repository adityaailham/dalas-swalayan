"use client";
import { Home, Package, Grid, Settings, Tag, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Produk", href: "/products", icon: Package },
  { name: "Kategori", href: "/categories", icon: Grid },
  { name: "Promo", href: "/promos", icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 flex justify-center mt-2 mb-2">
        <Image src="/logo.png" alt="Dalas Swalayan" width={200} height={100} className="w-auto h-20 md:h-24 object-contain" priority={true} />
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

        <button onClick={handleLogout} className="flex w-full items-center gap-3 text-gray-500 hover:text-red-600 px-4 py-3 rounded-xl font-medium transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        <div className="mt-4 px-4">
          <p className="text-sm font-bold text-gray-900">Dalas Swalayan</p>
          <p className="text-xs text-gray-500">Panel Admin</p>
          <p className="text-[10px] text-gray-400 mt-1">© 2026 Dalas Swalayan</p>
        </div>
      </div>
    </aside>
  );
}
