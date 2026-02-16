'use client';

import { useState } from 'react';

interface MissionObjective {
  id: string;
  title: string;
  icon: string;
  link: string;
}

const objectives: MissionObjective[] = [
  {
    id: 'learn-process',
    title: 'Süreç Bazlı Yapıyı Öğren',
    icon: '📋',
    link: '#nasil-calisir',
  },
  {
    id: 'find-risk',
    title: 'Risk Tipini Bul',
    icon: '🎯',
    link: '#nedir',
  },
  {
    id: 'discover-service',
    title: 'İdeal Hizmeti Keşfet',
    icon: '🔍',
    link: '#hizmetler',
  },
];

export function HeroMission() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="hero-mission-container">
      <h3 className="hero-mission-title">Misyonunuzu Seçin</h3>
      <div className="hero-mission-grid">
        {objectives.map((objective) => (
          <a
            key={objective.id}
            href={objective.link}
            className={`hero-mission-card ${hoveredId === objective.id ? 'active' : ''}`}
            onMouseEnter={() => setHoveredId(objective.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="mission-icon">{objective.icon}</div>
            <div className="mission-title">{objective.title}</div>
            <div className="mission-checkmark">✓</div>
          </a>
        ))}
      </div>
    </div>
  );
}
