'use client';

import { useState, useEffect, useRef } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: 'Hizmet Uygunluk Testi',
    description: 'İşletmenizin ihtiyaçları hızlıca analiz edilir ve uygunluk testi yapılır.',
  },
  {
    number: 2,
    title: 'Test Sonucu Değerlendirme',
    description: 'Sonuç uygun ise danışmanlık sürecine yönlendirilir; uygun değilse size özel yönlendirme notu hazırlanır.',
  },
  {
    number: 3,
    title: 'Danışmanlık Seçimi',
    description: 'Danışmanlık için iki seçenek sunulur: 1) Formu doldur 2) Hızlı iletişim.',
  },
  {
    number: 4,
    title: 'Sistem Kurulumu',
    description: 'İş akışları tanımlanır ve sistem kurulumu tamamlanır.',
  },
  {
    number: 5,
    title: 'Operasyon Yönetimi',
    description: 'Operasyon LunaraX ekibi tarafından yönetilmeye başlanır.',
  },
];

export function RPGMissionTracker() {
  const { missionState, completeMission } = useGamification();
  const isMissionUnlocked = missionState.missionBoard.learnProcess;
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalBadge, setShowFinalBadge] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Otomatik simulasyon fonksiyonu
  const startSimulation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCompletedSteps([]);
    setShowFinalBadge(false);

    // Step 1 → 1 saniye sonra
    setTimeout(() => {
      setCompletedSteps([1]);
    }, 1000);

    // Step 2 → 2 saniye sonra
    setTimeout(() => {
      setCompletedSteps([1, 2]);
    }, 2000);

    // Step 3 → 3 saniye sonra
    setTimeout(() => {
      setCompletedSteps([1, 2, 3]);
    }, 3000);

    // Step 4 → 4 saniye sonra
    setTimeout(() => {
      setCompletedSteps([1, 2, 3, 4]);
    }, 4000);

    // Step 5 → 5 saniye sonra
    setTimeout(() => {
      setCompletedSteps([1, 2, 3, 4, 5]);
    }, 5000);

    // "Süreç Hazır!" rozeti → 5.5 saniye sonra
    setTimeout(() => {
      setShowFinalBadge(true);
      setIsAnimating(false);
    }, 5500);
  };

  useEffect(() => {
    // Görev açıldığında otomatik simulasyon başlat
    if (isMissionUnlocked && completedSteps.length === 0 && !showFinalBadge) {
      startSimulation();
    }
  }, [isMissionUnlocked]);

  return (
    <div className="w-full py-12" data-rpg-section>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="h-6 w-6 text-emerald-400"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Süreç Nasıl İşliyor?
            </h2>
          </div>
          <p className="text-slate-400">
            5 adımlı RPG-tarzı görev takiplemesi
          </p>
        </div>

        {/* Locked Message */}
        {!isMissionUnlocked && (
          <div className="mb-8 p-6 bg-slate-800/50 border-2 border-slate-600/50 rounded-xl text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-bold text-slate-300 mb-2">
              Bu Bölüm Kilitli
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Süreç simulasyonunu başlatmak için aşağıdaki görevi tamamlayın:
            </p>
            <button
              onClick={() => {
                // Görevi otomatik tamamla
                completeMission('learnProcess');
                
                // 300ms sonra bu bölüme yumuşak scroll yap
                setTimeout(() => {
                  const rpgSection = document.querySelector('[data-rpg-section]');
                  if (rpgSection) {
                    rpgSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 300);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
            >
              <span>▶️</span>
              <span>Süreç Simulasyonunu Başlat</span>
            </button>
            <p className="text-xs text-slate-500 mt-3">
              Butona tıklayarak adım adım süreç animasyonunu izleyin
            </p>
          </div>
        )}

        {/* Mission Timeline */}
        <div className={`space-y-8 ${!isMissionUnlocked ? 'opacity-30 pointer-events-none' : ''}`}>
          {steps.map((step, idx) => {
            const isCompleted = isMissionUnlocked && completedSteps.includes(step.number);
            return (
              <div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                data-step={step.number}
                className={`
                  animate-in slide-in-from-left duration-500 transition-all
                  ${isCompleted ? 'opacity-100' : 'opacity-40'}
                `}
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Step Circle */}
                  <div className="flex-shrink-0">
                    <div
                      className={`
                        w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-base sm:text-xl font-bold transition-all duration-500
                        ${
                          isCompleted
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 scale-110'
                            : 'bg-slate-800 text-slate-400 border-2 border-slate-600'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <span className="animate-pulse">✓</span>
                      ) : (
                        <span>{step.number}</span>
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3
                      className={`
                        text-lg font-bold mb-2 transition-colors
                        ${isCompleted ? 'text-emerald-400' : 'text-white'}
                      `}
                    >
                      Step {step.number}: {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {step.description}
                    </p>

                    {/* Connector Line */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`
                          w-1 h-10 sm:h-12 mt-4 sm:mt-6 ml-6 sm:ml-8 transition-all duration-700
                          ${
                            isCompleted
                              ? 'bg-gradient-to-b from-emerald-500 to-slate-600'
                              : 'bg-slate-700'
                          }
                        `}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Badge */}
        {isMissionUnlocked && showFinalBadge && (
          <div className="mt-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="inline-block p-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/50 rounded-2xl">
              <div className="text-6xl mb-4 animate-bounce">🏁</div>
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                Süreç Hazır!
              </h3>
              <p className="text-emerald-200 text-sm">
                Tüm görevleri tamamladınız. Şimdi hizmet uygunluk testine başlayabilirsiniz.
              </p>
              <a
                href="#hizmet-uygunluk-testi"
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById('hizmet-uygunluk-testi');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span>🧪</span>
                <span>Hizmet Uygunluk Testine Başla</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
