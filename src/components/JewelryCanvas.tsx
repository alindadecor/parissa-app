import React from 'react';
import { DiamondShape, MetalType, Gem } from '../types';
import { METALS } from '../data/parissaData';

interface JewelryCanvasProps {
  shape: DiamondShape;
  metal: MetalType;
  carat?: number;
  essenceGem?: Gem | null;
  intentionGem?: Gem | null;
  showHiddenGems?: boolean;
  viewMode?: 'front' | 'shank' | 'tilted';
  className?: string;
}

export const JewelryCanvas: React.FC<JewelryCanvasProps> = ({
  shape,
  metal,
  carat = 1.5,
  essenceGem,
  intentionGem,
  showHiddenGems = true,
  viewMode = 'front',
  className = '',
}) => {
  const metalConfig = METALS[metal] || METALS['18k-yellow-gold'];

  // Carat scaling factor
  const scale = 0.85 + (carat - 1.0) * 0.12;

  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Artistic Flair geometric ambient rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[320px] h-[320px] rounded-full border border-[#1A1A1A]/5"></div>
        <div className="absolute w-[440px] h-[440px] rounded-full border border-[#1A1A1A]/5 scale-x-110"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[#1A1A1A]/10"></div>
      </div>

      {/* SVG Ring & Diamond Artistry */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[360px] max-h-[360px] drop-shadow-sm transition-all duration-500"
      >
        <defs>
          {/* Metal Gradient */}
          <linearGradient id={`metal-grad-${metal}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={metalConfig.accentHex} />
            <stop offset="30%" stopColor={metalConfig.hex} />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="70%" stopColor={metalConfig.hex} />
            <stop offset="100%" stopColor={metalConfig.hex} />
          </linearGradient>

          {/* Diamond Glow & Reflection */}
          <linearGradient id="diamond-facet-grad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F4F8FA" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#E2EAF0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C9D6DF" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="diamond-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#EBF4F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D9E6ED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Ring Shank */}
        <ellipse
          cx="200"
          cy="225"
          rx="105"
          ry="105"
          fill="none"
          stroke={`url(#metal-grad-${metal})`}
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Inner Ring Shank Cavity (shows depth) */}
        <ellipse
          cx="200"
          cy="225"
          rx="97"
          ry="97"
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.12"
          strokeWidth="2"
        />

        {/* Hidden Gem Talisman Cavities (on the bottom inner shank) */}
        {showHiddenGems && (
          <g className="transition-all duration-300">
            {/* Secret Inner Bridge Highlight */}
            <path
              d="M 170 322 Q 200 327 230 322"
              fill="none"
              stroke="#1A1A1A"
              strokeOpacity="0.25"
              strokeWidth="2.5"
            />

            {/* Left: Essence Gem */}
            {essenceGem ? (
              <g transform="translate(178, 318)">
                <circle cx="0" cy="0" r="7" fill={essenceGem.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" fillOpacity="0.8" />
              </g>
            ) : (
              <circle cx="178" cy="318" r="6" fill="#D1CDC2" stroke="#1A1A1A" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 2" />
            )}

            {/* Center North Star Engraving ✦ */}
            <g transform="translate(200, 318)">
              <path
                d="M 0,-5 L 1.2,-1.2 L 5,0 L 1.2,1.2 L 0,5 L -1.2,1.2 L -5,0 L -1.2,-1.2 Z"
                fill="#1A1A1A"
                fillOpacity="0.6"
              />
            </g>

            {/* Right: Intention Gem */}
            {intentionGem ? (
              <g transform="translate(222, 318)">
                <circle cx="0" cy="0" r="7" fill={intentionGem.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" fillOpacity="0.8" />
              </g>
            ) : (
              <circle cx="222" cy="318" r="6" fill="#D1CDC2" stroke="#1A1A1A" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 2" />
            )}
          </g>
        )}

        {/* Setting Collet / Basket Bridge */}
        <path
          d="M 182 135 L 192 110 L 208 110 L 218 135 Z"
          fill={`url(#metal-grad-${metal})`}
          stroke="#1A1A1A"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* Center Diamond by Shape */}
        <g transform={`translate(200, 110) scale(${scale})`}>
          {shape === 'round' && (
            <g>
              {/* Round Brilliant */}
              <circle cx="0" cy="0" r="38" fill="url(#diamond-glow)" />
              <circle cx="0" cy="0" r="36" fill="url(#diamond-facet-grad)" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Table facet */}
              <polygon
                points="0,-20 14,-14 20,0 14,14 0,20 -14,14 -20,0 -14,-14"
                fill="#FFFFFF"
                fillOpacity="0.75"
                stroke="#1A1A1A"
                strokeOpacity="0.2"
                strokeWidth="0.75"
              />
              {/* Star & Kite facets */}
              <line x1="0" y1="-36" x2="0" y2="-20" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="25" y1="-25" x2="14" y2="-14" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="36" y1="0" x2="20" y2="0" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="25" y1="25" x2="14" y2="14" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="0" y1="36" x2="0" y2="20" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="-25" y1="25" x2="-14" y2="14" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="-36" y1="0" x2="-20" y2="0" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="-25" y1="-25" x2="-14" y2="-14" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              {/* Prongs */}
              <circle cx="-25" cy="-25" r="3.5" fill={metalConfig.hex} />
              <circle cx="25" cy="-25" r="3.5" fill={metalConfig.hex} />
              <circle cx="-25" cy="25" r="3.5" fill={metalConfig.hex} />
              <circle cx="25" cy="25" r="3.5" fill={metalConfig.hex} />
            </g>
          )}

          {shape === 'oval' && (
            <g>
              {/* Oval Cut */}
              <ellipse cx="0" cy="0" rx="28" ry="42" fill="url(#diamond-glow)" />
              <ellipse cx="0" cy="0" rx="26" ry="40" fill="url(#diamond-facet-grad)" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Oval Table */}
              <polygon
                points="0,-24 12,-16 16,0 12,16 0,24 -12,16 -16,0 -12,-16"
                fill="#FFFFFF"
                fillOpacity="0.75"
                stroke="#1A1A1A"
                strokeOpacity="0.2"
                strokeWidth="0.75"
              />
              <line x1="0" y1="-40" x2="0" y2="-24" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="0" y1="40" x2="0" y2="24" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="-26" y1="0" x2="-16" y2="0" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="26" y1="0" x2="16" y2="0" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              {/* Prongs */}
              <circle cx="-19" cy="-28" r="3.5" fill={metalConfig.hex} />
              <circle cx="19" cy="-28" r="3.5" fill={metalConfig.hex} />
              <circle cx="-19" cy="28" r="3.5" fill={metalConfig.hex} />
              <circle cx="19" cy="28" r="3.5" fill={metalConfig.hex} />
            </g>
          )}

          {shape === 'marquise' && (
            <g>
              {/* Marquise Cut */}
              <path
                d="M 0 -48 C 28 -20 28 20 0 48 C -28 20 -28 -20 0 -48 Z"
                fill="url(#diamond-glow)"
              />
              <path
                d="M 0 -45 C 25 -18 25 18 0 45 C -25 18 -25 -18 0 -45 Z"
                fill="url(#diamond-facet-grad)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Marquise Table */}
              <polygon
                points="0,-26 12,-10 14,0 12,10 0,26 -12,10 -14,0 -12,-10"
                fill="#FFFFFF"
                fillOpacity="0.75"
                stroke="#1A1A1A"
                strokeOpacity="0.2"
                strokeWidth="0.75"
              />
              {/* Point tips */}
              <line x1="0" y1="-45" x2="0" y2="-26" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              <line x1="0" y1="45" x2="0" y2="26" stroke="#1A1A1A" strokeOpacity="0.25" strokeWidth="0.8" />
              {/* V-prongs at tips + side prongs */}
              <path d="M -3 -46 L 0 -50 L 3 -46 Z" fill={metalConfig.hex} />
              <path d="M -3 46 L 0 50 L 3 46 Z" fill={metalConfig.hex} />
              <circle cx="-18" cy="0" r="3.5" fill={metalConfig.hex} />
              <circle cx="18" cy="0" r="3.5" fill={metalConfig.hex} />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
