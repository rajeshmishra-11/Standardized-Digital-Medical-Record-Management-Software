import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileJson, FileText } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps {
  onDownload?: (format: "pdf" | "json") => void;
  isLoading?: boolean;
}

export default function DownloadButton({ onDownload, isLoading = false }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: "pdf" | "json") => {
    setDownloading(true);
    console.log(`Downloading as ${format.toUpperCase()}...`);
    onDownload?.(format);
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          disabled={isLoading || downloading}
          data-testid="button-download"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Downloading..." : "Download Records"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleDownload("pdf")}
          data-testid="menu-download-pdf"
        >
          <FileText className="h-4 w-4 mr-2" />
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDownload("json")}
          data-testid="menu-download-json"
        >
          <FileJson className="h-4 w-4 mr-2" />
          Download as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
