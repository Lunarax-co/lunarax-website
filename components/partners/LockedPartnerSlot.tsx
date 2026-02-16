'use client';

import Link from 'next/link';

export const LockedPartnerSlot: React.FC = () => (
  <Link 
    href="/partner-basvuru"
    className="flex items-center justify-center p-6 rounded-lg bg-white/5 border border-dashed border-white/30 hover:border-white/50 hover:bg-white/10 min-h-[120px] transition-all duration-200 group"
  >
    <div className="text-center">
      <p className="text-sm font-semibold text-white/60 group-hover:text-white/80 flex items-center gap-2 justify-center transition-colors">
        <span className="text-lg">🔒</span>
        Yakında Açılacak
      </p>
      <p className="text-xs text-white/40 group-hover:text-white/60 mt-1 transition-colors">
        Ekosistemimizi genişletiyoruz
      </p>
    </div>
  </Link>
);
