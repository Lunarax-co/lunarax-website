'use client';

import { useState } from 'react';

type SelectionType = 'problem' | 'solution' | null;

export function ComparisonSelector() {
  const [selected, setSelected] = useState<SelectionType>(null);

  return (
    <div className="comparison-selector-wrapper">
      <h2>Aynı Ön Muhasebe İşleri. Daha Az Risk. Daha Fazla Kontrol.</h2>
      
      <div className="comparison-toggle-buttons">
        <button
          className={`toggle-btn ${selected === 'problem' ? 'active' : ''}`}
          onClick={() => setSelected(selected === 'problem' ? null : 'problem')}
        >
          Personel ile Çalışırken
        </button>
        <button
          className={`toggle-btn ${selected === 'solution' ? 'active' : ''}`}
          onClick={() => setSelected(selected === 'solution' ? null : 'solution')}
        >
          Lunarax Modeli
        </button>
      </div>

      <div className="split-layout">
        <div className={`split-column problem ${selected === 'problem' || selected === null ? 'visible' : 'hidden'}`}>
          <div className="column-badge">Personel ile çalışırken</div>
          <ul className="split-list">
            <li>
              <span className="icon">⚠️</span>
              <div>
                <strong>Maaş, SGK ve yan hak maliyeti</strong>
                <p>Sabit maliyetin dışında kıdem, izin, ikramiye gibi öngörülemeyen yükler</p>
              </div>
            </li>
            <li>
              <span className="icon">🔄</span>
              <div>
                <strong>Personel devir riski</strong>
                <p>İşten ayrılma durumunda yeni eleman bulma, eğitme ve adapte etme süreci</p>
              </div>
            </li>
            <li>
              <span className="icon">⏸️</span>
              <div>
                <strong>Operasyonel aksamalar</strong>
                <p>İzin, hastalık veya istifa durumunda işlerin durması</p>
              </div>
            </li>
            <li>
              <span className="icon">📊</span>
              <div>
                <strong>Yönetim ve kontrol yükü</strong>
                <p>İşe alım, eğitim, performans takibi ve motivasyon yönetimi</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={`split-column solution ${selected === 'solution' || selected === null ? 'visible' : 'hidden'}`}>
          <div className="column-badge">Lunarax Süreç Bazlı Hizmet Modeli</div>
          <ul className="split-list">
            <li>
              <span className="icon">✓</span>
              <div>
                <strong>Sabit ve öngörülebilir aylık hizmet ücreti</strong>
                <p>Yan hak, SGK veya tazminat yükü olmadan belirli aylık ücret</p>
              </div>
            </li>
            <li>
              <span className="icon">👥</span>
              <div>
                <strong>Ekip ve süreç bazlı operasyon</strong>
                <p>İş akışı tanımlı ve ekip tarafından yürütülür, tek kişiye bağlı değil</p>
              </div>
            </li>
            <li>
              <span className="icon">🔒</span>
              <div>
                <strong>Kişiye bağlı risk yok</strong>
                <p>Süreklilik garanti altında, personel sorunu yaşanmaz</p>
              </div>
            </li>
            <li>
              <span className="icon">📈</span>
              <div>
                <strong>Sürekli izleme, kontrol ve raporlama</strong>
                <p>Operasyonel yük Lunarax'ta, siz sonuçları takip edersiniz</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="summary-statement">
        <p>Aynı ön muhasebe işleri. Daha az risk. Daha fazla kontrol.</p>
      </div>
    </div>
  );
}
