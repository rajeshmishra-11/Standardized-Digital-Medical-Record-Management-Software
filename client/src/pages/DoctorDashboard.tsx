import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SearchBar from "@/components/SearchBar";
import PatientSummaryCard from "@/components/PatientSummaryCard";
import PrescriptionList, { type Prescription } from "@/components/PrescriptionList";
import PrescriptionForm from "@/components/PrescriptionForm";
import ReportCard, { type MedicalReport } from "@/components/ReportCard";
import ReportDetailModal from "@/components/ReportDetailModal";
import { Shield, LogOut, Plus, Pill, FileText, AlertCircle } from "lucide-react";
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

export default function DoctorDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchedPatientId, setSearchedPatientId] = useState("");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [searchError, setSearchError] = useState<string>("");
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
    },
    {
      id: "RX-003",
      medicationName: "Metformin",
      dosage: "850mg",
      frequency: "Twice daily",
      prescribedBy: "Johnson",
      prescribedDate: "2023-12-10",
      instructions: "Take with meals to reduce stomach upset.",
      status: "dispensed"
    }
  ];

  const mockMedicalReports: MedicalReport[] = [
    {
      id: "R-001",
      type: "Blood Test - Complete Panel",
      date: "2024-01-18",
      status: "complete",
      performedBy: "Lab Corp",
      notes: "All values within normal range. Cholesterol slightly elevated (210 mg/dL)."
    },
    {
      id: "R-002",
      type: "Chest X-Ray",
      date: "2024-01-12",
      status: "reviewed",
      performedBy: "Radiology Center",
      notes: "No abnormalities detected. Lungs clear, heart size normal."
    },
    {
      id: "R-003",
      type: "MRI Scan - Lower Back",
      date: "2023-12-28",
      status: "complete",
      performedBy: "Imaging Associates",
      notes: "Mild disc bulge at L4-L5. No significant nerve compression."
    },
    {
      id: "R-004",
      type: "ECG (Electrocardiogram)",
      date: "2023-12-15",
      status: "complete",
      performedBy: "Cardiology Dept",
      notes: "Normal sinus rhythm. No arrhythmias detected."
    },
    {
      id: "R-005",
      type: "Urinalysis",
      date: "2023-11-22",
      status: "complete",
      performedBy: "Lab Corp",
      notes: "Normal findings. No signs of infection or abnormalities."
    }
  ];

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

  const handleViewReport = (reportId: string) => {
    const report = mockMedicalReports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setIsReportModalOpen(true);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId);
    toast({
      title: "Download Started",
      description: `Downloading report ${reportId} as PDF...`,
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
          <div className="flex-1 max-w-2xl space-y-4">
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

        {patientFound && patientData ? (
          <div className="space-y-6">
            <PatientSummaryCard {...patientData} />
            
            <Tabs defaultValue="prescriptions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="prescriptions" data-testid="tab-prescriptions">
                  <Pill className="h-4 w-4 mr-2" />
                  Prescriptions ({mockPrescriptions.length})
                </TabsTrigger>
                <TabsTrigger value="reports" data-testid="tab-reports">
                  <FileText className="h-4 w-4 mr-2" />
                  Medical Reports ({mockMedicalReports.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prescriptions" className="space-y-4">
                <h2 className="text-2xl font-semibold">Prescription History</h2>
                <PrescriptionList prescriptions={mockPrescriptions} />
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Medical Reports & Health Records</h2>
                  <p className="text-sm text-muted-foreground">
                    {mockMedicalReports.length} reports available
                  </p>
                </div>
                <div className="space-y-4">
                  {mockMedicalReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onView={handleViewReport}
                      onDownload={handleDownloadReport}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : !hasSearched ? (
          <div className="text-center py-20">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Search for a Patient</h2>
            <p className="text-muted-foreground">
              Enter a Patient ID (format: PT-IND-XXXXXXXX) to view records and manage prescriptions
            </p>
          </div>
        ) : null}
      </main>

      <ReportDetailModal
        report={selectedReport}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onDownload={handleDownloadReport}
      />
    </div>
  );
}
