'use client';

import { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: 'İhtiyaç ve Operasyonel Yapı Analizi',
    description: 'İşletmenizin ön muhasebe ihtiyaçları, işlem hacmi ve beklentileri değerlendirilir',
  },
  {
    number: 2,
    title: 'Süreç Tasarımı ve Sistem Kurulumu',
    description: 'İş akışları tanımlanır, sistemler kurulur, entegrasyonlar sağlanır',
  },
  {
    number: 3,
    title: 'Operasyonun Lunarax Tarafından Devralınması',
    description: 'Tanımlı süreçler Lunarax ekibi tarafından yönetilmeye başlanır',
  },
  {
    number: 4,
    title: 'Sürekli İzleme, Kontrol ve Raporlama',
    description: 'Düzenli takip, kontrol ve raporlama ile sürdürülebilir süreç yönetimi',
  },
];

export function MissionTracker() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showBadge, setShowBadge] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNumber = parseInt(entry.target.getAttribute('data-step') || '0');
            if (!completedSteps.includes(stepNumber)) {
              setCompletedSteps((prev) => {
                const newSteps = [...prev, stepNumber].sort();
                if (stepNumber === 4 && !showBadge) {
                  setTimeout(() => setShowBadge(true), 500);
                }
                return newSteps;
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [completedSteps, showBadge]);

  return (
    <div className="mission-tracker-wrapper">
      <h2>Süreç Nasıl İşliyor?</h2>
      <p className="section-subtitle">Dört aşamalı kurulum ve devralma süreci</p>

      <div className="mission-timeline">
        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => { stepRefs.current[index] = el; }}
            data-step={step.number}
            className={`mission-step ${completedSteps.includes(step.number) ? 'completed' : ''}`}
          >
            <div className="step-checkpoint">
              <div className="step-circle">
                {completedSteps.includes(step.number) ? (
                  <span className="step-check">✓</span>
                ) : (
                  <span className="step-num">{step.number}</span>
                )}
              </div>
              {index < steps.length - 1 && <div className="step-connector" />}
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showBadge && (
        <div className="congratulations-badge">
          <div className="badge-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 21h8" />
              <path d="M12 17v4" />
              <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" />
              <path d="M5 6H3a3 3 0 0 0 3 3" />
              <path d="M19 6h2a3 3 0 0 1-3 3" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>Süreç Hazır!</strong>
            <p>Tüm adımları tamamladınız</p>
          </div>
        </div>
      )}

      <div className="process-summary">
        <p>Şirket personel yönetmez. LunaraX süreci yönetir.</p>
      </div>
    </div>
  );
}
