import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SAMPLE_VEHICLES } from './data/vehicles';
import { Vehicle, TestDriveBooking, PublicCategory } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { TestDriveModal } from './components/TestDriveModal';
import { Footer } from './components/Footer';
import { dealershipCatalogService } from './services/dealershipCatalogService';
import { RefreshCw } from 'lucide-react';

export function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(SAMPLE_VEHICLES);
  const [rawCategories, setRawCategories] = useState<PublicCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState<Vehicle | null>(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveTargetVehicle, setTestDriveTargetVehicle] = useState<Vehicle | null>(null);
  const [confirmedBookings, setConfirmedBookings] = useState<TestDriveBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      // 1. Fetch live categories from POST /public/categories
      const catRes = await dealershipCatalogService.getCategories();
      if (catRes.categories && catRes.categories.length > 0) {
        setRawCategories(catRes.categories);
      }

      // 2. Fetch live products from POST /public/products
      const prodRes = await dealershipCatalogService.getVehicles();
      if (prodRes.vehicles && prodRes.vehicles.length > 0) {
        setVehicles(prodRes.vehicles);
        setIsLiveConnected(prodRes.isLive);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (e) {
      console.warn('Could not sync dealership catalog from backend:', e);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(false);
    const interval = setInterval(() => loadData(true), 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Derive dynamic list of categories
  const categoryNames = useMemo(() => {
    const listFromVehicles = vehicles.map((v) => v.category).filter(Boolean);
    const listFromBackend = rawCategories.map((c) => c.name).filter(Boolean);
    const combinedSet = new Set([...listFromBackend, ...listFromVehicles]);
    return ['All', ...Array.from(combinedSet)];
  }, [vehicles, rawCategories]);

  // Filter vehicles by category
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedCategory === 'All') return true;
      if (v.category === selectedCategory) return true;
      if (v.category?.toLowerCase().includes(selectedCategory.toLowerCase())) return true;
      return false;
    });
  }, [vehicles, selectedCategory]);

  const handleOpenTestDriveForVehicle = (vehicle: Vehicle) => {
    setTestDriveTargetVehicle(vehicle);
    setIsTestDriveOpen(true);
  };

  const handleBookingConfirmed = (booking: TestDriveBooking) => {
    setConfirmedBookings((prev) => [booking, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenTestDrive={() => {
          setTestDriveTargetVehicle(null);
          setIsTestDriveOpen(true);
        }}
        categories={categoryNames}
      />

      {/* Live sync sub-bar */}
      <div className="bg-slate-950/80 border-b border-slate-900 px-4 sm:px-8 py-1.5 text-xs flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
          <span className="font-semibold text-slate-300">
            {isLiveConnected ? 'Live Cloud Inventory (Render API)' : 'Inventory Service (Ready)'}
          </span>
          <span>•</span>
          <span>{vehicles.length} models available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500">Synced {lastSyncTime}</span>
          <button
            onClick={() => loadData(false)}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            title="Sync inventory"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Showcase */}
      <Hero
        onExplore={() => {
          const el = document.getElementById('vehicle-catalogue');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookTestDrive={() => {
          setTestDriveTargetVehicle(null);
          setIsTestDriveOpen(true);
        }}
      />

      {/* Main Catalogue Section */}
      <main id="vehicle-catalogue" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-display font-bold uppercase tracking-wider mb-2">
              <span>Authorized Dealership Fleet</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              {selectedCategory === 'All' ? 'Complete Hyundai Lineup' : selectedCategory}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any model to configure variants, explore specifications, or book an insured test drive
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 max-w-full overflow-x-auto">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredVehicles.map((veh, index) => (
            <VehicleCard
              key={veh.id || `v-${index}`}
              vehicle={veh}
              onViewDetails={setSelectedVehicleForDetail}
              onBookTestDrive={handleOpenTestDriveForVehicle}
            />
          ))}
        </div>

        {/* Lead to Customer Journey Section */}
        <div className="mt-20 p-8 rounded-3xl metallic-card border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-display font-bold text-blue-400 uppercase tracking-widest block mb-2">
              OmniFlow Client Experience
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              The 5-Stage Seamless Acquisition Journey
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              From online exploration to key handover, our integrated automotive platform tracks every milestone with transparent updates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800/80 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">1</span>
              <span className="font-display font-bold text-xs text-white">New Enquiry</span>
              <span className="text-[10px] text-slate-500">AI Concierge / WhatsApp</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">2</span>
              <span className="font-display font-bold text-xs text-white">Test Drive</span>
              <span className="text-[10px] text-slate-500">Doorstep or Lounge</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">3</span>
              <span className="font-display font-bold text-xs text-white">Quotation</span>
              <span className="text-[10px] text-slate-500">Customized Finance Quote</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center">4</span>
              <span className="font-display font-bold text-xs text-white">Booking</span>
              <span className="text-[10px] text-slate-500">VIN Allotment</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1 col-span-2 sm:col-span-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold flex items-center justify-center">5</span>
              <span className="font-display font-bold text-xs text-emerald-400">Delivery</span>
              <span className="text-[10px] text-slate-500">Ceremonial Handover</span>
            </div>
          </div>
        </div>
      </main>

      {/* Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicleForDetail}
        onClose={() => setSelectedVehicleForDetail(null)}
        onBookTestDrive={handleOpenTestDriveForVehicle}
      />

      {/* Test Drive Booking Modal */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={vehicles}
        initialVehicle={testDriveTargetVehicle}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
