"use client";

import { Plus, Package, Milk, Cookie, Droplet, Home, Snowflake } from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminCategoriesPage() {
  // Dummy data for categories based on the design
  const categories = [
    { name: "Sembako", count: "24 Produk", icon: Package },
    { name: "Minuman", count: "18 Produk", icon: Milk },
    { name: "Snack", count: "35 Produk", icon: Cookie },
    { name: "Perawatan", count: "22 Produk", icon: Droplet },
    { name: "Rumah Tangga", count: "28 Produk", icon: Home },
    { name: "Frozen Food", count: "15 Produk", icon: Snowflake },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      
      {/* Custom Header for Categories (different from AdminHeader since it has a button inside the header area in design) */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategori</h1>
          <p className="text-gray-500 mt-1">Kelola semua kategori produk</p>
        </div>
        
        {/* Top Right Button */}
        <Link 
          href="/categories/add" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 p-8 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Circular Icon with Orange background */}
              <div className="w-20 h-20 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-6 transition-colors">
                <Icon className="w-10 h-10 text-orange-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm font-medium text-gray-500">{category.count}</p>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
