import ShareConsentModal from '../ShareConsentModal';

export default function ShareConsentModalExample() {
  const mockConsents = [
    {
      id: "C-001",
      providerName: "Dr. Smith",
      providerType: "doctor" as const,
      grantedDate: "2024-01-15",
      expiresDate: "2024-02-14",
      status: "active" as const
    },
    {
      id: "C-002",
      providerName: "HealthPlus Pharmacy",
      providerType: "pharmacy" as const,
      grantedDate: "2024-01-10",
      expiresDate: "2024-04-10",
      status: "active" as const
    }
  ];

  return (
    <ShareConsentModal
      consents={mockConsents}
      onGrant={(type, duration) => console.log('Grant:', type, duration)}
      onRevoke={(id) => console.log('Revoke:', id)}
    />
  );
}
