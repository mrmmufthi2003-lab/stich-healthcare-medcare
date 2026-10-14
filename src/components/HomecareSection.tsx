import React, { useState } from 'react';
import { Home, Stethoscope, UserCheck, Syringe, Activity, Phone, CheckCircle } from 'lucide-react';

export const HomecareSection: React.FC = () => {
  const [requested, setRequested] = useState(false);
  const [service, setService] = useState('Doctor at Home');

  const services = [
    {
      title: 'Doctor at Home',
      desc: 'Experienced family physicians visiting your residence for comprehensive examinations and treatment.',
      icon: Stethoscope,
    },
    {
      title: 'Nursing at Home',
      desc: 'Wound care, IV infusions, post-operative support, and elderly assistance by DHA-licensed nurses.',
      icon: UserCheck,
    },
    {
      title: 'Lab Sample Collection',
      desc: 'Blood tests, wellness panels, and diagnostic draws collected painlessly at your home.',
      icon: Syringe,
    },
    {
      title: 'Physiotherapy & Rehab',
      desc: 'Personalized physical therapy sessions for recovery, joint mobility, and neurological rehabilitation.',
      icon: Activity,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#7a1249] uppercase tracking-wider block mb-1">
          Hospital Quality at Your Doorstep
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#7a1249] tracking-tight">
          Medcare Homecare Services
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mt-2 font-light">
          When travelling to a medical centre isn’t convenient, our mobile medical units deliver premium healthcare directly into your home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7a1249]/10 text-[#7a1249] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-neutral-900">{item.title}</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setService(item.title);
                    setRequested(true);
                  }}
                  className="w-full py-2 bg-neutral-100 hover:bg-[#7a1249] hover:text-white text-[#7a1249] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Request Service
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {requested && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Homecare request for <strong>{service}</strong> initiated. Our coordinator will contact you within 15 minutes!
            </span>
          </div>
          <button
            onClick={() => setRequested(false)}
            className="text-emerald-700 font-bold hover:underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  );
};
