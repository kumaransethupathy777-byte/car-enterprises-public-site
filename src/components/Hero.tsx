import React from 'react';
import { ArrowRight, Zap, Shield, Award, Calendar } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onBookTestDrive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onBookTestDrive }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#090d16] text-white border-b border-slate-800/80">
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80"
          alt="Apex Hyundai Automotive Showcase"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col items-center text-center">
        {/* Dealership Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-display font-bold tracking-widest uppercase mb-6 shadow-lg shadow-blue-500/10">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>2026 Authorized Showcase • Hyundai Cars &amp; Electric Vehicles</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase text-white leading-[1.05] max-w-4xl mb-6">
          New Thinking, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
            Elevated Driving.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
          Explore our certified lineup of premium Hyundai SUVs, high-voltage Ioniq 5 hyper-EVs, and precision turbo sedans. Book your personalized test drive experience today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookTestDrive}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Test Drive</span>
          </button>

          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-display font-bold text-sm uppercase tracking-wider border border-slate-700 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Browse Hyundai Fleet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-400" />
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl w-full">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="font-display font-black text-2xl sm:text-3xl text-blue-400">100%</span>
            <p className="text-xs text-slate-400 mt-1">Official Hyundai Warranty</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="font-display font-black text-2xl sm:text-3xl text-cyan-400">&lt; 48 Hrs</span>
            <p className="text-xs text-slate-400 mt-1">Doorstep Test Drive Dispatch</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="font-display font-black text-2xl sm:text-3xl text-amber-400">7.99%</span>
            <p className="text-xs text-slate-400 mt-1">Special Hyundai Finance Scheme</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400">5-Star</span>
            <p className="text-xs text-slate-400 mt-1">Highest Global Safety Ratings</p>
          </div>
        </div>
      </div>
    </section>
  );
};
