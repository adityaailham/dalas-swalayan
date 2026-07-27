import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const ext = file.name.split(".").pop();
    const filename = `img_${Date.now()}.${ext}`;
    
    // Pastikan folder uploads ada
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    
    // Sesuaikan format URL sesuai yang dikonsumsi oleh Next.js components
    return NextResponse.json({ 
      message: "Berhasil upload", 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Gagal upload gambar" }, { status: 500 });
  }
}
