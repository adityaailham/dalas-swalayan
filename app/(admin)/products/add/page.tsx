"use client";

import { X, Upload, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/fetcher";

export default function AddProductPage() {
  const router = useRouter();

  // State untuk menampung Data Kategori dari Golang
  const [categories, setCategories] = useState<any[]>([]);

  // State untuk Input Form
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("aktif");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil Data Kategori dari Backend saat halaman dibuka
  // Ini agar Dropdown Kategori isinya sesuai dengan Database
  useEffect(() => {
    fetch(`/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error("Gagal mengambil kategori:", err));
  }, []);

  // Fungsi khusus untuk mengunggah gambar ke server Golang
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file); // Masukkan file fisik ke dalam koper "file"

    try {
      const response = await apiFetch(`/api/upload`, {
        method: "POST",
        body: formData, // Kirim sebagai multipart/form-data
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url); // Simpan "kwitansi" URL dari Golang
      } else {
        alert("Gagal mengunggah gambar. Pastikan ukuran file sesuai.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan sistem saat unggah.");
    } finally {
      setIsUploading(false);
    }
  };

  // Fungsi saat tombol "Simpan Produk" diklik
  const handleSave = async () => {
    if (!name || !categoryId || !price) {
      alert("⚠️ Nama, Kategori, dan Harga wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Tembak API Golang dengan token admin
      const response = await apiFetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          category_id: parseInt(categoryId), // Ubah string ke angka karena Golang meminta uint
          price: parseFloat(price.replace(/\./g, '')), // Hapus titik pemisah sebelum dikirim ke DB
          sku: sku,
          description: description,
          image_url: imageUrl,
          status: status
        })
      });

      if (response.ok) {
        // Kembali ke halaman daftar produk setelah berhasil
        router.push("/products");
      } else {
        alert("❌ Gagal menyimpan produk. Periksa kembali isian form.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama produk" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>

              {/* Kategori yang di-Loop dari Database Golang */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Harga */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Harga</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">Rp</span>
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '');
                      if (!rawValue) return setPrice('');
                      setPrice(parseInt(rawValue, 10).toLocaleString('id-ID'));
                    }}
                    placeholder="Masukkan harga" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">SKU (Opsional)</label>
                <input 
                  type="text" 
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Masukkan SKU produk" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Deskripsi</label>
                <textarea 
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tulis deskripsi produk di sini..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status Produk</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Upload Gambar & Aksi */}
          <div className="flex-1 lg:max-w-md flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Gambar Produk</h2>
            
            {/* Drag Drop Area / Upload Image */}
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-gray-50/50 hover:border-orange-300 transition-colors cursor-pointer group overflow-hidden h-64">
              
              {/* Jika Sedang Upload */}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <span className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></span>
                  <p className="text-sm font-bold text-orange-600">Mengunggah...</p>
                </div>
              )}

              {/* Jika Ada Gambar */}
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.preventDefault(); setImageUrl(""); }}
                      className="bg-white text-red-500 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-red-50 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Hapus Gambar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0"
                  />
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-orange-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Klik untuk memilih gambar</p>
                  <p className="text-xs text-gray-500">Mendukung file JPG, PNG</p>
                </>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1 mt-8"></div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-100 mt-auto">
              <Link href="/products" className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                Batal
              </Link>
              <button 
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
