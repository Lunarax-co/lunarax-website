'use client';

import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

// Stratejik Kategori Ana Sayfası
export default function StrtejikPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Stratejik Danışmanlık</h1>
          <p className="text-white/70 mt-2">İşletmenizi geleceğe taşıyacak stratejiler geliştirin</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <CategoryCard
            icon="🎯"
            title="İş Planı Geliştirme"
            description="Hedeflerinize ulaşmanız için kapsamlı iş planı hazırlama, pazar analizi ve strateji oluşturma"
            href="/gamification/stratejik/is-plani"
          />

          <CategoryCard
            icon="📈"
            title="Büyüme Stratejileri"
            description="Yeni pazarlara açılma, ürün çeşitlendirme ve ölçeklenme için etkili büyüme stratejileri"
            href="/gamification/stratejik/buyume"
          />

          <CategoryCard
            icon="🔄"
            title="Süreç İyileştirme"
            description="Operasyonel verimliliği artırmak için iş süreçlerini analiz etme ve optimize etme"
            href="/gamification/stratejik/surec-iyilestirme"
          />

        </div>
      </main>

      <ContactButton />
      <Footer />
    </div>
  );
}
