import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useState } from "react";
import RoleSelector from "./RoleSelector";

interface RegisterFormProps {
  onRegister?: (data: {
    fullName: string;
    email: string;
    password: string;
    role: "patient" | "doctor" | "pharmacy";
  }) => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor" | "pharmacy">("patient");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Register attempt:', { fullName, email, role });
    onRegister?.({ fullName, email, password, role });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Create Your Account</CardTitle>
        <CardDescription>
          Join DigiHealth for secure health records management
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Your Role</Label>
            <RoleSelector value={role} onChange={setRole} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              data-testid="input-fullname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-email"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                data-testid="input-confirm-password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-register">
            Create Account
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="ghost"
            type="button"
            onClick={onSwitchToLogin}
            data-testid="button-switch-login"
          >
            Already have an account? Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
