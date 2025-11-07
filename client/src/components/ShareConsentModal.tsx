import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Share2, Trash2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface Consent {
  id: string;
  providerName: string;
  providerType: "doctor" | "pharmacy";
  grantedDate: string;
  expiresDate: string;
  status: "active" | "revoked";
}

interface ShareConsentModalProps {
  consents: Consent[];
  onGrant?: (providerType: "doctor" | "pharmacy", duration: string) => void;
  onRevoke?: (id: string) => void;
}

export default function ShareConsentModal({ 
  consents, 
  onGrant,
  onRevoke 
}: ShareConsentModalProps) {
  const [open, setOpen] = useState(false);
  const [providerType, setProviderType] = useState<"doctor" | "pharmacy">("doctor");
  const [duration, setDuration] = useState("30");

  const handleGrant = () => {
    console.log(`Granting consent to ${providerType} for ${duration} days`);
    onGrant?.(providerType, duration);
  };

  const handleRevoke = (id: string) => {
    console.log(`Revoking consent ${id}`);
    onRevoke?.(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-share-consent">
          <Share2 className="h-4 w-4" />
          Manage Consent
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Access Consent Management
          </DialogTitle>
          <DialogDescription>
            Grant temporary access to your health records or manage existing consents.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/30 rounded-md">
            <h4 className="font-semibold">Grant New Access</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider-type">Provider Type</Label>
                <Select value={providerType} onValueChange={(v) => setProviderType(v as "doctor" | "pharmacy")}>
                  <SelectTrigger id="provider-type" data-testid="select-provider-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration" data-testid="select-duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleGrant} className="w-full" data-testid="button-grant-consent">
              Grant Access
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Active Consents</h4>
            {consents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No active consents
              </p>
            ) : (
              <div className="space-y-2">
                {consents.map((consent) => (
                  <div
                    key={consent.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                    data-testid={`consent-item-${consent.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{consent.providerName}</span>
                        <Badge variant="secondary" className="text-xs">
                          {consent.providerType}
                        </Badge>
                        <Badge 
                          variant={consent.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {consent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        Granted: {consent.grantedDate} • Expires: {consent.expiresDate}
                      </p>
                    </div>
                    {consent.status === "active" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRevoke(consent.id)}
                        className="gap-2"
                        data-testid={`button-revoke-${consent.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
