"use client";

import { X, Upload, Calendar, Info } from "lucide-react";
import Link from "next/link";

export default function AddPromoPage() {
  return (
    <div className="w-full max-w-2xl mx-auto pb-10">
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col mt-4">
        
        {/* Header Area */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Tambah Promo</h1>
          <Link 
            href="/promos" 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          
          {/* Judul Promo */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Judul Promo</label>
            <input 
              type="text" 
              placeholder="Masukkan judul promo" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Deskripsi (Opsional)</label>
            <textarea 
              rows={4}
              placeholder="Masukkan deskripsi promo" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
            />
          </div>

          {/* Gambar Banner */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Gambar Banner</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 hover:border-orange-300 transition-colors cursor-pointer group mb-2">
              <div className="w-14 h-14 bg-gray-400 group-hover:bg-orange-500 rounded-full flex items-center justify-center mb-4 transition-colors">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">Klik untuk upload gambar</p>
              <p className="text-xs text-gray-500">Format: JPG, PNG (Maks. 2MB)</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Info className="w-4 h-4" />
              <span>Untuk hasil terbaik gunakan ukuran 1920 x 600 px</span>
            </div>
          </div>

          {/* Periode Promo */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Periode Promo</label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <label className="block text-[10px] font-bold text-gray-500 absolute left-4 top-2">Tanggal Mulai</label>
                <input 
                  type="text" 
                  placeholder="Pilih tanggal mulai" 
                  className="w-full pl-4 pr-10 pt-6 pb-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium text-gray-900 bg-transparent"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <span className="text-gray-300">-</span>
              <div className="relative flex-1">
                <label className="block text-[10px] font-bold text-gray-500 absolute left-4 top-2">Tanggal Selesai</label>
                <input 
                  type="text" 
                  placeholder="Pilih tanggal selesai" 
                  className="w-full pl-4 pr-10 pt-6 pb-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium text-gray-900 bg-transparent"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Urutan */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Urutan <span className="font-normal text-gray-500">(Semakin kecil angka, semakin di depan)</span>
            </label>
            <input 
              type="number" 
              defaultValue="1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Status</label>
            <div className="relative">
              <select 
                defaultValue="aktif"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-medium bg-white appearance-none cursor-pointer"
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
              <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-100 mt-2">
            <Link 
              href="/promos" 
              className="px-8 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto text-center"
            >
              Batal
            </Link>
            <button className="px-8 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-all w-full sm:w-auto">
              Simpan Promo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Chevron Helper for select
const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
)
