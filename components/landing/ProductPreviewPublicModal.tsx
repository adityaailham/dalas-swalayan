"use client";

import React from "react";
import { X, Package, ShoppingBag, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface ProductPreviewPublicModalProps {
  product: any | null;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

export default function ProductPreviewPublicModal({
  product,
  onClose,
  onAddToCart,
}: ProductPreviewPublicModalProps) {
  if (!product) return null;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200 print:hidden">
      <div
        className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gambar Produk */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="max-h-72 w-full object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 py-12">
              <Package className="w-20 h-20 mb-2 stroke-1" />
              <span className="text-xs font-semibold">Gambar Tidak Tersedia</span>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
            {product.category?.name || "Umum"}
          </div>
        </div>

        {/* Informasi Produk */}
        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {product.sku && (
                <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  SKU: {product.sku}
                </span>
              )}
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
                {product.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Harga */}
          <div className="mb-6">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-1">
              Harga Satuan
            </span>
            <span className="text-3xl font-black text-orange-600 tracking-tight">
              {formatRupiah(product.price)}
            </span>
          </div>

          {/* Deskripsi */}
          <div className="mb-6 flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Deskripsi Produk
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description || "Tidak ada deskripsi tambahan untuk produk ini."}
            </p>
          </div>

          {/* Waktu Pembaruan (Last Updated info dalam Modal) */}
          <div className="flex items-center gap-2 py-2.5 px-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-600 text-xs mb-6">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Terakhir Diperbarui: <strong className="text-slate-800">{formatDate(product.updated_at)}</strong>
            </span>
          </div>

          {/* Tombol Aksi */}
          <div className="pt-4 border-t border-gray-100 mt-auto flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-gray-200 font-bold text-gray-700 text-sm hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              + Perkiraan Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
