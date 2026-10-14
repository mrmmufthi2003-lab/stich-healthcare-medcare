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

export interface PatientInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredBranch?: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt: string;
}

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'br-al-safa-hospital',
    name: 'Al Safa - Medcare Hospital',
    category: 'HOSPITAL',
    city: 'Dubai',
    area: 'Al Safa',
    address: 'Medcare Hospital L.L.C, Opp. Safa Park Gate No: 1, Jumeirah, Dubai',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 4 407 0555',
    timing: '24/7 Emergency & Inpatient | OPD 8:00 AM - 10:00 PM',
    hasEmergency24x7: true,
    image: '/src/assets/images/hospital_hero_building_1791968678721.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Hospital+Al+Safa+Dubai',
    departments: ['Cardiology', 'Orthopaedics', 'General Surgery', 'Paediatrics', 'Neurology', 'Internal Medicine', 'Emergency Medicine'],
    bedCapacity: 120,
    featuredDoctorsCount: 38,
    rating: 4.9,
    totalReviews: 1240,
  },
  {
    id: 'br-ortho-spine',
    name: 'Medcare Orthopaedics & Spine Hospital',
    category: 'SPECIALTY_CENTRE',
    city: 'Dubai',
    area: 'Al Safa / Sheikh Zayed Road',
    address: 'Sheikh Zayed Road, Near Safa Park Interchange, Al Safa 2, Dubai',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 4 407 7777',
    timing: '24/7 Trauma Care & Inpatient | OPD 8:00 AM - 9:00 PM',
    hasEmergency24x7: true,
    image: '/src/assets/images/diagnostic_imaging_center_1791968681154.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Orthopaedics+and+Spine+Hospital',
    departments: ['Orthopaedics', 'Spine Surgery', 'Sports Medicine', 'Physiotherapy & Rehab', 'Pain Management'],
    bedCapacity: 65,
    featuredDoctorsCount: 24,
    rating: 4.95,
    totalReviews: 890,
  },
  {
    id: 'br-jbr-clinic',
    name: 'JBR - Medcare Medical Centre',
    category: 'CLINIC',
    city: 'Dubai',
    area: 'Jumeirah Beach Residence',
    address: 'JBR Shop P41, Jumeirah Beach Residence, The Walk, Sadaf Cluster, Plaza Level, Dubai',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 800 633 2273',
    timing: 'Daily 8:00 AM - 9:00 PM',
    hasEmergency24x7: false,
    image: '/src/assets/images/clinic_jbr_exterior_1791968680077.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Medical+Centre+JBR+Dubai',
    departments: ['Family Medicine', 'Paediatrics', 'Dermatology & Cosmetology', 'Dental', 'Obstetrics & Gynaecology'],
    featuredDoctorsCount: 16,
    rating: 4.8,
    totalReviews: 620,
  },
  {
    id: 'br-jumeirah-clinic',
    name: 'Jumeirah - Medcare Medical Centre',
    category: 'CLINIC',
    city: 'Dubai',
    area: 'Jumeirah 1',
    address: 'Medcare Building, Jumeirah Beach Road, Umm Suqeim 1, Dubai',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 800 633 2273',
    timing: 'Daily 8:00 AM - 10:00 PM',
    hasEmergency24x7: false,
    image: '/src/assets/images/hospital_hero_building_1791968678721.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Medical+Centre+Jumeirah+Dubai',
    departments: ['Cardiology', 'ENT', 'Dermatology', 'Ophthalmology', 'Physiotherapy'],
    featuredDoctorsCount: 22,
    rating: 4.85,
    totalReviews: 740,
  },
  {
    id: 'br-sharjah-hospital',
    name: 'Sharjah - Medcare Hospital',
    category: 'HOSPITAL',
    city: 'Sharjah',
    area: 'Al Khan',
    address: 'King Faisal Street, Near Buhaira Corniche, Al Qasimia, Sharjah',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 6 501 5555',
    timing: '24/7 Emergency & Critical Care | OPD 8:00 AM - 11:00 PM',
    hasEmergency24x7: true,
    image: '/src/assets/images/clinic_jbr_exterior_1791968680077.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Hospital+Sharjah',
    departments: ['Emergency Medicine', 'Obstetrics & Gynaecology', 'Paediatrics', 'Cardiology', 'Orthopaedics', 'ICU'],
    bedCapacity: 110,
    featuredDoctorsCount: 30,
    rating: 4.75,
    totalReviews: 950,
  },
  {
    id: 'br-mirdif-clinic',
    name: 'Mirdif - Medcare Clinic',
    category: 'CLINIC',
    city: 'Dubai',
    area: 'Mirdif',
    address: 'Uptown Mirdif Mall, Ground Floor, Courtyard Entrance, Dubai',
    phone: '+971 800 633 2273',
    emergencyPhone: '+971 800 633 2273',
    timing: 'Daily 8:30 AM - 9:30 PM',
    hasEmergency24x7: false,
    image: '/src/assets/images/hospital_hero_building_1791968678721.jpg',
    googleMapUrl: 'https://maps.google.com/?q=Medcare+Medical+Centre+Mirdif',
    departments: ['Family Medicine', 'Paediatrics', 'Dental', 'Internal Medicine'],
    featuredDoctorsCount: 14,
    rating: 4.8,
    totalReviews: 410,
  },
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Al Mansoori',
    title: 'Consultant Interventional Cardiologist',
    specialty: 'Cardiology',
    branchId: 'br-al-safa-hospital',
    branchName: 'Al Safa - Medcare Hospital',
    qualifications: 'MD, FRCP (UK), FACC (USA), Board Certified in Cardiology',
    experienceYears: 18,
    languages: ['English', 'Arabic', 'French'],
    consultationFee: 450,
    rating: 4.96,
    reviewsCount: 340,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'Specialist in complex coronary interventions, heart failure management, preventative cardiology, and advanced echocardiography.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Philippe Laurent',
    title: 'Consultant Orthopaedic & Spine Surgeon',
    specialty: 'Orthopaedics',
    branchId: 'br-ortho-spine',
    branchName: 'Medcare Orthopaedics & Spine Hospital',
    qualifications: 'MD, French Board of Orthopaedic Surgery, Fellowship in Spine Surgery (Bordeaux)',
    experienceYears: 22,
    languages: ['English', 'French'],
    consultationFee: 550,
    rating: 4.98,
    reviewsCount: 420,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'World-renowned expert in minimally invasive endoscopic spine surgery, scoliosis correction, and robotic-assisted joint replacements.',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['08:30 AM', '11:00 AM', '01:30 PM', '03:30 PM'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Ayesha Siddiqui',
    title: 'Specialist Paediatrician & Neonatologist',
    specialty: 'Paediatrics',
    branchId: 'br-jbr-clinic',
    branchName: 'JBR - Medcare Medical Centre',
    qualifications: 'MBBS, MRCPCH (London), Fellowship in Paediatric Critical Care',
    experienceYears: 14,
    languages: ['English', 'Urdu', 'Hindi', 'Arabic'],
    consultationFee: 350,
    rating: 4.92,
    reviewsCount: 290,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'Dedicated paediatrician with a gentle bedside manner, focusing on infant development, allergy treatments, vaccinations, and adolescent health.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['09:30 AM', '11:30 AM', '03:00 PM', '05:00 PM', '07:00 PM'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Elena Rostova',
    title: 'Specialist Dermatologist & Aesthetic Laser Consultant',
    specialty: 'Dermatology',
    branchId: 'br-jumeirah-clinic',
    branchName: 'Jumeirah - Medcare Medical Centre',
    qualifications: 'MD, European Board of Dermatology and Venereology (EBDV)',
    experienceYears: 12,
    languages: ['English', 'Russian'],
    consultationFee: 400,
    rating: 4.88,
    reviewsCount: 215,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'Specializes in medical dermatology, psoriasis management, skin cancer screening, laser resurfacing, and regenerative skin therapies.',
    availableDays: ['Sun', 'Tue', 'Wed', 'Thu', 'Sat'],
    timeSlots: ['10:00 AM', '12:00 PM', '02:30 PM', '04:00 PM', '06:30 PM'],
  },
  {
    id: 'doc-5',
    name: 'Dr. Tariq Rahman',
    title: 'Consultant Neurologist',
    specialty: 'Neurology',
    branchId: 'br-al-safa-hospital',
    branchName: 'Al Safa - Medcare Hospital',
    qualifications: 'FRCP (Glasgow), CCT Neurology (UK), American Academy of Neurology Fellow',
    experienceYears: 16,
    languages: ['English', 'Arabic', 'Hindi'],
    consultationFee: 500,
    rating: 4.94,
    reviewsCount: 180,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'Comprehensive neurological evaluations for headaches/migraines, epilepsy, stroke rehabilitation, Parkinson’s disease, and neuropathies.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
  },
  {
    id: 'doc-6',
    name: 'Dr. Mariam Al Zaabi',
    title: 'Consultant Obstetrician & Gynaecologist',
    specialty: 'Obstetrics & Gynaecology',
    branchId: 'br-sharjah-hospital',
    branchName: 'Sharjah - Medcare Hospital',
    qualifications: 'MRCOG (UK), Fellowship in Advanced Laparoscopic Surgery',
    experienceYears: 20,
    languages: ['English', 'Arabic'],
    consultationFee: 420,
    rating: 4.97,
    reviewsCount: 510,
    image: '/src/assets/images/doctor_consultation_suite_1791968681811.jpg',
    about: 'High-risk pregnancy management, painless childbirth, minimally invasive pelvic surgeries, and comprehensive women wellness screening.',
    availableDays: ['Sun', 'Mon', 'Wed', 'Thu', 'Sat'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:30 PM'],
  },
];

