"use client";

import { Plus, Package, Eye, Edit, Trash2, Search, ArrowUpDown, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CategoryPreviewModal from "@/components/admin/CategoryPreviewModal";
import CategoryEditModal from "@/components/admin/CategoryEditModal";
import { Category } from "@/types";
import Pagination from "@/components/admin/Pagination";
import CategoriesToolbar from "@/components/admin/CategoriesToolbar";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function AdminCategoriesPage() {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  
  // State untuk Filter & Sort
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedPreview, setSelectedPreview] = useState<Category | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  let url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  if (searchKeyword) url.searchParams.append("search", searchKeyword);
  if (sortOrder) url.searchParams.append("sort", sortOrder);
  url.searchParams.append("page", currentPage.toString());
  url.searchParams.append("limit", itemsPerPage.toString());

  const { data: rawData, error, isLoading, mutate } = useSWR(url.toString(), fetcher, {
    keepPreviousData: true,
  });

  const categories: Category[] = rawData?.data || [];
  const totalItems = rawData?.meta?.total_items || 0;

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        mutate();
        setDeleteCategory(null);
      } else {
        alert("Gagal menghapus kategori");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentCategories = categories;

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      
      {/* Header Area */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategori</h1>
          <p className="text-gray-500 mt-1">Kelola semua kategori produk</p>
        </div>
        
        {/* Top Right Button */}
        <Link 
          href="/categories/add" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md shadow-orange-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-5 h-5" />
          Tambah Kategori
        </Link>
      </div>

      {/* Toolbar (Pencarian & Filter) */}
      <CategoriesToolbar 
        searchKeyword={searchKeyword}
        sortOrder={sortOrder}
        onSearchChange={(keyword) => {
          setSearchKeyword(keyword);
          setCurrentPage(1);
        }}
        onSortChange={(sort) => {
          setSortOrder(sort);
          setCurrentPage(1);
        }}
      />

      {/* Tampilan Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      ) : categories.length === 0 ? (
        /* Jika Belum Ada Kategori */
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Kategori</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">Anda belum menambahkan kategori apapun. Silakan klik tombol "Tambah Kategori" untuk memulai.</p>
        </div>
      ) : (
        /* Categories Table (Data Asli dari DB) */
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/80 text-gray-700 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 w-16">ID</th>
                  <th className="px-8 py-5">Kategori</th>
                  <th className="px-8 py-5">Deskripsi</th>
                  <th className="px-8 py-5 text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-blue-50/30 transition-colors group">
                    
                    <td className="px-8 py-5 text-gray-400 font-bold text-xs">
                      #{category.id}
                    </td>
                    
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 shadow-sm border border-gray-200/50 group-hover:border-blue-200 transition-colors overflow-hidden">
                          {category.image_url ? (
                            <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <p className="font-extrabold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{category.name}</p>
                      </div>
                    </td>
                    
                    <td className="px-8 py-5">
                      <p className="text-gray-500 font-medium truncate max-w-xs">{category.description || "-"}</p>
                    </td>
                    
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedPreview(category)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 hover:shadow-sm rounded-xl transition-all" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setSelectedEdit(category)} className="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-100 hover:shadow-sm rounded-xl transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteCategory(category)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 hover:shadow-sm rounded-xl transition-all" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                ))}
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
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteCategory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Kategori?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus kategori <b>{deleteCategory.name}</b>? Ini mungkin mempengaruhi produk yang terkait.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteCategory(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 text-sm transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteCategory.id)} className="px-5 py-2.5 rounded-xl bg-red-600 font-bold text-white hover:bg-red-700 shadow-sm shadow-red-500/20 text-sm transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview & Edit Modals */}
      <CategoryPreviewModal category={selectedPreview} onClose={() => setSelectedPreview(null)} />
      {selectedEdit && (
        <CategoryEditModal 
          category={selectedEdit} 
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
