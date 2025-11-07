import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { useState } from "react";
import RoleSelector from "./RoleSelector";

interface LoginFormProps {
  onLogin?: (email: string, password: string, role: "patient" | "doctor" | "pharmacy") => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor" | "pharmacy">("patient");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, role, rememberMe });
    onLogin?.(email, password, role);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome to DigiHealth</CardTitle>
        <CardDescription>
          Sign in to access your health records securely
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Your Role</Label>
            <RoleSelector value={role} onChange={setRole} />
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="input-password"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              data-testid="checkbox-remember"
            />
            <Label
              htmlFor="remember"
              className="text-sm font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>

          <Button type="submit" className="w-full" data-testid="button-login">
            Sign In
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="ghost"
            type="button"
            onClick={onSwitchToRegister}
            data-testid="button-switch-register"
          >
            Don't have an account? Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
