import React from 'react';
import {
  X,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Branch } from '../types.ts';

interface BranchMapModalProps {
  branch: Branch | null;
  onClose: () => void;
  onBookBranch: (branch: Branch) => void;
}

export const BranchMapModal: React.FC<BranchMapModalProps> = ({
  branch,
  onClose,
  onBookBranch,
}) => {
  if (!branch) return null;

  // Generate safe map embed query
  const mapQuery = encodeURIComponent(`${branch.name}, ${branch.address}`);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="bg-[#7a1249] text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg">{branch.name}</h3>
              <p className="text-xs text-pink-200">{branch.city}, United Arab Emirates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Map Frame */}
          <div className="w-full h-72 rounded-xl overflow-hidden border border-neutral-200 shadow-inner bg-neutral-100 relative">
            <iframe
              title={`Map for ${branch.name}`}
              src={embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700">
            <div className="space-y-3">
              <div>
                <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Full Physical Address:
                </span>
                <p className="font-medium text-neutral-900 leading-relaxed">{branch.address}</p>
              </div>

              <div>
                <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Operating Hours:
                </span>
                <div className="flex items-center gap-2 text-neutral-800">
                  <Clock className="w-4 h-4 text-[#7a1249]" />
                  <span>{branch.timing}</span>
                </div>
              </div>

              {branch.hasEmergency24x7 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold">
                    24/7 Level-1 Emergency & Trauma Care Available
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Contact Telephones:
                </span>
                <div className="space-y-1">
                  <a
                    href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-2 text-[#7a1249] font-bold hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    <span>General Appointment: {branch.phone}</span>
                  </a>
                  {branch.emergencyPhone && (
                    <a
                      href={`tel:${branch.emergencyPhone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-2 text-red-600 font-bold hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Emergency Direct: {branch.emergencyPhone}</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span className="font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Medical Departments on Site:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {branch.departments.map((dept) => (
                    <span
                      key={dept}
                      className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-[11px]"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={branch.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 text-neutral-700 hover:text-[#7a1249] text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps App</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookBranch(branch);
              }}
              className="flex-1 sm:flex-initial px-5 py-2 bg-[#7a1249] hover:bg-[#600e39] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment at Branch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
