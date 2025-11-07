import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pill } from "lucide-react";
import { useState } from "react";

interface PrescriptionFormProps {
  patientId?: string;
  onSubmit?: (data: {
    patientId: string;
    medication: string;
    dosage: string;
    frequency: string;
    instructions: string;
  }) => void;
}

export default function PrescriptionForm({ patientId: initialPatientId = "", onSubmit }: PrescriptionFormProps) {
  const [patientId, setPatientId] = useState(initialPatientId);
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Prescription created:', { patientId, medication, dosage, frequency, instructions });
    onSubmit?.({ patientId, medication, dosage, frequency, instructions });
    
    setMedication("");
    setDosage("");
    setFrequency("");
    setInstructions("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary" />
          <CardTitle>New Prescription</CardTitle>
        </div>
        <CardDescription>
          Issue a new prescription for the patient
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patientId">
              Patient ID <span className="text-destructive">*</span>
            </Label>
            <Input
              id="patientId"
              placeholder="PAT-2024-001"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              className="font-mono"
              data-testid="input-patient-id"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medication">
              Medication Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="medication"
              placeholder="e.g., Amoxicillin"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              required
              data-testid="input-medication"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">
                Dosage <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dosage"
                placeholder="e.g., 500mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
                data-testid="input-dosage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">
                Frequency <span className="text-destructive">*</span>
              </Label>
              <Select value={frequency} onValueChange={setFrequency} required>
                <SelectTrigger id="frequency" data-testid="select-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily">Once daily</SelectItem>
                  <SelectItem value="twice-daily">Twice daily</SelectItem>
                  <SelectItem value="three-times-daily">3 times daily</SelectItem>
                  <SelectItem value="four-times-daily">4 times daily</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="e.g., Take with food. Complete full course..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
              data-testid="textarea-instructions"
            />
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit-prescription">
            Issue Prescription
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
