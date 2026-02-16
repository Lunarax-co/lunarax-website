'use client';

import { useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';
import Link from 'next/link';

const missions = [
  {
    id: 'learnProcess' as const,
    title: 'Süreç Bazlı Modeli Öğrenin',
    description: 'LunaraX\'in operasyonları nasıl yönettiğini öğrenin',
    icon: '📋',
    link: '#nasil-calisir',
  },
  {
    id: 'discoverRisk' as const,
    title: 'Risk Tipinizi Keşfedin',
    description: 'İşletmenize uygun riskleri belirleyin',
    icon: '🎯',
    link: '#nedir',
  },
  {
    id: 'findService' as const,
    title: 'Size Uygun Hizmeti Bulun',
    description: 'İhtiyaçlarınıza göre özelleştirilmiş hizmetleri keşfedin',
    icon: '🚀',
    link: '#hizmetler',
  },
];

export function MissionBoard() {
  const { missionState, completeMission } = useGamification();
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

  const handleMissionClick = (missionId: keyof typeof missionState['missionBoard']) => {
    completeMission(missionId);
    setExpandedMission(missionId);
    setTimeout(() => setExpandedMission(null), 2000);
  };

  return (
    <div className="w-full py-8 bg-gradient-to-b from-slate-900/50 to-transparent rounded-2xl border border-slate-700/30" data-mission-board>
      <div className="px-6 mb-6 text-center">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <svg
            className="h-5 w-5 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="10" rx="5" />
            <path d="M6 12h4" />
            <path d="M8 10v4" />
            <circle cx="17" cy="11" r="1" />
            <circle cx="19" cy="13" r="1" />
          </svg>
          <h3 className="text-xl font-bold text-white">
            Görev Panosu
          </h3>
        </div>
        <p className="text-sm text-slate-400">
          Tüm görevleri tamamlayarak özel içgörülere ulaşın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
        {missions.map((mission) => {
          const isComplete = missionState.missionBoard[mission.id];
          const isExpanded = expandedMission === mission.id;

          return (
            <div
              key={mission.id}
              onClick={() => handleMissionClick(mission.id)}
              className={`
                relative cursor-pointer transition-all duration-500
                ${
                  isExpanded
                    ? 'scale-105 md:col-span-2'
                    : 'hover:scale-102'
                }
              `}
            >
              <a
                href={mission.link}
                onClick={(e) => e.stopPropagation()}
                className={`
                  relative flex flex-col items-center justify-center text-center p-6 rounded-xl border-2 transition-all duration-300 min-h-[280px]
                  ${
                    isComplete
                      ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800/40 border-slate-600/50 hover:border-emerald-500/50 hover:bg-slate-700/40'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center flex-1 w-full gap-3">
                  <div className="text-4xl">{mission.icon}</div>
                  <h4 className="font-bold text-white text-sm leading-snug">
                    {mission.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {isComplete && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                )}

                {isExpanded && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500/30 backdrop-blur-sm animate-in fade-in duration-300">
                    <p className="text-sm font-semibold text-emerald-100">
                      ✨ Görev Tamamlandı!
                    </p>
                  </div>
                )}
              </a>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-300">
            İlerleme
          </span>
          <span className="text-xs text-emerald-400">
            {Object.values(missionState.missionBoard).filter(Boolean).length}/3
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
            style={{
              width: `${(Object.values(missionState.missionBoard).filter(Boolean).length / 3) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* All Missions Complete Message */}
      {missionState.allMissionsComplete && (
        <div className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 rounded-lg">
          <p className="text-sm font-semibold text-emerald-300">
            🎯 All missions complete! Scroll down to unlock exclusive content.
          </p>
        </div>
      )}
    </div>
  );
}

export default MissionBoard;
