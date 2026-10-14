import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  User,
  Search,
  Code2,
  Calendar,
  Menu,
  X,
  HeartPulse,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenVsCodeGuide: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenPortal,
  onOpenVsCodeGuide,
  appointmentCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  const navLinks = [
    { id: 'locations', label: 'LOCATIONS' },
    { id: 'doctors', label: 'DOCTORS' },
    { id: 'specialties', label: 'SPECIALITIES' },
    { id: 'packages', label: 'PACKAGES' },
    { id: 'telemedcare', label: 'teleMEDCARE' },
    { id: 'homecare', label: 'HOMECARE' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e9e1e5] shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#150a12] text-white text-xs py-2 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:8006332273"
              className="flex items-center gap-1.5 text-rose-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff4d8d]" />
              <span className="font-semibold tracking-wide">800 633 2273</span>
              <span className="hidden sm:inline text-white/50 text-[11px]">(24/7 Hotline)</span>
            </a>

            <a
              href="https://wa.me/9718006332273"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Care</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* VS Code & DB Guide Button */}
            <button
              onClick={onOpenVsCodeGuide}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#7a1249]/80 hover:bg-[#7a1249] text-white text-[11px] font-medium transition-colors"
              title="VS Code & Database Run Guide"
            >
              <Code2 className="w-3.5 h-3.5 text-pink-300" />
              <span>VS Code & DB Setup</span>
            </button>

            {/* Patient Portal */}
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-rose-300" />
              <span className="hidden sm:inline">Patient Portal</span>
              {appointmentCount > 0 && (
                <span className="bg-[#ff4d8d] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center justify-center transition-colors text-pink-200"
              title="Toggle Language"
            >
              {lang === 'EN' ? 'Ar' : 'En'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Medcare Brand Wordmark */}
        <div
          onClick={() => setActiveTab('locations')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7a1249] to-[#9c185e] flex items-center justify-center shadow-sm text-white font-serif font-black text-xl tracking-tighter">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#7a1249] leading-none">
              MEDCARE
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#554a50] uppercase mt-0.5">
              Hospitals & Medical Centres
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold tracking-wide text-[#3f3239]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`pb-1 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === link.id
                  ? 'text-[#7a1249] border-[#7a1249]'
                  : 'border-transparent hover:text-[#7a1249]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-[#7a1249] hover:bg-[#600e39] text-white px-4 md:px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-pink-200" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#7a1249] hover:bg-neutral-100 rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold ${
                activeTab === link.id
                  ? 'bg-[#7a1249]/10 text-[#7a1249]'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-100 flex gap-2">
            <button
              onClick={() => {
                onOpenPortal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-semibold text-center border border-neutral-200 rounded-lg text-neutral-800"
            >
              Patient Portal ({appointmentCount})
            </button>
            <button
              onClick={() => {
                onOpenVsCodeGuide();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-semibold text-center bg-[#7a1249] text-white rounded-lg"
            >
              VS Code Setup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
