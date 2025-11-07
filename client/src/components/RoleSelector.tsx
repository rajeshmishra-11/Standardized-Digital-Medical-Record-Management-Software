import { Card } from "@/components/ui/card";
import { UserCircle, Stethoscope, Building2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Role = "patient" | "doctor" | "pharmacy";

interface RoleSelectorProps {
  value: Role;
  onChange: (value: Role) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = [
    {
      value: "patient" as Role,
      label: "Patient",
      icon: UserCircle,
      description: "Access your health records"
    },
    {
      value: "doctor" as Role,
      label: "Doctor",
      icon: Stethoscope,
      description: "Manage patient prescriptions"
    },
    {
      value: "pharmacy" as Role,
      label: "Pharmacy",
      icon: Building2,
      description: "Verify and dispense prescriptions"
    }
  ];

  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-3 gap-4">
      {roles.map((role) => (
        <Label
          key={role.value}
          htmlFor={role.value}
          className="cursor-pointer"
          data-testid={`label-role-${role.value}`}
        >
          <Card className={`p-4 hover-elevate active-elevate-2 ${value === role.value ? "border-primary" : ""}`}>
            <RadioGroupItem
              value={role.value}
              id={role.value}
              className="sr-only"
              data-testid={`radio-role-${role.value}`}
            />
            <div className="flex flex-col items-center text-center gap-2">
              <role.icon className={`h-8 w-8 ${value === role.value ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <div className={`font-semibold ${value === role.value ? "text-primary" : ""}`}>
                  {role.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {role.description}
                </div>
              </div>
            </div>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
}
