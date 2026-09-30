import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center font-display font-black text-lg">
                ⚡
              </div>
              <span className="font-display font-black text-xl text-white uppercase tracking-wider">
                APEX HYUNDAI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized dealership partner for Hyundai passenger cars, Ioniq electric vehicles, and SUVs. Powered by OmniFlow Automotive CRM.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certified Hyundai Multi-Point Vehicle Inspections</span>
            </div>
          </div>

          {/* Showroom Locations */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Experience Centers
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Central Showroom: 42 Boulevard Grand, Midtown</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Tech Park Hyundai Lounge: Gate 3, Outer Ring Road</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Apex Hyundai EV Supercharger Hub: North Aerocity</span>
              </li>
            </ul>
          </div>

          {/* Dealership Services */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Services &amp; Finance
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">VIP Test Drive Scheduling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paperless Finance Scheme (7.99%)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hyundai Promise Trade-In Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Doorstep Delivery Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate &amp; Fleet Leasing</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Hotline: 1800 200 8899</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>concierge@apexhyundai.com</span>
              </li>
              <li><span className="text-[11px] text-slate-500">Showroom Hours: 09:00 AM - 08:30 PM (7 Days)</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Apex Hyundai Dealership. OmniFlow Platform Architecture.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Booking</a>
            <a href="#" className="hover:text-slate-400">Roadside Assistance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
