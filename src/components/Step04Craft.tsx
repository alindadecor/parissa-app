import React, { useState } from 'react';
import {
  DiamondShape,
  MetalType,
  DiamondType,
  BandWidth,
  CollectionName,
  EssenceArchetype,
  IntentionOutcome,
  RingConfiguration,
} from '../types';
import { METALS, DIAMOND_SHAPES, COLLECTIONS } from '../data/parissaData';
import { JewelryCanvas } from './JewelryCanvas';
import { ArrowRight, ArrowLeft, Check, Info, Sparkles, Gem, Hexagon } from 'lucide-react';
import { NorthStarIcon } from './GemIcon';
import { useCollectionVariants, LABEL_TO_SLUG, METAL_META, getImageForMetal } from '../hooks/useCollectionVariants';

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

const SUB_STEPS = [
  { num: 1, label: 'Intro' },
  { num: 2, label: 'Shape' },
  { num: 3, label: 'Setting' },
  { num: 4, label: 'Metal' },
  { num: 5, label: 'Size' },
  { num: 6, label: 'Summary' },
];

const METAL_OPTIONS = [
  { label: '18K Yellow Gold', subtitle: 'GOLDEN HOUR · WARM & CLASSIC', description: 'Rich, buttery honey warmth that deepens with wear and time.', swatch: '#D4AF37' },
  { label: '18K Rose Gold', subtitle: 'SUNSET BLUSH · ROMANTIC & MODERN', description: 'Soft blush-pink gold flattering all undertones with gentle warmth.', swatch: '#E8A598' },
  { label: '18K White Gold', subtitle: 'MOONLIGHT · CLEAN & MIRRORED', description: 'Luminous rhodium-plated white gold with contemporary crisp brilliance.', swatch: '#E0E0E0' },
  { label: 'Platinum 950', subtitle: 'PURE CELESTIAL PERMANENCE', description: 'Dense, naturally white 85% platinum developing a noble heirloom patina.', swatch: '#C0BEC0' },
];

const SLUG_TO_LABEL: Record<MetalType, string> = {
  '18k-yellow-gold': '18K Yellow Gold',
  '18k-rose-gold': '18K Rose Gold',
  '18k-white-gold': '18K White Gold',
  platinum: 'Platinum 950',
};

