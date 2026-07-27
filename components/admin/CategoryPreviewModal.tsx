import { X, Package, FileText, CheckCircle2, Clock } from "lucide-react";
import { Category } from "@/types";

export default function CategoryPreviewModal({ category, onClose }: { category: Category | null, onClose: () => void }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Detail Kategori</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center justify-center text-center">
          
          {category.image_url ? (
            <div className="w-full h-40 rounded-xl mb-6 overflow-hidden border border-gray-100 shadow-sm relative">
               <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          ) : (
            <div className="w-full h-40 rounded-xl mb-6 border border-gray-100 bg-gray-50 flex items-center justify-center shadow-sm">
               <div className="flex flex-col items-center text-gray-400">
                  <Package className="w-12 h-12 mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-semibold">Tidak Ada Gambar</span>
               </div>
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
          <p className="text-gray-500">{category.description || "Tidak ada deskripsi."}</p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm shadow-sm hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
