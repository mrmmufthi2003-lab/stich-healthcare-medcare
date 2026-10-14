import React from 'react';
import {
  MapPin,
  Home,
  Phone,
  Clock,
  Calendar,
  ExternalLink,
  ChevronDown,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { Branch } from '../types.ts';

interface BranchGridProps {
  branches: Branch[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  onOpenMap: (branch: Branch) => void;
  onBookBranch: (branch: Branch) => void;
}

export const BranchGrid: React.FC<BranchGridProps> = ({
  branches,
  selectedCategory,
  setSelectedCategory,
  selectedBranchId,
  setSelectedBranchId,
  onOpenMap,
  onBookBranch,
}) => {
  const categories = [
    { id: 'ALL', label: 'ALL' },
    { id: 'HOSPITAL', label: 'HOSPITALS' },
    { id: 'CLINIC', label: 'CLINICS' },
    { id: 'SPECIALTY_CENTRE', label: 'SPECIALTY CENTRES' },
  ];

  const filteredBranches = branches.filter((b) => {
    if (selectedCategory !== 'ALL' && b.category !== selectedCategory) {
      return false;
    }
    if (selectedBranchId !== 'ALL' && b.id !== selectedBranchId) {
      return false;
    }
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Breadcrumb matching image */}
      <div className="flex items-center gap-2 text-xs font-semibold text-[#7a1249] mb-4">
        <Home className="w-3.5 h-3.5" />
        <span>/</span>
        <span className="uppercase tracking-wider">LOCATIONS</span>
      </div>

      {/* Main Section Heading */}
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#7a1249] tracking-tight">
          Medcare Branches & Hospital Locations
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mt-2 font-light">
          Find your nearest Medcare hospital or clinic across Dubai & Sharjah with comprehensive outpatient and inpatient services.
        </p>
      </div>

      {/* Category Tabs & Dropdown Selectors */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        {/* Category Tabs: ALL | HOSPITALS | CLINICS */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 text-xs md:text-sm font-bold tracking-wider">
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              <button
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedBranchId('ALL');
                }}
                className={`py-1 cursor-pointer transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'text-[#7a1249] font-black border-b-2 border-[#7a1249]'
                    : 'text-neutral-500 hover:text-[#7a1249]'
                }`}
              >
                {cat.label}
              </button>
              {idx < categories.length - 1 && (
                <span className="text-neutral-300 font-light select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Dropdown Jump Selector */}
        <div className="relative min-w-[260px]">
          <select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="w-full appearance-none bg-white border-b-2 border-[#7a1249] px-3 py-2 pr-8 text-xs md:text-sm font-semibold text-[#7a1249] focus:outline-none cursor-pointer"
          >
            <option value="ALL">Select Branch / View All Locations</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#7a1249] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid of Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
          >
            {/* Medcare Signature Magenta Header Bar */}
            <div className="bg-[#7a1249] px-4 py-3.5 flex items-center justify-center gap-2 text-white">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-bold text-xs md:text-sm tracking-tight text-center truncate">
                {branch.name}
              </h3>
            </div>

            {/* Branch Image Container with Fallback */}
            <div className="relative h-48 bg-neutral-100 overflow-hidden">
              <img
                src={branch.image}
                alt={branch.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {branch.hasEmergency24x7 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                  <span>24/7 EMERGENCY</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                ★ {branch.rating} ({branch.totalReviews} reviews)
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                {/* Branch Address */}
                <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wide leading-relaxed line-clamp-2">
                  {branch.address}
                </p>

                {/* Timings */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#7a1249] shrink-0" />
                  <span className="truncate">{branch.timing}</span>
                </div>

                {/* Specialties preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Key Departments:
                  </span>
                  <div className="text-xs text-neutral-600 line-clamp-1">
                    {branch.departments.slice(0, 4).join(' · ')}
                    {branch.departments.length > 4 && ' · & more'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenMap(branch)}
                    className="flex-1 py-2 text-xs font-bold text-[#7a1249] hover:bg-[#7a1249]/5 border border-[#7a1249] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>VIEW MAP</span>
                  </button>

                  <a
                    href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                    className="p-2 text-neutral-600 hover:text-[#7a1249] hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-colors"
                    title={`Call ${branch.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={() => onBookBranch(branch)}
                  className="w-full py-2.5 bg-[#7a1249] hover:bg-[#600e39] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-200" />
                  <span>BOOK APPOINTMENT</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 mt-6">
          <MapPin className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-neutral-700">No branches match your filter</h4>
          <p className="text-xs text-neutral-500 mt-1">Try selecting 'ALL' or reset your search term.</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedBranchId('ALL');
            }}
            className="mt-4 px-4 py-2 bg-[#7a1249] text-white text-xs font-semibold rounded-lg"
          >
            Show All Branches
          </button>
        </div>
      )}
    </section>
  );
};
