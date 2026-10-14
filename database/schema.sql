-- ========================================================
-- MEDCARE HOSPITALS & MEDICAL CENTRES DATABASE SCHEMA
-- Compatible with: PostgreSQL, MySQL, and SQLite
-- ========================================================

-- 1. Branches Table (Hospitals, Clinics, Specialty Centres)
CREATE TABLE IF NOT EXISTS branches (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(32) NOT NULL CHECK (category IN ('HOSPITAL', 'CLINIC', 'SPECIALTY_CENTRE')),
  city VARCHAR(100) NOT NULL,
  area VARCHAR(150) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  emergency_phone VARCHAR(50),
  timing VARCHAR(150) NOT NULL,
  has_emergency_24x7 BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  google_map_url TEXT,
  departments TEXT[], -- Or JSON array in MySQL / TEXT in SQLite
  bed_capacity INTEGER DEFAULT 0,
  featured_doctors_count INTEGER DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 4.8,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Specialties Table
CREATE TABLE IF NOT EXISTS specialties (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  doctor_count INTEGER DEFAULT 0,
  icon VARCHAR(64),
  common_treatments TEXT[]
);

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  branch_id VARCHAR(64) REFERENCES branches(id) ON DELETE SET NULL,
  qualifications TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  languages TEXT[], -- English, Arabic, French, etc.
  consultation_fee NUMERIC(8, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 0,
  image_url TEXT,
  about TEXT,
  available_days TEXT[],
  time_slots TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Health Packages Table
CREATE TABLE IF NOT EXISTS health_packages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  target_group VARCHAR(150),
  original_price NUMERIC(8, 2) NOT NULL,
  discounted_price NUMERIC(8, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'AED',
  tests_count INTEGER NOT NULL,
  included_items TEXT[],
  recommended_frequency VARCHAR(100)
);

-- 5. Appointments Table (Patient Bookings)
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(64) PRIMARY KEY,
  booking_ref VARCHAR(32) UNIQUE NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  patient_email VARCHAR(255),
  patient_phone VARCHAR(50) NOT NULL,
  patient_age INTEGER,
  gender VARCHAR(20) CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  doctor_id VARCHAR(64) REFERENCES doctors(id) ON DELETE CASCADE,
  doctor_name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  branch_id VARCHAR(64) REFERENCES branches(id) ON DELETE CASCADE,
  branch_name VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  consultation_type VARCHAR(30) DEFAULT 'IN_PERSON' CHECK (consultation_type IN ('IN_PERSON', 'TELECONSULTATION')),
  status VARCHAR(30) DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'COMPLETED', 'CANCELLED')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Patient Inquiries & Callbacks
CREATE TABLE IF NOT EXISTS patient_inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  preferred_branch VARCHAR(100),
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RESOLVED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_branch ON doctors(branch_id);
CREATE INDEX IF NOT EXISTS idx_appointments_ref ON appointments(booking_ref);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
