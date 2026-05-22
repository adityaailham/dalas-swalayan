"use client";

import { Inbox } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import PromosToolbar from "@/components/admin/PromosToolbar";
import Pagination from "@/components/admin/Pagination";

export default function AdminPromosPage() {
  // Array promo kosong sesuai instruksi Empty State
  const promos: any[] = [];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header tidak dapat prop secara statis karena komponen AdminHeader saat ini statis.
          Ideally, AdminHeader can accept props for title and subtitle. 
          For now, I'll update AdminHeader later to support dynamic titles.
          Wait, AdminHeader has hardcoded "Dashboard". Let's wrap it or we need to pass props.
      */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Promo</h1>
        <p className="text-gray-500 mt-1">Kelola semua promo / banner Dalas Swalayan</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden flex flex-col">
        {/* Toolbar Component Khusus Promo */}
        <PromosToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Gambar</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4 text-center">Urutan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {promos.length > 0 ? (
                promos.map((promo, idx) => (
                  <tr key={idx}>
                    {/* Placeholder for future mapping */}
                  </tr>
                ))
              ) : (
                /* Empty State (Daftar Kosong) */
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                        <Inbox className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-gray-900 font-bold mb-1 text-base">Belum Ada Promo</h4>
                      <p className="text-sm">Banner promo yang Anda tambahkan akan muncul di sini.</p>
                      <button className="mt-4 text-orange-600 font-semibold text-sm hover:underline">
                        + Tambah Promo Baru
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination 
          currentPage={1} 
          totalPages={0} 
          totalItems={promos.length} 
          itemsPerPage={4} 
        />
      </div>
    </div>
  );
}
