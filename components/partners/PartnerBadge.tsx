'use client';

import React from 'react';
import { type PartnerLevel } from '../../data/partners';

interface PartnerBadgeProps {
  level: PartnerLevel;
}

const levelConfig: Record<PartnerLevel, { label: string; bgColor: string; textColor: string }> = {
  CORE: { label: 'Core Partner', bgColor: 'bg-emerald-500/20', textColor: 'text-emerald-300' },
  SOLUTION: { label: 'Solution Partner', bgColor: 'bg-blue-500/20', textColor: 'text-blue-300' },
  STRATEGIC: { label: 'Strategic Partner', bgColor: 'bg-purple-500/20', textColor: 'text-purple-300' },
};

export const PartnerBadge: React.FC<PartnerBadgeProps> = ({ level }) => {
  const config = levelConfig[level];
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  );
};
