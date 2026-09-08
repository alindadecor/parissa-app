import React from 'react';
import { CollectionName } from '../types';
import { COLLECTIONS, CATALOG_PRODUCTS } from '../data/parissaData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsViewProps {
  onStartJourney: () => void;
  onExploreCollection: (collection: CollectionName) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onStartJourney,
  onExploreCollection,
}) => {
  return (
    <div className="bg-[#F9F7F2] min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60">
            Signature Silhouettes
          </span>
          <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1A1A] mb-4">
          The Four Collections
        </h1>
        <p className="font-serif italic text-lg text-[#1A1A1A]/70 leading-relaxed">
          Rooted in the Asset Brief 03 Aug 2026 architectural definitions: The Constellation, The Bezel, The Nirun, and The Petite. Each sculpted in solid 18K gold or pure 950 platinum.
        </p>
      </div>

      {/* Collection Cards */}
      <div className="space-y-16">
        {(Object.keys(COLLECTIONS) as CollectionName[]).map((colKey, index) => {
          const col = COLLECTIONS[colKey];
          const isEven = index % 2 === 0;
          const matchingRings = CATALOG_PRODUCTS.filter((p) => p.collection === colKey);

          return (
            <div
              key={colKey}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] border border-[#1A1A1A]/10 p-8 md:p-12 rounded-sm`}
            >
              {/* Text Info */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50">
                    Collection 0{index + 1}
                  </span>
                  <span className="text-xs font-serif opacity-40">✦</span>
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] font-light mb-2">
                  {col.name}
                </h2>
                <p className="font-serif italic text-base text-[#1A1A1A]/70 mb-6">
                  "{col.tagline}"
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed mb-6">
                  {col.description}
                </p>

                <div className="bg-[#E8E4D9]/40 border border-[#1A1A1A]/10 p-4 rounded text-xs mb-8">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] block mb-1">
                    Signature Architectural Detail:
                  </span>
                  <p className="font-sans text-[#1A1A1A]/70 leading-relaxed">
                    {col.architecturalDetail}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={onStartJourney}
                    className="px-6 py-3.5 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalize This Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Gallery / Showcase */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} bg-[#E8E4D9]/30 border border-[#1A1A1A]/10 p-8 rounded flex flex-col justify-center min-h-[360px]`}>
                <div className="flex items-center justify-between mb-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                  <span>Atelier Silhouettes</span>
                  <span>{matchingRings.length} Designs in Catalog</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingRings.slice(0, 2).map((item) => (
                    <div key={item.id} className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded text-center">
                      <span className="font-serif-luxury text-lg font-medium text-[#1A1A1A] block mb-1">
                        {item.name}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block mb-2">
                        {item.shape} • {item.carat}ct
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#1A1A1A]">{item.priceDisplay || 'Price on request'}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 text-center text-xs font-serif italic text-[#1A1A1A]/60">
                  Every piece accommodates the paired secret Essence & Intention talisman gems.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
