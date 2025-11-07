import StatsCard from '../StatsCard';
import { Pill } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard
        title="Total Prescriptions"
        value="24"
        icon={Pill}
        description="12 active"
      />
    </div>
  );
}
