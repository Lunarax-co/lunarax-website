'use client';

import { useState } from 'react';

export function LockToggle() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="what-is-gamified">
      <div className="what-clarify">
        <div className="clarify-item">
          <span className="clarify-icon">✗</span>
          <p>Lunarax bir yazılım değildir.</p>
        </div>
        <div className="clarify-item">
          <span className="clarify-icon">✗</span>
          <p>Lunarax klasik bir dış kaynak kullanım hizmeti değildir.</p>
        </div>
      </div>

      <div className="what-definition">
        <div className="lock-header">
          <h2>Lunarax Nedir?</h2>
          <button
            className={`lock-toggle-btn ${isUnlocked ? 'unlocked' : 'locked'}`}
            onClick={() => setIsUnlocked(!isUnlocked)}
            aria-label={isUnlocked ? 'Kilitle' : 'Kilidi Aç'}
          >
            {isUnlocked ? '🔓' : '🔒'}
          </button>
        </div>
        
        <div className={`definition-content ${isUnlocked ? 'revealed' : 'hidden'}`}>
          <p className="definition-text">
            Lunarax, operasyonları tanımlı iş akışları ve uzman ekipler aracılığıyla uçtan uca yöneten,
            sorumluluk ve sonuçlara tamamen sahip çıkan <strong>süreç bazlı bir ön muhasebe hizmet modelidir</strong>.
          </p>
        </div>

        {!isUnlocked && (
          <div className="definition-placeholder">
            <p>Tanımı görmek için kilidi açın 🔒</p>
          </div>
        )}
      </div>
    </div>
  );
}
