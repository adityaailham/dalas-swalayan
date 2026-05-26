import { X, Calendar, Megaphone, Tag, Image as ImageIcon } from "lucide-react";
import { Promo } from "@/types";

export default function PromoPreviewModal({ promo, onClose }: { promo: Promo | null, onClose: () => void }) {
  if (!promo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Preview Banner</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-full aspect-21/9 bg-orange-100 rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
            {promo.banner_url ? (
              <img src={promo.banner_url} alt={promo.title} className="w-full h-full object-cover" />
            ) : (
               // Dummy Preview banner
               <div className="text-center w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-orange-400 to-orange-500 rounded-xl px-12">
                 <h3 className="text-white font-black text-4xl tracking-tight mb-3 uppercase leading-tight">{promo.title}</h3>
                 <p className="text-orange-100 font-medium text-lg mb-6 max-w-lg">{promo.description || "Dapatkan penawaran menarik hanya hari ini!"}</p>
                 <div className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl shadow-md text-sm">Belanja Sekarang</div>
               </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-center">
          <button onClick={onClose} className="px-10 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm w-full max-w-[200px]">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
