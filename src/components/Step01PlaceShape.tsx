import React, { useState } from 'react';
import { Hand, Finger, DiamondShape } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SilhouetteEmblem } from './GemIcon';

const HAND_IMAGES: Record<Hand, string> = {
  left: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/left-hand_6c47e33d-d942-4168-a96a-704c5b7c89e1.png?v=1788723046',
  right: 'https://cdn.shopify.com/s/files/1/1011/5058/9226/files/right-hand.png?v=1788722733',
};

interface Step01Props {
  initialHand?: Hand;
  initialFinger?: Finger;
  initialShape?: DiamondShape;
  onComplete: (data: { hand: Hand; finger: Finger; shape: DiamondShape }) => void;
  onBackToHome: () => void;
}

export const Step01PlaceShape: React.FC<Step01Props> = ({
  initialHand = 'left',
  initialFinger = 'ring',
  initialShape = 'oval',
  onComplete,
  onBackToHome,
}) => {
  // Sub-screen 01A (Place) vs 01B (Shape) per UI/UX Mockup
  const [subStep, setSubStep] = useState<'01A' | '01B'>('01A');
  const [hand, setHand] = useState<Hand>(initialHand);
  const [finger, setFinger] = useState<Finger>(initialFinger);
  const [shape, setShape] = useState<DiamondShape>(initialShape);

  // Dynamic styling note based on selected shape & finger
  const getStylingNote = (s: DiamondShape, f: Finger): string => {
    if (s === 'oval') {
      if (f === 'middle') {
        return 'Oval creates a gentle vertical line on your chosen middle finger.';
      }
      if (f === 'ring') {
        return 'Oval lengthens the hand with graceful proportions on your chosen ring finger.';
      }
      if (f === 'index') {
        return 'Oval commands a fluid, modern presence on your chosen index finger.';
      }
      return 'Oval provides an elegant, elongated proportion on your chosen pinky finger.';
    }

    if (s === 'round') {
      if (f === 'middle') {
        return 'Round centers the hand with serene equilibrium on your chosen middle finger.';
      }
      if (f === 'ring') {
        return 'Round creates a balanced, timeless focal point on your chosen ring finger.';
      }
      if (f === 'index') {
        return 'Round offers an iconic, regal statement on your chosen index finger.';
      }
      return 'Round sits with delicate brilliance on your chosen pinky finger.';
    }

    // Marquise
    if (f === 'middle') {
      return 'Marquise accentuates the central axis with dramatic starlight geometry on your chosen middle finger.';
    }
    if (f === 'ring') {
      return 'Marquise delivers a poetic compass silhouette on your chosen ring finger.';
    }
    if (f === 'index') {
      return 'Marquise creates a directional elongation and distinctive presence on your chosen index finger.';
    }
    return 'Marquise brings an unexpected, sculptural edge to your chosen pinky finger.';
  };

  const handleContinueFromPlace = () => {
    setSubStep('01B');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToEssence = () => {
    onComplete({ hand, finger, shape });
  };

  // Coordinates for the finger pin markers on the SVG hand
  // Left hand coordinate system (Viewbox: 0 0 340 420)
  const pinPositions: Record<Finger, { x: number; y: number; label: string; pinKey: string }> = {
    pinky: { x: 70, y: 155, label: 'Pinky', pinKey: 'P' },
    ring: { x: 120, y: 115, label: 'Ring', pinKey: 'R' },
    middle: { x: 175, y: 95, label: 'Middle', pinKey: 'M' },
    index: { x: 232, y: 125, label: 'Index', pinKey: 'I' },
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F9F7F2] text-[#1A1A1A] flex flex-col">
      {/* ========================================================================= */}
      {/* TOP STEPPER BAR (Matching Image 3: 01 OF 05 / PLACE + SHAPE | SAVE & EXIT) */}
      {/* ========================================================================= */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#FAF8F5] px-6 sm:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A]">
            01 of 05 / Place + Shape
          </span>

          <button
            type="button"
            onClick={onBackToHome}
            className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            Save &amp; Exit
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 01A: PLACE — "Where will you wear your light?"                      */}
      {/* ========================================================================= */}
      {subStep === '01A' ? (
        <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hand Silhouette Visual with Interactive Pin Markers */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#F3EFE6] rounded-3xl p-6 border border-[#1A1A1A]/10 flex flex-col items-center justify-center shadow-xs overflow-hidden">
              {/* Subtle Linen Background Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

              {/* Hand Photography */}
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500">
                <img
                  src={HAND_IMAGES[hand]}
                  alt={`${hand === 'left' ? 'Left' : 'Right'} hand wearing a ring`}
                  className="w-full h-full object-cover rounded-2xl select-none"
                  width={1024}
                  height={1536}
                  loading="lazy"
                />

                {/* Interactive Pin Markers: P, R, M, I */}
                {Object.entries(pinPositions).map(([fKey, pos]) => {
                  const isSelected = finger === fKey;
                  return (
                    <button
                      key={fKey}
                      type="button"
                      onClick={() => setFinger(fKey as Finger)}
                      aria-label={`Select ${pos.label} finger`}
                      style={{
                        position: 'absolute',
                        left: `${(pos.x / 340) * 100}%`,
                        top: `${(pos.y / 420) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="cursor-pointer group z-20 focus:outline-hidden"
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Selected Gold Ring Ripple */}
                        {isSelected && (
                          <div className="absolute w-10 h-10 rounded-full border-2 border-[#D4AF37] animate-ping opacity-60 pointer-events-none" />
                        )}

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-semibold transition-all shadow-xs ${
                            isSelected
                              ? 'bg-[#1A1A1A] text-[#FAF8F5] ring-4 ring-[#D4AF37]/50 scale-110'
                              : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/30 group-hover:border-[#1A1A1A] group-hover:scale-105'
                          }`}
                        >
                          {/* Unflip letter if hand is mirrored */}
                          <span className={hand === 'right' ? 'scale-x-[-1]' : ''}>
                            {pos.pinKey}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                  {hand === 'left' ? 'Left Hand' : 'Right Hand'} •{' '}
                  <span className="text-[#1A1A1A] font-medium capitalize">{finger} Finger</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Step 01 Form Elements */}
          <div className="lg:col-span-6 space-y-8 max-w-lg">
            <div className="space-y-3">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-medium text-[#B38E5A] block">
                Step 01
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
                Where will you wear your light?
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                There is no wrong finger. Choose the place that feels most natural to you.
              </p>
            </div>

            {/* Hand Selection: Left vs Right */}
            <div className="space-y-3">
              <label className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium">
                Hand
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHand('left')}
                  className={`px-8 py-3 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    hand === 'left'
                      ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50'
                  }`}
                >
                  Left
                </button>
                <button
                  type="button"
                  onClick={() => setHand('right')}
                  className={`px-8 py-3 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    hand === 'right'
                      ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>

            {/* Finger Selection: 2x2 grid */}
            <div className="space-y-3">
              <label className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-medium">
                Finger
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['index', 'middle', 'ring', 'pinky'] as Finger[]).map((f) => {
                  const isSelected = finger === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFinger(f)}
                      className={`py-3.5 px-6 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium text-center ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#FAF8F5] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleContinueFromPlace}
                className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* SCREEN 01B: SHAPE — "How do you want your diamond to feel?"                */
        /* (Exact implementation matching Image 3 bottom)                           */
        /* ========================================================================= */
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 lg:py-16 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-10">
            {/* Header Titles */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
                How do you want your diamond to feel?
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                Choose the silhouette you are drawn to. You can change it later.
              </p>
            </div>

            {/* 3 Silhouette Cards: Round, Oval, Marquise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch">
              {/* 1. ROUND CARD */}
              <div
                onClick={() => setShape('round')}
                className={`rounded-2xl p-7 flex flex-col justify-between items-center text-center transition-all cursor-pointer border ${
                  shape === 'round'
                    ? 'bg-[#FAF6F0] border-[#B38E5A] ring-1 ring-[#B38E5A] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#1A1A1A]/12 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-semibold px-2.5 py-1 rounded-full bg-[#1A1A1A]/5">
                    Round
                  </span>
                  {shape === 'round' && (
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#B38E5A] font-semibold">
                      Selected
                    </span>
                  )}
                </div>

                <div className="py-6 flex items-center justify-center">
                  <SilhouetteEmblem shape="round" size={54} color="#B38E5A" />
                </div>

                <div className="space-y-1.5 mb-6">
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                    The Centre
                  </h3>
                  <p className="font-sans text-xs text-[#1A1A1A]/60 font-light">
                    Timeless / balanced / luminous
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShape('round');
                  }}
                  className={`w-full py-3 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    shape === 'round'
                      ? 'bg-[#1A1A1A] text-[#FAF8F5]'
                      : 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  Choose Round
                </button>
              </div>

              {/* 2. OVAL CARD */}
              <div
                onClick={() => setShape('oval')}
                className={`rounded-2xl p-7 flex flex-col justify-between items-center text-center transition-all cursor-pointer border ${
                  shape === 'oval'
                    ? 'bg-[#FAF6F0] border-[#B38E5A] ring-1 ring-[#B38E5A] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#1A1A1A]/12 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-semibold px-2.5 py-1 rounded-full bg-[#1A1A1A]/5">
                    Oval
                  </span>
                  {shape === 'oval' && (
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#B38E5A] font-semibold">
                      Selected
                    </span>
                  )}
                </div>

                <div className="py-6 flex items-center justify-center">
                  <SilhouetteEmblem shape="oval" size={54} color="#B38E5A" />
                </div>

                <div className="space-y-1.5 mb-6">
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                    The Continuum
                  </h3>
                  <p className="font-sans text-xs text-[#1A1A1A]/60 font-light">
                    Graceful / evolving / elongated
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShape('oval');
                  }}
                  className={`w-full py-3 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    shape === 'oval'
                      ? 'bg-[#1A1A1A] text-[#FAF8F5]'
                      : 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  Choose Oval
                </button>
              </div>

              {/* 3. MARQUISE CARD */}
              <div
                onClick={() => setShape('marquise')}
                className={`rounded-2xl p-7 flex flex-col justify-between items-center text-center transition-all cursor-pointer border ${
                  shape === 'marquise'
                    ? 'bg-[#FAF6F0] border-[#B38E5A] ring-1 ring-[#B38E5A] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#1A1A1A]/12 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 font-semibold px-2.5 py-1 rounded-full bg-[#1A1A1A]/5">
                    Marquise
                  </span>
                  {shape === 'marquise' && (
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#B38E5A] font-semibold">
                      Selected
                    </span>
                  )}
                </div>

                <div className="py-6 flex items-center justify-center">
                  <SilhouetteEmblem shape="marquise" size={54} color="#B38E5A" />
                </div>

                <div className="space-y-1.5 mb-6">
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                    The Compass
                  </h3>
                  <p className="font-sans text-xs text-[#1A1A1A]/60 font-light">
                    Directional / distinct / bold
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShape('marquise');
                  }}
                  className={`w-full py-3 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    shape === 'marquise'
                      ? 'bg-[#1A1A1A] text-[#FAF8F5]'
                      : 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  Choose Marquise
                </button>
              </div>
            </div>

            {/* Dynamic Styling Note matching Mockup */}
            <div className="text-center pt-2">
              <p className="font-sans text-xs text-[#1A1A1A]/70 font-light max-w-xl mx-auto leading-relaxed">
                <span className="font-medium text-[#1A1A1A]">Styling note:</span>{' '}
                {getStylingNote(shape, finger)}{' '}
                <span className="text-[#1A1A1A]/50">Your preference comes first.</span>
              </p>
            </div>
          </div>

          {/* Bottom Actions: Back circle + Continue to Essence */}
          <div className="pt-12 flex items-center justify-between border-t border-[#1A1A1A]/10 mt-10">
            <button
              type="button"
              onClick={() => setSubStep('01A')}
              aria-label="Back to Place"
              className="w-12 h-12 rounded-full border border-[#1A1A1A]/25 flex items-center justify-center text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleContinueToEssence}
              className="px-9 py-4 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FAF8F5] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer shadow-sm"
            >
              Continue to Essence
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
