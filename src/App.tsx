import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { BranchGrid } from './components/BranchGrid.tsx';
import { DoctorDirectory } from './components/DoctorDirectory.tsx';
import { SpecialtiesSection } from './components/SpecialtiesSection.tsx';
import { PackagesSection } from './components/PackagesSection.tsx';
import { TeleMedcareSection } from './components/TeleMedcareSection.tsx';
import { HomecareSection } from './components/HomecareSection.tsx';
import { AppointmentModal } from './components/AppointmentModal.tsx';
import { BranchMapModal } from './components/BranchMapModal.tsx';
import { PatientPortalModal } from './components/PatientPortalModal.tsx';
import { VsCodeGuideModal } from './components/VsCodeGuideModal.tsx';
import { Footer } from './components/Footer.tsx';
import {
  Branch,
  Doctor,
  Specialty,
  HealthPackage,
  Appointment,
  DatabaseStats,
} from './types.ts';
import {
  INITIAL_BRANCHES,
  INITIAL_DOCTORS,
  INITIAL_SPECIALTIES,
  INITIAL_PACKAGES,
} from '../server/data.ts';
import { PhoneCall, ShieldAlert, Sparkles, Database } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('locations');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Data States
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [specialties, setSpecialties] = useState<Specialty[]>(INITIAL_SPECIALTIES);
  const [packages, setPackages] = useState<HealthPackage[]>(INITIAL_PACKAGES);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isVsCodeGuideOpen, setIsVsCodeGuideOpen] = useState<boolean>(false);

  // Context Selection for Modals
  const [targetBranchForMap, setTargetBranchForMap] = useState<Branch | null>(null);
  const [targetBranchForBooking, setTargetBranchForBooking] = useState<Branch | null>(null);
  const [targetDoctorForBooking, setTargetDoctorForBooking] = useState<Doctor | null>(null);

  // Load Data from Backend API
  const loadData = async () => {
    try {
      // 1. Branches
      const resBranches = await fetch('/api/branches');
      if (resBranches.ok) {
        const json = await resBranches.json();
        if (json.data) setBranches(json.data);
      }

      // 2. Doctors
      const resDocs = await fetch('/api/doctors');
      if (resDocs.ok) {
        const json = await resDocs.json();
        if (json.data) setDoctors(json.data);
      }

      // 3. Specialties
      const resSpec = await fetch('/api/specialties');
      if (resSpec.ok) {
        const json = await resSpec.json();
        if (json.data) setSpecialties(json.data);
      }

      // 4. Packages
      const resPkg = await fetch('/api/packages');
      if (resPkg.ok) {
        const json = await resPkg.json();
        if (json.data) setPackages(json.data);
      }

      // 5. Appointments
      const resApts = await fetch('/api/appointments');
      if (resApts.ok) {
        const json = await resApts.json();
        if (json.data) setAppointments(json.data);
      }

      // 6. DB Status
      const resStatus = await fetch('/api/db-status');
      if (resStatus.ok) {
        const json = await resStatus.json();
        if (json.data) setDbStats(json.data);
      }
    } catch (err) {
      console.warn('Backend API fetch error, using local fallback state:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered branches based on search input
  const searchedBranches = branches.filter((b) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      b.name.toLowerCase().includes(q) ||
      b.area.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.departments.some((d) => d.toLowerCase().includes(q))
    );
  });

  const handleOpenBooking = (branch?: Branch | null, doctor?: Doctor | null) => {
    setTargetBranchForBooking(branch || null);
    setTargetDoctorForBooking(doctor || null);
    setIsBookingOpen(true);
  };

  const handleOpenMap = (branch: Branch) => {
    setTargetBranchForMap(branch);
    setIsMapOpen(true);
  };

  const handleCancelAppointment = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id || a.bookingRef === id ? { ...a, status: 'CANCELLED' } : a))
        );
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const handleResetDatabase = async () => {
    try {
      await fetch('/api/reset-demo', { method: 'POST' });
      await loadData();
      alert('Database reset to initial demo seeds successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f9] text-[#1c181d]">
      {/* Top Banner for VS Code notification */}
      <div className="bg-[#7a1249] text-white px-4 py-1.5 text-[11px] font-semibold text-center flex items-center justify-center gap-2 border-b border-[#5a0c35]">
        <Database className="w-3.5 h-3.5 text-pink-300" />
        <span>Full-Stack Ready: React Frontend + Express REST Backend + Persistent Database.</span>
        <button
          onClick={() => setIsVsCodeGuideOpen(true)}
          className="underline hover:text-pink-200 cursor-pointer font-bold ml-1"
        >
          View VS Code Run & DB Guide
        </button>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenVsCodeGuide={() => setIsVsCodeGuideOpen(true)}
        appointmentCount={appointments.filter((a) => a.status === 'CONFIRMED').length}
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1">
        {activeTab === 'locations' && (
          <>
            <Hero
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              totalBranches={branches.length}
              totalDoctors={doctors.length}
              onOpenBooking={() => handleOpenBooking()}
            />

            <BranchGrid
              branches={searchedBranches}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBranchId={selectedBranchId}
              setSelectedBranchId={setSelectedBranchId}
              onOpenMap={handleOpenMap}
              onBookBranch={(branch) => handleOpenBooking(branch, null)}
            />

            {/* Emergency 24/7 Strip */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-red-950">
                      Medical Emergency or Urgent Trauma?
                    </h3>
                    <p className="text-xs text-red-900/80 mt-1 max-w-xl leading-relaxed">
                      Our Level-1 Emergency Units at Al Safa Hospital & Sharjah Hospital operate 24 hours, 365 days a year with acute cardiac care, stroke protocols, and critical care ambulances.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="tel:8006332273"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call 24/7 Ambulance (800 633 2273)</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'doctors' && (
          <DoctorDirectory
            doctors={doctors}
            specialties={specialties}
            onBookDoctor={(doc) => handleOpenBooking(null, doc)}
          />
        )}

        {activeTab === 'specialties' && (
          <SpecialtiesSection
            specialties={specialties}
            onSelectSpecialty={(specName) => {
              setActiveTab('doctors');
            }}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesSection
            packages={packages}
            onBookPackage={(pkg) => handleOpenBooking()}
          />
        )}

        {activeTab === 'telemedcare' && (
          <TeleMedcareSection onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'homecare' && <HomecareSection />}
      </main>

      {/* Footer */}
      <Footer
        onOpenVsCodeGuide={() => setIsVsCodeGuideOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('locations');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Modals */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        branches={branches}
        doctors={doctors}
        initialBranch={targetBranchForBooking}
        initialDoctor={targetDoctorForBooking}
        onAppointmentCreated={(newApt) => {
          setAppointments((prev) => [newApt, ...prev]);
        }}
      />

      <BranchMapModal
        branch={targetBranchForMap}
        onClose={() => {
          setIsMapOpen(false);
          setTargetBranchForMap(null);
        }}
        onBookBranch={(branch) => handleOpenBooking(branch, null)}
      />

      <PatientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        appointments={appointments}
        onRefresh={loadData}
        onCancelAppointment={handleCancelAppointment}
        onOpenBooking={() => handleOpenBooking()}
      />

      <VsCodeGuideModal
        isOpen={isVsCodeGuideOpen}
        onClose={() => setIsVsCodeGuideOpen(false)}
        dbStats={dbStats}
        onResetDatabase={handleResetDatabase}
      />
    </div>
  );
}
