"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2, Printer, ShoppingCart, AlertCircle } from "lucide-react";

export interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image_url?: string;
    category?: { name: string };
    sku?: string;
  };
  quantity: number;
}

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  items,
  isOpen,
  onClose,
  onOpen,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [printDate, setPrintDate] = useState("");

  useEffect(() => {
    // Set print date
    const now = new Date();
    setPrintDate(
      now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
  }, [isOpen]);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handlePrint = () => {
    const now = new Date();
    setPrintDate(
      now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={onOpen}
        className="fixed bottom-10 md:bottom-8 right-4 md:right-8 z-50 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-2xl shadow-orange-600/50 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group print:hidden animate-in slide-in-from-bottom-10"
        title="Lihat Perkiraan Belanja"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-orange-600 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {totalItemsCount}
            </span>
          )}
        </div>
        <span className="font-bold text-sm hidden md:inline pr-1">Perkiraan Belanja</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity print:hidden animate-in fade-in duration-300"
        />
      )}

      {/* Drawer Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out print:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-orange-500/20">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg leading-tight">Perkiraan Belanja</h3>
              <p className="text-xs text-gray-500">Simulasi total harga barang pilihan Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-200/60 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content / List Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-gray-50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <p className="font-bold text-gray-800 mb-1">Daftar Perkiraan Kosong</p>
              <p className="text-xs text-gray-500 max-w-xs">
                Belum ada produk yang dipilih. Klik tombol "+ Perkiraan" pada produk di E-Katalog untuk mulai menghitung estimasi.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4 items-start group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.product.image_url ? (
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-6 h-6 text-gray-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">
                    {item.product.name}
                  </h4>
                  <p className="text-xs font-semibold text-orange-600 mt-0.5">
                    {formatRupiah(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty Control */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200/60 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200/60 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-gray-900 text-sm">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Hapus barang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-200/60 text-amber-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Daftar ini adalah simulasi perkiraan harga & tidak memproses pembayaran online.</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Total Jumlah Barang</span>
                <span>{totalItemsCount} pcs</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-bold text-gray-700 text-sm">Total Perkiraan</span>
                <span className="font-black text-orange-600 text-2xl tracking-tight">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClearCart}
                className="px-4 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Kosongkan
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-sm transition-all duration-200 active:scale-95"
              >
                <Printer className="w-4 h-4" />
                Cetak Perkiraan Belanja
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PRINT VIEW (Hanya Muncul Saat Mode Print browser: window.print()) */}
      {/* ========================================================= */}
      <div className="hidden print:block font-mono text-black p-6 w-full max-w-3xl mx-auto">
        {/* Header Struk */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-black tracking-wider uppercase">DALAS SWALAYAN</h1>
          <p className="text-sm">Jl. Andalas No.38, Andalas, Kec. Padang Timur, Kota Padang</p>
          <p className="text-xs mt-1">Telp: (022) 1234 5678 | Buka 08.00 - 22.00 WIB</p>
          <div className="mt-3 border-t border-dashed border-gray-400 pt-2 flex justify-between text-xs font-bold">
            <span>Daftar: SIMULASI / PERKIRAAN BELANJA</span>
            <span>Waktu: {printDate}</span>
          </div>
        </div>

        {/* Tabel Items Struk */}
        <table className="w-full text-left text-xs mb-6 border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 w-10 text-center font-bold">No</th>
              <th className="py-2 font-bold">Nama Produk</th>
              <th className="py-2 text-center w-16 font-bold">Qty</th>
              <th className="py-2 text-right w-28 font-bold">Harga Satuan</th>
              <th className="py-2 text-right w-32 font-bold">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {items.map((item, idx) => (
              <tr key={item.product.id}>
                <td className="py-2.5 text-center">{idx + 1}</td>
                <td className="py-2.5 font-bold">
                  {item.product.name}
                  {item.product.sku && (
                    <span className="block text-[10px] text-gray-500 font-normal">
                      SKU: {item.product.sku}
                    </span>
                  )}
                </td>
                <td className="py-2.5 text-center font-bold">{item.quantity}</td>
                <td className="py-2.5 text-right">{formatRupiah(item.product.price)}</td>
                <td className="py-2.5 text-right font-bold">
                  {formatRupiah(item.product.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Ringkasan & Total Struk */}
        <div className="border-t-2 border-black pt-4 flex flex-col items-end gap-1 text-sm">
          <div className="flex justify-between w-64 text-xs">
            <span>Total Item:</span>
            <span className="font-bold">{totalItemsCount} pcs</span>
          </div>
          <div className="flex justify-between w-64 text-base font-black border-t border-dashed border-gray-400 pt-1 mt-1">
            <span>TOTAL ESTIMASI:</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>
        </div>

        {/* Footer Struk / Catatan */}
        <div className="mt-12 pt-4 border-t border-dashed border-gray-400 text-center text-[11px] text-gray-600 leading-relaxed">
          <p className="font-bold text-black">*** CATATAN PENTING ***</p>
          <p>
            Lembaran ini adalah dokumen perkiraan/simulasi belanja E-Katalog mandiri dan bukan merupakan
            bukti pembayaran atau struk kasir resmi.
          </p>
          <p>Harga & ketersediaan stok dapat berubah sewaktu-waktu di toko fisik Dalas Swalayan.</p>
          <p className="mt-3 text-black font-semibold">--- Terima Kasih Telah Berbelanja di Dalas Swalayan ---</p>
        </div>
      </div>
    </>
  );
}
