'use client';

import { useState } from 'react';

export default function LunaCharacter() {
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Speech Bubble */}
      {showMessage && (
        <div className="absolute bottom-full right-0 mb-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-2 border-blue-200">
            <p className="text-sm text-gray-800">
              Merhaba! Ben Luna 🌙<br />
              LunaraX yolculuğunuzda size yardımcı olmak için buradayım! ✨
            </p>
            <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white transform translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Luna Character */}
      <div
        className="relative cursor-pointer transition-transform hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowMessage(!showMessage)}
      >
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          className="drop-shadow-2xl"
        >
          {/* Glow Effect */}
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Glow */}
          <circle cx="60" cy="80" r="50" fill="url(#glow)" className="animate-pulse" />

          {/* Body - Navy Blazer */}
          <path
            d="M 35 80 Q 30 100 30 120 L 30 140 Q 30 145 35 145 L 50 145 L 50 130 L 70 130 L 70 145 L 85 145 Q 90 145 90 140 L 90 120 Q 90 100 85 80 Z"
            fill="#1e3a8a"
            stroke="#0f172a"
            strokeWidth="1"
          />

          {/* White Shirt Collar */}
          <path
            d="M 45 80 L 50 85 L 60 82 L 70 85 L 75 80 L 75 90 L 45 90 Z"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Neck */}
          <rect x="52" y="62" width="16" height="18" fill="#ffd4a3" rx="2" />

          {/* Head */}
          <ellipse
            cx="60"
            cy="50"
            rx="22"
            ry="26"
            fill="#ffd4a3"
            stroke="#ffb366"
            strokeWidth="1"
          />

          {/* Hair */}
          <g filter="url(#softGlow)">
            {/* Hair Back */}
            <path
              d="M 38 45 Q 32 35 35 28 Q 40 20 50 18 Q 60 16 70 18 Q 80 20 85 28 Q 88 35 82 45 Q 80 52 75 58 L 70 55 Q 65 52 60 52 Q 55 52 50 55 L 45 58 Q 40 52 38 45 Z"
              fill="#7dd3fc"
              stroke="#3b82f6"
              strokeWidth="1"
            >
              <animate
                attributeName="d"
                values="M 38 45 Q 32 35 35 28 Q 40 20 50 18 Q 60 16 70 18 Q 80 20 85 28 Q 88 35 82 45 Q 80 52 75 58 L 70 55 Q 65 52 60 52 Q 55 52 50 55 L 45 58 Q 40 52 38 45 Z;
                        M 38 45 Q 32 35 35 27 Q 40 19 50 17 Q 60 15 70 17 Q 80 19 85 27 Q 88 35 82 45 Q 80 53 75 59 L 70 56 Q 65 53 60 53 Q 55 53 50 56 L 45 59 Q 40 53 38 45 Z;
                        M 38 45 Q 32 35 35 28 Q 40 20 50 18 Q 60 16 70 18 Q 80 20 85 28 Q 88 35 82 45 Q 80 52 75 58 L 70 55 Q 65 52 60 52 Q 55 52 50 55 L 45 58 Q 40 52 38 45 Z"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            {/* Hair Shine */}
            <ellipse cx="48" cy="30" rx="6" ry="8" fill="#bfdbfe" opacity="0.6" />
          </g>

          {/* Moon Hair Accessory */}
          <g transform="translate(72, 28)">
            <path
              d="M 0 0 Q 5 -3 8 0 Q 5 3 0 0"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="0.5"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 4 0"
                to="360 4 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Face Features */}
          {/* Eyes */}
          <g>
            {/* Left Eye */}
            <ellipse cx="50" cy="48" rx="4" ry="6" fill="#1e3a8a" />
            <circle cx="51" cy="47" r="2" fill="#ffffff" className={isHovered ? 'animate-ping' : ''} />
            <circle cx="52" cy="49" r="1" fill="#60a5fa" />
            
            {/* Right Eye */}
            <ellipse cx="70" cy="48" rx="4" ry="6" fill="#1e3a8a" />
            <circle cx="71" cy="47" r="2" fill="#ffffff" className={isHovered ? 'animate-ping' : ''} />
            <circle cx="72" cy="49" r="1" fill="#60a5fa" />
          </g>

          {/* Smile */}
          <path
            d="M 50 58 Q 60 62 70 58"
            stroke="#ff6b9d"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Blush */}
          <ellipse cx="45" cy="55" rx="4" ry="2" fill="#ffb3c6" opacity="0.5" />
          <ellipse cx="75" cy="55" rx="4" ry="2" fill="#ffb3c6" opacity="0.5" />

          {/* Arms */}
          {/* Left Arm */}
          <path
            d="M 32 90 Q 20 95 18 105 Q 18 110 22 112"
            stroke="#1e3a8a"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M 32 90 Q 20 95 18 105 Q 18 110 22 112;
                      M 32 90 Q 20 93 18 103 Q 18 108 22 110;
                      M 32 90 Q 20 95 18 105 Q 18 110 22 112"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Right Arm - Waving */}
          <path
            d="M 88 90 Q 100 85 105 80"
            stroke="#1e3a8a"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M 88 90 Q 100 85 105 80;
                      M 88 90 Q 100 83 108 75;
                      M 88 90 Q 100 85 105 80"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>

          {/* Hand */}
          <circle cx="105" cy="80" r="5" fill="#ffd4a3">
            <animate
              attributeName="cx"
              values="105;108;105"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="80;75;80"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Sparkles */}
          <g className="animate-pulse">
            <circle cx="25" cy="40" r="1.5" fill="#fbbf24" opacity="0.8" />
            <circle cx="95" cy="50" r="2" fill="#60a5fa" opacity="0.8" />
            <circle cx="30" cy="70" r="1" fill="#a78bfa" opacity="0.8" />
            <circle cx="90" cy="95" r="1.5" fill="#fbbf24" opacity="0.8" />
          </g>

          {/* Floating Icons */}
          <g className="animate-bounce" style={{ animationDuration: '3s' }}>
            {/* Document Icon */}
            <rect x="15" y="50" width="8" height="10" fill="#60a5fa" opacity="0.6" rx="1" />
            <line x1="17" y1="53" x2="21" y2="53" stroke="#ffffff" strokeWidth="0.5" />
            <line x1="17" y1="56" x2="21" y2="56" stroke="#ffffff" strokeWidth="0.5" />
          </g>

          <g className="animate-bounce" style={{ animationDuration: '4s' }}>
            {/* Star Icon */}
            <path d="M 100 65 L 101 67 L 103 67 L 101 69 L 102 71 L 100 70 L 98 71 L 99 69 L 97 67 L 99 67 Z" fill="#fbbf24" opacity="0.6" />
          </g>
        </svg>

        {/* Hover Indicator */}
        {!showMessage && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs animate-bounce">
            👋
          </div>
        )}
      </div>
    </div>
  );
}
