import React from 'react';
import {
  EssenceArchetype,
  IntentionOutcome,
  RingConfiguration,
} from '../types';
import { ArrowRight, ArrowLeft, Gem, Sparkles, Hexagon } from 'lucide-react';

interface Step04Props {
  initialConfig: Partial<RingConfiguration>;
  essenceArchetype: EssenceArchetype;
  intentionOutcome: IntentionOutcome;
  onComplete: (config: Partial<RingConfiguration>) => void;
  onBack: () => void;
  onSaveExit?: () => void;
}

const JOURNEY_STEPS = [
  { num: 1, label: 'Place & Shape' },
  { num: 2, label: 'Essence' },
  { num: 3, label: 'Intention' },
  { num: 4, label: 'Craft' },
  { num: 5, label: 'Reveal' },
];

const FEATURES = [
  {
    Icon: Gem,
    label: 'Precious Metals',
    title: 'Solid 14K & 18K',
    body:
      'Never hollow, never plated. Cast in solid recycled gold and dense Platinum 950 that will never tarnish or chip away.',
  },
  {
    Icon: Sparkles,
    label: 'Gemological Precision',
    title: 'Lab-Grown Solitaires',
    body:
      'Optically identical to mined diamonds with zero conflict footprint. Graded D-F Color, VVS-VS Clarity with IGI certification reports.',
  },
  {
    Icon: Hexagon,
    label: 'The Secret Chamber',
    title: 'North Star Under-Gallery',
    body:
      'Our signature filigree allows light to bathe the pavilion while seating your two private gemstones flush against your finger.',
  },
];

export const Step04Craft: React.FC<Step04Props> = ({
  initialConfig,
  onComplete,
  onBack,
}) => {
  const buildConfig = (): Partial<RingConfiguration> => ({
    shape: initialConfig.shape || 'oval',
    collection: initialConfig.collection || 'The Constellation',
    diamondType: initialConfig.diamondType || 'natural',
    carat: initialConfig.carat ?? 1.0,
    metal: initialConfig.metal || '18k-yellow-gold',
    ringSize: initialConfig.ringSize || 6.5,
    bandWidth: initialConfig.bandWidth || 'classic',
    priceDisplay: 'Price on request',
    leadTime: '2–4 Weeks Made to Order in Melbourne',
  });

  const handleContinue = () => {
    onComplete(buildConfig());
  };

  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#17242c] flex flex-col overflow-x-hidden">
      {/* ============ CRAFT HEADER ============ */}
      <div className="border-b border-[#d4cbc1] bg-[#f7f3ed] px-6 sm:px-10 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="font-semibold uppercase tracking-[0.22em] text-[#17242c]">
              04 / 05 <span className="ml-1 text-[#c9a15a]">CRAFT</span>
            </span>
            <div className="hidden md:flex items-center gap-5 text-[#17242c]/40 uppercase tracking-[0.18em]">
              {JOURNEY_STEPS.map((s) => (
                <span key={s.num} className={s.num === 4 ? 'text-[#17242c] font-semibold' : ''}>
                  {`0${s.num}`}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onBack}
            className="text-xs uppercase tracking-[0.2em] text-[#17242c]/50 hover:text-[#17242c] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Intention</span>
          </button>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-16 pb-28 sm:pb-16 animate-fadeIn flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-[#c9a15a] mb-6">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="text-[10px]">✦</span>
          ))}
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#17242c] leading-[1.05]">
          Sovereign Craft
        </h1>
        <p className="font-serif text-base sm:text-lg text-[#17242c]/70 mt-5 max-w-lg">
          Built for everyday wear. Engineered for a lifetime.
        </p>

        {/* ============ FEATURE CARDS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full">
          {FEATURES.map((feature) => {
            const Icon = feature.Icon;
            return (
              <div
                key={feature.label}
                className="flex flex-col items-center text-center"
                style={{
                  background: '#faf8f4',
                  border: '1px solid #e8e0d8',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <Icon size={24} className="text-[#c9a15a]" />
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d] mt-4">
                  {feature.label}
                </p>
                <h3 className="font-serif-luxury text-2xl text-[#17242c] mt-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-xs text-[#17242c]/65 leading-relaxed mt-3">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* ============ TRUST BADGES ============ */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-[0.15em] text-[#69635d]">
          <span>✦ IGI Certified</span>
          <span>·</span>
          <span>✦ Lab Grown</span>
          <span>·</span>
          <span>✦ Parissa Certificate</span>
          <span>·</span>
          <span>✦ Free Returns</span>
        </div>

        {/* ============ DESKTOP CTA (inline) ============ */}
        <div className="hidden sm:flex items-center justify-between gap-4 w-full pt-10 mt-12 border-t border-[#d4cbc1]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
          >
            <span>Continue to Reveal</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ============ MOBILE FIXED CTA BAR ============ */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-50"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 12px)',
          background: '#faf8f4',
          borderTop: '1px solid #e8e0d8',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-[11px] font-sans uppercase tracking-[0.18em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer shrink-0"
          >
            <ArrowLeft size={12} />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-[11px] font-sans uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer group"
          >
            <span>Continue to Reveal</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
