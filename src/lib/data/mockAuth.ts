
import { Credentials } from "../models/types";

// Hardcoded credentials for demo purposes only
export const mockCredentials: Credentials[] = [
  {
    username: "doctor@mediq.com",
    password: "password123",
    role: "physician", // Changed from "veterinary" to "physician"
  },
  {
    username: "patient@example.com",
    password: "patient123",
    role: "patient",
    petsOwned: ["p001", "p004"] // These will be patient IDs
  },
  {
    username: "nurse@mediq.com",
    password: "nurse123",
    role: "nurse",
  },
  {
    username: "admin@mediq.com",
    password: "admin123",
    role: "admin",
  }
];
