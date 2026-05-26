"use client";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PromoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promos`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          // Hanya ambil promo yang aktif
          const activePromos = data.data.filter((p: any) => p.status === 'aktif');
          setPromos(activePromos);
        }
      })
      .catch(err => console.error("Error fetching promos:", err));
  }, []);

  const bgGradients = [
    "bg-gradient-to-br from-orange-400 to-orange-500",
    "bg-gradient-to-br from-green-500 to-green-600",
    "bg-gradient-to-br from-red-500 to-red-600",
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-amber-500 to-amber-600"
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstCard = container.firstElementChild as HTMLElement;

      if (!firstCard) return;

      // Menghitung lebar 1 banner beserta jarak (gap) di sebelahnya
      const style = window.getComputedStyle(container);
      const gap = parseInt(style.gap) || 0;
      const scrollAmount = firstCard.offsetWidth + gap;

      // Batas maksimal scroll
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === "right") {
        if (container.scrollLeft >= maxScroll - 10) {
          // Jika mentok kanan, kembali mulus ke awal
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (container.scrollLeft <= 10) {
          // Jika mentok kiri, loncat ke paling akhir
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  // Efek Auto-Slide
  useEffect(() => {
    // Jika user meletakkan mouse di area promo, auto-slide dihentikan sementara (jeda)
    if (isHovered) return;

    const intervalId = setInterval(() => {
      scroll("right");
    }, 3500); // Bergeser tiap 3.5 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen dibongkar atau di-hover
  }, [isHovered]);

  // Jangan render seksi promo jika tidak ada promo yang aktif
  if (promos.length === 0) return null;

  return (
    <section
      className="w-full max-w-7xl mx-auto px-8 md:px-16 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} // Pause juga saat disentuh di HP
      onTouchEnd={() => {
        // Lanjutkan setelah 2 detik lepas sentuhan
        setTimeout(() => setIsHovered(false), 2000);
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Promo Spesial untuk Anda
        </h2>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-orange-500 font-semibold items-center gap-1 hover:text-orange-600 transition-colors">
            Lihat Semua Promo <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all bg-white shadow-sm active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all bg-white shadow-sm active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {promos.map((promo, idx) => (
          <div
            key={promo.id}
            className={`shrink-0 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start rounded-[2rem] ${bgGradients[idx % bgGradients.length]} p-8 text-white relative overflow-hidden min-h-[240px] flex flex-col justify-center shadow-lg shadow-gray-200/50 border border-white/20 transition-transform duration-300 hover:scale-[1.02] cursor-pointer group`}
          >
            {/* Teks Promo */}
            <div className="relative z-10 w-[65%]">
              <span className="text-xs font-bold tracking-wider opacity-90 uppercase">
                SPESIAL UNTUKMU
              </span>
              <h3 className="text-3xl lg:text-4xl font-extrabold mt-1 mb-2 leading-[1.1] capitalize">
                {promo.title}
              </h3>
              <p className="text-sm opacity-90 mb-6 line-clamp-2">{promo.description}</p>
              <button className="bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm">
                Lihat Promo
              </button>
            </div>

            {/* Gambar Produk */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full p-4 pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-end md:justify-center">
              {promo.banner_url ? (
                <img
                  src={promo.banner_url}
                  alt={promo.title}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-xl border-4 border-white/10"
                />
              ) : (
                <Image src="/grocery_bag.png" alt="Promo" fill className="object-contain object-center drop-shadow-2xl opacity-50 p-6" />
              )}
            </div>

            {/* Dekorasi Aksen */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:bg-white/30 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      {/* Mobile Lihat Semua */}
      <div className="flex md:hidden justify-center mt-2">
        <button className="text-orange-500 font-semibold flex items-center gap-1 hover:text-orange-600 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
