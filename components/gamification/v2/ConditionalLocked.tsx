'use client';

import { useGamification } from '@/contexts/GamificationContext';

interface ConditionalLockedProps {
  children: React.ReactNode;
  title: string;
}

export function ConditionalLocked({ children, title }: ConditionalLockedProps) {
  const { missionState } = useGamification();
  const isUnlocked = missionState.allMissionsComplete;
  const completedCount = Object.values(missionState.missionBoard).filter(Boolean).length;
  const totalCount = Object.keys(missionState.missionBoard).length;
  const progressPercent = (completedCount / totalCount) * 100;

  if (isUnlocked) {
    return (
      <div className="animate-in fade-in duration-500">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border-2 border-dashed border-slate-600/50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🔒</div>
        <h3 className="text-xl font-bold text-white mb-2">{title} Kilitli</h3>
        <p className="text-slate-200 font-semibold mb-2">
          3 görevi tamamla → açılır
        </p>
        <p className="text-slate-400 mb-6">
          İlerleme: {completedCount}/{totalCount}
        </p>

        <div className="max-w-md mx-auto mb-6">
          <div className="h-2 rounded-full bg-slate-700/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {[
            { id: 'learnProcess', label: 'Süreci Öğren' },
            { id: 'discoverRisk', label: 'Risk Tipi' },
            { id: 'findService', label: 'Hizmet' },
          ].map((mission) => (
            <div
              key={mission.id}
              className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${
                  missionState.missionBoard[mission.id as keyof typeof missionState.missionBoard]
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50'
                    : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
                }
              `}
            >
              {missionState.missionBoard[mission.id as keyof typeof missionState.missionBoard]
                ? '✓'
                : '○'}{' '}
              {mission.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
