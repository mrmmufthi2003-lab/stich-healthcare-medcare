import React from 'react';
import { Phone, Mail, MapPin, HeartPulse, ShieldCheck, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenVsCodeGuide: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVsCodeGuide,
  onSelectCategory,
  onOpenPortal,
}) => {
  return (
    <footer className="bg-[#12050e] text-white border-t border-[#2e0e22] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7a1249] to-[#ff4d8d] flex items-center justify-center text-white">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white block leading-none">
                  MEDCARE
                </span>
                <span className="text-[10px] font-bold tracking-widest text-rose-300 uppercase">
                  Hospitals & Medical Centres
                </span>
              </div>
            </div>

            <p className="text-xs text-rose-100/70 leading-relaxed font-light max-w-sm">
              We'll Treat You Well. A premier healthcare network in the UAE delivering internationally accredited tertiary healthcare across hospitals and multi-specialty centres.
            </p>

            <div className="flex items-center gap-3 text-xs text-rose-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Joint Commission International (JCI) Accredited</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Facilities
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onSelectCategory('HOSPITAL')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medcare Hospitals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('CLINIC')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medical Centres & Clinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('SPECIALTY_CENTRE')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Orthopaedics & Spine Hospital
                </button>
              </li>
              <li>
                <a href="#emergency" className="hover:text-white transition-colors">
                  24/7 Emergency & Trauma
                </a>
              </li>
            </ul>
          </div>

          {/* Patient Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors cursor-pointer">
                  Patient Portal
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  teleMEDCARE Video Consults
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Homecare & Nurse at Home
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Health Checkup Packages
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency & 24/7 Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Emergency & Toll-Free
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <a
                href="tel:8006332273"
                className="flex items-center gap-2 text-rose-300 font-bold hover:text-white"
              >
                <Phone className="w-4 h-4 text-[#ff4d8d]" />
                <span>800 633 2273 (24/7)</span>
              </a>
              <div className="text-[11px] text-neutral-400">
                Al Safa Hospital Direct: +971 4 407 0555
              </div>
              <div className="text-[11px] text-neutral-400">
                Sharjah Hospital Direct: +971 6 501 5555
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenVsCodeGuide}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>VS Code & DB Setup Guide</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Medcare Hospitals & Medical Centres. All rights reserved.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Use</span>
            <span>·</span>
            <span>Patient Rights & Responsibilities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
