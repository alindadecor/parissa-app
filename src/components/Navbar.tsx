import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  savedStoriesCount: number;
  bagCount: number;
  onOpenBag: () => void;
  onOpenStories: () => void;
}

const NAV_LINKS: { label: string; path: string }[] = [
  { label: 'Collections', path: '/collections' },
  { label: 'The Journey', path: '/journey' },
  { label: 'Journal', path: '/journal' },
  { label: 'About', path: '/about' },
  { label: 'Craft', path: '/craft' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedStoriesCount,
  bagCount,
  onOpenBag,
  onOpenStories,
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('explore');
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group text-left focus:outline-hidden">
          <span className="font-serif-luxury text-2xl md:text-3xl font-light tracking-[0.22em] text-[#1A1A1A] group-hover:opacity-80 transition-opacity uppercase">
            PARISSA
          </span>
        </Link>

        {/* Center Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-xs uppercase tracking-[0.22em] font-normal transition-colors py-1 relative no-underline ${
                  isActive
                    ? 'text-[#1A1A1A] font-semibold'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#1A1A1A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          <button
            onClick={onOpenBag}
            aria-label="View Atelier Bag"
            className="relative p-2 text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {bagCount > 0 && (
              <span className="absolute top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1A1A1A] text-[#F9F7F2] text-[9px] font-sans flex items-center justify-center">
                {bagCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenStories}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1A1A1A]/30 text-xs font-sans tracking-[0.16em] uppercase text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all cursor-pointer"
          >
            <span>My Stories</span>
            {savedStoriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1A1A1A] text-[#F9F7F2] text-[9px] flex items-center justify-center">
                {savedStoriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] focus:outline-hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Quick Search Overlay */}
      {searchOpen && (
        <div className="border-t border-[#1A1A1A]/10 bg-[#FAF8F5] px-6 py-4 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#1A1A1A]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections, shapes (Round, Oval, Marquise), or archetypes..."
              className="flex-1 bg-transparent border-none text-sm font-sans focus:outline-hidden text-[#1A1A1A] placeholder-[#1A1A1A]/40"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs uppercase font-sans tracking-widest px-3 py-1 bg-[#1A1A1A] text-[#F9F7F2] rounded-full cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-[#1A1A1A]/50 hover:text-[#1A1A1A] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F7F2] border-b border-[#1A1A1A]/10 px-6 py-8 flex flex-col gap-5 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left font-serif text-2xl text-[#1A1A1A] py-1 tracking-wide no-underline"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => {
              onOpenStories();
              setMobileMenuOpen(false);
            }}
            className="text-left font-serif text-2xl text-[#1A1A1A] py-1 tracking-wide flex items-center justify-between"
          >
            <span>My Stories</span>
            {savedStoriesCount > 0 && (
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#F9F7F2]">
                {savedStoriesCount} saved
              </span>
            )}
          </button>

          <div className="pt-4 border-t border-[#1A1A1A]/10">
            <Link
              to="/journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3.5 bg-[#1A1A1A] text-[#F9F7F2] rounded-full text-xs font-sans uppercase tracking-[0.25em] font-medium text-center no-underline"
            >
              Begin My Parissa Journey →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
