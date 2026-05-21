import { ShoppingBag, ShieldCheck, Tag, Smile } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-white" />,
      title: "Produk Lengkap",
      description: "Semua kebutuhan ada di sini",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />,
      title: "Kualitas Terbaik",
      description: "Kami memilih produk terbaik untuk Anda",
    },
    {
      icon: <Tag className="w-6 h-6 md:w-7 md:h-7 text-white" />,
      title: "Harga Terjangkau",
      description: "Kualitas terbaik dengan harga bersahabat",
    },
    {
      icon: <Smile className="w-6 h-6 md:w-7 md:h-7 text-white" />,
      title: "Pelayanan Ramah",
      description: "Kami siap melayani dengan sepenuh hati",
    },
  ];

  return (
    <section className="px-8 md:px-16 relative z-20 max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] py-6 md:py-8 px-6 lg:px-10 border border-gray-100/50">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 lg:gap-5 p-2 lg:border-r border-gray-100 last:border-r-0 lg:pr-6"
          >
            <div className="bg-orange-500 p-3.5 md:p-4 rounded-full shrink-0 flex items-center justify-center shadow-lg shadow-orange-500/20">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-snug">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
