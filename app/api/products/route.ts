import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Ambil parameter
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const categoryId = searchParams.get("category");
    const search = searchParams.get("search");
    const status = searchParams.get("status"); // aktif / nonaktif
    const sort = searchParams.get("sort"); // new / asc / desc

    const offset = (page - 1) * limit;

    // Susun kondisi query (WHERE)
    const whereCondition: any = {};

    if (categoryId) {
      whereCondition.category_id = BigInt(categoryId);
    }
    if (search) {
      whereCondition.name = { contains: search };
    }
    if (status) {
      whereCondition.status = status;
    }

    // Susun pengurutan (ORDER BY)
    let orderByCondition: any = {};
    if (sort === "new") {
      orderByCondition = { created_at: "desc" };
    } else if (sort === "asc") {
      orderByCondition = { price: "asc" };
    } else if (sort === "desc") {
      orderByCondition = { price: "desc" };
    } else {
      orderByCondition = { created_at: "desc" };
    }

    // Jalankan Query Paralel: Hitung total, Ambil data, Ambil timestamp terbaru
    const [totalItems, products, latestUpdateProduct] = await Promise.all([
      prisma.products.count({ where: whereCondition }),
      prisma.products.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        skip: offset,
        take: limit,
        include: {
          categories: {
            select: { name: true }, // Untuk join nama kategori
          },
        },
      }),
      prisma.products.findFirst({
        orderBy: { updated_at: "desc" },
        select: { updated_at: true },
      }),
    ]);

    // Manipulasi kembalian data agar mirip format Golang (Misal: CategoryName masuk ke properti)
    const formattedProducts = products.map((p: any) => ({
      ...p,
      CategoryName: p.categories?.name || "",
    }));

    return NextResponse.json({
      message: "Berhasil mengambil data produk",
      data: formattedProducts,
      meta: {
        total_items: totalItems,
        page: page,
        limit: limit,
        latest_updated_at: latestUpdateProduct?.updated_at || new Date(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { name, sku, description, price, category_id, image_url, status } = body;

    const newProduct = await prisma.products.create({
      data: {
        name,
        sku,
        description,
        price,
        category_id: category_id ? BigInt(category_id) : null,
        image_url,
        status: status === "nonaktif" ? "nonaktif" : "aktif",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil menambahkan produk baru",
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal membuat produk" },
      { status: 500 }
    );
  }
}
