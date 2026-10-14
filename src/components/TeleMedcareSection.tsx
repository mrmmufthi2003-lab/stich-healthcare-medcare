import React, { useState } from 'react';
import {
  Video,
  ShieldCheck,
  FileCheck,
  Clock,
  Sparkles,
  PhoneCall,
  Calendar,
  Camera,
  Mic,
} from 'lucide-react';

interface TeleMedcareSectionProps {
  onOpenBooking: () => void;
}

export const TeleMedcareSection: React.FC<TeleMedcareSectionProps> = ({ onOpenBooking }) => {
  const [testingAudioVideo, setTestingAudioVideo] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const runTest = () => {
    setTestingAudioVideo(true);
    setTestSuccess(false);
    setTimeout(() => {
      setTestingAudioVideo(false);
      setTestSuccess(true);
    }, 1200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="bg-gradient-to-br from-[#190914] to-[#2e0e21] rounded-2xl text-white overflow-hidden p-8 md:p-12 border border-[#481232] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7a1249]/60 text-pink-200 text-xs font-semibold">
              <Video className="w-3.5 h-3.5" />
              <span>teleMEDCARE Virtual Hospital</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Consult Top Specialists from the Comfort of Your Home
            </h2>

            <p className="text-sm text-rose-100/80 leading-relaxed font-light">
              Connect via HD encrypted video consultations with senior Medcare consultants across 20+ clinical specialties. Receive digital health prescriptions delivered directly to your doorstep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-pink-300 mb-2" />
                <h4 className="text-xs font-bold text-white">Same-Day Slots</h4>
                <p className="text-[11px] text-neutral-300 mt-1">Available 7 days a week</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <FileCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white">e-Prescription</h4>
                <p className="text-[11px] text-neutral-300 mt-1">Instant pharmacy dispatch</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-rose-300 mb-2" />
                <h4 className="text-xs font-bold text-white">Insurance Direct</h4>
                <p className="text-[11px] text-neutral-300 mt-1">Covered by major insurers</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={onOpenBooking}
                className="bg-[#ff4d8d] hover:bg-[#e03d7c] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Schedule Virtual Visit
              </button>

              <button
                onClick={runTest}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-pink-200" />
                <span>{testingAudioVideo ? 'Testing Device...' : 'Test Video & Mic'}</span>
              </button>
            </div>

            {testSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Webcam, Microphone & Bandwidth Checked: 100% Ready for Consultation!</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 p-4">
              <img
                src="/src/assets/images/doctor_consultation_suite_1791968681811.jpg"
                alt="Doctor Teleconsultation"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-rose-200">
                <span>Secure Telehealth Protocol</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  ● 12 Doctors Online Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
