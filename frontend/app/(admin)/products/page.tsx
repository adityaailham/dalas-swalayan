"use client";

import { Inbox } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsToolbar from "@/components/admin/ProductsToolbar";
import Pagination from "@/components/admin/Pagination";

export default function AdminProductsPage() {
  // Array produk kosong sesuai instruksi
  const products: any[] = [];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <AdminHeader />

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden flex flex-col">
        {/* Toolbar Component */}
        <ProductsToolbar />

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <tr key={idx}>
                    {/* Placeholder for future mapping */}
                  </tr>
                ))
              ) : (
                /* Empty State (Daftar Kosong) */
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                        <Inbox className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-gray-900 font-bold mb-1 text-base">Belum Ada Produk</h4>
                      <p className="text-sm">Produk yang Anda tambahkan akan muncul di sini.</p>
                      <button className="mt-4 text-orange-600 font-semibold text-sm hover:underline">
                        + Tambah Produk Baru
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
          totalItems={products.length} 
          itemsPerPage={7} 
        />
      </div>
    </div>
  );
}
