"use client";

import { Package, ShieldCheck, Grid, Megaphone } from "lucide-react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";

export default function AdminDashboardPage() {
  // State untuk menyimpan angka asli dari Golang
  const [dashboardStats, setDashboardStats] = useState({
    total_products: 0,
    active_products: 0,
    total_categories: 0,
    active_promos: 0
  });

  // Fetch dari API
  useEffect(() => {
    apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setDashboardStats(data.data);
        }
      })
      .catch(err => console.error("Gagal mengambil statistik dashboard:", err));
  }, []);

  // Menyuntikkan variabel dari State ke dalam array desain kartu premium
  const stats = [
    {
      title: "Total Produk",
      value: dashboardStats.total_products.toString(),
      desc: "Keseluruhan produk terdaftar di inventaris",
      trend: "Data Sinkron",
      trendColor: "text-blue-600",
      icon: <Package className="w-7 h-7 text-blue-600" />,
      iconBg: "bg-white border border-blue-100",
      bgGradient: "from-blue-50/60 to-indigo-50/20 border-blue-100/50",
      glowColor: "bg-blue-400"
    },
    {
      title: "Produk Aktif",
      value: dashboardStats.active_products.toString(),
      desc: "Produk yang tampil dan siap dijual",
      trend: "Terverifikasi",
      trendColor: "text-emerald-600",
      icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
      iconBg: "bg-white border border-emerald-100",
      bgGradient: "from-emerald-50/60 to-green-50/20 border-emerald-100/50",
      glowColor: "bg-emerald-400"
    },
    {
      title: "Kategori Etalase",
      value: dashboardStats.total_categories.toString(),
      desc: "Pengelompokan jenis barang swalayan",
      trend: "Sistem Aktif",
      trendColor: "text-orange-600",
      icon: <Grid className="w-7 h-7 text-orange-600" />,
      iconBg: "bg-white border border-orange-100",
      bgGradient: "from-orange-50/60 to-amber-50/20 border-orange-100/50",
      glowColor: "bg-orange-400"
    },
    {
      title: "Promo Aktif",
      value: dashboardStats.active_promos.toString(),
      desc: "Promo berjalan di halaman publik",
      trend: "Terjadwal",
      trendColor: "text-purple-600",
      icon: <Megaphone className="w-7 h-7 text-purple-600" />,
      iconBg: "bg-white border border-purple-100",
      bgGradient: "from-purple-50/60 to-fuchsia-50/20 border-purple-100/50",
      glowColor: "bg-purple-400"
    }
  ];


  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <AdminHeader />

      {/* Welcome Banner (Pengisi Kekosongan Header) */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-[2rem] p-10 mb-10 text-white shadow-xl relative overflow-hidden border border-gray-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-40 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Selamat Datang di Dalas Swalayan! 👋</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm md:text-base">
              Pusat kendali admin utama Anda. Pantau ketersediaan barang inventaris, pastikan produk aktif untuk pembeli, dan strukturkan etalase kategori Anda dengan rapi hari ini.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">DS</div>
             <div>
                <p className="text-xs text-gray-400 font-medium">Status Sistem</p>
                <p className="font-bold text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Row (Desain Premium) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`relative overflow-hidden rounded-[2rem] p-8 shadow-sm border bg-linear-to-br ${stat.bgGradient} transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group cursor-default`}
          >
            {/* Glow / Dekorasi background melingkar */}
            <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full blur-3xl opacity-30 ${stat.glowColor} group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`}></div>
            
            {/* Ikon dan Badge Atas */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${stat.iconBg}`}>
                {stat.icon}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${stat.trendColor} bg-white/80 backdrop-blur-sm border border-white shadow-sm flex items-center gap-1.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${stat.glowColor}`}></span>
                {stat.trend}
              </div>
            </div>
            
            {/* Teks Bawah */}
            <div className="relative z-10">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-widest">{stat.title}</h3>
              <div className="text-5xl font-black text-gray-900 mt-2 mb-3 tracking-tighter drop-shadow-sm">{stat.value}</div>
              <p className="text-sm text-gray-500 font-medium">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
