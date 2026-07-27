import { Search, ChevronDown, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ToolbarProps {
  onSearch: (keyword: string) => void;
  onFilterCategory: (categoryId: string) => void;
  onFilterStatus: (status: string) => void;
}

export default function ProductsToolbar({ onSearch, onFilterCategory, onFilterStatus }: ToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  // Mengambil daftar kategori asli dari server saat Toolbar dimuat
  useEffect(() => {
    fetch(`/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error("Gagal memuat kategori:", err));
  }, []);

  // Menggunakan Debounce: Mencegah spam request ke server setiap menekan tombol
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // Tunggu 500ms setelah pengetikan terakhir

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div className="flex-1 max-w-md relative group">
        <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-orange-500 transition-colors" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari produk..." 
          className="w-full pl-12 pr-5 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 transition-all text-sm font-medium shadow-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Dropdown Kategori */}
        <div className="relative group">
          <select 
            onChange={(e) => onFilterCategory(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 text-gray-700 py-3 pl-5 pr-12 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 cursor-pointer transition-all shadow-sm"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
        </div>

        {/* Dropdown Status */}
        <div className="relative hidden md:block group">
          <select 
            onChange={(e) => onFilterStatus(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 text-gray-700 py-3 pl-5 pr-12 rounded-full text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 cursor-pointer transition-all shadow-sm"
          >
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
        </div>

        {/* Tombol Tambah Produk */}
        <Link 
          href="/products/add" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md shadow-orange-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>
    </div>
  );
}
