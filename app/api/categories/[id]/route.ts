import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = BigInt(id);
    const body = await request.json();
    const { name, description, icon, image_url } = body;

    const updatedCategory = await prisma.categories.update({
      where: { id: categoryId },
      data: {
        name,
        description,
        icon,
        image_url,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      message: "Kategori berhasil diperbarui",
      data: updatedCategory,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui kategori" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = BigInt(id);

    await prisma.categories.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({
      message: "Kategori berhasil dihapus",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 }
    );
  }
}
