import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatsCard from "@/components/StatsCard";
import PrescriptionList, { type Prescription } from "@/components/PrescriptionList";
import RecordFilter from "@/components/RecordFilter";
import DownloadButton from "@/components/DownloadButton";
import ShareConsentModal, { type Consent } from "@/components/ShareConsentModal";
import { Pill, FileText, User, Shield, Download, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function PatientDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("prescriptions");

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
      prescribedBy: "Johnson",
      prescribedDate: "2024-01-20",
      instructions: "Take in the morning. Monitor blood pressure regularly.",
      status: "pending"
    },
    {
      id: "RX-003",
      medicationName: "Metformin",
      dosage: "850mg",
      frequency: "Twice daily",
      prescribedBy: "Williams",
      prescribedDate: "2023-12-10",
      instructions: "Take with meals to reduce stomach upset.",
      status: "dispensed"
    }
  ];

  const mockConsents: Consent[] = [
    {
      id: "C-001",
      providerName: "Dr. Smith",
      providerType: "doctor",
      grantedDate: "2024-01-15",
      expiresDate: "2024-02-14",
      status: "active"
    },
    {
      id: "C-002",
      providerName: "HealthPlus Pharmacy",
      providerType: "pharmacy",
      grantedDate: "2024-01-10",
      expiresDate: "2024-04-10",
      status: "active"
    }
  ];

  const mockReports = [
    { id: "R-001", type: "Blood Test", date: "2024-01-18", status: "Complete" },
    { id: "R-002", type: "X-Ray", date: "2024-01-12", status: "Complete" },
    { id: "R-003", type: "MRI Scan", date: "2023-12-28", status: "Complete" }
  ];

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
              <p className="text-xs text-muted-foreground">Patient Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground font-mono">PAT-2024-001</p>
              </div>
              <Avatar>
                <AvatarFallback>SJ</AvatarFallback>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Prescriptions"
            value={mockPrescriptions.length}
            icon={Pill}
            description={`${mockPrescriptions.filter(p => p.status === "pending").length} pending`}
          />
          <StatsCard
            title="Medical Reports"
            value={mockReports.length}
            icon={FileText}
            description="All completed"
          />
          <StatsCard
            title="Active Consents"
            value={mockConsents.filter(c => c.status === "active").length}
            icon={Shield}
            description="Access granted"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="prescriptions" data-testid="tab-prescriptions">
              <Pill className="h-4 w-4 mr-2" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="reports" data-testid="tab-reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="consents" data-testid="tab-consents">
              <Shield className="h-4 w-4 mr-2" />
              Consents
            </TabsTrigger>
            <TabsTrigger value="downloads" data-testid="tab-downloads">
              <Download className="h-4 w-4 mr-2" />
              Downloads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <RecordFilter onFilterChange={(filters) => console.log('Filters:', filters)} />
            </div>
            <PrescriptionList prescriptions={mockPrescriptions} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <RecordFilter onFilterChange={(filters) => console.log('Filters:', filters)} />
            <div className="space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id} className="hover-elevate" data-testid={`card-report-${report.id}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{report.type}</h3>
                        <p className="text-sm text-muted-foreground font-mono">{report.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`button-view-${report.id}`}>
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Patient ID</p>
                    <p className="font-medium font-mono">PAT-2024-001</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">March 15, 1985</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium">O+</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">sarah.johnson@email.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consents" className="space-y-6">
            <div className="flex justify-end">
              <ShareConsentModal
                consents={mockConsents}
                onGrant={(type, duration) => console.log('Grant:', type, duration)}
                onRevoke={(id) => console.log('Revoke:', id)}
              />
            </div>
            <div className="space-y-4">
              {mockConsents.map((consent) => (
                <Card key={consent.id} data-testid={`card-consent-${consent.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{consent.providerName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {consent.providerType} • Expires: {consent.expiresDate}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        consent.status === "active" 
                          ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {consent.status}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle>Download Your Records</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Export your complete health records including prescriptions, reports, and medical history.
                </p>
                <div className="flex justify-center">
                  <DownloadButton onDownload={(format) => console.log('Download:', format)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
