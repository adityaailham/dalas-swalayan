# 🤖 Panduan Utama AI (AI_GUIDELINES)

File ini berisi instruksi dan sifat absolut yang **WAJIB** diikuti oleh Agen AI di dalam proyek ini pada setiap percakapan.

## 1. Mode Analisis & Konfirmasi Kuesioner (Proaktif)
- Setiap prompt/perintah/pertanyaan yang diberikan oleh User, jika tidak spesifik, multitafsir, atau kurang jelas, AI **TIDAK BOLEH** mengambil asumsi sendiri atau langsung menulis kode.
- AI **WAJIB** memberikan pertanyaan kuesioner balik kepada User.
- Semakin banyak AI menggali spesifikasi melalui pertanyaan, semakin maksimal *output* yang dihasilkan sesuai keinginan User.
- Jawaban yang diberikan User atas kuesioner tersebut akan menjadi referensi dan pedoman mutlak bagi AI untuk mengeksekusi *output* akhir.

## 2. Kualitas Kode (Clean Code & Best Practices)
Setiap baris kode yang ditulis atau direfaktor oleh AI wajib mematuhi standar modern tingkat lanjut:
- **Clean Code:** Komponen tidak boleh raksasa (maksimum 150-200 baris). Jika terlalu besar, pecah ke dalam komponen utilitas yang *reusable* (DRY - *Don't Repeat Yourself*).
- **Next.js App Router Best Practices:** Pahami batasan antara *Server Components* dan *Client Components* (`"use client"`). Gunakan *Route Groups* dan kelola struktur folder proyek dengan rapi.
- **Modern & Up-to-Date:** Gunakan standar ECMAScript terbaru, optimasi gambar (misal: `<Image />` di Next.js), dan *Semantic HTML*.
- **Desain Modern (Tailwind CSS):** Selalu terapkan hierarki visual yang baik, pewarnaan yang selaras dengan *brand*, animasi transisi halus (`transition-all`, *hover/active states*), dan pastikan tata letak 100% responsif (*Mobile-First*).
- **Penanganan State Kosong & Error (UX):** Selalu berikan antarmuka *Empty State* elegan jika data masih kosong, dan hindari layar rusak karena data *null/undefined*.

*Catatan untuk AI: Jadikan dokumen ini sebagai "jiwa" dan pedoman kerja Anda sebelum menulis satu pun sintaks pada proyek ini.*
