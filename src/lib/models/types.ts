
// Type definitions for the application

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  bloodType?: string;
  height?: number; // in cm
  weight: number; // in kg
  contactPhone: string;
  contactEmail?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  emergencyContact?: string;
  medicalRecords: MedicalRecord[];
  vaccineRecords: VaccineRecord[];
  notes: Note[];
  qrCode: string;
  profileImg: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  description: string;
  treatment: string;
  medication: string;
  physician: string;
  followUp?: string;
  imageUrl?: string; // URL for uploaded images (X-rays, etc.)
}

export interface VaccineRecord {
  id: string;
  date: string;
  vaccineName: string;
  manufacturer: string;
  lotNumber: string;
  expirationDate: string;
  administeredBy: string;
  nextDueDate: string;
}

export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  createdBy: string;
  isPrivate: boolean; // If true, only visible to medical staff
}

// Mock credentials for demo purposes
export interface Credentials {
  username: string;
  password: string;
  role: "physician" | "nurse" | "admin" | "patient" | "owner";
  petsOwned?: string[]; // For backward compatibility, will be patientIds for patient role
}

// Dashboard statistics interface
export interface DashboardStatistics {
  appointmentsToday: number;
  newPatientsThisWeek: number;
  pendingForms: number;
  totalPatients: number;
  recentActivityLog: ActivityLogItem[];
}

export interface ActivityLogItem {
  id: string;
  time: string;
  action: string;
}

// For Go High Level integration
export interface GHLConfig {
  apiKey: string;
  locationId: string;
}
