'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PARTNERS, getDomainLabel, DOMAINS, type DomainId } from '../../data/partners';
import { EcosystemMap } from './EcosystemMap';
import { PartnerCard } from './PartnerCard';
import { LockedPartnerSlot } from './LockedPartnerSlot';

export const PartnersSection: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);
  const [exploredDomains, setExploredDomains] = useState<Set<DomainId>>(new Set());
  const detailRef = useRef<HTMLDivElement>(null);

  // Filtrelenmiş partnerler
  const filteredPartners = activeDomainId
    ? PARTNERS.filter((p) => p.domains.includes(activeDomainId))
    : [];

  const activeDomainLabel = activeDomainId ? getDomainLabel(activeDomainId) : null;
  const totalDomains = Object.keys(DOMAINS).length;
  const exploredCount = exploredDomains.size;

  // Domain seçildiğinde keşif listesine ekle
  const handleSelectDomain = useCallback((domainId: DomainId | null) => {
    if (domainId) {
      setExploredDomains((prev) => new Set(prev).add(domainId));
    }
    setActiveDomainId(domainId);
  }, []);

  // ESC ile detayı kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDomainId) {
        setActiveDomainId(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeDomainId]);

  // Detay açılınca başlığa scroll
  useEffect(() => {
    if (activeDomainId && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeDomainId]);

  return (
    <section className="w-full">
      {/* HARITA BÖLÜMÜ */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          {/* Başlık */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Ekosistem Haritası
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Bir alanı seçin ve çözüm ortaklarını keşfedin
            </p>
          </div>

          {/* Açıklama */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Güçlü Bir Ekosistemle Çalışıyoruz
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              LunaraX, ön muhasebe ve operasyon yönetiminde farklı uzmanlık alanlarını bir araya getiren 
              çözüm ortaklarıyla birlikte çalışır. 
              <span className="block font-semibold text-white mt-2">
                Doğru problem, doğru uzman, doğru süreç.
              </span>
            </p>
          </div>

          {/* Keşif Sayacı */}
          {exploredCount > 0 && (
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-white/90">
                  Keşif: {exploredCount}/{totalDomains}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Harita */}
        <div className="w-full">
          <EcosystemMap 
            activeDomainId={activeDomainId}
            onSelectDomain={handleSelectDomain}
          />
        </div>
      </div>

      {/* DETAY BÖLÜMÜ - Seçili Domain'e ait partnerler */}
      {activeDomainId && activeDomainLabel && (
        <div 
          ref={detailRef}
          className="w-full pt-16 md:pt-24 pb-16 md:pb-24 border-t border-white/10"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 21, 32, 0.5) 0%, rgba(13, 31, 45, 0.5) 100%)',
          }}
        >
          <div className="mx-auto max-w-6xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Başlık */}
            <div className="flex items-center justify-between mb-12 gap-4">
              <div className="flex-1">
                <h3 
                  className="text-2xl md:text-3xl font-bold text-white mb-2 outline-none"
                  tabIndex={-1}
                >
                  {activeDomainLabel}
                </h3>
                <p className="text-white/60 text-sm">
                  Bu alanda LunaraX, alanında uzman çözüm ortaklarıyla birlikte çalışır.
                </p>
              </div>
              <button
                onClick={() => setActiveDomainId(null)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Paneli kapat"
                title="ESC'ye de basabilirsiniz"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Partner Kartları */}
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {filteredPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-white/60">
                  Bu alanda yakında yeni çözüm ortakları eklenecek.
                </p>
              </div>
            )}

            {/* Kilitli Alanlar - Ekosistemi Genişletiyoruz */}
            {filteredPartners.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-6 font-medium">
                  🔒 Yeni çözüm ortakları yakında açılacak
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LockedPartnerSlot />
                  <LockedPartnerSlot />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="py-12 md:py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Her çözüm ortağı LunaraX süreç standartlarına göre çalışır. 
            Bu sayede müşterilerimiz tutarlı, kaliteli ve güvenilir hizmet alır.
          </p>
        </div>
      </div>
    </section>
  );
};
