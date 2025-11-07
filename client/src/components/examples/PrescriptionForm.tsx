import PrescriptionForm from '../PrescriptionForm';

export default function PrescriptionFormExample() {
  return (
    <div className="max-w-2xl mx-auto">
      <PrescriptionForm
        patientId="PAT-2024-001"
        onSubmit={(data) => console.log('Prescription submitted:', data)}
      />
    </div>
  );
}
