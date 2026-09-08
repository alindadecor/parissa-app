import React from 'react';
import { NorthStarIcon } from './GemIcon';
import { ArrowRight, ShieldCheck, Sparkles, Feather } from 'lucide-react';

interface EditorialPageProps {
  pageType: 'about' | 'journal' | 'craft';
  onStartJourney: () => void;
}

export const EditorialPages: React.FC<EditorialPageProps> = ({
  pageType,
  onStartJourney,
}) => {
  if (pageType === 'about') {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-16 animate-fadeIn">
        <div className="text-center space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/50">
            About the Maison
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#1A1A1A] tracking-tight">
            Some diamonds mark a promise. <br />
            <span className="italic">Ours mark a choice.</span>
          </h1>
        </div>

        <div className="prose font-sans text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed space-y-6 max-w-2xl mx-auto font-light">
          <p>
            PARISSA was founded in Melbourne with a single sovereign philosophy: that fine jewelry should belong first to the woman who wears it.
          </p>
          <p>
            For centuries, diamonds were purchased by others to signify possession or transition. PARISSA inverts this tradition. We create modern talismans that honor self-authorship, personal chapters, and private evolution.
          </p>
          <blockquote className="font-serif text-2xl italic text-[#1A1A1A] border-l-2 border-[#1A1A1A]/30 pl-6 py-2 my-8">
            “Three shapes are enough when the journey is the product.”
          </blockquote>
          <p>
            Each ring carries an outer lab-grown solitaire diamond of exceptional optical fire, cradling two concealed gemstones within its inner pavilion: an Essence Gem corresponding to your rising-sign light, and an Intention Gem chosen through quiet reflection to anchor your next chapter.
          </p>
        </div>

        <div className="bg-[#13292A] text-[#FAF8F5] p-10 rounded-3xl text-center space-y-6">
          <NorthStarIcon size={24} className="text-[#C9A15A] mx-auto" />
          <h3 className="font-serif text-3xl font-light">
            Ready to discover the light you carry?
          </h3>
          <button
            onClick={onStartJourney}
            className="px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#13292A] font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Begin My Journey</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  if (pageType === 'craft') {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-16 animate-fadeIn">
        <div className="text-center space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/50">
            Sovereign Craft
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#1A1A1A] tracking-tight">
            Built for everyday wear. <br />
            <span className="italic">Engineered for a lifetime.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#1A1A1A]/10 space-y-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold block">
              Precious Metals
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A]">Solid 14K & 18K</h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              Never hollow, never plated. Cast in solid recycled gold and dense Platinum 950 that will never tarnish or chip away.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#1A1A1A]/10 space-y-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold block">
              Gemological Precision
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A]">Lab-Grown Solitaires</h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              Optically identical to mined diamonds with zero conflict footprint. Graded D-F Color, VVS-VS Clarity with IGI certification reports.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#1A1A1A]/10 space-y-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold block">
              The Secret Chamber
            </span>
            <h4 className="font-serif text-2xl text-[#1A1A1A]">North Star Under-Gallery</h4>
            <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
              Our signature filigree allows light to bathe the pavilion while seating your two private gemstones flush against your finger.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onStartJourney}
            className="px-9 py-4 rounded-full bg-[#1A1A1A] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#1A1A1A]/90 transition-all cursor-pointer"
          >
            Configure Your Ring
          </button>
        </div>
      </div>
    );
  }

  // Journal
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-16 animate-fadeIn">
      <div className="text-center space-y-4">
        <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[#1A1A1A]/50">
          The Journal
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#1A1A1A] tracking-tight">
          Reflections on Choice, Light & Form
        </h1>
      </div>

      <div className="space-y-12 max-w-2xl mx-auto">
        <article className="space-y-4 pb-12 border-b border-[#1A1A1A]/10">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold">
            Essence & Astrology
          </span>
          <h2 className="font-serif text-3xl text-[#1A1A1A]">
            Why Rising Signs Hold Our Public Light
          </h2>
          <p className="font-sans text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
            In classical astrology, your Sun sign represents the core internal will, but your Ascendant — or Rising sign — describes the atmosphere you bring into a room. It is the color of the horizon when you arrived, and the way you meet the physical world.
          </p>
        </article>

        <article className="space-y-4 pb-12 border-b border-[#1A1A1A]/10">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold">
            Design Philosophy
          </span>
          <h2 className="font-serif text-3xl text-[#1A1A1A]">
            Three Shapes Are Enough
          </h2>
          <p className="font-sans text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
            In an industry flooded with infinite trivial variations, restraint is the truest luxury. Round, Oval, and Marquise hold the full vocabulary of timeless human geometry: the centre of balance, the grace of movement, and the directional compass of forward ambition.
          </p>
        </article>

        <article className="space-y-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C9A15A] font-semibold">
            Talismanic Meaning
          </span>
          <h2 className="font-serif text-3xl text-[#1A1A1A]">
            The Architecture of a Secret Sanctuary
          </h2>
          <p className="font-sans text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
            Why do we tuck two colored sapphires inside the shank where no one else can see them? Because the most meaningful vows are the ones you make with yourself.
          </p>
        </article>
      </div>
    </div>
  );
};
