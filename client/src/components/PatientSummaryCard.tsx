import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Phone, Mail } from "lucide-react";

interface PatientSummaryCardProps {
  patientId: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  avatarUrl?: string;
}

export default function PatientSummaryCard({
  patientId,
  name,
  dateOfBirth,
  phone,
  email,
  status,
  avatarUrl
}: PatientSummaryCardProps) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card data-testid={`card-patient-${patientId}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Patient Information</CardTitle>
        <Badge 
          variant={status === "active" ? "default" : "secondary"}
          data-testid={`badge-status-${status}`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-semibold" data-testid="text-patient-name">{name}</h3>
              <p className="text-sm font-mono text-muted-foreground" data-testid="text-patient-id">
                ID: {patientId}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">DOB:</span>
                <span data-testid="text-dob">{dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-phone">{phone}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-email">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