export const INITIAL_SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Comprehensive cardiovascular care from diagnostic angiography to non-invasive heart wellness and cardiac rehabilitation.',
    doctorCount: 14,
    commonTreatments: ['Echocardiogram', 'Coronary Angiogram', 'Holter Monitoring', 'Cardiac Stress Test'],
    icon: 'HeartPulse',
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Spine',
    description: 'Pioneering surgical and non-surgical treatments for bone, joint, ligament injuries and spine disorders.',
    doctorCount: 18,
    commonTreatments: ['Joint Replacement', 'Arthroscopy', 'Spine Fusion', 'Sports Injury Rehab'],
    icon: 'Activity',
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Neonatology',
    description: 'Specialized healthcare for infants, children, and teenagers delivered in a warm, child-friendly environment.',
    doctorCount: 16,
    commonTreatments: ['Newborn Screening', 'Vaccination', 'Asthma Clinic', 'Developmental Milestone Check'],
    icon: 'Baby',
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    description: 'Advanced clinical dermatology and aesthetic skin treatments utilizing modern laser and regenerative technologies.',
    doctorCount: 10,
    commonTreatments: ['Acne Protocol', 'Eczema Therapy', 'Mole Mapping', 'Laser Skin Resurfacing'],
    icon: 'Sparkles',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Advanced diagnosis and therapies for brain, spine, and nerve disorders with specialized neuro-diagnostic suites.',
    doctorCount: 8,
    commonTreatments: ['EEG / EMG', 'Migraine Care', 'Stroke Management', 'Memory Clinic'],
    icon: 'Brain',
  },
  {
    id: 'obgyn',
    name: 'Obstetrics & Gynaecology',
    description: 'Complete maternal and women’s health services with dedicated maternity suites and advanced gynecological surgery.',
    doctorCount: 12,
    commonTreatments: ['Prenatal Ultrasound', 'Normal & C-Section Delivery', 'Hormonal Wellness', 'Cervical Screening'],
    icon: 'Users',
  },
];

