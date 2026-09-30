import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Gauge, Zap, Calendar, ArrowUpRight, Fuel, ShieldCheck } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onViewDetails,
  onBookTestDrive,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = vehicle.variants[selectedVariantIndex] || vehicle.variants[0];

  return (
    <div className="group metallic-card rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Media & Badges */}
      <div
        onClick={() => onViewDetails(vehicle)}
        className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
      >
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full bg-slate-900/90 text-blue-400 border border-blue-500/30 text-[11px] font-display font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md">
            {vehicle.category}
          </span>
          {vehicle.isNewLaunch && (
            <span className="px-3 py-1 rounded-full bg-cyan-500/90 text-slate-950 text-[11px] font-display font-black uppercase tracking-wider shadow-md">
              2026 Model
            </span>
          )}
        </div>

        {/* Availability Badge (Directly from Document page 6) */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5 ${
            activeVariant.waitingPeriod === 'Available Immediately'
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
              : 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              activeVariant.waitingPeriod === 'Available Immediately' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`} />
            <span>Delivery: {activeVariant.waitingPeriod}</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-display font-bold uppercase tracking-wider text-blue-400">
              {vehicle.brand}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {vehicle.safetyRating}
            </span>
          </div>

          <h3
            onClick={() => onViewDetails(vehicle)}
            className="font-display font-bold text-xl text-white hover:text-blue-400 transition-colors cursor-pointer"
          >
            {vehicle.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-1">
            {vehicle.tagline}
          </p>

          {/* Key Specs Pill Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Power</span>
              <span className="font-display font-bold text-xs text-slate-200">
                {activeVariant.powerBhp}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">0-100 km/h</span>
              <span className="font-display font-bold text-xs text-cyan-400">
                {vehicle.acceleration.replace('0-100 km/h in ', '')}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Efficiency</span>
              <span className="font-display font-bold text-xs text-slate-200">
                {activeVariant.mileage}
              </span>
            </div>
          </div>
        </div>

        {/* Variant Selectors & Pricing */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          {/* Variant pill picker */}
          {vehicle.variants.length > 1 && (
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-semibold block">Configured Variant:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {vehicle.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedVariantIndex === idx
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {v.fuelType} {v.transmission}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                Ex-Showroom Price
              </span>
              <span className="font-display font-black text-xl sm:text-2xl text-white">
                ₹{(activeVariant.price / 100000).toFixed(2)} Lakh
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewDetails(vehicle)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
                title="View Full Specifications"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onBookTestDrive(vehicle)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Test Drive</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
