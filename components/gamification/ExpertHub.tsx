'use client';

import { useState } from 'react';

interface ExpertCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

const expertCards: ExpertCard[] = [
  {
    id: 'legal',
    title: 'Hukuki Danışmanlık',
    icon: '⚖️',
    description: 'Ticari ve şirket hukuku desteği',
    skills: ['Sözleşme Yönetimi', 'Uyuşmazlık Çözümü', 'Şirket Kuruluşu'],
  },
  {
    id: 'digital',
    title: 'Dijital Dönüşüm',
    icon: '💻',
    description: 'Teknoloji ve otomasyon çözümleri',
    skills: ['Sistem Entegrasyonu', 'Otomasyon', 'Dijital Strateji'],
  },
  {
    id: 'finance',
    title: 'Finans & Muhasebe',
    icon: '💰',
    description: 'Mali yönetim ve raporlama',
    skills: ['Mali Analiz', 'Raporlama', 'Bütçe Yönetimi'],
  },
  {
    id: 'strategic',
    title: 'Stratejik Danışmanlık',
    icon: '🎯',
    description: 'İş geliştirme ve büyüme stratejileri',
    skills: ['Büyüme Stratejisi', 'Pazar Analizi', 'İş Modeli'],
  },
  {
    id: 'international',
    title: 'Uluslararası Operasyon',
    icon: '🌍',
    description: 'Global açılım ve yurtdışı yapılanma',
    skills: ['Yurtdışı Şirket', 'Uluslararası Ticaret', 'Global Uyum'],
  },
];

export function ExpertHub() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="expert-hub-container">
      <div className="hub-center">
        <div className="hub-logo">
          <span>Luna</span>
          <span className="hub-n">r</span>
          <span>aX</span>
        </div>
        <p className="hub-tagline">Hub</p>
      </div>

      <div className="expert-cards-orbit">
        {expertCards.map((card, index) => (
          <div
            key={card.id}
            className={`expert-card-wrapper orbit-position-${index + 1}`}
          >
            <div
              className={`expert-skill-card ${selectedCard === card.id ? 'selected' : ''}`}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="expert-card-icon">{card.icon}</div>
              <div className="expert-card-title">{card.title}</div>

              {(hoveredCard === card.id || selectedCard === card.id) && (
                <div className="expert-tooltip">
                  <div className="tooltip-header">{card.description}</div>
                  <div className="tooltip-skills">
                    {card.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
