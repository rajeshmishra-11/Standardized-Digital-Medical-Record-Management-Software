import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SearchBar from "@/components/SearchBar";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import PrescriptionList, { type Prescription } from "@/components/PrescriptionList";
import { Shield, LogOut, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface PatientData {
  patientId: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
}

export default function PharmacyDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchedPatientId, setSearchedPatientId] = useState("");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [searchError, setSearchError] = useState<string>("");
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

  const hasSearched = searchedPatientId.length > 0;
  const patientFound = patientData !== null && !searchError;

  const handlePatientSearch = async (patientId: string) => {
    setSearchedPatientId(patientId);
    setSearchError("");
    setPatientData(null);

    if (!patientId.trim()) {
      return;
    }

    // Validate patient ID format: PT-IND-\d{8}
    const patientIdRegex = /^PT-IND-\d{8}$/;
    if (!patientIdRegex.test(patientId)) {
      setSearchError("No result found");
      return;
    }

    try {
      const response = await fetch(`/api/patients/${patientId}`);
      
      if (response.status === 404) {
        setSearchError("No result found");
        return;
      }

      if (!response.ok) {
        setSearchError("No result found");
        return;
      }

      const data = await response.json();
      setPatientData(data);
    } catch (error) {
      console.error("Error searching patient:", error);
      setSearchError("No result found");
    }
  };

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
        <div className="max-w-2xl space-y-4">
          <SearchBar
            placeholder="Search by Patient ID (e.g., PT-IND-12345678)..."
            onSearch={handlePatientSearch}
          />
          {searchError && hasSearched && (
            <Alert variant="destructive" data-testid="alert-no-result">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
        </div>

        {patientFound && patientData ? (
          <div className="space-y-6">
            <PatientSummaryCard {...patientData} />
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Prescriptions to Verify</h2>
              <PrescriptionList
                prescriptions={prescriptions}
                showActions={true}
                onDispense={handleDispense}
              />
            </div>
          </div>
        ) : !hasSearched ? (
          <div className="text-center py-20">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Search for a Patient</h2>
            <p className="text-muted-foreground">
              Enter a Patient ID (format: PT-IND-XXXXXXXX) to view and verify prescriptions
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
