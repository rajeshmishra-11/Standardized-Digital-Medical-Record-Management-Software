import PatientSummaryCard from '../PatientSummaryCard';

export default function PatientSummaryCardExample() {
  return (
    <PatientSummaryCard
      patientId="PAT-2024-001"
      name="Sarah Johnson"
      dateOfBirth="1985-03-15"
      phone="+1 (555) 123-4567"
      email="sarah.johnson@email.com"
      status="active"
    />
  );
}
