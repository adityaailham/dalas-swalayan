import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dalas Swalayan",
  description: "Lengkap, Berkualitas, Selalu Terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <body className={`${jakarta.className} min-h-full flex flex-col overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
