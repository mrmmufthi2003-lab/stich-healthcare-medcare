import React, { useState } from 'react';
import {
  Search,
  Award,
  Globe,
  Clock,
  Calendar,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Doctor, Specialty } from '../types.ts';

interface DoctorDirectoryProps {
  doctors: Doctor[];
  specialties: Specialty[];
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  doctors,
  specialties,
  onBookDoctor,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [doctorSearch, setDoctorSearch] = useState<string>('');

  const filteredDoctors = doctors.filter((doc) => {
    if (selectedSpecialty !== 'ALL' && doc.specialty !== selectedSpecialty) {
      return false;
    }
    if (doctorSearch.trim()) {
      const q = doctorSearch.toLowerCase().trim();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.branchName.toLowerCase().includes(q) ||
        doc.languages.some((l) => l.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#7a1249] uppercase tracking-wider block mb-1">
          Distinguished Medical Faculty
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#7a1249] tracking-tight">
          Find a Doctor & Book Consultation
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mt-2 font-light">
          Board-certified medical consultants, surgeons, and specialists trained in North America, the UK, Europe, and leading international institutions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Specialty Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSpecialty('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              selectedSpecialty === 'ALL'
                ? 'bg-[#7a1249] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Specialties
          </button>
          {specialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedSpecialty === spec.name
                  ? 'bg-[#7a1249] text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Doctor Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search doctor, language..."
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#7a1249]"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-neutral-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Doctor Header Banner */}
              <div className="p-5 flex items-start gap-4 border-b border-neutral-100">
                <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-[#7a1249] uppercase tracking-wider block truncate">
                    {doc.specialty}
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-neutral-900 truncate">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{doc.title}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{doc.rating}</span>
                    <span className="text-neutral-400 font-normal">({doc.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-5 space-y-3 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#7a1249] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{doc.qualifications}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="truncate font-medium text-neutral-800">{doc.branchName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Languages: {doc.languages.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Available: {doc.availableDays.join(', ')}</span>
                </div>

                <p className="text-xs text-neutral-500 line-clamp-2 pt-1 font-light italic">
                  "{doc.about}"
                </p>
              </div>
            </div>

            {/* Doctor Booking Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase">Consultation</span>
                <span className="text-sm font-bold text-[#7a1249]">
                  AED {doc.consultationFee}
                </span>
              </div>

              <button
                onClick={() => onBookDoctor(doc)}
                className="bg-[#7a1249] hover:bg-[#600e39] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Doctor</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
