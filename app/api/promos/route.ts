import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const promos = await prisma.promos.findMany({
      orderBy: { sort_order: "asc" },
    });
    return NextResponse.json({
      message: "Berhasil mengambil data promo",
      data: promos,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil promo" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { title, description, banner_url, start_date, end_date, sort_order, status } = body;

    const newPromo = await prisma.promos.create({
      data: {
        title,
        description,
        banner_url,
        start_date: start_date ? new Date(start_date) : new Date(),
        end_date: end_date ? new Date(end_date) : new Date(),
        sort_order: sort_order ? BigInt(sort_order) : BigInt(1),
        status: status === "nonaktif" ? "nonaktif" : "aktif",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil menambahkan promo baru",
        data: newPromo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal membuat promo" },
      { status: 500 }
    );
  }
}
