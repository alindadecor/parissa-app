import React, { useState, useMemo } from 'react';
import { ProductListing } from '../types';
import { METALS } from '../data/parissaData';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { JewelryCanvas } from './JewelryCanvas';
import { PriceDisplay } from './PriceDisplay';
import { Loader2 } from 'lucide-react';

const COLLECTION_FILTERS = [
  { label: 'All Rings', handle: null },
  { label: 'The Constellation', handle: 'the-constellation' },
  { label: 'The Bezel', handle: 'the-bezel' },
  { label: 'The Nirun', handle: 'the-nirun' },
  { label: 'The Petite', handle: 'the-petite' },
];

type SortOption = 'newest' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
];

const METAL_LABELS: Record<string, string> = {};
Object.values(METALS).forEach((m) => {
  METAL_LABELS[m.id] = m.name;
});

function parsePrice(priceDisplay?: string): number {
  if (!priceDisplay) return NaN;
  const cleaned = priceDisplay.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? NaN : num;
}

function matchesCollection(prod: ProductListing, label: string): boolean {
  if (prod.collection === label) return true;
  const lower = prod.name.toLowerCase();
  const token = label.replace('The ', '').toLowerCase();
  return lower.includes(token);
}

interface ExploreRingsProps {
  onPersonalizeRing: (product: ProductListing) => void;
  onOpenProductDetail: (product: ProductListing) => void;
}

export const ExploreRings: React.FC<ExploreRingsProps> = ({
  onPersonalizeRing,
  onOpenProductDetail,
}) => {
  const { products, loading, error } = useShopifyProducts();
  const [activeFilter, setActiveFilter] = useState<string>('All Rings');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const displayedProducts = useMemo(() => {
    let filtered = products;
    if (activeFilter !== 'All Rings') {
      filtered = products.filter((p) => matchesCollection(p, activeFilter));
    }

    if (sortOption === 'newest') return filtered;

    const withPrice: { prod: ProductListing; price: number }[] = [];
    const noPrice: ProductListing[] = [];
    for (const prod of filtered) {
      const price = parsePrice(prod.priceDisplay);
      if (Number.isNaN(price)) {
        noPrice.push(prod);
      } else {
        withPrice.push({ prod, price });
      }
    }
    withPrice.sort((a, b) =>
      sortOption === 'price-asc' ? a.price - b.price : b.price - a.price
    );
    return [...withPrice.map((w) => w.prod), ...noPrice];
  }, [products, activeFilter, sortOption]);

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto" style={{ backgroundColor: '#f7f3ed' }}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light mb-4" style={{ color: '#17242c' }}>
          Explore The Rings
        </h1>
        <p className="font-sans text-base leading-relaxed" style={{ color: '#69635d' }}>
          Each ring is made to order. Designed around you.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
          {COLLECTION_FILTERS.map((f) => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveFilter(f.label)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? '#4d3023' : 'transparent',
                  color: isActive ? '#ffffff' : '#17242c',
                  border: `1px solid ${isActive ? '#4d3023' : '#d4cbc1'}`,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest cursor-pointer appearance-none"
          style={{
            backgroundColor: '#faf8f4',
            color: '#17242c',
            border: '1px solid #d4cbc1',
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24" style={{ color: '#69635d' }}>
          <Loader2 className="w-6 h-6 mb-3 animate-spin" />
          <span className="text-xs font-sans uppercase tracking-[0.2em]">Loading catalog…</span>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-24 max-w-md mx-auto">
          <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: '#b91c1c' }}>
            {error}
          </p>
          <p className="font-sans text-xs" style={{ color: '#69635d' }}>
            Please check the Storefront API connection and try again.
          </p>
        </div>
      )}

      {!loading && !error && displayedProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="font-sans text-sm" style={{ color: '#69635d' }}>
            No designs found for the selected filters.
          </p>
        </div>
      )}

      {!loading && !error && displayedProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedProducts.map((prod) => {
            const metalLabel = METAL_LABELS[prod.metalDefault] || '18K Yellow Gold';
            const shapeLabel = prod.shape.charAt(0).toUpperCase() + prod.shape.slice(1);
            return (
              <div
                key={prod.id}
                className="flex flex-col justify-between"
                style={{
                  backgroundColor: '#faf8f4',
                  border: '1px solid #e8e0d8',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div className="relative p-4 flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest"
                    style={{ backgroundColor: '#f7f3ed', color: '#69635d', border: '1px solid #d4cbc1' }}
                  >
                    {prod.collection}
                  </span>

                  {prod.imageUrl ? (
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <JewelryCanvas
                      shape={prod.shape}
                      metal={prod.metalDefault}
                      carat={prod.carat}
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col gap-3">
                  <h3 className="font-serif-luxury text-lg" style={{ color: '#17242c' }}>
                    {prod.name}
                  </h3>

                  <p className="text-xs font-sans" style={{ color: '#69635d' }}>
                    {shapeLabel} · {metalLabel}
                  </p>

                  <PriceDisplay
                    fallbackText={prod.priceDisplay || 'Price on request'}
                    className="text-sm font-sans font-semibold"
                  />

                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => onPersonalizeRing(prod)}
                      className="w-full rounded-full text-xs font-sans uppercase tracking-widest font-medium transition-all cursor-pointer"
                      style={{
                        backgroundColor: '#4d3023',
                        color: '#ffffff',
                        height: '36px',
                      }}
                    >
                      Add to Journey →
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenProductDetail(prod)}
                      className="w-full text-center text-xs font-sans uppercase tracking-widest cursor-pointer bg-transparent border-none"
                      style={{ color: '#69635d', height: '28px' }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
