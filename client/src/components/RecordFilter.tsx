import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";

interface RecordFilterProps {
  onFilterChange?: (filters: {
    status?: string;
    dateRange?: string;
    provider?: string;
  }) => void;
}

export default function RecordFilter({ onFilterChange }: RecordFilterProps) {
  const [status, setStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [provider, setProvider] = useState<string>("");

  const handleClear = () => {
    setStatus("");
    setDateRange("");
    setProvider("");
    onFilterChange?.({});
  };

  const hasFilters = status || dateRange || provider;

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange?.({ status: value, dateRange, provider });
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    onFilterChange?.({ status, dateRange: value, provider });
  };

  const handleProviderChange = (value: string) => {
    setProvider(value);
    onFilterChange?.({ status, dateRange, provider: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]" data-testid="select-status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="dispensed">Dispensed</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateRange} onValueChange={handleDateRangeChange}>
        <SelectTrigger className="w-[180px]" data-testid="select-daterange">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="7days">Last 7 Days</SelectItem>
          <SelectItem value="30days">Last 30 Days</SelectItem>
          <SelectItem value="90days">Last 90 Days</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      <Select value={provider} onValueChange={handleProviderChange}>
        <SelectTrigger className="w-[180px]" data-testid="select-provider">
          <SelectValue placeholder="Provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Providers</SelectItem>
          <SelectItem value="dr-smith">Dr. Smith</SelectItem>
          <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
          <SelectItem value="dr-williams">Dr. Williams</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="gap-2"
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
