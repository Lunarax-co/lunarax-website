'use client';

import { useState } from 'react';

interface Expert {
  id: string;
  name: string;
  icon: string;
  tooltip: string;
  angle: number;
}

const experts: Expert[] = [
  {
    id: 'legal',
    name: 'Hukuki',
    icon: '⚖️',
    tooltip: 'Ticari hukuk ve sözleşme danışmanlığı',
    angle: 0,
  },
  {
    id: 'digital',
    name: 'Dijital',
    icon: '💻',
    tooltip: 'Teknoloji ve otomasyon çözümleri',
    angle: 72,
  },
  {
    id: 'finance',
    name: 'Finans',
    icon: '💰',
    tooltip: 'Mali yönetim ve muhasebe desteği',
    angle: 144,
  },
  {
    id: 'strategic',
    name: 'Stratejik',
    icon: '🎯',
    tooltip: 'İş geliştirme ve büyüme stratejisi',
    angle: 216,
  },
  {
    id: 'international',
    name: 'Uluslararası',
    icon: '🌍',
    tooltip: 'Global açılım ve ticaret desteği',
    angle: 288,
  },
];

export function OrbitHub() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [hoveredExpert, setHoveredExpert] = useState<string | null>(null);

  const radius = 180;

  return (
    <div className="w-full py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          🛸 LunaraX Ekosistem Hub
        </h2>
        <p className="text-slate-400">
          5 uzmanlık alanını keşfedin
        </p>
      </div>

      {/* Mobile Fallback */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory">
          {experts.map((expert) => (
            <button
              key={expert.id}
              onClick={() => setSelectedExpert(selectedExpert === expert.id ? null : expert.id)}
              className={`
                min-w-[220px] snap-start p-4 rounded-xl border transition-all text-left
                ${
                  selectedExpert === expert.id
                    ? 'bg-emerald-500/20 border-emerald-500/60'
                    : 'bg-slate-800/60 border-slate-600/50'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{expert.icon}</span>
                <p className="text-sm font-bold text-white">{expert.name}</p>
              </div>
              <p className="text-xs text-slate-300">
                {expert.tooltip}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Orbit Container */}
      <div className="hidden md:flex justify-center">
        <div className="relative w-full max-w-2xl aspect-square will-change-[transform]">
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="text-5xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Luna<span className="text-amber-400">raX</span>
              </div>
              <p className="text-xs text-slate-400">Hub</p>
            </div>
          </div>

          {/* Orbit Circle (visual) */}
          <div className="absolute inset-0 border border-dashed border-slate-600/30 rounded-full" />

          {/* Expert Nodes */}
          {experts.map((expert) => {
            const rad = (expert.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            const isSelected = selectedExpert === expert.id;
            const isHovered = hoveredExpert === expert.id;
            const isActive = isSelected || isHovered;

            return (
              <div
                key={expert.id}
                className="absolute w-full h-full will-change-[transform]"
                style={{
                  transform: `translate(calc(50% + ${x}px - 50%), calc(50% + ${y}px - 50%))`,
                }}
              >
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transform-gpu will-change-[transform]"
                  onMouseEnter={() => setHoveredExpert(expert.id)}
                  onMouseLeave={() => setHoveredExpert(null)}
                  onClick={() => setSelectedExpert(isSelected ? null : expert.id)}
                >
                  {/* Card */}
                  <div
                    className={`
                      p-4 rounded-xl transition-all duration-300 transform
                      ${
                        isActive
                          ? 'scale-110 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border-2 border-emerald-500 shadow-lg shadow-emerald-500/50'
                          : 'bg-slate-800/60 border border-slate-600/50 hover:border-emerald-500/50'
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">{expert.icon}</div>
                    <p className="text-xs font-bold text-white text-center">
                      {expert.name}
                    </p>
                  </div>

                  {/* Tooltip */}
                  {isActive && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 border border-emerald-500/50 rounded-lg px-3 py-2 z-30 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="text-xs text-emerald-300 font-semibold">
                        {expert.tooltip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-400">
          💡 Bir alana tıklayıp, uzman bilgisine erişin
        </p>
      </div>
    </div>
  );
}
