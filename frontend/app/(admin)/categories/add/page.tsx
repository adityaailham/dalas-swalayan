"use client";

import { X, ShoppingBag, Milk, Cookie, Droplet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddCategoryPage() {
  const [selectedIcon, setSelectedIcon] = useState<number>(0);

  const icons = [
    { id: 0, icon: ShoppingBag },
    { id: 1, icon: Milk },
    { id: 2, icon: Cookie },
    { id: 3, icon: Droplet },
  ];

  return (
    <div className="w-full max-w-xl mx-auto pb-10">
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col mt-4">
        
        {/* Header Area */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Tambah Kategori</h1>
          <Link 
            href="/categories" 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          
          {/* Nama Kategori */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Nama Kategori</label>
            <input 
              type="text" 
              placeholder="Masukkan nama kategori" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Deskripsi (Opsional)</label>
            <textarea 
              rows={4}
              placeholder="Masukkan deskripsi kategori" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Icon</label>
            <div className="flex gap-4">
              {icons.map((item) => {
                const IconComponent = item.icon;
                const isActive = selectedIcon === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIcon(item.id)}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                      isActive 
                        ? "border-orange-500 bg-orange-50/50 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]" 
                        : "border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-7 h-7" strokeWidth={isActive ? 2 : 1.5} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-100 mt-2">
            <Link 
              href="/categories" 
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto text-center"
            >
              Batal
            </Link>
            <button className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-all w-full sm:w-auto">
              Simpan Kategori
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
