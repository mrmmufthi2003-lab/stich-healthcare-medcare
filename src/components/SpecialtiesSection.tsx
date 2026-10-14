import React from 'react';
import {
  HeartPulse,
  Activity,
  Baby,
  Sparkles,
  Brain,
  Users,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Specialty } from '../types.ts';

interface SpecialtiesSectionProps {
  specialties: Specialty[];
  onSelectSpecialty: (specialtyName: string) => void;
  onOpenBooking: () => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  specialties,
  onSelectSpecialty,
  onOpenBooking,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#7a1249]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#7a1249]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-[#7a1249]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#7a1249]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#7a1249]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#7a1249]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#7a1249]" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#7a1249] uppercase tracking-wider block mb-1">
          Centers of Clinical Excellence
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#7a1249] tracking-tight">
          Specialties & Medical Departments
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mt-2 font-light">
          Integrated multi-disciplinary departments providing advanced diagnostic accuracy, minimally invasive surgery, and comprehensive disease management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((spec) => (
          <div
            key={spec.id}
            className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7a1249]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(spec.icon)}
              </div>
              <h3 className="font-bold text-base text-neutral-900 group-hover:text-[#7a1249] transition-colors">
                {spec.name}
              </h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {spec.description}
              </p>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Common Procedures:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {spec.commonTreatments.map((treatment) => (
                    <span
                      key={treatment}
                      className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[11px]"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                {spec.doctorCount}+ Consultants Available
              </span>
              <button
                onClick={() => onSelectSpecialty(spec.name)}
                className="text-xs font-bold text-[#7a1249] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Find Doctors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
