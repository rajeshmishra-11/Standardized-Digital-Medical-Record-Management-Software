import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import PrescriptionList, { type Prescription } from "@/components/PrescriptionList";
import { Shield, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function PharmacyDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchedPatientId, setSearchedPatientId] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
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
    },
    {
      id: "RX-003",
      medicationName: "Metformin",
      dosage: "850mg",
      frequency: "Twice daily",
      prescribedBy: "Johnson",
      prescribedDate: "2024-01-22",
      instructions: "Take with meals.",
      status: "pending"
    }
  ]);

  // Use the searched patient ID to display patient data
  const mockPatient = searchedPatientId ? {
    patientId: searchedPatientId,
    name: "Sarah Johnson",
    dateOfBirth: "1985-03-15",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    status: "active" as const
  } : {
    patientId: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    status: "active" as const
  };

  const hasSearched = searchedPatientId.length > 0;

  const handleDispense = (id: string) => {
    setPrescriptions(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: "dispensed" as const } : p
      )
    );
    toast({
      title: "Prescription Dispensed",
      description: `Prescription ${id} has been marked as dispensed.`,
    });
  };

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
              <p className="text-xs text-muted-foreground">Pharmacy Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">HealthPlus Pharmacy</p>
                <p className="text-xs text-muted-foreground">License: PH-67890</p>
              </div>
              <Avatar>
                <AvatarFallback>HP</AvatarFallback>
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
        <div className="max-w-2xl">
          <SearchBar
            placeholder="Search by Patient ID..."
            onSearch={setSearchedPatientId}
          />
        </div>

        {hasSearched ? (
          <div className="space-y-6">
            <PatientSummaryCard {...mockPatient} />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Prescriptions to Verify</h2>
              <PrescriptionList
                prescriptions={prescriptions}
                showActions={true}
                onDispense={handleDispense}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Search for a Patient</h2>
            <p className="text-muted-foreground">
              Enter a Patient ID to view and verify their prescriptions
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
