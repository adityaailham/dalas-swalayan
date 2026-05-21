"use client";

import { Package, ShieldCheck, Grid, AlertTriangle, ChevronDown } from "lucide-react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Produk",
      value: "1280",
      desc: "Semua produk terdaftar",
      trend: "↗ 12% dari bulan lalu",
      trendColor: "text-orange-500",
      icon: <Package className="w-6 h-6 text-white" />,
      iconBg: "bg-orange-500"
    },
    {
      title: "Produk Aktif",
      value: "1125",
      desc: "Produk yang aktif",
      trend: "↗ 10% dari bulan lalu",
      trendColor: "text-orange-500",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      iconBg: "bg-orange-500"
    },
    {
      title: "Kategori",
      value: "24",
      desc: "Semua kategori",
      trend: "↘ 4% dari bulan lalu",
      trendColor: "text-red-500",
      icon: <Grid className="w-6 h-6 text-white" />,
      iconBg: "bg-orange-500"
    },
    {
      title: "Stok Menipis",
      value: "18",
      desc: "Perlu restock",
      trend: "↘ 8% dari bulan lalu",
      trendColor: "text-red-500",
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      iconBg: "bg-orange-500"
    }
  ];

  const topProducts = [
    { name: "Beras Premium 5kg", sold: "Terjual 320", price: "Rp 64.500", img: "/cat_sembako.png" },
    { name: "Minyak Goreng 2L", sold: "Terjual 280", price: "Rp 28.500", img: "/cat_sembako.png" },
    { name: "Indomie Goreng", sold: "Terjual 250", price: "Rp 3.500", img: "/cat_snack.png" },
    { name: "Susu UHT 1L", sold: "Terjual 210", price: "Rp 18.500", img: "/cat_minuman.png" },
    { name: "Gula Pasir 1kg", sold: "Terjual 190", price: "Rp 14.000", img: "/cat_sembako.png" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      <AdminHeader />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <h3 className="text-gray-900 font-bold text-lg">{stat.title}</h3>
            <div className="text-3xl font-extrabold text-gray-900 my-1">{stat.value}</div>
            <p className="text-sm text-gray-500">{stat.desc}</p>
            <p className={`text-xs font-semibold mt-4 ${stat.trendColor}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900">Grafik Produk</h3>
            <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              6 Bulan Terakhir <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          {/* Dummy Chart Area (Menggunakan SVG Tiruan agar mirip desain) */}
          <div className="flex-1 relative w-full h-full min-h-[250px] mt-4 flex items-end">
            <div className="absolute inset-0 flex flex-col justify-between pb-8">
              {[1500, 1250, 1000, 750, 500, 250, 0].map((val, i) => (
                <div key={i} className="flex items-center gap-4 w-full">
                  <span className="text-xs text-gray-400 w-10 text-right">{val === 0 ? "0" : val}</span>
                  <div className="flex-1 border-b border-gray-100"></div>
                </div>
              ))}
            </div>
            {/* SVG Line Chart Dummy */}
            <div className="absolute inset-0 left-14 bottom-8 right-0">
               <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
                 <defs>
                   <linearGradient id="gradientOrange" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="rgba(249, 115, 22, 0.2)" />
                     <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
                   </linearGradient>
                 </defs>
                 <path d="M 0,220 L 160,150 L 320,180 L 480,100 L 640,60 L 800,10 L 1000,10 L 1000,300 L 0,300 Z" fill="url(#gradientOrange)" />
                 <path d="M 0,220 L 160,150 L 320,180 L 480,100 L 640,60 L 800,10 L 1000,10" fill="none" stroke="#F97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                 
                 <circle cx="0" cy="220" r="6" fill="#F97316" />
                 <circle cx="160" cy="150" r="6" fill="#F97316" />
                 <circle cx="320" cy="180" r="6" fill="#F97316" />
                 <circle cx="480" cy="100" r="6" fill="#F97316" />
                 <circle cx="640" cy="60" r="6" fill="#F97316" />
                 <circle cx="800" cy="10" r="6" fill="#F97316" />
               </svg>
            </div>
            <div className="absolute bottom-0 left-14 right-0 flex justify-between text-xs text-gray-500 px-2">
              <span>Nov</span>
              <span>Des</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
            </div>
          </div>
        </div>

        {/* Top Products Column */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900">Produk Terlaris</h3>
            <button className="text-sm text-orange-500 font-semibold hover:text-orange-600">Lihat Semua</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {topProducts.map((prod, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100">
                  <Image src={prod.img} alt={prod.name} width={40} height={40} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{prod.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{prod.sold}</p>
                </div>
                <div className="text-sm font-bold text-gray-900">{prod.price}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
