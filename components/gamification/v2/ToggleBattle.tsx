'use client';

import { useEffect, useState } from 'react';

type SideType = 'personal' | 'lunarax' | null;

const sides = {
  personal: {
    title: 'Personel ile Çalışırken',
    icon: '👤',
    items: [
      { title: 'Maaş, SGK ve yan hak maliyeti', desc: 'Sabit maliyetin dışında kıdem, izin, ikramiye' },
      { title: 'Personel devir riski', desc: 'İşten ayrılma durumunda iş akışı kesintisi' },
      { title: 'Operasyonel aksamalar', desc: 'İzin, hastalık veya istifa durumunda durgunluk' },
      { title: 'Yönetim ve kontrol yükü', desc: 'İşe alım, eğitim, performans takibi' },
    ],
  },
  lunarax: {
    title: 'LunaraX Süreç Bazlı Model',
    icon: '🚀',
    items: [
      { title: 'Sabit ve öngörülebilir aylık ücret', desc: 'Yan hak yükü olmaksızın belirli aylık hizmet ücreti' },
      { title: 'Ekip ve süreç bazlı operasyon', desc: 'İş akışı tanımlı ve ekip tarafından yönetilir' },
      { title: 'Kişiye bağlı risk yok', desc: 'Süreklilik garanti altında, personel sorunu yaşanmaz' },
      { title: 'Sürekli izleme, kontrol ve raporlama', desc: 'Operasyonel yük LunaraX\'ta, siz sonuçları takip edersiniz' },
    ],
  },
};

const STORAGE_KEY = 'lunarax-toggle-battle';

export function ToggleBattle() {
  const [selectedSide, setSelectedSide] = useState<SideType>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'personal' || stored === 'lunarax') {
      setSelectedSide(stored);
    }
  }, []);

  useEffect(() => {
    if (selectedSide) {
      window.localStorage.setItem(STORAGE_KEY, selectedSide);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedSide]);

  return (
    <div className="w-full py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Hangisini Yaşıyorsunuz?
        </h2>
        <p className="text-slate-400 mb-6">
          Seçerek kendi durumunuzu daha net göreceksiniz
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-12">
        <div className="flex gap-4 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
          {(['personal', 'lunarax'] as const).map((side) => (
            <button
              key={side}
              onClick={() => setSelectedSide(selectedSide === side ? null : side)}
              className={`
                px-6 py-2 rounded-md font-semibold transition-all duration-300
                ${
                  selectedSide === side
                    ? side === 'personal'
                      ? 'bg-red-500/30 text-red-200 border border-red-500/50'
                      : 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50'
                    : 'bg-transparent text-slate-400 hover:text-slate-200'
                }
              `}
            >
              <span className="mr-2">{sides[side].icon}</span>
              {side === 'personal' ? 'Personel' : 'LunaraX'}
            </button>
          ))}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Personal Side */}
        <div
          className={`
            transition-all duration-500 transform
            ${
              selectedSide === 'lunarax'
                ? 'opacity-30 scale-95'
                : 'opacity-100 scale-100'
            }
          `}
        >
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{sides.personal.icon}</span>
              <h3 className="text-lg font-bold text-white">
                {sides.personal.title}
              </h3>
            </div>
            <div className="space-y-4">
              {sides.personal.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-red-500/50 hover:border-red-500 transition-all"
                >
                  <p className="font-semibold text-white text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lunarax Side */}
        <div
          className={`
            transition-all duration-500 transform
            ${
              selectedSide === 'personal'
                ? 'opacity-30 scale-95'
                : 'opacity-100 scale-100'
            }
          `}
        >
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{sides.lunarax.icon}</span>
              <h3 className="text-lg font-bold text-white">
                {sides.lunarax.title}
              </h3>
            </div>
            <div className="space-y-4">
              {sides.lunarax.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-emerald-500/50 hover:border-emerald-500 transition-all"
                >
                  <p className="font-semibold text-white text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedSide && (
        <div className="mt-8 text-center animate-in fade-in duration-300">
          <p className="text-sm text-slate-400 mb-3">
            {selectedSide === 'personal'
              ? '⚠️ Maaş ve yönetim yükünden kurtulmak ister misiniz?'
              : '✨ Sorunların çözümü için hazır mısınız?'}
          </p>
        </div>
      )}
    </div>
  );
}
