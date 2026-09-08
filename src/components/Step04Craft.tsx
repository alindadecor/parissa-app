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
import { PriceDisplay } from './PriceDisplay';
import { ArrowRight, ArrowLeft, Info, Sparkles } from 'lucide-react';

interface Step04Props {
  initialConfig: Partial<RingConfiguration>;
  essenceArchetype: EssenceArchetype;
  intentionOutcome: IntentionOutcome;
  onComplete: (config: Partial<RingConfiguration>) => void;
  onBack: () => void;
}

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
  const [carat, setCarat] = useState<number>(initialConfig.carat || 1.5);
  const [metal, setMetal] = useState<MetalType>(initialConfig.metal || '18k-yellow-gold');
  const [ringSize, setRingSize] = useState<number>(initialConfig.ringSize || 6.5);
  const [bandWidth, setBandWidth] = useState<BandWidth>(
    initialConfig.bandWidth || 'classic'
  );

  const [showSizerModal, setShowSizerModal] = useState(false);

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

  const carats = [1.0, 1.5, 2.0, 2.5, 3.0];
  const ringSizes = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#1A1A1A]/10 text-xs font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Intention</span>
        </button>
        <span className="font-semibold text-[#1A1A1A]">
          Step 04 of 05 • Craft Configurator
        </span>
        <span className="hidden sm:inline">Melbourne Maison Atelier</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Live Ring Canvas & Secret Inner Bridge */}
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <div className="bg-[#E8E4D9]/40 border border-[#1A1A1A]/10 p-8 rounded-sm text-center relative flex flex-col items-center justify-between min-h-[520px]">
            {/* Top metadata */}
            <div className="w-full flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/50">
              <span>Bespoke Solitaire Atelier</span>
              <span className="font-semibold text-[#1A1A1A]">{collection}</span>
            </div>

            {/* Interactive Jewelry Canvas */}
            <div className="w-full py-4 flex items-center justify-center">
              <JewelryCanvas
                shape={shape}
                metal={metal}
                carat={carat}
                essenceGem={essenceArchetype.essenceGem}
                intentionGem={intentionOutcome.intentionGem}
                showHiddenGems={true}
                className="w-full max-w-[340px] aspect-square"
              />
            </div>

            {/* Hidden Talisman Duo Breakdown */}
            <div className="w-full bg-[#FAF8F5] border border-[#1A1A1A]/10 p-5 rounded-sm">
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-3">
                <span>Secret Inner Shank Setting</span>
                <span className="text-xs font-serif">✦ North Star Hallmark</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                {/* Left: Essence Gem */}
                <div className="flex items-center gap-3 p-2 bg-[#E8E4D9]/30 rounded">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 border border-[#FFFFFF] shadow-sm"
                    style={{ backgroundColor: essenceArchetype.essenceGem.hex }}
                  />
                  <div>
                    <span className="font-serif-luxury text-xs font-semibold block text-[#1A1A1A]">
                      {essenceArchetype.essenceGem.name}
                    </span>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/50">
                      Essence • {essenceArchetype.sign}
                    </span>
                  </div>
                </div>

                {/* Right: Intention Gem */}
                <div className="flex items-center gap-3 p-2 bg-[#E8E4D9]/30 rounded">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 border border-[#FFFFFF] shadow-sm"
                    style={{ backgroundColor: intentionOutcome.intentionGem.hex }}
                  />
                  <div>
                    <span className="font-serif-luxury text-xs font-semibold block text-[#1A1A1A]">
                      {intentionOutcome.intentionGem.name}
                    </span>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/50">
                      Intention • {intentionOutcome.theme.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Pending & Lead Time Notice per Brief V2 */}
            <div className="w-full pt-4 mt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-sans">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 block">Investment</span>
                <PriceDisplay className="font-mono text-sm font-semibold text-[#1A1A1A] tracking-wider" />
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 block">Atelier Timeline</span>
                <span className="text-xs font-serif italic text-[#1A1A1A]/80">4–6 Weeks Handcrafted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Configuration Controls */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60 block mb-2">
              Master Atelier Specifications
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1A1A1A]">
              Personalize Your Setting
            </h2>
          </div>

          {/* 1. Signature Collection Selection (Asset Brief 03 Aug) */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-3">
              Setting Architecture
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(COLLECTIONS) as CollectionName[]).map((colKey) => {
                const colInfo = COLLECTIONS[colKey];
                const isSelected = collection === colKey;
                return (
                  <button
                    key={colKey}
                    type="button"
                    onClick={() => setCollection(colKey)}
                    className={`p-4 rounded text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8E4D9] border-[#1A1A1A] shadow-sm'
                        : 'bg-[#FAF8F5] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                    }`}
                  >
                    <span className="font-serif-luxury text-lg font-medium text-[#1A1A1A] block">
                      {colInfo.name}
                    </span>
                    <span className="font-sans text-[10px] text-[#1A1A1A]/60 line-clamp-1 mt-0.5">
                      {colInfo.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Shape (Round, Oval, Marquise) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
                Diamond Shape
              </label>
              <span className="font-sans text-[11px] text-[#1A1A1A]/50">Selected in Step 01</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['round', 'oval', 'marquise'] as DiamondShape[]).map((s) => {
                const isSelected = shape === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShape(s)}
                    className={`py-3 px-4 rounded text-xs font-sans uppercase tracking-[0.15em] border transition-all cursor-pointer text-center font-medium ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                        : 'bg-[#FAF8F5] text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]'
                    }`}
                  >
                    {DIAMOND_SHAPES[s].name.replace(' Brilliant', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Diamond Origin: Natural vs Lab-Grown */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-3">
              Diamond Origin
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiamondType('natural')}
                className={`p-4 rounded border text-left transition-all cursor-pointer ${
                  diamondType === 'natural'
                    ? 'bg-[#E8E4D9] border-[#1A1A1A] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                }`}
              >
                <span className="font-serif-luxury text-lg font-medium text-[#1A1A1A] block">
                  Natural Diamond
                </span>
                <span className="font-sans text-[10px] text-[#1A1A1A]/60">
                  Billions of years old • GIA Certified
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDiamondType('lab-grown')}
                className={`p-4 rounded border text-left transition-all cursor-pointer ${
                  diamondType === 'lab-grown'
                    ? 'bg-[#E8E4D9] border-[#1A1A1A] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                }`}
              >
                <span className="font-serif-luxury text-lg font-medium text-[#1A1A1A] block">
                  Lab-Grown Diamond
                </span>
                <span className="font-sans text-[10px] text-[#1A1A1A]/60">
                  Optically & chemically identical • IGI Certified
                </span>
              </button>
            </div>
          </div>

          {/* 4. Carat Weight */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
                Centre Diamond Carat
              </label>
              <span className="font-mono text-xs font-semibold text-[#1A1A1A]">{carat.toFixed(1)} Carat</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {carats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCarat(c)}
                  className={`py-3 rounded text-xs font-mono font-medium border transition-all cursor-pointer text-center ${
                    carat === c
                      ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]'
                  }`}
                >
                  {c.toFixed(1)} ct
                </button>
              ))}
            </div>
          </div>

          {/* 5. Precious Metal Alloy */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-3">
              Noble Metal Alloy
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(METALS) as MetalType[]).map((mKey) => {
                const metalInfo = METALS[mKey];
                const isSelected = metal === mKey;
                return (
                  <button
                    key={mKey}
                    type="button"
                    onClick={() => setMetal(mKey)}
                    className={`p-3 rounded border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8E4D9] border-[#1A1A1A] shadow-sm ring-1 ring-[#1A1A1A]'
                        : 'bg-[#FAF8F5] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full mb-2 border border-[#1A1A1A]/20"
                      style={{ backgroundColor: metalInfo.hex }}
                    />
                    <span className="font-serif-luxury text-sm font-medium text-[#1A1A1A] block">
                      {metalInfo.name}
                    </span>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/50">
                      {metalInfo.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Ring Size & Band Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
                  Ring Size (US)
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizerModal(true)}
                  className="text-[10px] font-sans text-[#1A1A1A]/60 hover:text-[#1A1A1A] underline cursor-pointer flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Size Guide</span>
                </button>
              </div>
              <select
                value={ringSize}
                onChange={(e) => setRingSize(parseFloat(e.target.value))}
                className="w-full p-3 bg-[#FAF8F5] border border-[#1A1A1A]/20 rounded text-sm text-[#1A1A1A] font-mono cursor-pointer"
              >
                {ringSizes.map((sz) => (
                  <option key={sz} value={sz}>
                    US {sz.toFixed(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] mb-2">
                Band Width
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['delicate', 'classic', 'substantial'] as BandWidth[]).map((bw) => (
                  <button
                    key={bw}
                    type="button"
                    onClick={() => setBandWidth(bw)}
                    className={`py-3 text-[10px] font-sans uppercase tracking-wider rounded border transition-all cursor-pointer capitalize ${
                      bandWidth === bw
                        ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                        : 'bg-[#FAF8F5] text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]'
                    }`}
                  >
                    {bw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Proceed to Reveal */}
          <div className="pt-6 border-t border-[#1A1A1A]/10">
            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-4 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Configuration & Reveal My Story (Step 05)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sizer Guidance Modal */}
      {showSizerModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-[#1A1A1A]/20 p-8 max-w-md w-full rounded shadow-xl">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-2">
              Complimentary PARISSA Ring Sizer
            </h3>
            <p className="font-sans text-xs text-[#1A1A1A]/70 mb-4 leading-relaxed">
              Every PARISSA ring is handcrafted to your exact fractional millimetre. If you are unsure of your ring size, you can place your reservation and our Melbourne atelier will express courier a physical sizing gauge directly to your home before casting your ring.
            </p>
            <div className="p-3 bg-[#E8E4D9]/50 rounded text-xs font-serif italic text-[#1A1A1A]/80 mb-6">
              "We provide one complimentary resizing within the first 12 months of purchase."
            </div>
            <button
              type="button"
              onClick={() => setShowSizerModal(false)}
              className="w-full py-3 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.2em]"
            >
              Close Guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
