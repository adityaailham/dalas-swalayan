import { X, Upload } from "lucide-react";
import { useState } from "react";
import { Product, Category } from "@/types";
import { apiFetch } from "@/lib/fetcher";

interface EditModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductEditModal({ 
  product, 
  categories,
  onClose, 
  onSuccess 
}: EditModalProps) {
  const [name, setName] = useState(product?.name || "");
  const [categoryId, setCategoryId] = useState(product?.category_id || "");
  const [price, setPrice] = useState(product?.price ? product.price.toLocaleString('id-ID') : "");
  const [sku, setSku] = useState(product?.sku || "");
  const [description, setDescription] = useState(product?.description || "");
  const [status, setStatus] = useState(product?.status || "aktif");
  const [imageUrl, setImageUrl] = useState(product?.image_url || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
      } else {
        alert("Gagal upload gambar produk.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sistem.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!product || !name || !categoryId || !price) {
      alert("Nama, Kategori, dan Harga wajib diisi!");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category_id: Number(categoryId),
          price: parseFloat(String(price).replace(/\./g, '')),
          sku,
          description,
          status,
          image_url: imageUrl
        })
      });
      if (res.ok) {
        onSuccess();
      } else {
        alert("Gagal mengupdate produk.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Produk</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          
          {/* Left Form */}
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Informasi Produk</h3>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Produk</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white cursor-pointer">
                  <option value="" disabled>Pilih</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Harga</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                  <input type="text" value={price} onChange={e => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, '');
                    if (!rawValue) return setPrice('');
                    setPrice(parseInt(rawValue, 10).toLocaleString('id-ID'));
                  }} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">SKU (Opsional)</label>
                <input type="text" value={sku} onChange={e => setSku(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white cursor-pointer">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Deskripsi</label>
              <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm resize-none" />
            </div>
          </div>

          {/* Right Media */}
          <div className="flex-1 lg:max-w-md flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Gambar Produk</h3>
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-gray-50/50 hover:border-orange-300 transition-colors cursor-pointer overflow-hidden min-h-[200px]">
              
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
              )}

              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="Preview Produk" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.preventDefault(); setImageUrl(""); }}
                      className="bg-white text-red-500 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-red-50 transition-colors"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col items-center w-full h-full justify-center">
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm font-bold text-gray-900">Upload Gambar</p>
                  <p className="text-xs text-gray-500 mb-4">Format: JPG, PNG (Maks 2MB)</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1 mt-8"></div>
            
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button onClick={handleUpdate} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-sm shadow-orange-500/20 transition-colors disabled:opacity-50">
                {isSubmitting ? "Menyimpan..." : "Update Produk"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
