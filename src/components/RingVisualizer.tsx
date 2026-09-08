import React, { useState } from 'react';
import { DiamondShape, MetalType, Gem } from '../types';
import { METALS } from '../data/parissaData';
import { NorthStarIcon } from './GemIcon';

interface RingVisualizerProps {
  shape: DiamondShape;
  metal: MetalType;
  carat?: number;
  settingStyle?: string;
  essenceGem?: Gem;
  intentionGem?: Gem;
  interactive?: boolean;
  className?: string;
}

export const RingVisualizer: React.FC<RingVisualizerProps> = ({
  shape,
  metal,
  carat = 1.5,
  settingStyle = 'North Star',
  essenceGem,
  intentionGem,
  interactive = true,
  className = '',
}) => {
  const [activeAngle, setActiveAngle] = useState<'front' | 'profile' | 'hiddenGems'>('front');

  const metalData = METALS[metal] || METALS['18k-yellow-gold'];
  const scale = 0.85 + Math.min(carat, 3.0) * 0.12;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Visual Canvas Container with artistic flair borders */}
      <div className="relative w-full aspect-square max-w-[420px] bg-[#F3EFE6]/60 rounded-full border border-[#1A1A1A]/10 p-8 flex items-center justify-center overflow-hidden shadow-inner">
        {/* Subtle geometric astronomical orbital guides */}
        <div className="absolute inset-4 rounded-full border border-[#1A1A1A]/5 pointer-events-none" />
        <div className="absolute inset-16 rounded-full border border-[#1A1A1A]/5 pointer-events-none" />
        <div className="absolute w-full h-[1px] bg-[#1A1A1A]/5 pointer-events-none" />
        <div className="absolute h-full w-[1px] bg-[#1A1A1A]/5 pointer-events-none" />

        {/* Ambient radial lighting */}
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-white/70 to-transparent blur-2xl pointer-events-none" />

        {/* View: Front Silhouette */}
        {activeAngle === 'front' && (
          <div className="relative flex flex-col items-center transition-all duration-700 animate-fadeIn">
            {/* Center Solitaire Diamond */}
            <div
              className="relative z-20 flex items-center justify-center drop-shadow-xl"
              style={{ transform: `scale(${scale}) translateY(8px)` }}
            >
              {shape === 'round' && (
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  {/* Outer girdle & facets */}
                  <polygon points="50,4 82,18 96,50 82,82 50,96 18,82 4,50 18,18" fill="#FBFDFF" stroke="#A6BDD1" strokeWidth="1" />
                  <circle cx="50" cy="50" r="26" fill="#F0F6FA" stroke="#8CA8C2" strokeWidth="0.8" />
                  {/* Pavilion star flash */}
                  <polygon points="50,4 62,28 38,28" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="96,50 72,62 72,38" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="50,96 38,72 62,72" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="4,50 28,38 28,62" fill="#FFFFFF" fillOpacity="0.8" />
                  <line x1="50" y1="4" x2="50" y2="96" stroke="#B8CFDF" strokeWidth="0.6" />
                  <line x1="4" y1="50" x2="96" y2="50" stroke="#B8CFDF" strokeWidth="0.6" />
                  <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
                </svg>
              )}

              {shape === 'oval' && (
                <svg width="90" height="114" viewBox="0 0 90 114" fill="none">
                  <ellipse cx="45" cy="57" rx="38" ry="50" fill="#FBFDFF" stroke="#A6BDD1" strokeWidth="1" />
                  <ellipse cx="45" cy="57" rx="22" ry="32" fill="#F0F6FA" stroke="#8CA8C2" strokeWidth="0.8" />
                  <polygon points="45,7 55,30 35,30" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="45,107 35,84 55,84" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="7,57 26,45 26,69" fill="#FFFFFF" fillOpacity="0.8" />
                  <polygon points="83,57 64,45 64,69" fill="#FFFFFF" fillOpacity="0.8" />
                  <line x1="45" y1="7" x2="45" y2="107" stroke="#B8CFDF" strokeWidth="0.6" />
                  <circle cx="45" cy="57" r="3.5" fill="#FFFFFF" />
                </svg>
              )}

              {shape === 'marquise' && (
                <svg width="84" height="136" viewBox="0 0 84 136" fill="none">
                  <path
                    d="M42 4 C76 42, 76 94, 42 132 C8 94, 8 42, 42 4 Z"
                    fill="#FBFDFF"
                    stroke="#A6BDD1"
                    strokeWidth="1"
                  />
                  <path
                    d="M42 22 C60 48, 60 88, 42 114 C24 88, 24 48, 42 22 Z"
                    fill="#F0F6FA"
                    stroke="#8CA8C2"
                    strokeWidth="0.8"
                  />
                  <line x1="42" y1="4" x2="42" y2="132" stroke="#B8CFDF" strokeWidth="0.8" />
                  <line x1="14" y1="68" x2="70" y2="68" stroke="#B8CFDF" strokeWidth="0.6" />
                  <circle cx="42" cy="68" r="3.5" fill="#FFFFFF" />
                </svg>
              )}

              {/* Setting Claws in precious metal */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: metalData.hex }}
                />
                <div
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: metalData.hex }}
                />
                <div
                  className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: metalData.hex }}
                />
                <div
                  className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: metalData.hex }}
                />
              </div>
            </div>

            {/* Handcrafted Metal Band / Ring Shank */}
            <div className="relative -mt-6 z-10">
              <svg width="220" height="200" viewBox="0 0 220 200" fill="none">
                {/* Outer Ring Circle */}
                <ellipse
                  cx="110"
                  cy="110"
                  rx="72"
                  ry="72"
                  stroke={metalData.hex}
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
                {/* Highlight Sheen on Metal */}
                <ellipse
                  cx="110"
                  cy="110"
                  rx="74"
                  ry="74"
                  stroke={metalData.accentHex}
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
                {/* Inner Shank Depth */}
                <ellipse
                  cx="110"
                  cy="110"
                  rx="66"
                  ry="66"
                  stroke="#1A1A1A"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                />
              </svg>
            </div>
          </div>
        )}

        {/* View: Profile (Side View with Signature North Star Under-Gallery) */}
        {activeAngle === 'profile' && (
          <div className="relative flex flex-col items-center transition-all duration-700 animate-fadeIn">
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
              {/* Crown Diamond Profile */}
              <polygon points="120,40 155,65 85,65" fill="#F4F8FC" stroke="#9BB5CB" strokeWidth="1" />
              <polygon points="120,40 120,65 85,65" fill="#FFFFFF" fillOpacity="0.7" />
              <polygon points="120,40 155,65 120,65" fill="#E8F1F8" fillOpacity="0.8" />
              <polygon points="85,65 155,65 120,80" fill="#D9E6F2" stroke="#8CA8C2" strokeWidth="0.8" />

              {/* Basket Prongs */}
              <path d="M85 65 L95 100 L120 102 L145 100 L155 65" stroke={metalData.hex} strokeWidth="3.5" fill="none" />
              
              {/* The Signature North Star Under-Gallery filigree */}
              <g transform="translate(120, 88) scale(0.6)">
                <path d="M0 -15 L3 -3 L15 0 L3 3 L0 15 L-3 3 L-15 0 L-3 -3 Z" fill={metalData.hex} />
                <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
              </g>

              {/* Side Profile of Ring Band */}
              <ellipse
                cx="120"
                cy="150"
                rx="62"
                ry="58"
                stroke={metalData.hex}
                strokeWidth="11"
                fill="none"
              />
              <ellipse
                cx="120"
                cy="150"
                rx="64"
                ry="60"
                stroke={metalData.accentHex}
                strokeWidth="1.5"
                strokeOpacity="0.7"
                fill="none"
              />
            </svg>
            <div className="absolute bottom-2 text-center">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#1A1A1A]/60">
                Signature North Star Under-Gallery
              </span>
            </div>
          </div>
        )}

        {/* View: Hidden Gem Pair (Inner Shank Sanctuary) */}
        {activeAngle === 'hiddenGems' && (
          <div className="relative flex flex-col items-center justify-center transition-all duration-700 animate-fadeIn p-4 text-center">
            {/* Enlarged inner shank curve showing the two secret gemstones */}
            <svg width="260" height="160" viewBox="0 0 260 160" fill="none">
              {/* Inner Band Section */}
              <path
                d="M30 110 Q130 50 230 110"
                stroke={metalData.hex}
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M30 109 Q130 49 230 109"
                stroke={metalData.accentHex}
                strokeWidth="2"
                strokeOpacity="0.8"
                fill="none"
              />

              {/* Inward Facing: Essence Gem ("What you carry") */}
              <g transform="translate(85, 80)">
                <circle cx="0" cy="0" r="9" fill={essenceGem?.hex || '#D4AF37'} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" fillOpacity="0.8" />
              </g>

              {/* Center Engraved North Star Talisman */}
              <g transform="translate(130, 72) scale(0.65)">
                <path d="M0 -14 L2.5 -3 L14 0 L2.5 3 L0 14 L-2.5 3 L-14 0 L-2.5 -3 Z" fill="#1A1A1A" fillOpacity="0.6" />
              </g>

              {/* Outward Facing: Intention Gem ("The chapter ahead") */}
              <g transform="translate(175, 80)">
                <circle cx="0" cy="0" r="9" fill={intentionGem?.hex || '#2E5A44'} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" fillOpacity="0.8" />
              </g>
            </svg>

            {/* Explanatory Dual Gem Chips */}
            <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-[280px]">
              <div className="flex flex-col items-center bg-[#FAF8F5] p-2.5 rounded-lg border border-[#1A1A1A]/10">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#1A1A1A]/60">
                  Inner · Essence
                </span>
                <span className="font-serif text-sm font-medium mt-0.5 text-[#1A1A1A]">
                  {essenceGem?.name || 'Golden Sapphire'}
                </span>
                <span className="text-[10px] text-[#1A1A1A]/50 mt-0.5 italic">
                  Facing skin
                </span>
              </div>

              <div className="flex flex-col items-center bg-[#FAF8F5] p-2.5 rounded-lg border border-[#1A1A1A]/10">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#1A1A1A]/60">
                  Outer · Intention
                </span>
                <span className="font-serif text-sm font-medium mt-0.5 text-[#1A1A1A]">
                  {intentionGem?.name || 'Green Sapphire'}
                </span>
                <span className="text-[10px] text-[#1A1A1A]/50 mt-0.5 italic">
                  Facing future
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Brand hallmark in corner */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-40">
          <NorthStarIcon size={14} />
          <span className="font-serif text-[10px] tracking-widest uppercase">PARISSA</span>
        </div>
      </div>

      {/* Interactive Angle Switcher */}
      {interactive && (
        <div className="flex items-center gap-2 mt-4 bg-[#EFECE3] p-1 rounded-full border border-[#1A1A1A]/10">
          <button
            onClick={() => setActiveAngle('front')}
            className={`px-3.5 py-1 text-xs uppercase tracking-[0.18em] font-sans rounded-full transition-all ${
              activeAngle === 'front'
                ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
            }`}
          >
            Solitaire
          </button>
          <button
            onClick={() => setActiveAngle('profile')}
            className={`px-3.5 py-1 text-xs uppercase tracking-[0.18em] font-sans rounded-full transition-all ${
              activeAngle === 'profile'
                ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveAngle('hiddenGems')}
            className={`px-3.5 py-1 text-xs uppercase tracking-[0.18em] font-sans rounded-full transition-all ${
              activeAngle === 'hiddenGems'
                ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
            }`}
          >
            Two Hidden Gems
          </button>
        </div>
      )}
    </div>
  );
};
