import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - Dalas Swalayan",
  description: "Panel Administrasi Dalas Swalayan",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F9FAFB] min-h-screen font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
