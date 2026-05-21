import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationProps) {
  // Hitung rentang item yang sedang ditampilkan
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-500">
        Menampilkan <span className="font-semibold text-gray-900">{startItem} - {endItem}</span> dari <span className="font-semibold text-gray-900">{totalItems}</span> produk
      </p>
      
      <div className="flex gap-1">
        <button 
          disabled={currentPage <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {/* Render nomor halaman (statis sementara untuk struktur UI) */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-600 text-white font-medium text-sm">
          {currentPage}
        </button>
        
        <button 
          disabled={currentPage >= totalPages || totalPages === 0}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
