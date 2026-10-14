import React from 'react';
import { Search, MapPin, ShieldCheck, Clock, PhoneCall } from 'lucide-react';

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalBranches: number;
  totalDoctors: number;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  totalBranches,
  totalDoctors,
  onOpenBooking,
}) => {
  return (
    <div className="relative bg-[#0d040a] text-white overflow-hidden border-b border-[#2b0c1e]">
      {/* Background Magenta Glow Mist Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#9c185e] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-[#7a1249] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-300 uppercase">
              <MapPin className="w-4 h-4 text-[#ff4d8d]" />
              <span>UAE Healthcare Network</span>
              <span className="text-white/40">·</span>
              <span>JCI Accredited</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              Locations
            </h1>

            <p className="text-sm md:text-base text-rose-100/80 leading-relaxed font-light max-w-lg">
              Explore state-of-the-art hospitals, specialized surgical centers, and community clinics across Dubai and Sharjah. Dedicated to delivering compassionate clinical excellence with 24/7 emergency trauma units.
            </p>

            {/* Quick Search */}
            <div className="pt-2">
              <div className="relative flex items-center max-w-md bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1.5 focus-within:border-rose-400 transition-colors">
                <Search className="w-5 h-5 text-rose-200 ml-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search hospital, clinic, or area (e.g. Al Safa, JBR)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-rose-200/50 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-xs text-rose-300 hover:text-white px-2 py-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="flex items-center gap-6 pt-4 text-xs text-rose-100/70 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{totalBranches} Multi-Specialty Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>24/7 Emergency Care</span>
              </div>
            </div>
          </div>

          {/* Right Marquee Hospital Building Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <img
                src="/src/assets/images/hospital_hero_building_1791968678721.jpg"
                alt="Medcare Hospital & Medical Centre"
                referrerPolicy="no-referrer"
                className="w-full h-72 md:h-96 object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">
                      Flagship Facility
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                      Medcare Orthopaedics & Spine Hospital
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1">
                      Al Safa, Sheikh Zayed Road · Trauma & Advanced Surgery Centre
                    </p>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="bg-[#7a1249] hover:bg-[#9c185e] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 whitespace-nowrap"
                  >
                    Book In Safa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
