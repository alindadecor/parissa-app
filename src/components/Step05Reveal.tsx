import React from 'react';
import { RingConfiguration } from '../types';
import { METALS, DIAMOND_SHAPES, COLLECTIONS } from '../data/parissaData';
import { JewelryCanvas } from './JewelryCanvas';
import { PriceDisplay } from './PriceDisplay';
import { Bookmark, ShoppingBag, Edit3, Check, Printer } from 'lucide-react';

interface Step05Props {
  ringConfig: RingConfiguration;
  onContinueToRing: () => void;
  onSaveStory: () => void;
  onChangeAnyChoice: () => void;
  isSaved?: boolean;
}

export const Step05Reveal: React.FC<Step05Props> = ({
  ringConfig,
  onContinueToRing,
  onSaveStory,
  onChangeAnyChoice,
  isSaved = false,
}) => {
  const metal = METALS[ringConfig.metal];
  const shape = DIAMOND_SHAPES[ringConfig.shape];
  const collection = COLLECTIONS[ringConfig.collection];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Editorial Marker */}
      <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#1A1A1A]/10 text-xs font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]"></span>
          <span>Step 05 of 05 • Reveal</span>
        </span>
        <span className="font-semibold text-[#1A1A1A]">
          Your Parissa Story & Bespoke Talisman
        </span>
      </div>

      {/* Main Reading & Presentation Document */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A]/15 p-8 sm:p-12 md:p-16 rounded-sm shadow-sm relative overflow-hidden mb-12">
        {/* Artistic Flair Watermark & Decorative Frame */}
        <div className="absolute top-8 right-8 text-6xl font-serif text-[#1A1A1A]/5 pointer-events-none select-none">
          ✦
        </div>

        {/* Story Title & Date */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] font-bold text-[#1A1A1A]/60">
              Personal Reading & Talisman Seal
            </span>
            <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1A1A] leading-tight mb-4">
            The {ringConfig.essenceArchetype.archetypeTitle} & <br />
            The Light of {ringConfig.intentionOutcome.title.split('&')[0]}
          </h1>

          <p className="font-serif italic text-base text-[#1A1A1A]/60">
            Consecrated for the {ringConfig.hand} hand, on the {ringConfig.finger} finger.
          </p>
        </div>

        {/* 1. Who You Are: Essence Gem Section */}
        <div className="mb-12 pb-12 border-b border-[#1A1A1A]/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#1A1A1A]">
              01 • Who You Are (Your Astrological Essence)
            </span>
          </div>

          <div className="bg-[#E8E4D9]/40 border border-[#1A1A1A]/10 p-6 rounded-sm mb-4 flex flex-col sm:flex-row items-center gap-6">
            <div
              className="w-16 h-16 rounded-full shadow-md flex-shrink-0 flex items-center justify-center border-2 border-[#FFFFFF]"
              style={{ backgroundColor: ringConfig.essenceArchetype.essenceGem.hex }}
            >
              <div className="w-3 h-3 rounded-full bg-[#FFFFFF]/60" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif-luxury text-2xl font-medium text-[#1A1A1A]">
                  {ringConfig.essenceArchetype.essenceGem.name}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/50">
                  ({ringConfig.essenceArchetype.sign} Ascendant)
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#1A1A1A]/80 mb-2">
                "{ringConfig.essenceArchetype.coreLight}"
              </p>
              <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                {ringConfig.essenceArchetype.reading}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Where You Are Going: Intention Gem Section */}
        <div className="mb-12 pb-12 border-b border-[#1A1A1A]/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#1A1A1A]">
              02 • Where You Are Stepping (Your Guiding Intention)
            </span>
          </div>

          <div className="bg-[#E8E4D9]/40 border border-[#1A1A1A]/10 p-6 rounded-sm mb-4 flex flex-col sm:flex-row items-center gap-6">
            <div
              className="w-16 h-16 rounded-full shadow-md flex-shrink-0 flex items-center justify-center border-2 border-[#FFFFFF]"
              style={{ backgroundColor: ringConfig.intentionOutcome.intentionGem.hex }}
            >
              <div className="w-3 h-3 rounded-full bg-[#FFFFFF]/60" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif-luxury text-2xl font-medium text-[#1A1A1A]">
                  {ringConfig.intentionOutcome.intentionGem.name}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/50">
                  (Intention: {ringConfig.intentionOutcome.theme})
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#1A1A1A]/80 mb-2">
                "{ringConfig.intentionOutcome.affirmation}"
              </p>
              <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                {ringConfig.intentionOutcome.reading}
              </p>
            </div>
          </div>
        </div>

        {/* 3. The Handcrafted Ring Visual & Confirmation */}
        <div className="mb-12 pb-12 border-b border-[#1A1A1A]/10">
          <div className="flex items-center justify-between mb-6">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#1A1A1A]">
              03 • The Physical Vessel (Handcrafted Solitaire)
            </span>
            <span className="font-serif italic text-sm text-[#1A1A1A]/60">
              {collection.name} Setting
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#E8E4D9]/20 border border-[#1A1A1A]/10 p-6 rounded-sm">
            {/* Visual Canvas */}
            <div className="md:col-span-5 flex items-center justify-center">
              <JewelryCanvas
                shape={ringConfig.shape}
                metal={ringConfig.metal}
                carat={ringConfig.carat}
                essenceGem={ringConfig.essenceArchetype.essenceGem}
                intentionGem={ringConfig.intentionOutcome.intentionGem}
                showHiddenGems={true}
                className="w-full max-w-[260px] aspect-square"
              />
            </div>

            {/* Vessel Specifications in refined editorial styling */}
            <div className="md:col-span-7 space-y-3 font-sans text-xs text-[#1A1A1A]">
              <div className="flex justify-between py-2 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/60">Silhouette & Cut:</span>
                <span className="font-medium text-[#1A1A1A]">{shape.name} ({shape.title})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/60">Centre Stone Weight:</span>
                <span className="font-medium text-[#1A1A1A]">{ringConfig.carat.toFixed(1)} Carats ({ringConfig.diamondType === 'natural' ? 'Natural GIA' : 'Lab-Grown IGI'})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/60">Precious Metal:</span>
                <span className="font-medium text-[#1A1A1A]">{metal.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/60">Band Proportion:</span>
                <span className="font-medium capitalize text-[#1A1A1A]">{ringConfig.bandWidth} Band • US Size {ringConfig.ringSize.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/60">Secret Inner Bridge:</span>
                <span className="font-medium text-[#1A1A1A]">
                  {ringConfig.essenceArchetype.essenceGem.name} + {ringConfig.intentionOutcome.intentionGem.name}
                </span>
              </div>
              <div className="flex justify-between py-2 pt-3 font-mono">
                <span className="text-[#1A1A1A]/60 font-sans">Investment:</span>
                <PriceDisplay config={ringConfig} className="font-semibold text-sm tracking-wider text-[#1A1A1A]" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. North Star Symbolic Closure (Brief Mandate: "Meaningful symbolic closure in Reveal") */}
        <div className="text-center max-w-lg mx-auto py-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#1A1A1A]/20 mb-4 bg-[#FFFFFF]/60">
            <span className="text-xl font-serif text-[#1A1A1A]">✦</span>
          </div>
          <h3 className="font-serif-luxury text-2xl font-light text-[#1A1A1A] mb-2">
            The North Star Seal
          </h3>
          <p className="font-serif italic text-sm text-[#1A1A1A]/70 leading-relaxed">
            "Your ring is sealed with our signature engraved North Star hallmark—tucked between your Essence Gem and Intention Gem. It represents the quiet, immovable center point around which all the constellations turn: your eternal orientation."
          </p>
        </div>
      </div>

      {/* Action CTAs: CONTINUE TO MY RING, SAVE MY STORY, CHANGE ANY CHOICE */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Full CTA Button: Change Any Choice */}
        <button
          type="button"
          onClick={onChangeAnyChoice}
          className="px-6 py-4 border border-[#1A1A1A]/25 rounded-full text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#E8E4D9]/60 transition-all cursor-pointer flex items-center justify-center gap-2 text-[#1A1A1A]"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Change Any Choice</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Save My Story */}
          <button
            type="button"
            onClick={onSaveStory}
            className={`px-6 py-4 border rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-[#E8E4D9] border-[#1A1A1A] text-[#1A1A1A]'
                : 'border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#FAF8F5]'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Story Saved' : 'Save My Story'}</span>
          </button>

          {/* Print reading option */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print Personal Reading"
            className="p-4 border border-[#1A1A1A]/20 rounded-full text-[#1A1A1A] hover:bg-[#E8E4D9]/60 transition-colors hidden md:flex items-center justify-center cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Continue To My Ring (Atelier Bag / Cart) */}
          <button
            type="button"
            onClick={onContinueToRing}
            className="px-8 py-4 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue to My Ring</span>
          </button>
        </div>
      </div>
    </div>
  );
};
