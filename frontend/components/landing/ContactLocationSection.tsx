import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

export default function ContactLocationSection() {
  return (
    <section className="px-8 md:px-16 py-16 bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left: Map */}
        <div className="lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lokasi Kami</h2>
          <p className="text-gray-500 mb-6">Kunjungi Dalas Swalayan terdekat</p>
          <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.279722122404!2d100.38063869999999!3d-0.9414524999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9c290fe8ddb%3A0x1f06c8227c2e767f!2sDalas%20Swalayan!5e0!3m2!1sid!2sid!4v1779293429438!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Kontak</h2>
          <p className="text-gray-500 mb-6">Hubungi kami untuk informasi lebih lanjut</p>
          
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Jl. Andalas No.38, Andalas, Kec. Padang Tim., Kota Padang, Sumatera Barat 25121, Andalas, Kec. Padang Timur</p>
                <p className="text-gray-500 text-sm">Kota Padang, Sumatera Barat</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex items-center h-full">
                <p className="font-semibold text-gray-900">(022) 1234 5678</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Buka Setiap Hari</p>
                <p className="text-gray-500 text-sm">08.00 - 22.00 WIB</p>
              </div>
            </div>
          </div>

          <div className="mt-auto relative h-[180px] w-full rounded-2xl overflow-hidden shadow-md">
             <Image 
              src="/store_produce.png" 
              alt="Area Produk Segar" 
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
