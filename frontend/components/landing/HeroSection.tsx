import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 md:py-24 mx-auto gap-12 bg-white">
      {/* Left Text */}
      <div className="md:w-1/2 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          <span className="text-orange-500">Dalas</span> Swalayan,<br />
          Lengkap, Berkualitas,<br />
          Selalu <span className="text-orange-500">Terpercaya</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
          Kami hadir untuk memenuhi kebutuhan sehari-hari Anda dengan produk lengkap, kualitas terbaik, dan pelayanan yang ramah.
        </p>
        <button className="mt-8 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-8 py-3 rounded-md md:rounded-full font-medium text-lg shadow-md shadow-orange-200">
          Tentang Kami
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 relative w-full h-[350px] md:h-[500px]">
        <Image 
          src="/hero.png" 
          alt="Hero Dalas Swalayan" 
          fill
          className="object-cover rounded-2xl shadow-xl"
          priority
        />
      </div>
    </section>
  )
}
