'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

// Uluslararası Kategori Ana Sayfası
export default function UluslararasiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Uluslararası Danışmanlık</h1>
          <p className="text-white/70 mt-2">Global pazarlara açılma yolculuğunuzda yanınızdayız</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CategoryCard
            icon="🌍"
            title="Uluslararası Şirket Kuruluşu"
            description="Yurtdışı şirket kuruluşu, yerel mevzuat uyumu ve operasyonel destek hizmetleri"
            href="/gamification/uluslararasi/sirket-kurulus"
          />

          <CategoryCard
            icon="🚢"
            title="İhracat-İthalat Danışmanlığı"
            description="Dış ticaret süreçleri, gümrük işlemleri, teşvik ve desteklerde rehberlik"
            href="/gamification/uluslararasi/ihracat-ithalat"
          />

          <CategoryCard
            icon="🤝"
            title="Uluslararası İş Ortaklıkları"
            description="Global iş ortaklıkları kurma, pazara giriş stratejileri ve yerel network desteği"
            href="/gamification/uluslararasi/is-ortakliklari"
          />

        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
