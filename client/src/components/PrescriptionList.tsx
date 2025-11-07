import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, ChevronDown, ChevronUp, User } from "lucide-react";
import { useState } from "react";

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: string;
  instructions?: string;
  status: "pending" | "dispensed" | "expired";
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
  showActions?: boolean;
  onDispense?: (id: string) => void;
}

export default function PrescriptionList({ 
  prescriptions, 
  showActions = false,
  onDispense 
}: PrescriptionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusVariant = (status: Prescription["status"]) => {
    switch (status) {
      case "dispensed":
        return "default";
      case "pending":
        return "secondary";
      case "expired":
        return "destructive";
    }
  };

  const getStatusColor = (status: Prescription["status"]) => {
    switch (status) {
      case "dispensed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "expired":
        return "bg-red-500";
    }
  };

  if (prescriptions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No prescriptions found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {prescriptions.map((prescription, index) => {
        const isExpanded = expandedId === prescription.id;
        return (
          <Card 
            key={prescription.id} 
            className="hover-elevate"
            data-testid={`card-prescription-${prescription.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Pill className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold truncate" data-testid={`text-medication-${prescription.id}`}>
                      {prescription.medicationName}
                    </h3>
                    <Badge 
                      variant={getStatusVariant(prescription.status)}
                      className="flex items-center gap-1.5 flex-shrink-0"
                      data-testid={`badge-status-${prescription.id}`}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(prescription.status)}`} />
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Dosage: </span>
                      <span className="font-medium" data-testid={`text-dosage-${prescription.id}`}>
                        {prescription.dosage}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency: </span>
                      <span className="font-medium" data-testid={`text-frequency-${prescription.id}`}>
                        {prescription.frequency}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span>Dr. {prescription.prescribedBy}</span>
                    <span>•</span>
                    <span className="font-mono text-xs" data-testid={`text-date-${prescription.id}`}>
                      {prescription.prescribedDate}
                    </span>
                  </div>
                  {isExpanded && prescription.instructions && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Instructions: </span>
                        <span data-testid={`text-instructions-${prescription.id}`}>
                          {prescription.instructions}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-end flex-shrink-0">
                  {showActions && prescription.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => onDispense?.(prescription.id)}
                      data-testid={`button-dispense-${prescription.id}`}
                    >
                      Mark Dispensed
                    </Button>
                  )}
                  {prescription.instructions && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setExpandedId(isExpanded ? null : prescription.id)}
                      data-testid={`button-toggle-${prescription.id}`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
