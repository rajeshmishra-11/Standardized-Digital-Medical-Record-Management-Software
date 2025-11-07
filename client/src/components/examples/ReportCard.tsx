import ReportCard from '../ReportCard';

export default function ReportCardExample() {
  const mockReport = {
    id: "R-001",
    type: "Blood Test - Complete Panel",
    date: "2024-01-18",
    status: "complete" as const,
    performedBy: "Lab Corp",
    notes: "All values within normal range. Cholesterol slightly elevated."
  };

  return (
    <ReportCard
      report={mockReport}
      onView={(id) => console.log('View report:', id)}
      onDownload={(id) => console.log('Download report:', id)}
    />
  );
}
