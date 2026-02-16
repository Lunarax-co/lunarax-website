'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ETicaretPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/gamification/dijital" className="text-white/70 hover:text-white mb-4 inline-block">
            ← Geri Dön
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">E-Ticaret Çözümleri</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
          <div className="text-white space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hizmet Detayları</h2>
              <p className="text-white/80 leading-relaxed">
                E-ticaret danışmanlığımız ile online satış kanallarınızı kurun, optimize edin ve 
                büyütün. Doğru platformu seçmekten, kullanıcı deneyimini iyileştirmeye, ödeme 
                sistemlerinden lojistik entegrasyonuna kadar tüm süreçlerde yanınızdayız.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kapsam</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>E-ticaret platformu seçimi ve kurulumu</li>
                <li>Ürün kataloğu ve envanter yönetimi</li>
                <li>Ödeme ve kargo entegrasyonları</li>
                <li>Kullanıcı deneyimi (UX) optimizasyonu</li>
                <li>E-ticaret operasyonu ve müşteri hizmetleri</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Kimler İçin?</h3>
              <p className="text-white/80 leading-relaxed">
                Online satış yapmak isteyen perakendeciler, B2B firmalar, ürün çeşitliliği yüksek 
                işletmeler ve yurtdışı pazarlara açılmayı hedefleyen markalar için kritiktir.
              </p>
            </div>

            {/* IMAGE_PLACEHOLDER: E-ticaret platformu görseli */}
            
            <div className="pt-6">
              <a
                href="mailto:info@lunara.com?subject=E-Ticaret Çözümleri Hakkında Bilgi"
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
