import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const totalProducts = await prisma.products.count();
    const totalCategories = await prisma.categories.count();
    const totalPromos = await prisma.promos.count();
    
    return NextResponse.json({
      data: {
        total_products: totalProducts,
        active_products: totalProducts, // Asumsi semua aktif untuk saat ini
        total_categories: totalCategories,
        active_promos: totalPromos
      }
    });
  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: "Gagal mengambil statistik dashboard" }, { status: 500 });
  }
}
