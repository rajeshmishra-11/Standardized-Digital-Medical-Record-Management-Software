import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export default function SearchBar({ 
  placeholder = "Search by Patient ID...", 
  onSearch,
  className = ""
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-9 pr-9"
        data-testid="input-search"
      />
      {value && (
        <Button
          size="icon"
          variant="ghost"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          data-testid="button-clear-search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
