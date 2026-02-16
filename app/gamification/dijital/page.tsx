'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

// Dijital Kategori Ana Sayfası
export default function DijitalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Dijital Danışmanlık</h1>
          <p className="text-white/70 mt-2">Dijital dönüşüm yolculuğunuzda yanınızdayız</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CategoryCard
            icon="💻"
            title="Dijital Dönüşüm"
            description="İşletmenizi dijital çağa taşıyacak teknoloji ve süreç değişikliklerini planlama ve uygulama"
            href="/gamification/dijital/donusum"
          />

          <CategoryCard
            icon="🌐"
            title="E-Ticaret Çözümleri"
            description="Online satış kanallarını kurma, optimize etme ve büyütme stratejileri"
            href="/gamification/dijital/e-ticaret"
          />

          <CategoryCard
            icon="📱"
            title="Dijital Pazarlama"
            description="Sosyal medya, SEO, içerik pazarlama ve dijital reklamcılıkla marka bilinirliğinizi artırın"
            href="/gamification/dijital/pazarlama"
          />

        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
