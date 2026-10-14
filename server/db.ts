import fs from 'fs';
import path from 'path';
import {
  Branch,
  Doctor,
  Specialty,
  HealthPackage,
  Appointment,
  PatientInquiry,
  INITIAL_BRANCHES,
  INITIAL_DOCTORS,
  INITIAL_SPECIALTIES,
  INITIAL_PACKAGES,
} from './data.ts';

export interface DatabaseState {
  branches: Branch[];
  doctors: Doctor[];
  specialties: Specialty[];
  packages: HealthPackage[];
  appointments: Appointment[];
  inquiries: PatientInquiry[];
  lastUpdated: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.join(DATA_DIR, 'medcare_database.json');

class HospitalDatabase {
  private state: DatabaseState;

  constructor() {
    this.ensureDirectoryExists();
    this.state = this.loadDatabase();
  }

  private ensureDirectoryExists(): void {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (err) {
        console.warn('Could not create data directory, using memory storage:', err);
      }
    }
  }

  private getInitialState(): DatabaseState {
    const sampleAppointments: Appointment[] = [
      {
        id: 'apt-101',
        bookingRef: 'MC-APT-7821',
        patientName: 'Omar Farooq',
        patientEmail: 'omar.farooq@example.com',
        patientPhone: '+971 50 123 4567',
        patientAge: 38,
        gender: 'MALE',
        doctorId: 'doc-1',
        doctorName: 'Dr. Sarah Al Mansoori',
        specialty: 'Cardiology',
        branchId: 'br-al-safa-hospital',
        branchName: 'Al Safa - Medcare Hospital',
        appointmentDate: '2026-10-18',
        appointmentTime: '10:30 AM',
        consultationType: 'IN_PERSON',
        status: 'CONFIRMED',
        notes: 'Routine cardiovascular wellness and ECG check',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'apt-102',
        bookingRef: 'MC-APT-9310',
        patientName: 'Layla Al-Hashemi',
        patientEmail: 'layla.h@example.com',
        patientPhone: '+971 52 987 6543',
        patientAge: 29,
        gender: 'FEMALE',
        doctorId: 'doc-4',
        doctorName: 'Dr. Elena Rostova',
        specialty: 'Dermatology',
        branchId: 'br-jumeirah-clinic',
        branchName: 'Jumeirah - Medcare Medical Centre',
        appointmentDate: '2026-10-19',
        appointmentTime: '02:30 PM',
        consultationType: 'IN_PERSON',
        status: 'CONFIRMED',
        notes: 'Dermatology skin checkup and consultation',
        createdAt: new Date().toISOString(),
      },
    ];

    return {
      branches: INITIAL_BRANCHES,
      doctors: INITIAL_DOCTORS,
      specialties: INITIAL_SPECIALTIES,
      packages: INITIAL_PACKAGES,
      appointments: sampleAppointments,
      inquiries: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  private loadDatabase(): DatabaseState {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.branches && parsed.doctors) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Reading database file failed, re-initializing database:', e);
    }

    const initial = this.getInitialState();
    this.saveState(initial);
    return initial;
  }

  private saveState(state: DatabaseState): void {
    state.lastUpdated = new Date().toISOString();
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Writing to database file failed, continuing in memory:', e);
    }
  }

  public getBranches(category?: string, search?: string): Branch[] {
    let result = [...this.state.branches];
    if (category && category !== 'ALL') {
      result = result.filter(b => b.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.departments.some(d => d.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public getBranchById(id: string): Branch | undefined {
    return this.state.branches.find(b => b.id === id);
  }

  public getDoctors(filters?: { specialty?: string; branchId?: string; search?: string }): Doctor[] {
    let result = [...this.state.doctors];
    if (filters?.specialty && filters.specialty !== 'ALL') {
      result = result.filter(d => d.specialty.toLowerCase() === filters.specialty?.toLowerCase());
    }
    if (filters?.branchId && filters.branchId !== 'ALL') {
      result = result.filter(d => d.branchId === filters.branchId);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.languages.some(l => l.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public getDoctorById(id: string): Doctor | undefined {
    return this.state.doctors.find(d => d.id === id);
  }

  public getSpecialties(): Specialty[] {
    return this.state.specialties;
  }

  public getPackages(): HealthPackage[] {
    return this.state.packages;
  }

  public getAppointments(): Appointment[] {
    return this.state.appointments;
  }

  public createAppointment(data: Omit<Appointment, 'id' | 'bookingRef' | 'createdAt' | 'status'> & { status?: Appointment['status'] }): Appointment {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}-${randomNum}`,
      bookingRef: `MC-APT-${randomNum}`,
      status: data.status || 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    this.state.appointments.unshift(newApt);
    this.saveState(this.state);
    return newApt;
  }

  public cancelAppointment(id: string): boolean {
    const apt = this.state.appointments.find(a => a.id === id || a.bookingRef === id);
    if (!apt) return false;
    apt.status = 'CANCELLED';
    this.saveState(this.state);
    return true;
  }

  public createInquiry(data: Omit<PatientInquiry, 'id' | 'createdAt' | 'status'>): PatientInquiry {
    const inquiry: PatientInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    this.state.inquiries.unshift(inquiry);
    this.saveState(this.state);
    return inquiry;
  }

  public getDatabaseStats() {
    return {
      connected: true,
      dbType: 'JSON_PERSISTENT_FILE_STORAGE',
      dbFilePath: DB_FILE_PATH,
      branchesCount: this.state.branches.length,
      doctorsCount: this.state.doctors.length,
      specialtiesCount: this.state.specialties.length,
      packagesCount: this.state.packages.length,
      appointmentsCount: this.state.appointments.length,
      inquiriesCount: this.state.inquiries.length,
      lastUpdated: this.state.lastUpdated,
      supportedEngines: ['JSON File Storage (Default)', 'PostgreSQL / Supabase / Neon', 'MySQL', 'SQLite'],
    };
  }

  public resetDatabase(): void {
    this.state = this.getInitialState();
    this.saveState(this.state);
  }
}

export const db = new HospitalDatabase();
