import { type User, type InsertUser, type Patient, type InsertPatient } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPatientById(patientId: string): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private patients: Map<string, Patient>;

  constructor() {
    this.users = new Map();
    this.patients = new Map();
    this.seedPatients();
  }

  private seedPatients() {
    // Add some mock patients for testing
    const mockPatients: Patient[] = [
      {
        patientId: "PT-IND-12345678",
        name: "Sarah Johnson",
        dateOfBirth: "1985-03-15",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@email.com",
        status: "active"
      },
      {
        patientId: "PT-IND-87654321",
        name: "Michael Chen",
        dateOfBirth: "1990-07-22",
        phone: "+1 (555) 987-6543",
        email: "michael.chen@email.com",
        status: "active"
      },
      {
        patientId: "PT-IND-11223344",
        name: "Emily Rodriguez",
        dateOfBirth: "1978-12-05",
        phone: "+1 (555) 222-3344",
        email: "emily.rodriguez@email.com",
        status: "active"
      }
    ];

    mockPatients.forEach(patient => {
      this.patients.set(patient.patientId, patient);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPatientById(patientId: string): Promise<Patient | undefined> {
    return this.patients.get(patientId);
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const patient: Patient = { 
      ...insertPatient,
      status: insertPatient.status || "active"
    };
    this.patients.set(patient.patientId, patient);
    return patient;
  }
}

export const storage = new MemStorage();
