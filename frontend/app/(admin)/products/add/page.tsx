"use client";

import { X, Upload, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AddProductPage() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col mt-4">
        
        {/* Header Area */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Tambah Produk</h1>
          <Link 
            href="/products" 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Content Area (2 Columns layout on large screens) */}
        <div className="flex flex-col lg:flex-row p-6 gap-8">
          
          {/* Left Column: Form Info Produk */}
          <div className="flex-1 space-y-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Informasi Produk</h2>
            
            <div className="space-y-4">
              {/* Nama Produk */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Produk</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama produk" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                <select 
                  defaultValue=""
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Pilih kategori</option>
                  <option value="sembako">Sembako</option>
                  <option value="minuman">Minuman</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              {/* Harga & Stok (Grid) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Harga</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">Rp</span>
                    <input 
                      type="number" 
                      placeholder="Masukkan harga" 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stok</label>
                  <input 
                    type="number" 
                    placeholder="Masukkan stok" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">SKU (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="Masukkan SKU produk" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>

              {/* Deskripsi Area Biasa */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Deskripsi</label>
                <textarea 
                  rows={5}
                  placeholder="Tulis deskripsi produk di sini..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Upload Gambar & Aksi */}
          <div className="flex-1 lg:max-w-md flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Gambar Produk</h2>
            
            {/* Drag Drop Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 hover:border-orange-300 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-orange-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">Klik untuk upload gambar</p>
              <p className="text-xs text-gray-500">atau seret dan lepas file di sini</p>
              <p className="text-[10px] text-gray-400 mt-3">PNG, JPG, JPEG (Max. 2MB)</p>
            </div>

            {/* Preview Thumbnails (Dummy Data based on design) */}
            <div className="grid grid-cols-4 gap-3 mt-6">
              {[
                "/cat_sembako.png", 
                "/cat_snack.png", 
                "/cat_minuman.png"
              ].map((img, i) => (
                <div key={i} className="relative group rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
                  <Image src={img} alt="preview" width={60} height={60} className="object-contain" />
                  <button className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full text-red-500 hover:text-red-600 shadow-sm">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Spacer for pushing buttons to bottom if needed */}
            <div className="flex-1 mt-8"></div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-100 mt-auto">
              <Link href="/products" className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                Batal
              </Link>
              <button className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-all">
                Simpan Produk
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
