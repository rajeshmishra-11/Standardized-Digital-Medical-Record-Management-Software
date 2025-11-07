import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import PrescriptionList, { type Prescription } from "@/components/PrescriptionList";
import PrescriptionForm from "@/components/PrescriptionForm";
import { Shield, LogOut, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function DoctorDashboard() {
  const [, setLocation] = useLocation();
  const [searchedPatientId, setSearchedPatientId] = useState("");
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const mockPatient = {
    patientId: "PAT-2024-001",
    name: "Sarah Johnson",
    dateOfBirth: "1985-03-15",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    status: "active" as const
  };

  const mockPrescriptions: Prescription[] = [
    {
      id: "RX-001",
      medicationName: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      prescribedBy: "Smith",
      prescribedDate: "2024-01-15",
      instructions: "Take with food. Complete full course even if symptoms improve.",
      status: "dispensed"
    },
    {
      id: "RX-002",
      medicationName: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Smith",
      prescribedDate: "2024-01-20",
      instructions: "Take in the morning. Monitor blood pressure regularly.",
      status: "pending"
    }
  ];

  const hasSearched = searchedPatientId.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">DigiHealth</h1>
              <p className="text-xs text-muted-foreground">Doctor Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">Dr. Michael Smith</p>
                <p className="text-xs text-muted-foreground">Medical License: MD-12345</p>
              </div>
              <Avatar>
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <SearchBar
              placeholder="Search by Patient ID..."
              onSearch={setSearchedPatientId}
            />
          </div>
          <Button
            onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}
            className="gap-2"
            data-testid="button-toggle-form"
          >
            <Plus className="h-4 w-4" />
            {showPrescriptionForm ? "Hide Form" : "New Prescription"}
          </Button>
        </div>

        {showPrescriptionForm && (
          <div className="max-w-2xl">
            <PrescriptionForm
              patientId={searchedPatientId}
              onSubmit={(data) => {
                console.log('Prescription submitted:', data);
                setShowPrescriptionForm(false);
              }}
            />
          </div>
        )}

        {hasSearched ? (
          <div className="space-y-6">
            <PatientSummaryCard {...mockPatient} />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Patient Prescriptions</h2>
              <PrescriptionList prescriptions={mockPrescriptions} />
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Search for a Patient</h2>
            <p className="text-muted-foreground">
              Enter a Patient ID to view their records and manage prescriptions
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
