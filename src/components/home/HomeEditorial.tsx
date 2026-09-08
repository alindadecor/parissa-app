import React from 'react';
import { COLLECTIONS, DIAMOND_SHAPES, CATALOG_PRODUCTS } from '../../data/parissaData';
import { GemIcon, NorthStarIcon } from '../GemIcon';
import { ArrowRight, Sparkles, Shield, Compass, Heart, Eye } from 'lucide-react';
import { DiamondShape } from '../../types';

interface HomeEditorialProps {
  onStartJourney: () => void;
  onExploreRings: () => void;
  onSelectProduct: (productId: string) => void;
  onStartJourneyWithShape: (shape: DiamondShape) => void;
}

export const HomeEditorial: React.FC<HomeEditorialProps> = ({
  onStartJourney,
  onExploreRings,
  onSelectProduct,
  onStartJourneyWithShape,
}) => {
  return (
    <div className="space-y-24">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[82vh] flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle geometric orbital background lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-[680px] h-[680px] rounded-full border border-[#1A1A1A]/20" />
          <div className="absolute w-[460px] h-[460px] rounded-full border border-[#1A1A1A]/15" />
          <div className="absolute w-full h-[1px] bg-[#1A1A1A]/10" />
          <div className="absolute h-full w-[1px] bg-[#1A1A1A]/10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fadeIn py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1A1A1A]/15 bg-[#FAF8F5]/80 backdrop-blur-xs">
            <NorthStarIcon size={12} className="text-[#C9A15A]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-medium text-[#1A1A1A]">
              Outer Diamond · Inner Light
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#1A1A1A] tracking-tight leading-[1.08]">
            Some diamonds mark a promise. <br />
            <span className="italic font-normal">Ours mark a choice.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/75 max-w-2xl mx-auto leading-relaxed font-light">
            PARISSA fine jewelry pairs an outer diamond with two hidden gems — an essence gem for the light you already carry, and an intention gem for the chapter you choose next.
          </p>

          {/* Prominent Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartJourney}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm group"
            >
              <span>Begin My Parissa Journey</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreRings}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#1A1A1A]/30 text-[#1A1A1A] font-sans text-xs uppercase tracking-[0.25em] font-medium hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
            >
              Explore the Rings
            </button>
          </div>

          {/* Reassurance pill */}
          <div className="pt-4">
            <span className="font-serif text-xs text-[#1A1A1A]/60 italic">
              Designed in Melbourne · Handcrafted to Order · Lab-Grown Diamonds
            </span>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="border-y border-[#1A1A1A]/10 py-6 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
              Designed in Melbourne
            </span>
            <p className="font-sans text-xs text-[#1A1A1A]/60">Original Australian craft</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
              Solid 14K & 18K Gold
            </span>
            <p className="font-sans text-xs text-[#1A1A1A]/60">Or pure Platinum 950</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
              Two Hidden Gems
            </span>
            <p className="font-sans text-xs text-[#1A1A1A]/60">Resting against your skin</p>
          </div>
          <div className="space-y-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
              Private Meaning
            </span>
            <p className="font-sans text-xs text-[#1A1A1A]/60">A mirror, not a prediction</p>
          </div>
        </div>
      </section>

      {/* ================= THE THREE SHAPES ================= */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/50">
            Three Forms
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Three shapes are enough.
          </h2>
          <p className="font-sans text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
            When the journey is the product, three timeless silhouettes hold every chapter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(['round', 'oval', 'marquise'] as DiamondShape[]).map((shapeKey) => {
            const shape = DIAMOND_SHAPES[shapeKey];
            return (
              <div
                key={shapeKey}
                className="group relative bg-[#FAF8F5] p-8 rounded-2xl border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/40 transition-all duration-300 flex flex-col items-center text-center shadow-xs"
              >
                <div className="my-8 transform group-hover:scale-105 transition-transform duration-300">
                  <GemIcon shape={shapeKey} size={76} colorHex="#1A1A1A" accentHex="#C9A15A" />
                </div>

                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-bold mb-1">
                  {shape.name}
                </span>
                <h3 className="font-serif text-3xl text-[#1A1A1A] font-normal mb-2">
                  {shape.title}
                </h3>
                <p className="font-sans text-xs text-[#1A1A1A]/70 italic mb-4">
                  {shape.character}
                </p>
                <p className="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed mb-6 font-light">
                  {shape.poeticNote}
                </p>

                <button
                  onClick={() => onStartJourneyWithShape(shapeKey)}
                  className="mt-auto w-full py-3 rounded-full border border-[#1A1A1A]/30 text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#FAF8F5] transition-all cursor-pointer"
                >
                  Configure {shape.name}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= THE FOUR EXPRESSIONS ================= */}
      <section className="bg-[#13292A] text-[#FAF8F5] py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-xl">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C9A15A] font-semibold">
                Collections
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-white">
                Four Expressions of Form
              </h2>
              <p className="font-sans text-sm text-white/70 font-light">
                Distinct architectural settings crafted around the two hidden talisman gems.
              </p>
            </div>
            <button
              onClick={onExploreRings}
              className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A15A] hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>View All Collections</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(COLLECTIONS).map((col) => (
              <div
                key={col.name}
                className="bg-white/5 p-7 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 hover:bg-white/10 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-medium">
                      {col.statusLabel}
                    </span>
                    <NorthStarIcon size={14} className="text-[#C9A15A]" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {col.name}
                  </h3>
                  <p className="font-sans text-xs text-white/80 italic">
                    “{col.tagline}”
                  </p>
                  <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                    {col.description}
                  </p>
                </div>

                <button
                  onClick={onExploreRings}
                  className="w-full py-2.5 rounded-full border border-white/20 text-xs font-sans uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#13292A] transition-all cursor-pointer"
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE FIVE-STEP JOURNEY OVERVIEW ================= */}
      <section className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/50">
            The Experience
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight">
            How your story unfolds.
          </h2>
          <p className="font-sans text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
            Five deliberate reflections connecting your inner truth with precious physical craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Place & Shape',
              desc: 'Choose your hand, finger, and one of three launch diamond shapes.',
            },
            {
              step: '02',
              title: 'Essence',
              desc: 'Discover your rising sign archetype and the essence gem you carry.',
            },
            {
              step: '03',
              title: 'Intention',
              desc: 'Five quiet reflections reveal your intention gem for the chapter ahead.',
            },
            {
              step: '04',
              title: 'Craft',
              desc: 'Choose solid gold or platinum, carat weight, and bespoke ring size.',
            },
            {
              step: '05',
              title: 'Reveal',
              desc: 'Your bespoke story, pairing inner and outer gems into one heirloom.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#1A1A1A]/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="font-serif text-2xl text-[#1A1A1A]/40 font-light block">
                  {item.step}
                </span>
                <h4 className="font-serif text-xl font-medium text-[#1A1A1A]">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onStartJourney}
            className="px-10 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all inline-flex items-center gap-3 cursor-pointer shadow-sm group"
          >
            <span>Begin My Journey</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ================= EDITORIAL JOURNAL SNEAK PEEK ================= */}
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#1A1A1A]/50">
              The Journal
            </span>
            <h3 className="font-serif text-3xl text-[#1A1A1A]">
              Reflections on Meaning & Craft
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="space-y-4">
            <div className="w-full aspect-16/10 bg-[#E8E2D5] rounded-xl overflow-hidden flex items-center justify-center p-6 border border-[#1A1A1A]/10">
              <span className="font-serif text-2xl text-[#1A1A1A]/40 italic">
                “A mirror, not a prediction.”
              </span>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">
              Astrological Symbolism
            </span>
            <h4 className="font-serif text-xl text-[#1A1A1A] font-normal hover:underline cursor-pointer">
              Why Rising Signs Hold Our Public Light
            </h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              Unlike the sun sign which represents the inner self, your rising sign marks how you arrive into rooms and meet the world.
            </p>
          </article>

          <article className="space-y-4">
            <div className="w-full aspect-16/10 bg-[#E8E2D5] rounded-xl overflow-hidden flex items-center justify-center p-6 border border-[#1A1A1A]/10">
              <span className="font-serif text-2xl text-[#1A1A1A]/40 italic">
                “Two hidden sanctuaries.”
              </span>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">
              Architectural Craft
            </span>
            <h4 className="font-serif text-xl text-[#1A1A1A] font-normal hover:underline cursor-pointer">
              The Secret Under-Gallery & Pulse Gemstones
            </h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              Why we conceal two colorful sapphires inside the inner shank, resting directly against your skin rather than competing with the diamond.
            </p>
          </article>

          <article className="space-y-4">
            <div className="w-full aspect-16/10 bg-[#E8E2D5] rounded-xl overflow-hidden flex items-center justify-center p-6 border border-[#1A1A1A]/10">
              <span className="font-serif text-2xl text-[#1A1A1A]/40 italic">
                “There is no wrong finger.”
              </span>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-semibold block">
              Self-Sovereignty
            </span>
            <h4 className="font-serif text-xl text-[#1A1A1A] font-normal hover:underline cursor-pointer">
              Reclaiming Fine Jewelry for Yourself
            </h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              For generations, diamonds were gifts marking someone else’s claim. Here is what happens when you buy your own diamond.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};
