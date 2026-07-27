"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/fetcher";

export default function AddCategoryPage() {
  const router = useRouter();
  
  // State untuk form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        alert("Gagal upload gambar kategori.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sistem.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("⚠️ Nama Kategori tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🚀 KIRIM DATA KE BACKEND GOLANG
      const response = await apiFetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          image_url: imageUrl
        }),
      });

      if (response.ok) {
        // Jika sukses, kembali ke halaman Kategori
        router.push("/categories");
      } else {
        alert("❌ Gagal menyimpan kategori.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kategori (contoh: Snack)" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Deskripsi (Opsional)</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi kategori" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
            />
          </div>

          {/* Gambar Banner Kategori */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Upload Gambar Banner (Opsional)</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-orange-300 transition-colors cursor-pointer group overflow-hidden h-32">
              
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                </div>
              )}

              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview Kategori" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.preventDefault(); setImageUrl(""); }}
                      className="bg-white text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-red-50"
                    >
                      Hapus Gambar
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
                  <p className="text-sm font-bold text-gray-900">Klik untuk upload gambar</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG (Digunakan untuk banner depan)</p>
                </>
              )}
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
            <button 
              onClick={handleSave}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
