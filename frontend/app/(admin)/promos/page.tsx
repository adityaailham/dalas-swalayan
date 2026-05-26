"use client";

import { Inbox, Image as ImageIcon, Edit, Trash2, Eye } from "lucide-react";
import PromosToolbar from "@/components/admin/PromosToolbar";
import Pagination from "@/components/admin/Pagination";
import Link from "next/link";
import { useState } from "react";
import PromoPreviewModal from "@/components/admin/PromoPreviewModal";
import PromoEditModal from "@/components/admin/PromoEditModal";
import { Promo } from "@/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function AdminPromosPage() {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedPreview, setSelectedPreview] = useState<Promo | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<Promo | null>(null);
  const [deletePromo, setDeletePromo] = useState<Promo | null>(null);

  let url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/promos`);
  if (searchKeyword) url.searchParams.append("search", searchKeyword);
  if (selectedStatus) url.searchParams.append("status", selectedStatus);
  url.searchParams.append("page", currentPage.toString());
  url.searchParams.append("limit", itemsPerPage.toString());

  const { data: rawData, error, isLoading, mutate } = useSWR(url.toString(), fetcher, {
    keepPreviousData: true,
  });

  const promos: Promo[] = rawData?.data || [];
  const totalItems = rawData?.meta?.total_items || 0;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promos/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        mutate();
        setDeletePromo(null);
      } else {
        alert("Gagal menghapus promo");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Promo</h1>
        <p className="text-gray-500 mt-1">Kelola semua promo / banner Dalas Swalayan</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col">
        {/* Toolbar Component Khusus Promo */}
        <PromosToolbar 
          onSearch={(keyword) => { setSearchKeyword(keyword); setCurrentPage(1); }}
          onFilterStatus={(status) => { setSelectedStatus(status); setCurrentPage(1); }}
        />

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-700 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">Gambar Banner</th>
                <th className="px-8 py-5">Judul</th>
                <th className="px-8 py-5">Periode</th>
                <th className="px-8 py-5 text-center">Urutan</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                /* ⏳ Tampilan Loading */
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex justify-center items-center">
                      <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : promos.length > 0 ? (
                /* 📦 Baris Data Asli dari MySQL */
                promos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* Gambar Banner */}
                    <td className="px-8 py-5">
                      <div className="w-32 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm border border-gray-200/50 group-hover:border-blue-200 transition-colors">
                        {promo.banner_url ? (
                          <img src={promo.banner_url} alt={promo.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </td>
                    
                    {/* Judul & Deskripsi */}
                    <td className="px-8 py-5">
                      <div className="max-w-[200px]">
                        <p className="font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{promo.title}</p>
                        <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{promo.description || "-"}</p>
                      </div>
                    </td>

                    {/* Periode */}
                    <td className="px-8 py-5">
                      <div className="flex flex-col text-xs gap-1">
                        <span className="text-gray-900 font-medium"><span className="text-gray-400 font-bold inline-block w-10">Mulai:</span> {formatDate(promo.start_date || "")}</span>
                        <span className="text-gray-900 font-medium"><span className="text-gray-400 font-bold inline-block w-10">Akhir:</span> {formatDate(promo.end_date || "")}</span>
                      </div>
                    </td>

                    {/* Urutan */}
                    <td className="px-8 py-5 text-center">
                      <span className="font-bold text-gray-900">{promo.sort_order}</span>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        promo.status === 'aktif' 
                          ? "bg-green-50 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {promo.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedPreview(promo)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 hover:shadow-sm rounded-xl transition-all" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setSelectedEdit(promo)} className="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-100 hover:shadow-sm rounded-xl transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeletePromo(promo)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-100 hover:shadow-sm rounded-xl transition-all" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* 📭 Empty State (Daftar Kosong) */
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                        <Inbox className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-gray-900 font-bold mb-1 text-base">Belum Ada Promo</h4>
                      <p className="text-sm">Banner promo yang Anda tambahkan akan muncul di sini.</p>
                      <Link href="/promos/add" className="mt-4 text-orange-600 font-semibold text-sm hover:underline">
                        + Tambah Promo Baru
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={Math.max(1, Math.ceil(totalItems / itemsPerPage))} 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deletePromo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Promo?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus <b>{deletePromo.title}</b>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeletePromo(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 text-sm transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(deletePromo.id)} className="px-5 py-2.5 rounded-xl bg-red-600 font-bold text-white hover:bg-red-700 shadow-sm shadow-red-500/20 text-sm transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview & Edit Modals */}
      <PromoPreviewModal promo={selectedPreview} onClose={() => setSelectedPreview(null)} />
      {selectedEdit && (
        <PromoEditModal 
          promo={selectedEdit} 
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
