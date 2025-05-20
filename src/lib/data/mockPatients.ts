
import { Patient } from "../models/types";

// Mock patient data for development and testing
export const mockPatients: Patient[] = [
  {
    id: "pat001",
    name: "John Smith",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    bloodType: "O+",
    height: 180,
    weight: 75,
    contactPhone: "(555) 123-4567",
    contactEmail: "john.smith@example.com",
    address: "123 Main St, Anytown, CA 12345",
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC12345678",
    emergencyContact: "Mary Smith (555) 987-6543",
    medicalRecords: [
      {
        id: "mr001",
        date: "2023-05-10",
        description: "Annual checkup",
        treatment: "Routine examination",
        medication: "Prescription for hypertension medication",
        physician: "Dr. Wilson",
        followUp: "Next year"
      },
      {
        id: "mr002",
        date: "2022-11-15",
        description: "Flu symptoms",
        treatment: "Rest and fluids",
        medication: "Acetaminophen as needed",
        physician: "Dr. Martinez"
      }
    ],
    vaccineRecords: [
      {
        id: "vr001",
        date: "2023-01-10",
        vaccineName: "Influenza",
        manufacturer: "FluVax",
        lotNumber: "FV456789",
        expirationDate: "2024-01-10",
        administeredBy: "Nurse Johnson",
        nextDueDate: "2024-01-10"
      },
      {
        id: "vr002",
        date: "2020-05-15",
        vaccineName: "Tetanus",
        manufacturer: "ImmunePharma",
        lotNumber: "TP123456",
        expirationDate: "2030-05-15",
        administeredBy: "Dr. Wilson",
        nextDueDate: "2030-05-15"
      }
    ],
    notes: [
      {
        id: "n001",
        date: "2023-05-10",
        title: "Patient demeanor",
        content: "Patient was cooperative during examination. Expressed concerns about work-related stress.",
        createdBy: "Dr. Wilson",
        isPrivate: false
      },
      {
        id: "n002",
        date: "2023-05-10",
        title: "Family history note",
        content: "Patient mentioned family history of diabetes. Monitor glucose levels on next visit.",
        createdBy: "Dr. Wilson",
        isPrivate: true
      }
    ],
    qrCode: "pat001",
    profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "pat002",
    name: "Sarah Johnson",
    dateOfBirth: "1990-03-22",
    gender: "Female",
    bloodType: "A+",
    height: 165,
    weight: 58,
    contactPhone: "(555) 234-5678",
    contactEmail: "sarah.j@example.com",
    address: "456 Elm St, Anytown, CA 12345",
    insuranceProvider: "Aetna",
    insuranceNumber: "AT98765432",
    emergencyContact: "Robert Johnson (555) 876-5432",
    medicalRecords: [
      {
        id: "mr003",
        date: "2023-04-22",
        description: "Prenatal visit",
        treatment: "Routine examination and ultrasound",
        medication: "Prenatal vitamins",
        physician: "Dr. Garcia"
      }
    ],
    vaccineRecords: [
      {
        id: "vr003",
        date: "2022-11-05",
        vaccineName: "Influenza",
        manufacturer: "FluVax",
        lotNumber: "FV789012",
        expirationDate: "2023-11-05",
        administeredBy: "Nurse Smith",
        nextDueDate: "2023-11-05"
      }
    ],
    notes: [
      {
        id: "n003",
        date: "2023-04-22",
        title: "First pregnancy",
        content: "Patient is in first trimester. Experiencing normal morning sickness. Advised on diet and exercise.",
        createdBy: "Dr. Garcia",
        isPrivate: false
      }
    ],
    qrCode: "pat002",
    profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  }
];
