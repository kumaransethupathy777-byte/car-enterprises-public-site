import React, { useState } from 'react';
import { Shield, Phone, Calendar, Menu, X, Car, Zap, Sparkles } from 'lucide-react';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenTestDrive: () => void;
  categories?: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenTestDrive,
  categories = ['All', 'Luxury SUV & Vehicles', 'Electric Vehicles (EV)', 'Executive Sedans & Cars', 'Compact SUV & Crossovers']
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCategoryIcon = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('electric') || lower.includes('ev')) {
      return <Zap className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (lower.includes('sedan') || lower.includes('performance')) {
      return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
    }
    if (lower.includes('suv') || lower.includes('crossover')) {
      return <Car className="w-3.5 h-3.5 text-blue-400" />;
    }
    return null;
  };

  const getCategoryShortLabel = (cat: string) => {
    if (cat === 'All') return 'All Fleet';
    if (cat.includes('&')) return cat.split('&')[0].trim();
    return cat;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800 transition-all">
      {/* Top Hotline Bar */}
      <div className="bg-slate-950/80 border-b border-slate-900 text-xs text-slate-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Apex Hyundai Dealership • Authorized Hyundai Partner</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+9118002008899" className="flex items-center gap-1.5 hover:text-white transition-colors text-blue-400 font-semibold">
              <Phone className="w-3.5 h-3.5" />
              <span>Dealership Concierge: 1800 200 8899</span>
            </a>
            <span className="text-slate-600">|</span>
            <span>Showrooms Open 7 Days: 9:00 AM - 8:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Type Nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <div
              onClick={() => onSelectCategory('All')}
              className="cursor-pointer flex items-center gap-3 group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wider text-white uppercase leading-none">
                  APEX HYUNDAI
                </span>
                <span className="text-[10px] tracking-widest text-blue-400 font-bold uppercase mt-0.5">
                  Authorized Showroom
                </span>
              </div>
            </div>

            {/* Car Segment Switcher */}
            <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-xl">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{getCategoryShortLabel(cat)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Book Test Drive Button */}
            <button
              onClick={onOpenTestDrive}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Test Drive</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-bold flex items-center gap-2 ${
                  selectedCategory === cat ? 'bg-blue-600/20 text-blue-400' : 'text-slate-200'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat === 'All' ? 'All Hyundai Fleet' : cat}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
