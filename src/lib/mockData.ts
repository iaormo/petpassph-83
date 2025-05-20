
// This file is now just re-exporting from the organized files
// to maintain backward compatibility with existing imports

export * from './models/types';
export * from './data/mockPets';
export * from './data/mockPatients';
export * from './data/mockAuth';
export * from './data/mockDashboard';

// Re-export utility functions with explicit names to avoid ambiguity
import * as petUtils from './utils/petUtils';
import * as patientUtils from './utils/patientUtils';

// Pet utils
export const addPetMedicalRecord = petUtils.addMedicalRecord;
export const addPetVaccineRecord = petUtils.addVaccineRecord;
export const addPetNote = petUtils.addNote;
export const generatePetQRCode = petUtils.generateQRCode;
export const getPetById = petUtils.getPetById;
export const getPetByQRCode = petUtils.getPetByQRCode;
export const updatePet = petUtils.updatePet;
export const addPet = petUtils.addPet;

// Patient utils
export const addPatientMedicalRecord = patientUtils.addMedicalRecord;
export const addPatientVaccineRecord = patientUtils.addVaccineRecord;
export const addPatientNote = patientUtils.addNote;
export const generatePatientQRCode = patientUtils.generateQRCode;
export const getPatientById = patientUtils.getPatientById;
export const getPatientByQRCode = patientUtils.getPatientByQRCode;
export const updatePatient = patientUtils.updatePatient;
export const addPatient = patientUtils.addPatient;
export const getPatientsByUser = patientUtils.getPatientsByUser;
export const hasAccessToPatient = patientUtils.hasAccessToPatient;
