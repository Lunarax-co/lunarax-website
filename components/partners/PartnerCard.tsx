'use client';

import React, { useState } from 'react';
import { getDomainLabel, type Partner } from '../../data/partners';
import { PartnerBadge } from './PartnerBadge';

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const [showModal, setShowModal] = useState(false);

  // Initials avatar
  const initials = partner.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="p-5 rounded-xl bg-white/8 border border-white/20 hover:bg-white/12 hover:border-white/30 hover:shadow-lg transition-all duration-200 cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-4 flex-shrink-0 border border-white/20">
          <span className="text-base font-bold text-white">{initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-white group-hover:text-white/90 transition-colors">
              {partner.name}
            </h4>
            <PartnerBadge level={partner.level} />
          </div>
          <p className="text-xs text-white/60 mb-3 line-clamp-2">
            {partner.descriptionShort}
          </p>
          <div className="flex flex-wrap gap-1">
            {partner.domains.map((domainId) => (
              <span key={domainId} className="text-xs px-2 py-0.5 bg-white/10 text-white/70 rounded-full">
                {getDomainLabel(domainId).split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Keşfet Button */}
        <button
          className="w-full mt-4 px-3 py-2 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-semibold transition-all duration-200 border border-white/20 hover:border-white/40"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
        >
          Keşfet
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#0D1F2D] border border-white/20 rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3D7A6A] to-[#2D5A4A] flex items-center justify-center border border-white/20">
                  <span className="text-xs font-bold text-white">{initials}</span>
                </div>
                <h2 id="modal-title" className="text-lg font-bold text-white">
                  {partner.name}
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-white/70 mb-6 text-sm">
              {partner.descriptionShort}
            </p>

            {/* Problems */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                Bu partner hangi problemde devreye girer?
              </h3>
              <ul className="space-y-2">
                {partner.problems.map((problem, i) => (
                  <li key={i} className="flex gap-2 text-sm text-white/70">
                    <span className="text-[#EAB308] flex-shrink-0">•</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Steps */}
            <div className="mb-6 bg-white/5 border border-white/20 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-lg">⚙️</span>
                Bu alanda nasıl birlikte çalışıyoruz?
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-[#EAB308] w-6 h-6 rounded-full bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">1</span>
                  <span className="text-white/70"><strong className="text-white">Problem netleştirme:</strong> Sizin ihtiyaçlarınızı derinlemesine anlıyoruz</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#EAB308] w-6 h-6 rounded-full bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">2</span>
                  <span className="text-white/70"><strong className="text-white">Uzman eşleştirme:</strong> İhtiyacınıza göre en uygun partneri seçiyoruz</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#EAB308] w-6 h-6 rounded-full bg-[#EAB308]/20 flex items-center justify-center flex-shrink-0">3</span>
                  <span className="text-white/70"><strong className="text-white">Süreç takibi:</strong> Sonuçları ölçüyoruz, optimize ediyoruz</span>
                </li>
              </ol>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
};
