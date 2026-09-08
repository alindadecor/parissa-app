import React, { useState } from 'react';
import { DiamondShape, CollectionName, ProductListing } from '../types';
import { COLLECTIONS, DIAMOND_SHAPES, ESSENCE_ARCHETYPES, INTENTION_OUTCOMES } from '../data/parissaData';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { JewelryCanvas } from './JewelryCanvas';
import { ArrowRight, Sparkles, Filter, Eye, Loader2 } from 'lucide-react';

interface ExploreRingsProps {
  onPersonalizeRing: (product: ProductListing) => void;
  onOpenProductDetail: (product: ProductListing) => void;
}

export const ExploreRings: React.FC<ExploreRingsProps> = ({
  onPersonalizeRing,
  onOpenProductDetail,
}) => {
  const { products, loading, error } = useShopifyProducts();
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<DiamondShape | 'all'>('all');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<CollectionName | 'all'>('all');

  const filteredProducts = products.filter((prod) => {
    if (selectedShapeFilter !== 'all' && prod.shape !== selectedShapeFilter) return false;
    if (selectedCollectionFilter !== 'all' && prod.collection !== selectedCollectionFilter) return false;
    return true;
  });

  return (
    <div className="bg-[#F9F7F2] min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header & Editorial Context */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/60">
            Curated Catalog
          </span>
          <span className="h-[1px] w-8 bg-[#1A1A1A]/30"></span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1A1A] mb-4">
          Explore The Rings
        </h1>
        <p className="font-serif italic text-lg text-[#1A1A1A]/70 leading-relaxed">
          Browse by our three launch diamond shapes and four signature collections. Each design is ready to be consecrated with your personalized astrological talisman gems.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FAF8F5] border border-[#1A1A1A]/10 p-6 rounded-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Shape Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 mr-2">
            Shape:
          </span>
          <button
            type="button"
            onClick={() => setSelectedShapeFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] border transition-all cursor-pointer ${
              selectedShapeFilter === 'all'
                ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                : 'border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]'
            }`}
          >
            All Shapes
          </button>
          {(['round', 'oval', 'marquise'] as DiamondShape[]).map((shp) => (
            <button
              key={shp}
              type="button"
              onClick={() => setSelectedShapeFilter(shp)}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] border transition-all cursor-pointer ${
                selectedShapeFilter === shp
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]'
              }`}
            >
              {DIAMOND_SHAPES[shp].name.replace(' Brilliant', '')}
            </button>
          ))}
        </div>

        {/* Collection Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/60 mr-2">
            Collection:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCollectionFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] border transition-all cursor-pointer ${
              selectedCollectionFilter === 'all'
                ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                : 'border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]'
            }`}
          >
            All
          </button>
          {(Object.keys(COLLECTIONS) as CollectionName[]).map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => setSelectedCollectionFilter(col)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] border transition-all cursor-pointer ${
                selectedCollectionFilter === col
                  ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                  : 'border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]'
              }`}
            >
              {col.replace('The ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error / Empty states */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 text-[#1A1A1A]/60">
          <Loader2 className="w-6 h-6 mb-3 animate-spin" />
          <span className="text-xs font-sans uppercase tracking-[0.2em]">Loading catalog…</span>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-24 max-w-md mx-auto">
          <p className="font-sans text-sm text-red-700 leading-relaxed mb-2">
            {error}
          </p>
          <p className="font-sans text-xs text-[#1A1A1A]/60">
            Please check the Storefront API connection and try again.
          </p>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="font-sans text-sm text-[#1A1A1A]/60">
            No designs found for the selected filters.
          </p>
        </div>
      )}

      {/* Rings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProducts.map((prod) => {
          const gem = ESSENCE_ARCHETYPES.Leo.essenceGem;
          const intentionGem = INTENTION_OUTCOMES.emerald_sovereignty.intentionGem;
          return (
            <div
              key={prod.id}
              className="bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#1A1A1A]/30 transition-all shadow-sm"
            >
              {/* Visual Canvas Area */}
              <div className="p-8 bg-[#E8E4D9]/40 border-b border-[#1A1A1A]/10 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="absolute top-4 left-4 text-[9px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/50">
                  {prod.collection}
                </div>
                <div className="absolute top-4 right-4 text-xs font-serif text-[#1A1A1A]/40">
                  ✦
                </div>

                <JewelryCanvas
                  shape={prod.shape}
                  metal={prod.metalDefault}
                  carat={prod.carat}
                  essenceGem={gem}
                  intentionGem={intentionGem}
                  showHiddenGems={true}
                  className="w-full max-w-[220px] aspect-square group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-3 left-0 w-full text-center text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/40">
                  Includes Hidden Talisman Bridge
                </div>
              </div>

              {/* Content & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-medium mb-1">
                    {prod.name}
                  </h3>
                  <p className="font-sans text-xs text-[#1A1A1A]/60 mb-3">
                    {prod.subtitle}
                  </p>
                  <p className="font-sans text-xs text-[#1A1A1A]/75 leading-relaxed mb-4 line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="flex items-center justify-between py-2 border-t border-b border-[#1A1A1A]/10 text-xs font-sans mb-6">
                    <span className="text-[#1A1A1A]/60">Carat & Metal:</span>
                    <span className="font-medium text-[#1A1A1A]">{prod.carat.toFixed(1)}ct • 18K Solid Gold</span>
                  </div>
                </div>

                {/* Price & Personalize CTA */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/50">Investment</span>
                    <span className="font-mono text-xs font-semibold text-[#1A1A1A] tracking-wider">
                      {prod.priceDisplay || 'Price on request'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenProductDetail(prod)}
                      className="py-3 px-2 border border-[#1A1A1A]/20 rounded-full text-[11px] font-sans uppercase tracking-[0.15em] hover:bg-[#E8E4D9]/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-[#1A1A1A]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Detail</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPersonalizeRing(prod)}
                      className="py-3 px-2 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-[11px] font-sans uppercase tracking-[0.15em] font-medium hover:bg-[#1A1A1A]/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3 h-3 text-[#F9F7F2]" />
                      <span>Personalize</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
