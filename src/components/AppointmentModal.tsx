import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Video,
  Hospital,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Branch, Doctor, Appointment } from '../types.ts';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  doctors: Doctor[];
  initialBranch?: Branch | null;
  initialDoctor?: Doctor | null;
  onAppointmentCreated: (newApt: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  branches,
  doctors,
  initialBranch,
  initialDoctor,
  onAppointmentCreated,
}) => {
  if (!isOpen) return null;

  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    initialBranch?.id || (initialDoctor?.branchId ?? branches[0]?.id ?? '')
  );

  const availableDoctorsForBranch = doctors.filter(
    (d) => !selectedBranchId || d.branchId === selectedBranchId
  );

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor?.id || (availableDoctorsForBranch[0]?.id ?? doctors[0]?.id ?? '')
  );

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  // Form Fields
  const [date, setDate] = useState<string>('2026-10-18');
  const [timeSlot, setTimeSlot] = useState<string>(
    selectedDoctor?.timeSlots?.[0] || '10:00 AM'
  );
  const [consultationType, setConsultationType] = useState<'IN_PERSON' | 'TELECONSULTATION'>(
    'IN_PERSON'
  );
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('32');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [notes, setNotes] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      setError('Please provide patient name and phone number.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        patientName,
        patientEmail,
        patientPhone,
        patientAge: Number(patientAge) || 30,
        gender,
        doctorId: selectedDoctor?.id || 'doc-generic',
        doctorName: selectedDoctor?.name || 'Dr. Specialist',
        specialty: selectedDoctor?.specialty || 'General OPD',
        branchId: selectedBranch?.id || 'br-general',
        branchName: selectedBranch?.name || 'Medcare Hospital',
        appointmentDate: date,
        appointmentTime: timeSlot,
        consultationType,
        notes,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setConfirmedApt(data.data);
        onAppointmentCreated(data.data);
      } else {
        setError(data.message || 'Failed to book appointment.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Connection to backend database failed. Please check server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200">
        {/* Modal Header */}
        <div className="bg-[#7a1249] text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-pink-300" />
            <div>
              <h3 className="font-serif font-bold text-base md:text-lg">
                {confirmedApt ? 'Appointment Confirmed' : 'Book a Consultation'}
              </h3>
              <p className="text-[11px] text-pink-200">
                {confirmedApt
                  ? 'Your appointment has been registered in the hospital database'
                  : 'Fast, secure appointment scheduling across all Medcare branches'}
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

        {confirmedApt ? (
          /* Confirmation Screen */
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-neutral-900">
                Booking Reference: {confirmedApt.bookingRef}
              </h4>
              <p className="text-xs text-neutral-500">
                A confirmation SMS and calendar invite have been simulated for {confirmedApt.patientPhone}.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Patient Name:</span>
                <span className="font-bold text-neutral-800">{confirmedApt.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Doctor / Specialist:</span>
                <span className="font-bold text-[#7a1249]">{confirmedApt.doctorName} ({confirmedApt.specialty})</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Facility Location:</span>
                <span className="font-bold text-neutral-800">{confirmedApt.branchName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Date & Slot:</span>
                <span className="font-bold text-neutral-800">{confirmedApt.appointmentDate} at {confirmedApt.appointmentTime}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Consultation Format:</span>
                <span className="font-bold text-neutral-800">
                  {confirmedApt.consultationType === 'IN_PERSON' ? 'In-Person Hospital Visit' : 'TeleMEDCARE Video Call'}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-neutral-500">Database Record:</span>
                <span className="text-emerald-700 font-mono font-bold">SAVED IN DATA STORE</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-[#7a1249] hover:bg-[#600e39] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Mode: In Person vs Telehealth */}
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-2 uppercase tracking-wider">
                1. Select Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('IN_PERSON')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                    consultationType === 'IN_PERSON'
                      ? 'border-[#7a1249] bg-[#7a1249]/5 text-[#7a1249]'
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <Hospital className="w-4 h-4" />
                  <span>In-Person Hospital Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('TELECONSULTATION')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                    consultationType === 'TELECONSULTATION'
                      ? 'border-[#7a1249] bg-[#7a1249]/5 text-[#7a1249]'
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>teleMEDCARE Video Consult</span>
                </button>
              </div>
            </div>

            {/* Branch Selector */}
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1 uppercase tracking-wider">
                2. Select Hospital / Clinic Branch
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  const docs = doctors.filter((d) => d.branchId === e.target.value);
                  if (docs[0]) setSelectedDoctorId(docs[0].id);
                }}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Selector */}
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1 uppercase tracking-wider">
                3. Select Specialist
              </label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
              >
                {availableDoctorsForBranch.length > 0 ? (
                  availableDoctorsForBranch.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty} (AED {d.consultationFee})
                    </option>
                  ))
                ) : (
                  <option value="">No specialists found for selected branch</option>
                )}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1 uppercase tracking-wider">
                  4. Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1 uppercase tracking-wider">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                >
                  {(selectedDoctor?.timeSlots || ['09:00 AM', '11:00 AM', '02:30 PM', '05:00 PM']).map(
                    (slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Patient Details */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-700 block uppercase tracking-wider">
                5. Patient Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Patient Full Name *"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone (e.g. +971 50 123 4567) *"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full sm:col-span-2 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <textarea
                placeholder="Reason for visit / medical symptoms (optional)"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#7a1249]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#7a1249] hover:bg-[#600e39] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {submitting ? (
                  <span>Saving Appointment to Database...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-pink-200" />
                    <span>Confirm & Schedule Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
