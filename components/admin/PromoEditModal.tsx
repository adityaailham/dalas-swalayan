import { X } from "lucide-react";
import { useState } from "react";
import { Promo } from "@/types";
import { apiFetch } from "@/lib/fetcher";

interface PromoEditModalProps {
  promo: Promo | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PromoEditModal({ 
  promo, 
  onClose, 
  onSuccess 
}: PromoEditModalProps) {
  const [title, setTitle] = useState(promo?.title || "");
  const [description, setDescription] = useState(promo?.description || "");
  const [startDate, setStartDate] = useState(promo?.start_date?.split("T")[0] || "");
  const [endDate, setEndDate] = useState(promo?.end_date?.split("T")[0] || "");
  const [sortOrder, setSortOrder] = useState(promo?.sort_order || 1);
  const [status, setStatus] = useState(promo?.status || "aktif");
  const [imageUrl, setImageUrl] = useState(promo?.banner_url || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiFetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
      } else {
        alert("Gagal mengunggah gambar promo.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!promo || !title || !startDate || !endDate) {
      alert("Judul dan periode promo wajib diisi!");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await apiFetch(`/api/promos/${promo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          start_date: startDate,
          end_date: endDate,
          banner_url: imageUrl,
          sort_order: parseInt(String(sortOrder), 10),
          status
        })
      });
      if (res.ok) {
        onSuccess();
      } else {
        alert("Gagal mengupdate promo.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!promo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Promo</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col md:flex-row gap-8">
          
          {/* Left: Image Editor */}
          <div className="w-full md:w-5/12 flex flex-col gap-4">
             <h3 className="text-sm font-semibold text-gray-700">Gambar Banner</h3>
             <div className="w-full aspect-4/3 border border-gray-200 rounded-2xl bg-gray-100 flex flex-col items-center justify-center shadow-inner overflow-hidden relative group">
                
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                    <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                  </div>
                )}

                {imageUrl ? (
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover z-10" />
                ) : (
                  <div className="text-center text-gray-400 z-10 p-4">
                     <p className="text-sm font-medium">Belum ada gambar</p>
                  </div>
                )}
                
                {/* Overlay hover buat upload */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                   <p className="text-white text-sm font-bold z-10">Ganti Gambar</p>
                </div>
             </div>
          </div>

          {/* Right: Form Info */}
          <div className="w-full md:w-7/12 flex flex-col space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Judul Promo</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Deskripsi (Opsional)</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Periode Promo</label>
              <div className="flex items-center gap-3">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
                <span className="text-gray-400 font-bold">&rarr;</span>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Urutan</label>
                <input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value as any)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white cursor-pointer">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>
            
            <div className="flex-1 mt-4"></div>
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button onClick={handleUpdate} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-colors disabled:opacity-50">
                {isSubmitting ? "Menyimpan..." : "Update Promo"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
