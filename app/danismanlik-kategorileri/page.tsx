'use client';

import { useRouter } from 'next/navigation';
import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';

export default function DanismanlikKategorileri() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
            Danışmanlık Kategorileri
          </h2>
          <p className="text-white/70 text-center mb-12 text-lg">
            İhtiyacınıza uygun danışmanlık hizmetini seçin
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stratejik Danışmanlık */}
            <div
              onClick={() => router.push('/gamification/stratejik')}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 group"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white/100">
                Stratejik Danışmanlık
              </h3>
              <p className="text-white/80 group-hover:text-white/90">
                İşletmenizin geleceğini şekillendirecek çözümler.
              </p>
            </div>

            {/* Dijital Danışmanlık */}
            <div
              onClick={() => router.push('/gamification/dijital')}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 group"
            >
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white/100">
                Dijital Danışmanlık
              </h3>
              <p className="text-white/80 group-hover:text-white/90">
                Dijital dönüşümle iş süreçlerini iyileştirme.
              </p>
            </div>

            {/* Finansal Danışmanlık */}
            <div
              onClick={() => router.push('/gamification/finansal')}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 group"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white/100">
                Finansal Danışmanlık
              </h3>
              <p className="text-white/80 group-hover:text-white/90">
                Mali yapınızı güçlendirecek çözümler.
              </p>
            </div>

            {/* Hukuki Danışmanlık */}
            <div
              onClick={() => router.push('/gamification/hukuki')}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 group"
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white/100">
                Hukuki Danışmanlık
              </h3>
              <p className="text-white/80 group-hover:text-white/90">
                Hukuki riskleri minimize edecek destek.
              </p>
            </div>

            {/* Uluslararası Danışmanlık */}
            <div
              onClick={() => router.push('/gamification/uluslararasi')}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 group"
            >
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white/100">
                Uluslararası Danışmanlık
              </h3>
              <p className="text-white/80 group-hover:text-white/90">
                Global pazarlara açılmada rehberlik.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
