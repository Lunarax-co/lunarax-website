'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

// Hukuki Kategori Ana Sayfası
export default function HukukiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Hukuki Danışmanlık</h1>
          <p className="text-white/70 mt-2">İşletmenizin hukuki süreçlerinde güvenilir destek</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CategoryCard
            icon="⚖️"
            title="Ticari Hukuk"
            description="Ticari sözleşmeler, alacak-verecek uyuşmazlıkları ve ticari dava süreçlerinde profesyonel destek"
            href="/gamification/hukuki/ticari-hukuk"
          />

          <CategoryCard
            icon="🏢"
            title="Şirket Hukuku"
            description="Şirket kuruluşu, birleşme-devir işlemleri, genel kurul ve yönetim kurulu süreçlerinde danışmanlık"
            href="/gamification/hukuki/sirket-hukuku"
          />

          <CategoryCard
            icon="👥"
            title="İş Hukuku"
            description="İş sözleşmeleri, iş akdi fesihleri, tazminat hesaplamaları ve işçi-işveren uyuşmazlıklarında rehberlik"
            href="/gamification/hukuki/is-hukuku"
          />

        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
