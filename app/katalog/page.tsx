"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useEffect, useState } from "react";
import { Search, Package, ArrowUpDown, ChevronDown, Clock, ShoppingBag, Plus } from "lucide-react";
import CartDrawer, { CartItem } from "@/components/landing/CartDrawer";
import ProductPreviewPublicModal from "@/components/landing/ProductPreviewPublicModal";

export default function KatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // State Paginasi
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [globalLatestUpdate, setGlobalLatestUpdate] = useState<string | null>(null);

  // State Perkiraan Belanja (Simulated Cart)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State Modal Preview Produk
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Load keranjang dari localStorage dengan aturan Auto-Reset 24 Jam
  useEffect(() => {
    const savedCart = localStorage.getItem("dalas_simulated_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Cek apakah struktur berupa { items: [...], timestamp: number }
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.timestamp && Array.isArray(parsed.items)) {
          const now = Date.now();
          const diffHours = (now - parsed.timestamp) / (1000 * 60 * 60);
          if (diffHours > 24) {
            // Sudah lebih dari 24 jam -> Auto Reset agar harga tidak basi
            localStorage.removeItem("dalas_simulated_cart");
            setCartItems([]);
          } else {
            setCartItems(parsed.items);
          }
        } else if (Array.isArray(parsed)) {
          // Kompatibilitas untuk format lama (langsung array) -> beri timestamp baru
          setCartItems(parsed);
        }
      } catch (err) {
        console.error("Gagal membaca storage keranjang:", err);
      }
    }
  }, []);

  // Simpan ke localStorage setiap kali keranjang berubah beserta timestamp interaksi terakhir
  useEffect(() => {
    if (cartItems.length > 0) {
      const payload = {
        items: cartItems,
        timestamp: Date.now(),
      };
      localStorage.setItem("dalas_simulated_cart", JSON.stringify(payload));
    } else {
      localStorage.removeItem("dalas_simulated_cart");
    }
  }, [cartItems]);

  // Jika filter/kategori diganti, reset ke halaman 1
  useEffect(() => {
    setPage(1);
  }, [searchKeyword, selectedCategory, sortOrder]);

  useEffect(() => {
    // Fetch Kategori Aktif
    fetch(`/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.data) setCategories(data.data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let url = new URL(`/api/products`, window.location.origin);
    if (searchKeyword) url.searchParams.append("search", searchKeyword);
    if (selectedCategory) url.searchParams.append("category", selectedCategory);
    if (sortOrder) url.searchParams.append("sort", sortOrder);
    url.searchParams.append("status", "aktif"); // Khusus Katalog Publik, Hanya Aktif
    url.searchParams.append("limit", "12"); // 12 item per halaman (kelipatan 4, 3, 2 untuk grid)
    url.searchParams.append("page", page.toString());

    // Debounce manual di effect
    const timer = setTimeout(() => {
      fetch(url.toString())
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setProducts(data.data);
            if (data.meta) {
              setTotalPages(Math.ceil(data.meta.total_items / data.meta.limit) || 1);
              if (data.meta.latest_updated_at) {
                setGlobalLatestUpdate(data.meta.latest_updated_at);
              }
            }
          } else {
            setProducts([]);
            setTotalPages(1);
          }
        })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword, selectedCategory, sortOrder, page]);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // Fungsi Tambah ke Perkiraan Belanja
  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Fungsi Update Qty
  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Fungsi Hapus Item dari Keranjang
  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Fungsi Kosongkan Keranjang
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Format waktu perbaruan terakhir secara global dari database backend
  const formatGlobalUpdateDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const latestUpdateStr = formatGlobalUpdateDate(globalLatestUpdate);

  return (
    <>
      {/* Kontainer Utama E-Katalog (Sembunyi saat Mode Cetak / Print) */}
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 print:hidden overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        
        <main className="grow w-full max-w-7xl mx-auto px-6 md:px-16 py-12">
          
          {/* Header Title */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Katalog <span className="text-orange-500">Produk</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Temukan berbagai macam kebutuhan sehari-hari Anda dengan harga terbaik dan kualitas terjamin dari Dalas Swalayan.
            </p>
          </div>

          {/* Global Last Updated Info Banner */}
          {latestUpdateStr && (
            <div className="flex justify-center mb-10 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full shadow-sm border border-orange-100 text-xs md:text-sm text-gray-700 font-medium">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                <span>
                  Harga & Katalog Terakhir Diperbarui: <strong className="font-extrabold text-gray-900">{latestUpdateStr}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Toolbar Pencarian & Filter */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-10 flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Cari produk impian Anda..." 
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-13 pr-5 py-3.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 text-sm font-medium transition-all shadow-sm"
              />
            </div>

            {/* Filter Kategori */}
            <div className="relative w-full md:w-60 group">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-6 pr-12 py-3.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 text-sm font-semibold appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
            </div>
            
            {/* Sort */}
            <div className="relative w-full md:w-56 group">
              <ArrowUpDown className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 text-sm font-semibold appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="asc">Nama (A - Z)</option>
                <option value="desc">Nama (Z - A)</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 group flex flex-col h-full cursor-pointer animate-in fade-in zoom-in fill-mode-both relative overflow-hidden" 
                  style={{ animationDelay: `${Math.random() * 150}ms` }}
                >
                  {/* Image Placeholder/Real Image */}
                  <div className="w-full h-44 bg-gray-50 rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <Package className="w-10 h-10 text-gray-300" />
                    )}
                    {/* Badge Category */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-700 shadow-sm border border-white">
                      {product.category?.name || "Umum"}
                    </div>
                  </div>
                  
                  {/* Detail */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">{product.name}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 gap-2">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Harga Satuan</p>
                        <p className="font-black text-orange-600 text-base md:text-lg tracking-tight">{formatRupiah(product.price)}</p>
                      </div>

                      {/* Tombol Cepat Tambah Perkiraan */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                          // Efek animasi mental / bounce saat di-klik
                          const btn = e.currentTarget;
                          btn.classList.add('scale-75', 'bg-orange-600', 'text-white', 'rotate-12');
                          setTimeout(() => btn.classList.remove('scale-75', 'bg-orange-600', 'text-white', 'rotate-12'), 200);
                        }}
                        className="w-10 h-10 rounded-2xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group/btn relative overflow-hidden"
                        title="+ Tambah ke Perkiraan"
                      >
                        <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300 relative z-10" />
                        <div className="absolute inset-0 bg-orange-600 opacity-0 group-active/btn:opacity-20 transition-opacity"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl py-24 px-6 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-gray-500 max-w-md">Maaf, kami tidak dapat menemukan produk yang sesuai dengan kriteria pencarian atau filter Anda saat ini. Silakan coba kata kunci lain.</p>
            </div>
          )}

          {/* Kontrol Paginasi */}
          {!isLoading && products.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Sebelumnya
              </button>
              
              <div className="flex items-center gap-1.5 px-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                      page === pageNum 
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Selanjutnya
              </button>
            </div>
          )}

        </main>

        {/* Modal Preview Produk Detail (Sembunyi juga saat cetak) */}
        <ProductPreviewPublicModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
        
        <Footer />
      </div>

      {/* Cart Drawer berada DI LUAR kontainer print:hidden, sehingga saat dicetak HANYA struk belanja dari CartDrawer yang muncul di kertas/PDF */}
      <CartDrawer
        items={cartItems}
        isOpen={isCartOpen}
        onOpen={() => setIsCartOpen(true)}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </>
  );
}
