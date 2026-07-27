import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Category } from "@/types";
import { apiFetch } from "@/lib/fetcher";

interface EditModalProps {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryEditModal({ category, onClose, onSuccess }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    image_url: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const response = await apiFetch(`/api/upload`, {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, image_url: result.url });
      } else {
        alert("Gagal upload gambar kategori.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sistem.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        icon: "Package", // Menggunakan default karena icon tidak disimpan di DB
        image_url: category.image_url || ""
      });
    }
  }, [category]);

  if (!category) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiFetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert("Gagal memperbarui kategori.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Kategori</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form (Scrollable body) */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kategori</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Kategori</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload Gambar Banner</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-orange-300 transition-colors cursor-pointer group overflow-hidden h-24">
                
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <span className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                  </div>
                )}

                {formData.image_url ? (
                  <>
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.preventDefault(); setFormData({...formData, image_url: ""}); }}
                        className="bg-white text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0"
                    />
                    <p className="text-sm font-bold text-gray-500">Klik untuk upload gambar</p>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 font-bold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-white font-bold bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm shadow-orange-500/20 transition-all text-sm disabled:opacity-50 flex items-center justify-center min-w-[100px]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : "Simpan"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
