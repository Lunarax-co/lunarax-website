'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Finansal Raporlama Detay Sayfası
export default function RaporlamaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/gamification/finansal" className="text-white/70 hover:text-white mb-4 inline-block">
            ← Geri Dön
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">Finansal Raporlama</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
          <div className="text-white space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hizmet Detayları</h2>
              <p className="text-white/80 leading-relaxed">
                Finansal raporlama hizmetimiz, işletmenizin mali durumunu düzenli ve anlaşılır bir şekilde 
                görmenizi sağlar. Aylık, üç aylık ve yıllık periyotlarda hazırlanan raporlarla gelir-gider 
                dengesi, karlılık analizi ve performans göstergelerini takip edebilirsiniz.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kapsam</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Aylık gelir-gider raporları</li>
                <li>Bilanço ve kar-zarar tabloları</li>
                <li>Nakit akış analizleri</li>
                <li>Departman bazlı maliyet raporları</li>
                <li>Özel rapor talepleri</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kimler İçin?</h3>
              <p className="text-white/80 leading-relaxed">
                KOBİ'ler, girişimciler ve büyüyen işletmeler için ideal bir çözümdür. 
                Finansal şeffaflık ve planlama ihtiyacı olan her organizasyon için uygundur.
              </p>
            </div>

            {/* IMAGE_PLACEHOLDER: Örnek rapor görseli buraya eklenebilir */}
            
            <div className="pt-6">
              <a
                href="mailto:info@lunara.com?subject=Finansal Raporlama Hakkında Bilgi"
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
