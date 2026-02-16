'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BuyumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/gamification/stratejik" className="text-white/70 hover:text-white mb-4 inline-block">
            ← Geri Dön
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">Büyüme Stratejileri</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
          <div className="text-white space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hizmet Detayları</h2>
              <p className="text-white/80 leading-relaxed">
                Büyüme stratejileri danışmanlığımız ile işletmenizin potansiyelini maksimize edin. 
                Yeni pazarlara giriş, ürün/hizmet çeşitlendirme, iş ortaklıkları ve satın alma 
                fırsatlarını değerlendirerek sürdürülebilir büyüme sağlayın.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kapsam</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Pazar genişletme stratejileri</li>
                <li>Ürün ve hizmet çeşitlendirme planları</li>
                <li>Stratejik ortaklık ve birleşme değerlendirmesi</li>
                <li>Franchise ve bayilik modeli geliştirme</li>
                <li>Ölçeklendirme ve operasyonel büyüme planlaması</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kimler İçin?</h3>
              <p className="text-white/80 leading-relaxed">
                Mevcut pazarında stabil konuma ulaşmış, yeni fırsatlar arayan, büyüme sermayesi 
                bulan veya yeni pazarlara açılmayı hedefleyen işletmeler için kritik bir hizmettir.
              </p>
            </div>

            {/* IMAGE_PLACEHOLDER: Büyüme grafiği görseli */}
            
            <div className="pt-6">
              <a
                href="mailto:info@lunara.com?subject=Büyüme Stratejileri Hakkında Bilgi"
                className="inline-block bg-white text-[#5D4E37] px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Detaylı Bilgi Al
              </a>
            </div>
          </div>
        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
