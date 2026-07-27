import { Search, ArrowUpDown, ChevronDown } from "lucide-react";

interface CategoriesToolbarProps {
  searchKeyword: string;
  sortOrder: string;
  onSearchChange: (keyword: string) => void;
  onSortChange: (sort: string) => void;
}

export default function CategoriesToolbar({
  searchKeyword,
  sortOrder,
  onSearchChange,
  onSortChange
}: CategoriesToolbarProps) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Cari nama kategori..." 
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-5 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 text-sm font-medium transition-all shadow-sm"
        />
      </div>
      
      {/* Sort */}
      <div className="relative w-full md:w-56 group">
        <ArrowUpDown className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        <select 
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 text-sm font-semibold appearance-none cursor-pointer transition-all shadow-sm"
        >
          <option value="asc">Nama (A - Z)</option>
          <option value="desc">Nama (Z - A)</option>
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
      </div>
    </div>
  );
}
