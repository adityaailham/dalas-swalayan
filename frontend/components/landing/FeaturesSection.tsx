import { ShoppingBag, ShieldCheck, Tag, Smile } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
      title: "Produk Lengkap",
      description: "Semua kebutuhan ada di sini",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
      title: "Kualitas Terbaik",
      description: "Kami memilih produk terbaik untuk Anda",
    },
    {
      icon: <Tag className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
      title: "Harga Terjangkau",
      description: "Kualitas terbaik dengan harga bersahabat",
    },
    {
      icon: <Smile className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
      title: "Pelayanan Ramah",
      description: "Kami siap melayani dengan sepenuh hati",
    },
  ];

  return (
    <section className="px-8 md:px-16 py-8 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4 p-2">
            <div className="bg-orange-50 p-4 rounded-full shrink-0 flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-snug">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
