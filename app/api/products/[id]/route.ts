import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = BigInt(id);

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Berhasil mengambil produk",
      data: product,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = BigInt(id);
    const body = await request.json();
    let { name, sku, description, price, category_id, image_url, status } = body;

    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        name,
        sku,
        description,
        price,
        category_id: category_id ? BigInt(category_id) : null,
        image_url,
        status: status === "nonaktif" ? "nonaktif" : "aktif",
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      message: "Produk berhasil diperbarui",
      data: updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui produk" },
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
    const productId = BigInt(id);

    await prisma.products.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      message: "Produk berhasil dihapus",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
