'use client';

import Link from 'next/link';
import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';

// Gamification Ana Sayfası - 5 Kategori Butonu Simetrik Düzende
export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      {/* Ana İçerik - Merkezi Lunara Yazısı ve Kategoriler */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="relative w-full max-w-5xl aspect-square flex items-center justify-center">
          
          {/* Merkez: "Lunara" Yazısı */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <h1 className="text-5xl md:text-7xl font-bold text-white hover:scale-110 transition-transform duration-300 cursor-default">
              Lunara
            </h1>
          </div>

          {/* Kategori Butonları - Simetrik Dağılım */}
          
          {/* Üst Merkez: Stratejik */}
          <Link href="/gamification/stratejik" className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <button className="bg-white/90 hover:bg-white text-[#5D4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl">
              Stratejik
            </button>
          </Link>

          {/* Sol Üst: Hukuki */}
          <Link href="/gamification/hukuki" className="absolute top-[20%] left-[10%] z-20">
            <button className="bg-white/90 hover:bg-white text-[#5D4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl">
              Hukuki
            </button>
          </Link>

          {/* Sağ Üst: Uluslararası */}
          <Link href="/gamification/uluslararasi" className="absolute top-[20%] right-[10%] z-20">
            <button className="bg-white/90 hover:bg-white text-[#5D4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl">
              Uluslararası
            </button>
          </Link>

          {/* Sol Alt: Finansal */}
          <Link href="/gamification/finansal" className="absolute bottom-[20%] left-[10%] z-20">
            <button className="bg-white/90 hover:bg-white text-[#5D4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl">
              Finansal
            </button>
          </Link>

          {/* Sağ Alt: Dijital */}
          <Link href="/gamification/dijital" className="absolute bottom-[20%] right-[10%] z-20">
            <button className="bg-white/90 hover:bg-white text-[#5D4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl">
              Dijital
            </button>
          </Link>

        </div>
      </main>

      {/* Sabit "Bize Ulaşın" Butonu */}
      <ContactButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
