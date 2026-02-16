'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServiceMission {
  icon: string;
  title: string;
  missionTitle: string;
  description: string;
  link: string;
  suitableFor: string[];
}

const serviceMissions: ServiceMission[] = [
  {
    icon: '📋',
    title: 'Ön Muhasebe Yönetimi',
    missionTitle: 'Hizmet: Fatura & Tahsilat',
    description: 'Fatura, tahsilat, ödeme, cari, KDV gibi tüm ön muhasebe süreçlerinin yönetimi',
    link: '/hizmetler-surec-bazli-on-muhasebe-yonetimi.html',
    suitableFor: ['Büyüyen KOBİ\'ler', 'Aylık 100+ belge', 'Düzenli raporlama ihtiyacı'],
  },
  {
    icon: '🏢',
    title: 'Şirket Kuruluşu',
    missionTitle: 'Hizmet: Sistem Kurulumu',
    description: 'Yeni şirket kuruluşu ve operasyonel sistemlerin devreye alınması',
    link: '/hizmetler-anonim-sirket.html',
    suitableFor: ['Yeni girişimciler', 'Yapı değiştirmek isteyenler', 'Sistem kurmak isteyenler'],
  },
  {
    icon: '🌍',
    title: 'Uluslararası',
    missionTitle: 'Hizmet: Global Açılım',
    description: 'Yurtdışı şirket kuruluşu ve uluslararası operasyon desteği',
    link: '/uluslararasi-sirket-kurulusu.html',
    suitableFor: ['Global firmalar', 'Yurt dışı pazarı', 'Uluslararası ticaret'],
  },
  {
    icon: '🎓',
    title: 'Devlet Destekleri',
    missionTitle: 'Hizmet: Teşvik Takibi',
    description: 'TÜBİTAK, KOSGEB & Teknokent desteğinin başvurusu ve yönetimi',
    link: '/tubitak-kosgeb-teknokent-destegi.html',
    suitableFor: ['Teknoloji girişimleri', 'Ar-Ge yapan firmalar', 'Destek almak isteyenler'],
  },
  {
    icon: '📍',
    title: 'Maliyet Optimizasyonu',
    missionTitle: 'Hizmet: Adres & Maliyet',
    description: 'Sanal ofis, vergi adresi, maliyet optimizasyonu',
    link: '/operasyonel-adres-maliyet-optimizasyonu.html',
    suitableFor: ['Uzaktan çalışan ekipler', 'Maliyet düşürmek isteyenler', 'Esnek adres'],
  },
  {
    icon: '👥',
    title: 'İK ve Bordro',
    missionTitle: 'Hizmet: İnsan Kaynakları',
    description: 'İnsan kaynakları süreçleri ve bordro yönetimi',
    link: '/ik-bordro-hizmetleri.html',
    suitableFor: ['5+ çalışanı olan firmalar', 'Bordro dış kaynak', 'İK optimizasyonu'],
  },
];

export function MissionServiceCards() {
  const [hoveredMission, setHoveredMission] = useState<string | null>(null);

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
        {serviceMissions.map((service) => (
          <div
            key={service.title}
            className="group relative"
            onMouseEnter={() => setHoveredMission(service.title)}
            onMouseLeave={() => setHoveredMission(null)}
          >
            <Link href={service.link}>
              <div className="h-full p-6 rounded-xl border-2 border-slate-600/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer">
                {/* Mission Header */}
                <div className="mb-4">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {service.missionTitle}
                  </p>
                  <h3 className="text-lg font-bold text-white mt-2">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-4">
                  {service.description}
                </p>

                {/* Mission Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-xs font-semibold text-emerald-300">
                    Hizmet Kartı
                  </span>
                </div>
              </div>
            </Link>

            {/* Hover Popup */}
            {hoveredMission === service.title && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-900/95 border border-emerald-500/50 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
                  <p className="text-xs font-bold text-emerald-400 mb-3">
                    🎯 Bu Görev Kimin İçin?
                  </p>
                  <ul className="space-y-2">
                    {service.suitableFor.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-slate-300 flex items-center gap-2"
                      >
                        <span className="text-emerald-400">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
