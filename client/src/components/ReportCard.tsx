import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

export interface MedicalReport {
  id: string;
  type: string;
  date: string;
  status: "complete" | "pending" | "reviewed";
  notes?: string;
  performedBy?: string;
}

interface ReportCardProps {
  report: MedicalReport;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export default function ReportCard({ report, onView, onDownload }: ReportCardProps) {
  const getStatusVariant = (status: MedicalReport["status"]) => {
    switch (status) {
      case "complete":
        return "default";
      case "pending":
        return "secondary";
      case "reviewed":
        return "default";
    }
  };

  const getStatusColor = (status: MedicalReport["status"]) => {
    switch (status) {
      case "complete":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "reviewed":
        return "bg-blue-500";
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-report-${report.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-primary flex-shrink-0" />
              <h3 className="text-lg font-semibold truncate" data-testid={`text-report-type-${report.id}`}>
                {report.type}
              </h3>
              <Badge 
                variant={getStatusVariant(report.status)}
                className="flex items-center gap-1.5 flex-shrink-0"
                data-testid={`badge-status-${report.id}`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(report.status)}`} />
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Date: </span>
                <span className="font-medium font-mono" data-testid={`text-date-${report.id}`}>
                  {report.date}
                </span>
              </div>
              {report.performedBy && (
                <div>
                  <span className="text-muted-foreground">Performed by: </span>
                  <span className="font-medium">{report.performedBy}</span>
                </div>
              )}
              {report.notes && (
                <div className="mt-2 pt-2 border-t">
                  <span className="text-muted-foreground">Notes: </span>
                  <span data-testid={`text-notes-${report.id}`}>{report.notes}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView?.(report.id)}
              className="gap-2"
              data-testid={`button-view-${report.id}`}
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload?.(report.id)}
              data-testid={`button-download-${report.id}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
