import { Search, ChevronDown, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PromosToolbarProps {
  onSearch: (keyword: string) => void;
  onFilterStatus: (status: string) => void;
}

export default function PromosToolbar({ onSearch, onFilterStatus }: PromosToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div className="flex-1 max-w-md relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari promo..." 
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Dropdown Status */}
        <div className="relative">
          <select 
            onChange={(e) => onFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
          >
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Tombol Filter */}
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>

        {/* Tombol Tambah Promo */}
        <Link 
          href="/promos/add" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Promo
        </Link>
      </div>
    </div>
  );
}
