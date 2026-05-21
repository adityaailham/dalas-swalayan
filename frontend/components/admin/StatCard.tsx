import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  desc: string;
  trend: string;
  trendColor: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function StatCard({ title, value, desc, trend, trendColor, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
      <div className="text-3xl font-extrabold text-gray-900 my-1">{value}</div>
      <p className="text-sm text-gray-500">{desc}</p>
      <p className={`text-xs font-semibold mt-4 ${trendColor}`}>{trend}</p>
    </div>
  );
}
