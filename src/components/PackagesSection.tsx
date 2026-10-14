import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { HealthPackage } from '../types.ts';

interface PackagesSectionProps {
  packages: HealthPackage[];
  onBookPackage: (pkg: HealthPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  onBookPackage,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#7a1249] uppercase tracking-wider block mb-1">
          Preventative Wellness & Diagnostics
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#7a1249] tracking-tight">
          Comprehensive Health Screening Packages
        </h2>
        <p className="text-xs md:text-sm text-neutral-600 mt-2 font-light">
          Personalized health checks designed to detect potential conditions early, assess risk factors, and optimize your overall vitality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Package Card Top */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#7a1249] uppercase tracking-wider bg-[#7a1249]/10 px-2 py-0.5 rounded">
                    {pkg.category}
                  </span>
                  <h3 className="font-bold text-lg md:text-xl text-neutral-900 mt-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Target Group: {pkg.targetGroup}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-neutral-400 line-through">
                    {pkg.currency} {pkg.originalPrice}
                  </div>
                  <div className="text-xl md:text-2xl font-black text-[#7a1249]">
                    {pkg.currency} {pkg.discountedPrice}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 block">
                    Save {Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <span className="text-xs font-bold text-neutral-700 block mb-3">
                  Package Inclusions ({pkg.testsCount}+ Parameters & Clinical Consults):
                </span>
                <ul className="space-y-2 text-xs text-neutral-600">
                  {pkg.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Frequency: <strong>{pkg.recommendedFrequency}</strong>
              </span>

              <button
                onClick={() => onBookPackage(pkg)}
                className="bg-[#7a1249] hover:bg-[#600e39] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Package</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
