import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NorthStarIcon, SilhouetteEmblem } from './GemIcon';
import { DiamondShape } from '../types';

interface HomeHeroProps {
  onStartJourney: (shape?: DiamondShape) => void;
  onExploreRings: () => void;
  onSelectCollection?: (col: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartJourney,
  onExploreRings,
}) => {
  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] overflow-hidden">
      {/* ========================================================================= */}
      {/* 04 / VISUAL DIRECTION: HOMEPAGE (DESKTOP & MOBILE)                        */}
      {/* "The first screen explains why Parissa exists, then gives two equally     */}
      {/*  legitimate ways to begin."                                              */}
      {/* ========================================================================= */}
      <section className="relative w-full border-b border-[#1A1A1A]/10 bg-[#24211D] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:min-h-[720px]">
          {/* Left Column: Headline, Narrative & Dual Equal Paths */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10">
            <div className="space-y-6 pt-2 sm:pt-6">
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] font-medium text-[#D4AF37] block">
                The Constellation Collection
              </span>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[62px] font-light text-[#FAF8F5] leading-[1.08] tracking-tight">
                Some diamonds<br />
                mark a promise.<br />
                <span className="italic font-light text-[#F3EFE6]">Ours mark a choice.</span>
              </h1>

              <div className="font-sans text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed max-w-md pt-2 space-y-1">
                <p>Begin with who you are. Choose the chapter ahead. Create a ring that carries both.</p>
              </div>

              {/* Dual Primary Actions — Visible above the fold on all screens */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md">
                <button
                  type="button"
                  onClick={() => onStartJourney('oval')}
                  className="px-7 py-4 rounded-full bg-[#FAF8F5] text-[#1A1A1A] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-white transition-all text-center cursor-pointer shadow-sm group"
                >
                  <span>Begin My Parissa Journey</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreRings}
                  className="px-7 py-4 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#FAF8F5]/10 transition-all text-center cursor-pointer"
                >
                  <span>Explore the Rings</span>
                </button>
              </div>
            </div>

            {/* Subtle mobile guidance quote */}
            <div className="block lg:hidden pt-6">
              <p className="font-sans text-xs text-[#FAF8F5]/60 italic">
                Prefer to see the rings first? You can explore all three silhouettes without starting the Journey.
              </p>
            </div>

            {/* Bottom 3 Trust Signals */}
            <div className="pt-10 pb-2 border-t border-white/10 mt-8">
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-[#FAF8F5]">
                    Designed in Melbourne
                  </span>
                  <span className="block text-[10px] font-sans text-[#FAF8F5]/50 tracking-wider">
                    Made to order
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-[#FAF8F5]">
                    Solid Gold
                  </span>
                  <span className="block text-[10px] font-sans text-[#FAF8F5]/50 tracking-wider">
                    14K or 18K
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-[#FAF8F5]">
                    Private Meaning
                  </span>
                  <span className="block text-[10px] font-sans text-[#FAF8F5]/50 tracking-wider">
                    Two hidden gems
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signature 3 Solitaire Rings Editorial Visual */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full overflow-hidden flex items-center justify-center p-6 lg:p-12 bg-gradient-to-b lg:bg-gradient-to-r from-[#24211D] via-[#1E1B17] to-[#171512]">
            {/* Ambient Lighting & Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

            {/* Three Solitaires Composition (Round, Oval, Marquise in 18K Yellow Gold) */}
            <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
              <svg viewBox="0 0 540 460" className="w-full h-full drop-shadow-2xl select-none" fill="none">
                <defs>
                  {/* Yellow Gold Gradient */}
                  <linearGradient id="ygRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFC386" />
                    <stop offset="25%" stopColor="#C99B4B" />
                    <stop offset="50%" stopColor="#FFF2D1" />
                    <stop offset="75%" stopColor="#BA8C3E" />
                    <stop offset="100%" stopColor="#8E6725" />
                  </linearGradient>

                  {/* Diamond Facet Shimmer */}
                  <linearGradient id="diamondGrad" x1="15%" y1="0%" x2="85%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="40%" stopColor="#F6F9FA" stopOpacity="0.9" />
                    <stop offset="80%" stopColor="#E2EAF0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C8D6DF" stopOpacity="0.85" />
                  </linearGradient>

                  <radialGradient id="ringShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Soft ground shadows */}
                <ellipse cx="140" cy="380" rx="90" ry="24" fill="url(#ringShadow)" opacity="0.8" />
                <ellipse cx="270" cy="370" rx="100" ry="26" fill="url(#ringShadow)" opacity="0.9" />
                <ellipse cx="400" cy="385" rx="85" ry="22" fill="url(#ringShadow)" opacity="0.8" />

                {/* Ring 1: Left - Round Solitaire (Tilted perspective) */}
                <g transform="translate(140, 240) rotate(-14)">
                  {/* Shank */}
                  <ellipse cx="0" cy="40" rx="66" ry="66" stroke="url(#ygRingGrad)" strokeWidth="11" fill="none" />
                  {/* Gallery & Prongs */}
                  <path d="M-14 40 L-10 -16 L10 -16 L14 40 Z" fill="url(#ygRingGrad)" opacity="0.9" />
                  {/* Round Diamond */}
                  <circle cx="0" cy="-22" r="30" fill="url(#diamondGrad)" stroke="#E9ECEF" strokeWidth="1" />
                  <circle cx="0" cy="-22" r="16" stroke="#495057" strokeWidth="0.8" opacity="0.6" />
                  <path d="M0 -52 L0 8 M-30 -22 L30 -22" stroke="#6C757D" strokeWidth="0.75" opacity="0.5" />
                  {/* Prongs */}
                  <circle cx="-16" cy="-36" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="16" cy="-36" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="-22" cy="-14" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="22" cy="-14" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="-16" cy="-6" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="16" cy="-6" r="3.5" fill="url(#ygRingGrad)" />
                </g>

                {/* Ring 2: Center - Oval Solitaire (Hero prominence) */}
                <g transform="translate(270, 220)">
                  {/* Shank */}
                  <ellipse cx="0" cy="45" rx="74" ry="74" stroke="url(#ygRingGrad)" strokeWidth="13" fill="none" />
                  {/* Inner North Star hallmark whisper */}
                  <g transform="translate(0, 114) scale(0.35)">
                    <path d="M0 -15 L3 -3 L15 0 L3 3 L0 15 L-3 3 L-15 0 L-3 -3 Z" fill="#FFF2D1" />
                  </g>
                  {/* Gallery */}
                  <path d="M-18 45 L-12 -22 L12 -22 L18 45 Z" fill="url(#ygRingGrad)" />
                  {/* Oval Diamond */}
                  <ellipse cx="0" cy="-28" rx="28" ry="42" fill="url(#diamondGrad)" stroke="#E9ECEF" strokeWidth="1.2" />
                  <ellipse cx="0" cy="-28" rx="16" ry="24" stroke="#495057" strokeWidth="0.8" opacity="0.6" />
                  <line x1="0" y1="-70" x2="0" y2="14" stroke="#6C757D" strokeWidth="0.8" opacity="0.5" />
                  <line x1="-28" y1="-28" x2="28" y2="-28" stroke="#6C757D" strokeWidth="0.8" opacity="0.5" />
                  {/* 4 Prongs */}
                  <circle cx="-16" cy="-56" r="4" fill="url(#ygRingGrad)" />
                  <circle cx="16" cy="-56" r="4" fill="url(#ygRingGrad)" />
                  <circle cx="-16" cy="0" r="4" fill="url(#ygRingGrad)" />
                  <circle cx="16" cy="0" r="4" fill="url(#ygRingGrad)" />
                </g>

                {/* Ring 3: Right - Marquise Solitaire (Tilted perspective) */}
                <g transform="translate(400, 245) rotate(16)">
                  {/* Shank */}
                  <ellipse cx="0" cy="40" rx="66" ry="66" stroke="url(#ygRingGrad)" strokeWidth="11" fill="none" />
                  {/* Gallery */}
                  <path d="M-14 40 L-9 -18 L9 -18 L14 40 Z" fill="url(#ygRingGrad)" opacity="0.9" />
                  {/* Marquise Diamond */}
                  <path
                    d="M0 -70 C24 -35, 24 15, 0 42 C-24 15, -24 -35, 0 -70 Z"
                    fill="url(#diamondGrad)"
                    stroke="#E9ECEF"
                    strokeWidth="1"
                  />
                  <line x1="0" y1="-70" x2="0" y2="42" stroke="#495057" strokeWidth="0.8" opacity="0.6" />
                  <line x1="-15" y1="-14" x2="15" y2="-14" stroke="#6C757D" strokeWidth="0.8" opacity="0.5" />
                  {/* V-prongs at tips */}
                  <polygon points="0,-73 -5,-62 5,-62" fill="url(#ygRingGrad)" />
                  <polygon points="0,45 -5,35 5,35" fill="url(#ygRingGrad)" />
                  <circle cx="-16" cy="-14" r="3.5" fill="url(#ygRingGrad)" />
                  <circle cx="16" cy="-14" r="3.5" fill="url(#ygRingGrad)" />
                </g>
              </svg>

              {/* Floating North Star Watermark */}
              <div className="absolute top-6 right-6 text-[#FAF8F5]/30">
                <NorthStarIcon size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Directional Visual Render Footnote */}
        <div className="border-t border-white/5 py-2.5 px-6 text-center bg-[#1A1815]">
          <p className="text-[10px] font-sans tracking-widest text-[#FAF8F5]/40 uppercase">
            Directional visual render. Final photography, exact fonts and ecommerce content remain subject to founder approval.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 / COLLECTION ENTRY                                                     */}
      {/* "The Constellation Collection - two ways to begin"                        */}
      {/* "This page prevents the Journey from becoming a barrier.                  */}
      {/*  A customer can choose meaning first or product first."                   */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.28em] font-medium text-[#B38E5A] block">
            05 / Collection Entry
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
            How would you like to begin?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/70 max-w-xl mx-auto font-light">
            There is no right order. Start with your story or start with the ring.
          </p>
        </div>

        {/* Two Large Side-by-Side Cards matching Page 5 of the PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Dark Card — START WITH YOUR STORY */}
          <div className="bg-[#1A1A1A] text-[#FAF8F5] rounded-2xl p-8 sm:p-12 flex flex-col justify-between items-center text-center shadow-md relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(179,142,90,0.15),transparent_70%)] pointer-events-none" />

            <div className="space-y-6 flex flex-col items-center relative z-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B38E5A] font-semibold">
                Start with your story
              </span>

              {/* Gold North Star Icon */}
              <div className="py-2 text-[#D4AF37]">
                <NorthStarIcon size={38} />
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#FAF8F5]">
                Begin My Parissa Journey
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/70 max-w-sm leading-relaxed font-light">
                Discover your silhouette, Essence Gem and Intention Gem through a five-step guided ritual.
              </p>
            </div>

            <div className="pt-10 w-full max-w-xs relative z-10">
              <button
                type="button"
                onClick={() => onStartJourney('oval')}
                className="w-full py-4 rounded-full bg-[#FAF8F5] text-[#1A1A1A] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                Begin My Journey
              </button>
            </div>
          </div>

          {/* Card 2: Light Card — START WITH THE RING */}
          <div className="bg-[#FAF8F5] text-[#1A1A1A] rounded-2xl p-8 sm:p-12 border border-[#1A1A1A]/12 flex flex-col justify-between items-center text-center shadow-xs group hover:border-[#1A1A1A]/30 transition-all">
            <div className="space-y-6 flex flex-col items-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B38E5A] font-semibold">
                Start with the ring
              </span>

              {/* Gold Oval Emblem with Star */}
              <div className="py-2">
                <SilhouetteEmblem shape="oval" size={38} color="#B38E5A" />
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                Explore the Three Silhouettes
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 max-w-sm leading-relaxed font-light">
                See Round, Oval and Marquise, then personalise the ring that catches your eye.
              </p>
            </div>

            <div className="pt-10 w-full max-w-xs">
              <button
                type="button"
                onClick={onExploreRings}
                className="w-full py-4 rounded-full border border-[#1A1A1A]/30 text-[#1A1A1A] text-xs font-sans uppercase tracking-[0.22em] font-medium hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
              >
                Explore the Rings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 / PARISSA JOURNEY                                                      */}
      {/* "Five steps, one emotional arc."                                          */}
      {/* "Each step answers a different question..."                               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-6 max-w-7xl mx-auto border-t border-[#1A1A1A]/10">
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.28em] font-medium text-[#B38E5A] block">
            06 / Parissa Journey
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
            Five steps, one emotional arc.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Each step answers a different question: where it lives, how it feels, who she is, what she may need now and how the story is held.
          </p>
        </div>

        {/* 5 Steps Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 01 PLACE + SHAPE */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1A1A1A]/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B38E5A]/15 text-[#B38E5A] text-[11px] font-sans font-semibold flex items-center justify-center">
                  01
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/60">
                  Place + Shape
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-snug">
                Where will you wear your light?
              </h4>
            </div>
            <p className="font-sans text-[11px] text-[#1A1A1A]/60 font-light mt-6 pt-4 border-t border-[#1A1A1A]/5">
              Finger / hand / Round, Oval or Marquise
            </p>
          </div>

          {/* 02 ESSENCE */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1A1A1A]/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B38E5A]/15 text-[#B38E5A] text-[11px] font-sans font-semibold flex items-center justify-center">
                  02
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/60">
                  Essence
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-snug">
                Meet the light you already carry.
              </h4>
            </div>
            <p className="font-sans text-[11px] text-[#1A1A1A]/60 font-light mt-6 pt-4 border-t border-[#1A1A1A]/5">
              Birth details / rising sign / Essence Gem
            </p>
          </div>

          {/* 03 INTENTION */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1A1A1A]/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B38E5A]/15 text-[#B38E5A] text-[11px] font-sans font-semibold flex items-center justify-center">
                  03
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/60">
                  Intention
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-snug">
                Discover what you need most now.
              </h4>
            </div>
            <p className="font-sans text-[11px] text-[#1A1A1A]/60 font-light mt-6 pt-4 border-t border-[#1A1A1A]/5">
              Five reflections / Intention Gem
            </p>
          </div>

          {/* 04 CRAFT */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1A1A1A]/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B38E5A]/15 text-[#B38E5A] text-[11px] font-sans font-semibold flex items-center justify-center">
                  04
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/60">
                  Craft
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-snug">
                Choose what holds your story.
              </h4>
            </div>
            <p className="font-sans text-[11px] text-[#1A1A1A]/60 font-light mt-6 pt-4 border-t border-[#1A1A1A]/5">
              Diamond / 14K or 18K / metal colour
            </p>
          </div>

          {/* 05 REVEAL */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#1A1A1A]/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B38E5A]/15 text-[#B38E5A] text-[11px] font-sans font-semibold flex items-center justify-center">
                  05
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/60">
                  Reveal
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-[#1A1A1A] leading-snug">
                See your Parissa story.
              </h4>
            </div>
            <p className="font-sans text-[11px] text-[#1A1A1A]/60 font-light mt-6 pt-4 border-t border-[#1A1A1A]/5">
              Ring preview / reading / price / lead time
            </p>
          </div>
        </div>

        {/* The Reassurance Line Banner */}
        <div className="mt-12 bg-[#1A1A1A] text-[#FAF8F5] rounded-2xl p-8 sm:p-10 text-center space-y-3 shadow-md">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B38E5A] font-semibold block">
            The Reassurance Line
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#FAF8F5]">
            This is a mirror, not a prediction.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/70 max-w-xl mx-auto font-light leading-relaxed">
            Parissa offers a symbolic recommendation. She can change any shape, gem or metal before ordering.
          </p>
        </div>
      </section>
    </div>
  );
};
