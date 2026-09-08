import React from 'react';
import { NorthStarIcon } from './GemIcon';
import { Search, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMyStories: () => void;
  savedStoriesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenMyStories,
  savedStoriesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-hidden"
          >
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.2em] text-[#1A1A1A] uppercase">
              PARISSA
            </span>
            <NorthStarIcon size={16} className="text-[#1A1A1A] transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#1A1A1A]/70">
          <button
            onClick={() => onNavigate('explore')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer ${
              currentView === 'explore' ? 'text-[#1A1A1A] font-semibold' : ''
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => onNavigate('journey')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer ${
              currentView === 'journey' ? 'text-[#1A1A1A] font-semibold' : ''
            }`}
          >
            The Journey
          </button>
          <button
            onClick={() => onNavigate('journal')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer ${
              currentView === 'journal' ? 'text-[#1A1A1A] font-semibold' : ''
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer ${
              currentView === 'about' ? 'text-[#1A1A1A] font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('craft')}
            className={`transition-colors hover:text-[#1A1A1A] cursor-pointer ${
              currentView === 'craft' ? 'text-[#1A1A1A] font-semibold' : ''
            }`}
          >
            Craft
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('explore')}
            aria-label="Search"
            className="p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="relative p-2 rounded-full text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1A1A1A] text-[#FAF8F5] text-[10px] rounded-full flex items-center justify-center font-sans font-medium">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenMyStories}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1A1A1A]/20 text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-2xs"
          >
            <span>My Stories</span>
            {savedStoriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1A1A1A]/10 group-hover:bg-white/20 text-[10px] flex items-center justify-center">
                {savedStoriesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
