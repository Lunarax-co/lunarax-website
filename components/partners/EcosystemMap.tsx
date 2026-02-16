'use client';

import React, { useState, useRef, useMemo } from 'react';
import { DOMAINS, type DomainId } from '../../data/partners';

interface EcosystemMapProps {
  activeDomainId: DomainId | null;
  onSelectDomain: (domainId: DomainId | null) => void;
}

export const EcosystemMap: React.FC<EcosystemMapProps> = ({
  activeDomainId,
  onSelectDomain,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<DomainId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const domainArray = Object.values(DOMAINS);
  const RADIUS = 300; // Sabit yarıçap - lines ve buttons için

  // Lines ve buttons endpoints'ı hesapla (unified)
  const endpointsData = useMemo(() => {
    if (!containerRef.current) return [];
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const hubX = width / 2;
    const hubY = height / 2;

    return domainArray.map((domain) => {
      const angleRad = (domain.angleDeg * Math.PI) / 180;
      const nodeX = hubX + RADIUS * Math.cos(angleRad);
      const nodeY = hubY + RADIUS * Math.sin(angleRad);

      return {
        id: domain.id,
        x1: hubX,
        y1: hubY,
        x2: nodeX,
        y2: nodeY,
        buttonX: nodeX,
        buttonY: nodeY,
      };
    });
  }, [domainArray, RADIUS]);

  const handleNodeClick = (domainId: DomainId) => {
    onSelectDomain(activeDomainId === domainId ? null : domainId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, domainId: DomainId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeClick(domainId);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] md:min-h-[620px]"
      style={{
        background: 'linear-gradient(135deg, #0F2A47 0%, #0A1520 50%, #0D1F2D 100%)',
      }}
    >
      {/* SVG Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#A89968" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Lines from hub to each node endpoint */}
        {endpointsData.map((endpoint) => {
          const isActive = activeDomainId === endpoint.id;
          return (
            <line
              key={`line-${endpoint.id}`}
              x1={endpoint.x1}
              y1={endpoint.y1}
              x2={endpoint.x2}
              y2={endpoint.y2}
              stroke="#22c55e"
              strokeWidth={isActive ? '2' : '1.5'}
              opacity={isActive ? 0.85 : 0.6}
              strokeLinecap="round"
              className={isActive ? 'ecosystem-line ecosystem-line--active' : 'ecosystem-line'}
            />
          );
        })}
      </svg>

      {/* Hub - Center */}
      <div
        className="absolute z-20 w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #5B4F99 0%, #3B3F7F 100%)',
          boxShadow:
            '0 0 40px rgba(91, 79, 153, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-white">LunaraX</div>
          <div className="text-xs text-white/60 mt-1">Hub</div>
        </div>
      </div>

      {/* Domain Buttons - Positioned at line endpoints via polar coordinates */}
      {endpointsData.map((endpoint) => {
        const domain = domainArray.find((d) => d.id === endpoint.id);
        if (!domain) return null;

        const isActive = activeDomainId === endpoint.id;
        const isHovered = hoveredNodeId === endpoint.id;

        return (
          <button
            key={`button-${endpoint.id}`}
            onClick={() => handleNodeClick(endpoint.id)}
            onMouseEnter={() => setHoveredNodeId(endpoint.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
            onKeyDown={(e) => handleKeyDown(e, endpoint.id)}
            className={`
              absolute z-10
              w-24 h-24 rounded-2xl
              flex flex-col items-center justify-center gap-2
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#0A1520]
              ${isActive || isHovered ? 'scale-110' : 'scale-100'}
              ${isActive ? 'shadow-2xl' : isHovered ? 'shadow-lg' : ''}
            `}
            style={{
              left: `${endpoint.buttonX}px`,
              top: `${endpoint.buttonY}px`,
              transform: 'translate(-50%, -50%)',
              background: isActive || isHovered ? '#ffffff' : '#f8f8f8',
              boxShadow: isActive
                ? '0 0 30px rgba(212, 175, 55, 0.4)'
                : isHovered
                  ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                  : '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            aria-label={domain.label}
            aria-pressed={isActive}
            title={domain.hint}
          >
            {/* Icon */}
            <span className="text-3xl">{domain.icon}</span>

            {/* Label */}
            <span
              className={`text-[10px] font-semibold text-center leading-tight px-1 ${
                isActive ? 'text-blue-700' : 'text-gray-700'
              }`}
            >
              {domain.shortLabel}
            </span>
          </button>
        );
      })}

      <style jsx>{`
        .ecosystem-line {
          animation: ledPulse 1.8s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.55));
        }

        .ecosystem-line--active {
          animation-duration: 1.2s;
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.85));
        }

        @keyframes ledPulse {
          0% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.95;
          }
          100% {
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
};
