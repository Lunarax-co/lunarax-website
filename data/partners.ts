/**
 * PARTNER DATA MODEL - Sıfırdan Kurulu
 * ID/Label karışması YOK. Domain'ler SADECE ID ile tutulur.
 */

// ============================================================================
// DOMAIN SABİTLERİ (TEK KAYNAK) - AÇILAR + LABELS UNIFIED
// ============================================================================
export const DOMAINS = {
  STRATEGY: {
    id: 'strategy',
    label: 'Stratejik Danışmanlık',
    shortLabel: 'Stratejik',
    hint: 'Yol haritası, büyüme ve karar mimarisi.',
    icon: '🎯',
    angleDeg: -162,  // 288° (Sol)
  },
  LEGAL: {
    id: 'legal',
    label: 'Hukuki Destek',
    shortLabel: 'Hukuki',
    hint: 'Sözleşmeler, uyum, risk yönetimi.',
    icon: '⚖️',
    angleDeg: -90,   // Üst
  },
  INTERNATIONAL: {
    id: 'international',
    label: 'Uluslararası Operasyon',
    shortLabel: 'Uluslararası',
    hint: 'Yurtdışı süreçler, yapı ve operasyon.',
    icon: '🌍',
    angleDeg: 54,    // 144° (Sağ üst)
  },
  FINANCE: {
    id: 'finance',
    label: 'Finansal & Operasyonel Danışmanlık',
    shortLabel: 'Finans',
    hint: 'KPI, mali mimari, süreç verimliliği.',
    icon: '💼',
    angleDeg: 126,   // 216° (Sol alt)
  },
  DIGITAL: {
    id: 'digital',
    label: 'Dijital Süreç Tasarımı',
    shortLabel: 'Dijital',
    hint: 'Otomasyon, iş akışı, dijital dönüşüm.',
    icon: '⚡',
    angleDeg: -18,   // 72° (Sağ alt)
  },
} as const;

export type DomainId = typeof DOMAINS[keyof typeof DOMAINS]['id'];
export type PartnerLevel = 'CORE' | 'SOLUTION' | 'STRATEGIC';

// ============================================================================
// PARTNER MODELI
// ============================================================================
export type Partner = {
  id: string;
  name: string;
  level: PartnerLevel;
  domains: DomainId[];
  problems: string[];
  descriptionShort?: string;
};

// ============================================================================
// PARTNER VERİSİ (6+ kayıt)
// ============================================================================
export const PARTNERS: Partner[] = [
  {
    id: 'partner-acme',
    name: 'ACME Consulting',
    level: 'CORE',
    domains: ['strategy', 'finance'],
    problems: [
      'Operasyonel maliyetleri %30 azaltmak istiyorum',
      'Büyüme stratejisi için veri analizi gerekiyor',
    ],
    descriptionShort: 'Lider danışmanlık ve finansal mimari',
  },
  {
    id: 'partner-legaltech',
    name: 'LegalTech Pro',
    level: 'SOLUTION',
    domains: ['legal', 'digital'],
    problems: [
      'Uyum risklerini önlemek gerekiyor',
      'Sözleşme yönetimi otomasyonu',
    ],
    descriptionShort: 'Hukuki ve dijital uyum çözümleri',
  },
  {
    id: 'partner-globex',
    name: 'Globex International',
    level: 'CORE',
    domains: ['international', 'strategy'],
    problems: [
      'Yurtdışı genişleme planlaması',
      'Çok ülkeli operasyon yapılandırması',
    ],
    descriptionShort: 'Global operasyon ve ekspansiyon',
  },
  {
    id: 'partner-fintech',
    name: 'FinTech Solutions',
    level: 'SOLUTION',
    domains: ['finance', 'digital'],
    problems: [
      'Mali sistemleri modernize etmek',
      'Muhasebe otomasyonu',
    ],
    descriptionShort: 'Mali teknoloji ve otomasyon',
  },
  {
    id: 'partner-processai',
    name: 'ProcessAI',
    level: 'STRATEGIC',
    domains: ['digital'],
    problems: [
      'Ön muhasebe süreçlerini otomate etmek',
      'İş akışı optimizasyonu',
    ],
    descriptionShort: 'Yapay zeka destekli süreç tasarımı',
  },
  {
    id: 'partner-stratex',
    name: 'Stratex Advisors',
    level: 'CORE',
    domains: ['strategy'],
    problems: [
      'Organizasyonel yapı yeniden tasarlamak',
      'KPI ve hedef belirleme',
    ],
    descriptionShort: 'Stratejik dönüşüm ve planlama',
  },
];

// ============================================================================
// HELPERS
// ============================================================================
export function getDomainLabel(domainId: DomainId): string {
  const entry = Object.values(DOMAINS).find((d) => d.id === domainId);
  return entry?.label || domainId;
}

export function getDomainHint(domainId: DomainId): string {
  const entry = Object.values(DOMAINS).find((d) => d.id === domainId);
  return entry?.hint || '';
}
