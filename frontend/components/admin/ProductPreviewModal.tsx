import { X, Package, Star, Tag, Archive, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";

export default function ProductPreviewModal({ product, onClose }: { product: Product | null, onClose: () => void }) {
  if (!product) return null;

  // Format rupiah helper
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Preview Produk</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col md:flex-row gap-8">
          
          {/* Left: Images */}
          <div className="w-full md:w-5/12 flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-4">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-contain drop-shadow-sm" />
              ) : (
                <Package className="w-16 h-16 text-gray-300" />
              )}
            </div>
            
            {/* Thumbnail Slider (Dummy for now) */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex-1 flex gap-2 overflow-hidden">
                <div className="w-16 h-16 rounded-lg border-2 border-orange-500 bg-gray-50 flex items-center justify-center p-1 shrink-0">
                  {product.image_url ? <img src={product.image_url} className="w-full h-full object-contain" /> : <Package className="w-6 h-6 text-gray-300" />}
                </div>
              </div>

              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 shrink-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-7/12 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{product.name}</h3>
              <span className={`px-3 py-1 rounded-md text-xs font-bold shrink-0 ${product.status === 'aktif' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {product.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">SKU: {product.sku || "-"}</p>
            
            <div className="text-3xl font-extrabold text-orange-600 mb-6">
              {formatRupiah(product.price)}
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Kategori</p>
                <p className="font-semibold text-gray-900">{product.category?.name || "-"}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Deskripsi</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description || "Tidak ada deskripsi untuk produk ini."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
