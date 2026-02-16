'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

// Finansal Kategori Ana Sayfası - 3 Alt Hizmet Kartı
export default function FinansalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Finansal Danışmanlık</h1>
          <p className="text-white/70 mt-2">İşletmenizin finansal süreçlerini optimize edin</p>
        </div>
      </header>

      {/* Ana İçerik - 3 Kart */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CategoryCard
            icon="💰"
            title="Finansal Raporlama"
            description="Düzenli finansal raporlama ve analiz hizmetleri ile işletmenizin mali durumunu net bir şekilde görün"
            href="/gamification/finansal/raporlama"
          />

          <CategoryCard
            icon="📊"
            title="Bütçe Yönetimi"
            description="Stratejik bütçe planlaması ve takip sistemleri ile kaynaklarınızı en verimli şekilde kullanın"
            href="/gamification/finansal/butce"
          />

          <CategoryCard
            icon="💳"
            title="Nakit Akışı Optimizasyonu"
            description="Nakit akışınızı optimize ederek likidite sorunlarını önleyin ve büyüme fırsatlarını değerlendirin"
            href="/gamification/finansal/nakit-akisi"
          />

        </div>
      </main>

      {/* Sabit "Bize Ulaşın" Butonu */}
      <ContactButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
