import React, { useState } from 'react';
import { Vehicle, TestDriveBooking } from '../types';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  initialVehicle?: Vehicle | null;
  onBookingConfirmed: (booking: TestDriveBooking) => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  initialVehicle,
  onBookingConfirmed,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicle?.id || vehicles[0]?.id || ''
  );
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [driveMode, setDriveMode] = useState<'Showroom Test Drive' | 'Home / Office Doorstep'>('Showroom Test Drive');
  const [location, setLocation] = useState('Apex Motors Flagship Showroom - Central Boulevard');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM - 12:00 PM)');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hasLicense, setHasLicense] = useState(true);
  const [createdBooking, setCreatedBooking] = useState<TestDriveBooking | null>(null);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const locations = [
    'Apex Motors Flagship Showroom - Central Boulevard',
    'Apex Experience Center - Tech Park East',
    'Apex Motorrad Superbike Lounge - North Hub'
  ];

  const timeSlots = [
    'Morning (10:00 AM - 12:00 PM)',
    'Mid-Day (12:00 PM - 02:00 PM)',
    'Afternoon (02:00 PM - 04:00 PM)',
    'Evening (04:30 PM - 07:00 PM)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const variant = selectedVehicle.variants.find((v) => v.id === selectedVariantId) || selectedVehicle.variants[0];

    const booking: TestDriveBooking = {
      id: `TD-${Date.now().toString().slice(-6)}`,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      variantText: `${variant.fuelType} ${variant.transmission} (${variant.color})`,
      mode: driveMode,
      dealershipLocation: location,
      preferredDate,
      preferredTimeSlot: timeSlot,
      fullName,
      phone,
      email,
      hasDrivingLicense: hasLicense,
      assignedAdvisor: 'Vikram Mehta (Senior Automotive Specialist)',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    setCreatedBooking(booking);
    onBookingConfirmed(booking);
    setStep(5);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && step === 5) onClose();
      }}
    >
      <div className="relative metallic-card rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-700 animate-in zoom-in-95 duration-200 overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                {step === 5 ? 'Test Drive Confirmed' : 'Schedule VIP Test Drive'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 5 ? 'Your appointment has been registered in the dealership CRM' : `Step ${step} of 4 · Official Dealership Booking`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (if not confirmed) */}
        {step < 5 && (
          <div className="grid grid-cols-4 bg-slate-900 border-b border-slate-800 text-center text-[11px] font-bold">
            <div className={`py-2.5 transition-colors ${step === 1 ? 'bg-blue-600 text-white' : step > 1 ? 'text-blue-400' : 'text-slate-500'}`}>
              1. Vehicle
            </div>
            <div className={`py-2.5 transition-colors ${step === 2 ? 'bg-blue-600 text-white' : step > 2 ? 'text-blue-400' : 'text-slate-500'}`}>
              2. Mode
            </div>
            <div className={`py-2.5 transition-colors ${step === 3 ? 'bg-blue-600 text-white' : step > 3 ? 'text-blue-400' : 'text-slate-500'}`}>
              3. Slot
            </div>
            <div className={`py-2.5 transition-colors ${step === 4 ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
              4. Contact
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {/* STEP 1: Select Vehicle & Variant */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                Select Your Desired Vehicle Model:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicleId(v.id);
                      setSelectedVariantId(v.variants[0]?.id || '');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                      selectedVehicleId === v.id
                        ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={v.images[0]}
                      alt={v.name}
                      className="w-16 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">{v.category}</span>
                      <h5 className="font-display font-bold text-xs text-white truncate">{v.name}</h5>
                      <span className="text-[11px] text-slate-400 font-mono">₹{(v.basePrice / 100000).toFixed(2)}L</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Variant Selector */}
              {selectedVehicle && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-300">Choose Transmission / Fuel Type:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedVehicle.variants.map((varItem) => (
                      <button
                        key={varItem.id}
                        type="button"
                        onClick={() => setSelectedVariantId(varItem.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                          (selectedVariantId || selectedVehicle.variants[0]?.id) === varItem.id
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <div>{varItem.fuelType} · {varItem.transmission}</div>
                        <div className="text-[10px] font-normal opacity-80">{varItem.color}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next: Choose Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Mode & Location */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                Select Test Drive Format:
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setDriveMode('Showroom Test Drive')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    driveMode === 'Showroom Test Drive'
                      ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-xs text-white">Showroom VIP Lounge</span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Experience track-simulation, espresso bar, and full colorway gallery.
                  </p>
                </div>

                <div
                  onClick={() => setDriveMode('Home / Office Doorstep')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    driveMode === 'Home / Office Doorstep'
                      ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-xs text-white">Doorstep Concierge</span>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Our specialist brings the vehicle directly to your residence or workplace.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-3">
                <label className="text-xs font-bold text-slate-300">
                  Select Dealership Experience Center:
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next: Choose Date &amp; Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Preferred Slot */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                Select Appointment Date &amp; Time:
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Preferred Date:</label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-300">Available Time Slots:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        timeSlot === slot
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next: Driver Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Contact Details */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                Provide Client &amp; Driver Details:
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLicense}
                  onChange={(e) => setHasLicense(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs text-slate-300">
                  I hold a valid permanent driving license for this vehicle class.
                </span>
              </label>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero obligation test drive insured under Apex Dealership fleet policy.</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30"
                >
                  Confirm &amp; Book Test Drive
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Booking Confirmation Card */}
          {step === 5 && createdBooking && (
            <div className="py-6 flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="font-mono text-xs text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/30">
                  Ref ID: {createdBooking.id}
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase mt-2">
                  Test Drive Scheduled!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  We have reserved your appointment in the OmniFlow Dealership CRM and dispatched SMS &amp; WhatsApp reminders.
                </p>
              </div>

              <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-semibold">Vehicle:</span>
                  <span className="font-bold text-white">{createdBooking.vehicleName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-semibold">Variant:</span>
                  <span className="font-bold text-slate-200">{createdBooking.variantText}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-semibold">Date &amp; Slot:</span>
                  <span className="font-bold text-cyan-400">{createdBooking.preferredDate} · {createdBooking.preferredTimeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500 font-semibold">Format &amp; Venue:</span>
                  <span className="font-bold text-slate-200">{createdBooking.mode} ({createdBooking.dealershipLocation})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Assigned Specialist:</span>
                  <span className="font-bold text-emerald-400">{createdBooking.assignedAdvisor}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider"
              >
                Return to Showcase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
