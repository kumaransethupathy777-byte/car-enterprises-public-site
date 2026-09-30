import React, { useState } from 'react';
import { Vehicle } from '../types';
import { X, Calendar, Download, CheckCircle2 } from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookTestDrive: (vehicle: Vehicle, variantId?: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onBookTestDrive,
}) => {
  if (!vehicle) return null;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');
  const [downloadedBrochure, setDownloadedBrochure] = useState(false);

  const activeVariant = vehicle.variants[selectedVariantIndex] || vehicle.variants[0];
  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  const handleDownloadBrochure = () => {
    setDownloadedBrochure(true);
    setTimeout(() => setDownloadedBrochure(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative metallic-card rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-slate-700 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row overflow-hidden text-slate-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Showcase & Gallery */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-slate-950/80 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={vehicle.images[activeImage] || vehicle.images[0]}
                alt={vehicle.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-display font-bold uppercase tracking-wider backdrop-blur-sm">
                  {vehicle.category}
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === idx ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${vehicle.name}-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Power Output</span>
              <span className="font-display font-bold text-xs text-blue-400">{activeVariant.powerBhp}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Transmission</span>
              <span className="font-display font-bold text-xs text-white">{activeVariant.transmission}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Dispatch Status</span>
              <span className="font-display font-bold text-xs text-emerald-400">{activeVariant.waitingPeriod}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Configuration & Specs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                <span>{vehicle.brand}</span>
                <span>•</span>
                <span>{vehicle.type}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {vehicle.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider block">
                  Ex-Showroom Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl sm:text-3xl text-white">
                    ₹{(activeVariant.price / 100000).toFixed(2)} Lakh
                  </span>
                  <span className="text-xs text-slate-400">
                    (₹{activeVariant.price.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="space-y-2">
              <span className="text-xs font-display font-bold uppercase text-slate-300">
                Select Transmission &amp; Fuel Variant:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedVariantIndex === i
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                      <span>{v.fuelType} • {v.transmission}</span>
                      <span className="text-blue-400 font-display">₹{(v.price / 100000).toFixed(2)}L</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{v.powerBhp} • {v.waitingPeriod}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colorway Swatches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-bold uppercase text-slate-300">
                  Select Exterior Finish:
                </span>
                <span className="text-slate-400 font-medium">{activeColor.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {vehicle.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'border-blue-500 bg-blue-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specs & Features Tabs */}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'features' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Key Highlights
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'warranty' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Warranty &amp; Service
                </button>
              </div>

              <div className="pt-3 text-xs text-slate-300 min-h-[100px]">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(vehicle.specifications).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase">{key}</span>
                        <span className="font-semibold text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'features' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {vehicle.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'warranty' && (
                  <div className="space-y-1.5">
                    <p>✔️ <strong>5-Year / 100,000 km</strong> Comprehensive Manufacturer Warranty.</p>
                    <p>✔️ <strong>3-Year 24/7 Roadside Assistance</strong> across pan-India network.</p>
                    <p>✔️ <strong>Complimentary 1st Year Maintenance</strong> &amp; telemetry updates.</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  onBookTestDrive(vehicle, activeVariant.id);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Test Drive</span>
              </button>

              <button
                onClick={handleDownloadBrochure}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {downloadedBrochure ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Brochure Sent</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Brochure</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
