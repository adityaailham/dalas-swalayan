import Image from "next/image";
import { CheckCircle2, ThumbsUp, DollarSign, HeartHandshake } from "lucide-react";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-orange-500" />,
      title: "1000+ Produk",
      desc: "Pilihan lengkap setiap saat"
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-orange-500" />,
      title: "Kualitas Terjamin",
      desc: "Kami hanya menyediakan produk terbaik"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-500" />,
      title: "Harga Bersahabat",
      desc: "Harga kompetitif untuk semua kebutuhan"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-orange-500" />,
      title: "Pelayanan Prima",
      desc: "Tim kami siap membantu dengan ramah"
    }
  ];

  return (
    <section id="keunggulan" className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Kenapa Memilih <br />
            <span className="text-orange-500">Dalas</span> Swalayan?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Kami berkomitmen memberikan pengalaman terbaik untuk setiap pelanggan.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="bg-orange-50 p-3 rounded-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 relative w-full mt-8 lg:mt-0">
          <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="/store_interior.png" 
              alt="Interior Dalas Swalayan" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
