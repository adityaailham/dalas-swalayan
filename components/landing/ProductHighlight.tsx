import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Coffee, Cookie, Droplets, Home, Snowflake } from "lucide-react";

export default function ProductHighlight() {
  const categories = [
    {
      title: "Sembako",
      description: "Kebutuhan pokok sehari-hari",
      icon: <ShoppingBag className="w-6 h-6 text-orange-500" />,
      image: "/cat_sembako.png"
    },
    {
      title: "Minuman",
      description: "Aneka minuman segar dan berkualitas",
      icon: <Coffee className="w-6 h-6 text-orange-500" />,
      image: "/cat_minuman.png"
    },
    {
      title: "Snack",
      description: "Cemilan enak untuk semua suasana",
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      image: "/cat_snack.png"
    },
    {
      title: "Perawatan",
      description: "Produk perawatan diri dan kebersihan",
      icon: <Droplets className="w-6 h-6 text-orange-500" />,
      image: "/cat_perawatan.png"
    },
    {
      title: "Rumah Tangga",
      description: "Perlengkapan rumah tangga lengkap",
      icon: <Home className="w-6 h-6 text-orange-500" />,
      image: "/cat_rumahtangga.png"
    },
    {
      title: "Frozen Food",
      description: "Makanan beku yang praktis",
      icon: <Snowflake className="w-6 h-6 text-orange-500" />,
      image: "/cat_frozenfood.png"
    }
  ];

  return (
    <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Kategori Produk</h2>
          <p className="text-gray-500">Berbagai kategori lengkap untuk memenuhi kebutuhan Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full group">
            <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
            <p className="text-xs text-gray-500 mb-6 grow">{cat.description}</p>
            <div className="relative w-full h-24 mt-auto">
              <Image 
                src={cat.image} 
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
