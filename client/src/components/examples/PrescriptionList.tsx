import PrescriptionList from '../PrescriptionList';

export default function PrescriptionListExample() {
  const mockPrescriptions = [
    {
      id: "RX-001",
      medicationName: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      prescribedBy: "Smith",
      prescribedDate: "2024-01-15",
      instructions: "Take with food. Complete full course even if symptoms improve.",
      status: "dispensed" as const
    },
    {
      id: "RX-002",
      medicationName: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Johnson",
      prescribedDate: "2024-01-20",
      instructions: "Take in the morning. Monitor blood pressure regularly.",
      status: "pending" as const
    }
  ];

  return (
    <PrescriptionList 
      prescriptions={mockPrescriptions}
      showActions
      onDispense={(id) => console.log('Dispense:', id)}
    />
  );
}
