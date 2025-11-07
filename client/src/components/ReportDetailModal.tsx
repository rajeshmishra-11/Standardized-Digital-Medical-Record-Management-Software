import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Calendar, User, Building2 } from "lucide-react";
import type { MedicalReport } from "./ReportCard";

interface ReportDetailModalProps {
  report: MedicalReport | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (id: string) => void;
}

export default function ReportDetailModal({
  report,
  isOpen,
  onClose,
  onDownload,
}: ReportDetailModalProps) {
  if (!report) return null;

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

  // Mock detailed report data based on report type
  const getDetailedReportData = () => {
    if (report.type.includes("Blood Test")) {
      return {
        title: "Complete Blood Count & Metabolic Panel",
        sections: [
          {
            heading: "Hematology",
            items: [
              { label: "White Blood Cells", value: "7.2 K/µL", range: "4.5-11.0 K/µL", status: "normal" },
              { label: "Red Blood Cells", value: "4.8 M/µL", range: "4.5-5.5 M/µL", status: "normal" },
              { label: "Hemoglobin", value: "14.2 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
              { label: "Hematocrit", value: "42.5%", range: "38.8-50.0%", status: "normal" },
              { label: "Platelets", value: "245 K/µL", range: "150-400 K/µL", status: "normal" },
            ]
          },
          {
            heading: "Lipid Panel",
            items: [
              { label: "Total Cholesterol", value: "210 mg/dL", range: "<200 mg/dL", status: "elevated" },
              { label: "HDL Cholesterol", value: "58 mg/dL", range: ">40 mg/dL", status: "normal" },
              { label: "LDL Cholesterol", value: "135 mg/dL", range: "<100 mg/dL", status: "elevated" },
              { label: "Triglycerides", value: "115 mg/dL", range: "<150 mg/dL", status: "normal" },
            ]
          },
          {
            heading: "Metabolic Panel",
            items: [
              { label: "Glucose", value: "92 mg/dL", range: "70-100 mg/dL", status: "normal" },
              { label: "Creatinine", value: "1.0 mg/dL", range: "0.7-1.3 mg/dL", status: "normal" },
              { label: "BUN", value: "18 mg/dL", range: "7-20 mg/dL", status: "normal" },
              { label: "Sodium", value: "140 mEq/L", range: "136-145 mEq/L", status: "normal" },
              { label: "Potassium", value: "4.2 mEq/L", range: "3.5-5.0 mEq/L", status: "normal" },
            ]
          }
        ]
      };
    } else if (report.type.includes("X-Ray")) {
      return {
        title: "Chest X-Ray - PA and Lateral Views",
        sections: [
          {
            heading: "Findings",
            items: [
              { label: "Lung Fields", value: "Clear bilaterally. No infiltrates, masses, or nodules identified." },
              { label: "Heart", value: "Normal size and contour. Cardiothoracic ratio within normal limits." },
              { label: "Mediastinum", value: "Not widened. Trachea midline." },
              { label: "Pleura", value: "No pleural effusion or pneumothorax." },
              { label: "Bones", value: "No acute fractures or lytic lesions." },
            ]
          },
          {
            heading: "Impression",
            items: [
              { label: "Result", value: "Normal chest radiograph. No acute cardiopulmonary disease." }
            ]
          }
        ]
      };
    } else if (report.type.includes("MRI")) {
      return {
        title: "MRI Lumbar Spine Without Contrast",
        sections: [
          {
            heading: "Findings",
            items: [
              { label: "Alignment", value: "Normal lordotic curvature maintained." },
              { label: "Vertebral Bodies", value: "Normal height and signal intensity. No compression fractures." },
              { label: "L4-L5 Level", value: "Mild disc bulge with slight narrowing of neural foramina. No significant central stenosis." },
              { label: "L5-S1 Level", value: "Normal disc height and signal. No herniation or stenosis." },
              { label: "Spinal Cord", value: "Normal caliber and signal intensity. Conus ends at L1-L2." },
            ]
          },
          {
            heading: "Impression",
            items: [
              { label: "Result", value: "Mild disc bulge at L4-L5 without significant neural compromise. Clinical correlation recommended." }
            ]
          }
        ]
      };
    } else if (report.type.includes("ECG")) {
      return {
        title: "12-Lead Electrocardiogram",
        sections: [
          {
            heading: "Measurements",
            items: [
              { label: "Heart Rate", value: "72 bpm", range: "60-100 bpm", status: "normal" },
              { label: "PR Interval", value: "160 ms", range: "120-200 ms", status: "normal" },
              { label: "QRS Duration", value: "88 ms", range: "80-120 ms", status: "normal" },
              { label: "QT/QTc", value: "380/410 ms", range: "QTc <450 ms", status: "normal" },
            ]
          },
          {
            heading: "Interpretation",
            items: [
              { label: "Rhythm", value: "Normal sinus rhythm" },
              { label: "Axis", value: "Normal axis" },
              { label: "Intervals", value: "Within normal limits" },
              { label: "ST-T Changes", value: "None" },
              { label: "Conclusion", value: "Normal ECG. No evidence of ischemia or arrhythmia." }
            ]
          }
        ]
      };
    } else {
      return {
        title: report.type,
        sections: [
          {
            heading: "Report Details",
            items: [
              { label: "Status", value: report.status },
              { label: "Notes", value: report.notes || "No additional notes available." }
            ]
          }
        ]
      };
    }
  };

  const detailedData = getDetailedReportData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-report-detail">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                {detailedData.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                Medical Report ID: <span className="font-mono font-semibold">{report.id}</span>
              </DialogDescription>
            </div>
            <Badge 
              variant={getStatusVariant(report.status)}
              className="flex items-center gap-1.5 flex-shrink-0"
            >
              <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(report.status)}`} />
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Metadata */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-md">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Report Date</p>
                <p className="font-semibold font-mono">{report.date}</p>
              </div>
            </div>
            {report.performedBy && (
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Performed By</p>
                  <p className="font-semibold">{report.performedBy}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Detailed Report Sections */}
          {detailedData.sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{section.heading}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="grid grid-cols-3 gap-4 p-3 rounded-md hover-elevate"
                    data-testid={`report-item-${sectionIdx}-${itemIdx}`}
                  >
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="col-span-2 flex items-center justify-between gap-4">
                      <span className="font-semibold">{item.value}</span>
                      {'range' in item && item.range && (
                        <span className="text-xs text-muted-foreground">
                          Reference: {item.range}
                        </span>
                      )}
                      {'status' in item && item.status && (
                        <Badge 
                          variant={item.status === "normal" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.status === "normal" ? "✓ Normal" : "⚠ Elevated"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {report.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">Clinical Notes</h3>
                <p className="text-sm p-4 bg-muted/50 rounded-md">{report.notes}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            data-testid="button-close-report"
          >
            Close
          </Button>
          <Button
            onClick={() => onDownload?.(report.id)}
            className="gap-2"
            data-testid="button-download-report"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
