"use client";

import { Inbox, Package, Edit, Trash2, Eye } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductsToolbar from "@/components/admin/ProductsToolbar";
import Pagination from "@/components/admin/Pagination";
import Link from "next/link";
import { useState } from "react";
import ProductPreviewModal from "@/components/admin/ProductPreviewModal";
import ProductEditModal from "@/components/admin/ProductEditModal";
import { Product } from "@/types";
import useSWR from "swr";
import { fetcher, apiFetch } from "@/lib/fetcher";

export default function AdminProductsPage() {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<Product | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<Product | null>(null);

  // Bangun URL dengan parameter aktif
  let url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (searchKeyword) url.searchParams.append("search", searchKeyword);
  if (selectedCategory) url.searchParams.append("category", selectedCategory);
  if (selectedStatus) url.searchParams.append("status", selectedStatus);
  url.searchParams.append("page", currentPage.toString());
  url.searchParams.append("limit", itemsPerPage.toString());

  // Injeksi SWR Engine
  const { data: rawData, error, isLoading, mutate } = useSWR(url.toString(), fetcher, {
    keepPreviousData: true, // Mencegah kedip saat ganti halaman
  });

  // Fetch Kategori untuk Modal Edit
  const { data: catData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, fetcher);
  const categoriesList = catData?.data || [];

  const products: Product[] = rawData?.data || [];
  const totalItems = rawData?.meta?.total_items || 0;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(number);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        mutate(); // Re-fetch data instan tanpa refresh browser
        setDeleteProduct(null);
      } else {
        alert("Gagal menghapus produk");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentProducts = products;

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <AdminHeader />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Daftar Produk</h1>
        <p className="text-gray-500 mt-1">Kelola semua inventaris produk Dalas Swalayan</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col">
        {/* Toolbar (Pencarian & Filter) */}
        <ProductsToolbar 
          onSearch={(keyword) => { setSearchKeyword(keyword); setCurrentPage(1); }} 
          onFilterCategory={(catId) => { setSelectedCategory(catId); setCurrentPage(1); }}
          onFilterStatus={(status) => { setSelectedStatus(status); setCurrentPage(1); }}
        />

        {/* Tabel Data */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-700 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">Produk</th>
                <th className="px-8 py-5">Kategori</th>
                <th className="px-8 py-5">Harga</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                /* ⏳ Tampilan Loading */
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex justify-center items-center">
                      <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                /* 📦 Baris Data Asli dari MySQL */
                currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* Info Utama Produk */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 shadow-sm border border-gray-200/50 group-hover:border-blue-200 transition-colors overflow-hidden">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sku || "Tanpa SKU"}</p>
                        </div>
                      </div>
                    </td>
                    
                    {/* Nama Kategori */}
                    <td className="px-8 py-5">
                      <span className="text-gray-600 font-medium">{product.category.name}</span>
                    </td>

                    {/* Harga */}
                    <td className="px-8 py-5">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{formatRupiah(product.price)}</span>
                    </td>

                    {/* Status (Badge) */}
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        product.status === 'aktif' 
                          ? "bg-green-50 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {product.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>

                    {/* Tombol Aksi */}
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedPreview(product)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 hover:shadow-sm rounded-xl transition-all" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setSelectedEdit(product)} className="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-100 hover:shadow-sm rounded-xl transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteProduct(product)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 hover:shadow-sm rounded-xl transition-all" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* 📭 Empty State */
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                        <Inbox className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-gray-900 font-bold mb-1 text-base">Belum Ada Produk</h4>
                      <p className="text-sm">Produk yang Anda tambahkan akan muncul di sini.</p>
                      <Link href="/products/add" className="mt-4 text-orange-600 font-semibold text-sm hover:underline">
                        + Tambah Produk Baru
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Produk?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus <b>{deleteProduct.name}</b>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteProduct(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 text-sm transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteProduct.id)} className="px-5 py-2.5 rounded-xl bg-red-600 font-bold text-white hover:bg-red-700 shadow-sm shadow-red-500/20 text-sm transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview & Edit Modals */}
      <ProductPreviewModal product={selectedPreview} onClose={() => setSelectedPreview(null)} />
      {selectedEdit && (
        <ProductEditModal 
          product={selectedEdit} 
          categories={categoriesList}
          onClose={() => setSelectedEdit(null)} 
          onSuccess={() => {
            mutate();
            setSelectedEdit(null);
          }} 
        />
      )}
    </div>
  );
}
