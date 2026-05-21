import { Bell, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang kembali, Admin!</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F9FAFB]">3</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 pl-3 rounded-2xl transition-colors">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
            {/* Dummy Avatar */}
            <div className="w-full h-full bg-slate-300"></div>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
            <p className="text-xs text-gray-500 mt-1">Super Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-1 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
