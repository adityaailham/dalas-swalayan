import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[550px] md:min-h-[650px] flex items-center bg-white overflow-hidden">
      {/* Background Image on Right Side */}
      <div className="absolute top-0 right-0 w-full md:w-[70%] h-full">
        <Image 
          src="/hero.png" 
          alt="Dalas Swalayan" 
          fill
          className="object-cover object-right"
          priority
        />
        {/* Gradient Mask to blend image into white background smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full md:w-2/3"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20 md:pb-40">
        <div className="md:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            <span className="text-orange-500">Dalas</span> Swalayan,<br />
            Lengkap, Berkualitas,<br />
            Selalu <span className="text-orange-500">Terpercaya</span>
          </h1>
          <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
            Kami hadir untuk memenuhi kebutuhan sehari-hari Anda dengan produk lengkap, kualitas terbaik, dan pelayanan yang ramah.
          </p>
          <button className="mt-10 bg-orange-500 hover:bg-orange-600 transition-all text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1">
            Tentang Kami
          </button>
        </div>
      </div>
    </section>
  )
}