export const INITIAL_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-executive-health',
    name: 'Comprehensive Executive Health Screening',
    category: 'Full Body Assessment',
    targetGroup: 'Men & Women (Age 30+)',
    originalPrice: 1850,
    discountedPrice: 1199,
    currency: 'AED',
    testsCount: 42,
    includedItems: [
      'Complete Blood Count (CBC) & ESR',
      'Comprehensive Lipid Profile (Cholesterol & Triglycerides)',
      'Liver & Kidney Function Tests',
      'HbA1c & Fasting Blood Sugar',
      'ECG & Echocardiogram (Resting)',
      'Chest X-Ray & Abdominal Ultrasound',
      'Vitamin D & Vitamin B12 Levels',
      'Consultation with Internal Medicine Specialist',
    ],
    recommendedFrequency: 'Annually',
  },
  {
    id: 'pkg-cardiac-check',
    name: 'Advanced Cardiac Wellness Screen',
    category: 'Heart Health',
    targetGroup: 'Adults with lifestyle risk or family history',
    originalPrice: 1400,
    discountedPrice: 899,
    currency: 'AED',
    testsCount: 18,
    includedItems: [
      'Cardiologist Physical Consultation',
      'Resting 12-Lead ECG',
      'Treadmill Exercise Stress Test (TMT)',
      'Echocardiography (2D Echo with Doppler)',
      'High-Sensitivity Troponin & Lipid Panel',
      'Electrolytes & Renal Function Panel',
    ],
    recommendedFrequency: 'Every 1-2 Years',
  },
  {
    id: 'pkg-women-wellness',
    name: 'Women’s Essential Wellness & Hormone Care',
    category: 'Women Health',
    targetGroup: 'Women of all age groups',
    originalPrice: 1300,
    discountedPrice: 799,
    currency: 'AED',
    testsCount: 24,
    includedItems: [
      'Senior Gynaecologist Consultation',
      'Pelvic & Transvaginal Ultrasound',
      'Pap Smear Screening',
      'Thyroid Profile (TSH, Free T3, Free T4)',
      'Iron Profile, Ferritin & Haemoglobin',
      'Bone Density Scan (DEXA) for Bone Health',
    ],
    recommendedFrequency: 'Annual',
  },
  {
    id: 'pkg-ortho-spine-eval',
    name: 'Spine & Joint Mobility Evaluation',
    category: 'Bone & Joints',
    targetGroup: 'Individuals with back pain, joint stiffness or athletes',
    originalPrice: 950,
    discountedPrice: 599,
    currency: 'AED',
    testsCount: 10,
    includedItems: [
      'Orthopaedic / Spine Specialist Assessment',
      'Digital Spine / Joint X-Ray (2 Views)',
      'Physical Therapy & Postural Screening',
      'Serum Calcium, Uric Acid & Vitamin D3',
      'Personalized Ergonomics & Physio Plan',
    ],
    recommendedFrequency: 'As Recommended',
  },
];
