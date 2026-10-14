import React, { useState } from 'react';
import {
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Appointment } from '../types.ts';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onRefresh: () => void;
  onCancelAppointment: (id: string) => Promise<boolean>;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onRefresh,
  onCancelAppointment,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const [filterQuery, setFilterQuery] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const filtered = appointments.filter((apt) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      apt.bookingRef.toLowerCase().includes(q) ||
      apt.patientName.toLowerCase().includes(q) ||
      apt.doctorName.toLowerCase().includes(q) ||
      apt.branchName.toLowerCase().includes(q)
    );
  });

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    setCancellingId(id);
    const ok = await onCancelAppointment(id);
    setCancellingId(null);
    if (ok) {
      setMessage('Appointment marked as CANCELLED in database.');
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="bg-[#7a1249] text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-pink-300" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Patient Portal & Appointments</h3>
              <p className="text-xs text-pink-200">
                Live database records of your scheduled clinic visits & teleconsultations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search by Booking Ref, Doctor, or Name..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#7a1249]"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh DB</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#7a1249] hover:bg-[#600e39] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Appointment</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No appointments found</p>
              <p className="text-xs text-neutral-400 mt-1">
                Schedule a consultation to see it appear here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="mt-4 px-4 py-2 bg-[#7a1249] text-white text-xs font-bold rounded-lg"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            filtered.map((apt) => (
              <div
                key={apt.id}
                className={`p-4 rounded-xl border transition-all ${
                  apt.status === 'CANCELLED'
                    ? 'bg-neutral-50 border-neutral-200 opacity-60'
                    : 'bg-white border-neutral-200 shadow-2xs hover:border-[#7a1249]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#7a1249]">
                      {apt.bookingRef}
                    </span>
                    <h4 className="font-bold text-neutral-900 text-sm">
                      {apt.patientName}{' '}
                      <span className="text-xs font-normal text-neutral-500">
                        ({apt.gender}, {apt.patientAge} yrs)
                      </span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        apt.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                      {apt.consultationType === 'IN_PERSON' ? 'Hospital Visit' : 'teleMEDCARE'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#7a1249] shrink-0" />
                    <span className="font-medium text-neutral-800">{apt.doctorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{apt.branchName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>
                      {apt.appointmentDate} · {apt.appointmentTime}
                    </span>
                  </div>
                </div>

                {apt.notes && (
                  <p className="text-[11px] text-neutral-500 italic mt-2">
                    Notes: "{apt.notes}"
                  </p>
                )}

                {apt.status === 'CONFIRMED' && (
                  <div className="pt-3 mt-3 border-t border-neutral-100 flex justify-end">
                    <button
                      onClick={() => handleCancel(apt.id)}
                      disabled={cancellingId === apt.id}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{cancellingId === apt.id ? 'Cancelling...' : 'Cancel Appointment'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
