import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany();
    return NextResponse.json({
      message: "Berhasil mengambil data kategori",
      data: categories,
    });
  } catch (error: any) {
    console.error("PRISMA ERROR DI API CATEGORIES:", error);
    return NextResponse.json(
      { error: "Gagal mengambil kategori", detail: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, icon, image_url } = body;

    const newCategory = await prisma.categories.create({
      data: {
        name,
        description,
        icon,
        image_url,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil menambahkan kategori baru",
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal membuat kategori" },
      { status: 500 }
    );
  }
}
