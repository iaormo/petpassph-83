
import { mockPatients } from "../data/mockPatients";
import { Patient, MedicalRecord, VaccineRecord, Note } from "../models/types";

// Helper function to find a patient by ID
export const getPatientById = (id: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === id);
};

// Helper function to find a patient by QR code
export const getPatientByQRCode = (qrCode: string): Patient | undefined => {
  return mockPatients.find(patient => patient.qrCode === qrCode);
};

// Helper function to update a patient
export const updatePatient = (updatedPatient: Patient): boolean => {
  const index = mockPatients.findIndex(patient => patient.id === updatedPatient.id);
  if (index !== -1) {
    mockPatients[index] = updatedPatient;
    return true;
  }
  return false;
};

// Helper function to add a medical record to a patient
export const addMedicalRecord = (patientId: string, record: MedicalRecord): boolean => {
  const patient = getPatientById(patientId);
  if (patient) {
    patient.medicalRecords.unshift(record); // Add to the beginning of the array
    return true;
  }
  return false;
};

// Helper function to add a vaccine record to a patient
export const addVaccineRecord = (patientId: string, record: VaccineRecord): boolean => {
  const patient = getPatientById(patientId);
  if (patient) {
    patient.vaccineRecords.unshift(record); // Add to the beginning of the array
    return true;
  }
  return false;
};

// Helper function to add a note to a patient
export const addNote = (patientId: string, note: Note): boolean => {
  const patient = getPatientById(patientId);
  if (patient) {
    patient.notes.unshift(note); // Add to the beginning of the array
    return true;
  }
  return false;
};

// Helper function to add a new patient
export const addPatient = (newPatient: Patient): Patient => {
  // Generate a new ID if one is not provided
  if (!newPatient.id) {
    newPatient.id = `pat${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
  }
  
  // Generate a QR code if one is not provided
  if (!newPatient.qrCode) {
    newPatient.qrCode = generateQRCode();
  }

  // Initialize empty arrays for records if not provided
  if (!newPatient.medicalRecords) newPatient.medicalRecords = [];
  if (!newPatient.vaccineRecords) newPatient.vaccineRecords = [];
  if (!newPatient.notes) newPatient.notes = [];
  
  // Add the patient to the mockPatients array
  mockPatients.unshift(newPatient); // Add to the beginning of the array
  return newPatient;
};

// Helper function to generate a unique QR code
export const generateQRCode = (): string => {
  return `pat${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
};

// Helper function to get patients by user
export const getPatientsByUser = (userIds: string[]): Patient[] => {
  return mockPatients.filter(patient => userIds.includes(patient.id));
};

// Helper function to check if a user has access to a specific patient
export const hasAccessToPatient = (username: string, patientId: string): boolean => {
  // Import locally to avoid circular dependencies
  const { mockCredentials } = require("../data/mockAuth");
  
  const user = mockCredentials.find(cred => cred.username === username);
  
  if (!user) return false;
  
  // Medical staff has access to all patients
  if (user.role === "physician" || user.role === "nurse" || user.role === "admin") return true;
  
  // Patients only have access to their own records
  return user.petsOwned ? user.petsOwned.includes(patientId) : false;
};