export const Step04Craft: React.FC<Step04Props> = ({
  initialConfig,
  essenceArchetype,
  intentionOutcome,
  onComplete,
  onBack,
}) => {
  const [shape, setShape] = useState<DiamondShape>(initialConfig.shape || 'oval');
  const [collection, setCollection] = useState<CollectionName>(
    initialConfig.collection || 'The Constellation'
  );
  const [diamondType, setDiamondType] = useState<DiamondType>(
    initialConfig.diamondType || 'natural'
  );
  const [carat, setCarat] = useState<number>(initialConfig.carat || 1.0);
  const [metal, setMetal] = useState<MetalType>(initialConfig.metal || '18k-yellow-gold');
  const [ringSize, setRingSize] = useState<number>(initialConfig.ringSize || 6.5);
  const [bandWidth, setBandWidth] = useState<BandWidth>(
    initialConfig.bandWidth || 'classic'
  );
  const [subStep, setSubStep] = useState<number>(1);

  const collectionHandle = collection
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/\s+/g, '-');

  const { metals, error } = useCollectionVariants(collectionHandle, shape);

  const ringSizes = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0];

  const handleProceed = () => {
    onComplete({
      shape,
      collection,
      diamondType,
      carat,
      metal,
      ringSize,
      bandWidth,
      priceDisplay: 'Price on request',
      leadTime: '2–4 Weeks Made to Order in Melbourne',
    });
  };

  const goNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (subStep >= 6) {
      handleProceed();
    } else {
      setSubStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (subStep <= 1) {
      onBack();
    } else {
      setSubStep((prev) => prev - 1);
    }
  };

  const shapeInfo = DIAMOND_SHAPES[shape];
  const metalInfo = METALS[metal];
  const collectionInfo = COLLECTIONS[collection];

  const selectedMetalLabel = SLUG_TO_LABEL[metal];
  const displayMetalOptions =
    metals.length > 0 && !error
      ? metals.map((m) => ({
          label: m.label,
          swatch: m.swatchColor,
          subtitle: m.subtitle,
          description: METAL_META[m.label]?.description || m.label,
        }))
      : METAL_OPTIONS;
  const previewImage = getImageForMetal(metals, selectedMetalLabel);

  return (
    <div className="min-h-[100dvh] bg-[#f7f3ed] text-[#17242c] flex flex-col overflow-x-hidden">
      {/* ============ SHARED CRAFT HEADER ============ */}
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
            onClick={goPrev}
            className="text-xs uppercase tracking-[0.2em] text-[#17242c]/50 hover:text-[#17242c] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>{subStep <= 1 ? 'Back to Intention' : '‹ Prev'}</span>
          </button>
        </div>
      </div>

      {/* ============ SUB-STEP 01 · CRAFT INTRO ============ */}
      {subStep === 1 && (
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-[0.15em] text-[#69635d]">
            <span>✦ IGI Certified</span>
            <span>·</span>
            <span>✦ Lab Grown</span>
            <span>·</span>
            <span>✦ Parissa Certificate</span>
            <span>·</span>
            <span>✦ Free Returns</span>
          </div>

          <div className="hidden sm:flex items-center justify-between gap-4 w-full pt-10 mt-12 border-t border-[#d4cbc1]">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
            >
              <span>Start Craft</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ SUB-STEP 02 · DIAMOND SHAPE ============ */}
      {subStep === 2 && (
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-14 animate-fadeIn">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#69635d] font-semibold">
            Diamond Shape
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#17242c] mt-2 leading-tight">
            The silhouette of your story.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#17242c]/60 mt-3 max-w-md leading-relaxed">
            Three shapes are enough — when the journey is the product.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {(['round', 'oval', 'marquise'] as DiamondShape[]).map((s) => {
              const info = DIAMOND_SHAPES[s];
              const isSelected = shape === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShape(s)}
                  className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#eee6dd] border-[#4d3023] ring-2 ring-[#4d3023]/15 shadow-sm'
                      : 'bg-[#eee6dd]/50 border-[#d4cbc1] hover:border-[#4d3023]/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#4d3023] text-[#f7f3ed]' : 'bg-[#f7f3ed] text-[#17242c]/50'
                    }`}
                  >
                    {isSelected ? (
                      <Check size={16} strokeWidth={2.5} />
                    ) : (
                      <span className="font-serif text-base">✦</span>
                    )}
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#17242c] mt-5">{info.name}</h3>
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#4d3023] mt-1">
                    {info.title}
                  </p>
                  <p className="font-serif text-sm text-[#17242c]/65 leading-relaxed mt-3">
                    {info.character}
                  </p>
                  <p className="font-sans text-[11px] text-[#17242c]/50 leading-relaxed mt-2">
                    {info.poeticNote}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-10 flex items-center justify-between border-t border-[#d4cbc1] mt-12">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer group shadow-sm"
            >
              <span>Next</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ SUB-STEP 03 · SETTING STYLE ============ */}
      {subStep === 3 && (
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-14 animate-fadeIn">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#69635d] font-semibold">
            Setting Style
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#17242c] mt-2 leading-tight">
            The architecture of intimacy.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#17242c]/60 mt-3 max-w-md leading-relaxed">
            Every PARISSA setting hides your two talisman gems — one inward, one outward.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {(Object.keys(COLLECTIONS) as CollectionName[]).map((colKey) => {
              const colInfo = COLLECTIONS[colKey];
              const isSelected = collection === colKey;
              return (
                <button
                  key={colKey}
                  type="button"
                  onClick={() => setCollection(colKey)}
                  className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#eee6dd] border-[#4d3023] ring-2 ring-[#4d3023]/15 shadow-sm'
                      : 'bg-[#eee6dd]/50 border-[#d4cbc1] hover:border-[#4d3023]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif-luxury text-2xl text-[#17242c]">
                        {colInfo.name}
                      </h3>
                      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#4d3023] mt-1">
                        {colInfo.tagline}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="w-7 h-7 rounded-full bg-[#4d3023] text-[#f7f3ed] flex items-center justify-center shrink-0">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-sm text-[#17242c]/65 leading-relaxed mt-4">
                    {colInfo.description.split('.')[0]}.
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#69635d] mt-3">
                    {colInfo.architecturalDetail}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-10 flex items-center justify-between border-t border-[#d4cbc1] mt-12">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer group shadow-sm"
            >
              <span>Next</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ SUB-STEP 04 · NOBLE METAL ============ */}
      {subStep === 4 && (
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-14 animate-fadeIn">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#69635d] font-semibold">
            Noble Metal
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#17242c] mt-2 leading-tight">
            The warmth your light will live in.
          </h2>

          {previewImage && subStep === 4 && (
            <div className="mt-8 w-full max-w-[300px] mx-auto overflow-hidden rounded-2xl border border-[#d4cbc1] bg-[#eee6dd]">
              <img
                src={previewImage}
                alt={`${selectedMetalLabel} ring`}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-serif-luxury text-lg text-[#17242c]">{selectedMetalLabel}</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d] mt-0.5">
                    {collectionInfo.name}
                  </p>
                </div>
                <NorthStarIcon size={18} className="text-[#c9a15a]" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {displayMetalOptions.map((opt) => {
              const isSelected = selectedMetalLabel === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    const slug = LABEL_TO_SLUG[opt.label];
                    if (slug) setMetal(slug);
                  }}
                  className="relative text-left transition-all cursor-pointer"
                  style={{
                    border: isSelected ? '2px solid #4d3023' : '1px solid #e0d8cf',
                    borderRadius: '12px',
                    padding: '20px',
                    background: isSelected ? '#faf6f0' : '#faf8f4',
                  }}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#4d3023] text-[#f7f3ed] flex items-center justify-center">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                  )}
                  <div className="flex items-center gap-3 pr-6">
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: opt.swatch,
                        border: '1px solid #d4cbc1',
                        flexShrink: 0,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-serif-luxury text-lg text-[#17242c] leading-tight">
                        {opt.label}
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#69635d] mt-0.5">
                        {opt.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-[11px] text-[#17242c]/65 leading-relaxed mt-3">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-10 flex items-center justify-between border-t border-[#d4cbc1] mt-12">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer group shadow-sm"
            >
              <span>Next</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ SUB-STEP 05 · DIAMOND SIZE ============ */}
      {subStep === 5 && (
        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 sm:py-14 animate-fadeIn pb-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#69635d] font-semibold">
            Diamond Size
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#17242c] mt-2 leading-tight">
            Chosen by balance, not more.
          </h2>

          <div className="mt-10 bg-[#eee6dd] border border-[#d4cbc1] rounded-2xl p-7 sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-serif-luxury text-5xl font-light text-[#4d3023]">
                  {carat.toFixed(1)}
                  <span className="text-2xl ml-1">ct</span>
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#69635d] mt-1.5">
                  Centre Diamond
                </p>
              </div>
              <span className="font-script text-2xl text-[#17242c]/60">Balanced elegance</span>
            </div>

            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={carat}
              onChange={(e) => setCarat(parseFloat(e.target.value))}
              className="w-full mt-8 accent-[#4d3023] cursor-pointer"
              aria-label="Centre diamond carat weight"
            />
            <div className="flex justify-between font-sans text-[10px] uppercase tracking-wider text-[#69635d] mt-2">
              <span>0.5 ct</span>
              <span>1.0 ct · Classic choice</span>
              <span>2.0 ct</span>
            </div>
          </div>

          <p className="font-sans text-[11px] text-[#17242c]/50 mt-4 flex items-start gap-2 leading-relaxed">
            <Info size={13} className="text-[#69635d] shrink-0 mt-0.5" />
            Every carat weight is hand-selected by the maker. 1.0ct is the balanced, signature
            PARISSA expression.
          </p>

          <div className="pt-10 flex items-center justify-between border-t border-[#d4cbc1] mt-12">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all cursor-pointer group shadow-sm"
            >
              <span>Next</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ SUB-STEP 06 · SUMMARY ============ */}
      {subStep === 6 && (
        <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-14 animate-fadeIn">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#69635d] font-semibold">
            Your Craft
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#17242c] mt-2 leading-tight">
            A quiet close, perfectly yours.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-10">
            <div className="sm:col-span-4 bg-[#eee6dd] border border-[#d4cbc1] rounded-2xl p-5 flex flex-col items-center justify-center">
              <JewelryCanvas
                shape={shape}
                metal={metal}
                carat={carat}
                essenceGem={essenceArchetype.essenceGem}
                intentionGem={intentionOutcome.intentionGem}
                showHiddenGems={true}
                className="w-full max-w-[200px] aspect-square"
              />
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d] mt-1">
                {shapeInfo.name} · {metalInfo.name}
              </p>
            </div>

            <div className="sm:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#eee6dd]/50 border border-[#d4cbc1] rounded-xl">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                  Shape
                </p>
                <p className="font-serif-luxury text-xl text-[#17242c] mt-1">{shapeInfo.name}</p>
                <p className="font-serif text-xs italic text-[#17242c]/60">{shapeInfo.title}</p>
              </div>
              <div className="p-5 bg-[#eee6dd]/50 border border-[#d4cbc1] rounded-xl">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                  Setting
                </p>
                <p className="font-serif-luxury text-xl text-[#17242c] mt-1">
                  {collectionInfo.name}
                </p>
                <p className="font-serif text-xs italic text-[#17242c]/60">
                  {collectionInfo.tagline}
                </p>
              </div>
              <div className="p-5 bg-[#eee6dd]/50 border border-[#d4cbc1] rounded-xl">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                  Metal
                </p>
                <p className="font-serif-luxury text-xl text-[#17242c] mt-1">{metalInfo.name}</p>
                <p className="font-serif text-xs italic text-[#17242c]/60">
                  {metalInfo.subtitle}
                </p>
              </div>
              <div className="p-5 bg-[#eee6dd]/50 border border-[#d4cbc1] rounded-xl">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                  Size
                </p>
                <p className="font-serif-luxury text-xl text-[#17242c] mt-1">{carat.toFixed(1)} ct</p>
                <p className="font-serif text-xs italic text-[#17242c]/60">
                  {diamondType === 'natural' ? 'Natural Diamond' : 'Lab-Grown Diamond'}
                </p>
              </div>

              <div className="sm:col-span-2 p-5 bg-[#eee6dd]/50 border border-[#d4cbc1] rounded-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                      Your Size
                    </p>
                    <select
                      value={ringSize}
                      onChange={(e) => setRingSize(parseFloat(e.target.value))}
                      className="mt-2 bg-[#f7f3ed] border border-[#d4cbc1] rounded px-3 py-2 text-sm font-mono text-[#17242c] cursor-pointer"
                    >
                      {ringSizes.map((sz) => (
                        <option key={sz} value={sz}>
                          US {sz.toFixed(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                      Band
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                      {(['delicate', 'classic', 'substantial'] as BandWidth[]).map((bw) => (
                        <button
                          key={bw}
                          type="button"
                          onClick={() => setBandWidth(bw)}
                          className={`text-[10px] font-sans uppercase tracking-wider rounded-full px-3 py-1 border transition-all cursor-pointer capitalize ${
                            bandWidth === bw
                              ? 'bg-[#13292a] text-[#f7f3ed] border-[#13292a]'
                              : 'bg-transparent text-[#17242c]/55 border-[#d4cbc1]'
                          }`}
                        >
                          {bw}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#d4cbc1]">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69635d]">
                    Origin:
                  </span>
                  {(['natural', 'lab-grown'] as DiamondType[]).map((dt) => (
                    <button
                      key={dt}
                      type="button"
                      onClick={() => setDiamondType(dt)}
                      className={`text-[10px] font-sans uppercase tracking-wider rounded-full px-3 py-1 border transition-all cursor-pointer ${
                        diamondType === dt
                          ? 'bg-[#4d3023] text-[#f7f3ed] border-[#4d3023]'
                          : 'bg-transparent text-[#17242c]/55 border-[#d4cbc1]'
                      }`}
                    >
                      {dt === 'natural' ? 'Natural' : 'Lab-Grown'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#eee6dd] border border-[#d4cbc1] rounded-xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#69635d]">
                Ironclad price promise
              </p>
              <p className="font-serif text-sm text-[#17242c]/70 mt-1">
                Fixed, transparent pricing. No surprises — every PARISSA stone in your chosen grade
                is available at this size.
              </p>
            </div>
            <NorthStarIcon size={20} className="text-[#c9a15a] shrink-0" />
          </div>

          <div className="pt-8 mt-8 flex items-center justify-between border-t border-[#d4cbc1]">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-xs font-sans uppercase tracking-[0.2em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleProceed}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-sm cursor-pointer group"
            >
              <Sparkles size={14} />
              <span>Continue to Reveal</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ============ MOBILE FIXED CTA BAR (Intro only) ============ */}
      {subStep === 1 && (
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
              onClick={goPrev}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#d4cbc1] text-[11px] font-sans uppercase tracking-[0.18em] text-[#17242c]/60 hover:text-[#17242c] hover:border-[#17242c] transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4d3023] hover:bg-[#2f1e12] text-[#f7f3ed] rounded-full text-[11px] font-sans uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer group"
            >
              <span>Start Craft</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
