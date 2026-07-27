import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promoId = BigInt(id);
    const body = await request.json();
    let { title, description, banner_url, start_date, end_date, sort_order, status } = body;

    const dataUpdate: any = {
      title,
      description,
      banner_url,
      updated_at: new Date(),
    };

    if (start_date) dataUpdate.start_date = new Date(start_date);
    if (end_date) dataUpdate.end_date = new Date(end_date);
    if (sort_order !== undefined) dataUpdate.sort_order = BigInt(sort_order);
    if (status) dataUpdate.status = status;

    const updatedPromo = await prisma.promos.update({
      where: { id: promoId },
      data: dataUpdate,
    });

    return NextResponse.json({
      message: "Promo berhasil diperbarui",
      data: updatedPromo,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui promo" },
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
    const promoId = BigInt(id);

    await prisma.promos.delete({
      where: { id: promoId },
    });

    return NextResponse.json({
      message: "Promo berhasil dihapus",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus promo" },
      { status: 500 }
    );
  }
}
