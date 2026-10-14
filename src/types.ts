export interface Branch {
  id: string;
  name: string;
  category: 'HOSPITAL' | 'CLINIC' | 'SPECIALTY_CENTRE';
  city: string;
  area: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  timing: string;
  hasEmergency24x7: boolean;
  image: string;
  googleMapUrl: string;
  departments: string[];
  bedCapacity?: number;
  featuredDoctorsCount: number;
  rating: number;
  totalReviews: number;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  branchId: string;
  branchName: string;
  qualifications: string;
  experienceYears: number;
  languages: string[];
  consultationFee: number;
  rating: number;
  reviewsCount: number;
  image: string;
  about: string;
  availableDays: string[];
  timeSlots: string[];
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  doctorCount: number;
  commonTreatments: string[];
  icon: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  category: string;
  targetGroup: string;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  testsCount: number;
  includedItems: string[];
  recommendedFrequency: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge?: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  doctorId: string;
  doctorName: string;
  specialty: string;
  branchId: string;
  branchName: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationType: 'IN_PERSON' | 'TELECONSULTATION';
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface DatabaseStats {
  connected: boolean;
  dbType: string;
  dbFilePath: string;
  branchesCount: number;
  doctorsCount: number;
  specialtiesCount: number;
  packagesCount: number;
  appointmentsCount: number;
  inquiriesCount: number;
  lastUpdated: string;
  supportedEngines: string[];
}
