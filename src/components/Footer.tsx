import React from 'react';
import { Link } from 'react-router-dom';
import { NorthStarIcon } from './GemIcon';

interface FooterProps {
  onStartJourney: () => void;
  onNavigate: (view: string) => void;
}

const FOOTER_LINKS: { label: string; path: string }[] = [
  { label: 'The Journey (5 Steps)', path: '/journey' },
  { label: 'Collections', path: '/explore' },
  { label: 'Craft Configurator', path: '/craft' },
  { label: 'Editorial Journal', path: '/journal' },
  { label: 'About the Maison', path: '/about' },
];

export const Footer: React.FC<FooterProps> = ({ onStartJourney, onNavigate }) => {
  return (
    <footer className="bg-[#13292A] text-[#FAF8F5] pt-20 pb-12 mt-24 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Editorial Brand Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl tracking-[0.25em] uppercase font-light text-[#FAF8F5]">
                PARISSA
              </span>
              <NorthStarIcon size={18} className="text-[#C9A15A]" />
            </div>
            <p className="font-serif text-2xl text-white/90 italic font-light max-w-md leading-relaxed">
              "Some diamonds mark a promise. Ours mark a choice."
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9A15A] font-medium">
              Outer Diamond. Inner Light. · Melbourne, Australia
            </p>
          </div>

          <div className="md:col-span-3 space-y-4 font-sans text-xs uppercase tracking-[0.2em]">
            <h4 className="text-[#FAF8F5] font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-white/70 list-none p-0 m-0">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors no-underline text-inherit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#FAF8F5] font-semibold mb-6">
              Stay in the Light
            </h4>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Private invitations, bespoke gemstone releases, and reflections on intentional craft.
            </p>
            <div className="flex items-center border-b border-white/30 pb-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-xs font-sans text-white placeholder:text-white/40 focus:outline-hidden w-full"
              />
              <button className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#C9A15A] hover:text-white transition-colors">
                Join
              </button>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-sans text-white/50 tracking-wider">
                Instagram: <a href="https://instagram.com/parissa.diamond" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white underline">@parissa.diamond</a>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-[11px] font-sans tracking-widest uppercase">
          <div className="flex items-center gap-6">
            <span>Designed in Melbourne</span>
            <span>·</span>
            <span>Solid Gold & Platinum</span>
            <span>·</span>
            <span>Two Hidden Gems</span>
          </div>
          <div>
            © 2026 PARISSA. All rights reserved. A Brighter You.
          </div>
        </div>
      </div>
    </footer>
  );
};
