import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleLogin = (email: string, password: string, role: "patient" | "doctor" | "pharmacy") => {
    console.log('Login successful:', { email, role });
    setLocation(`/${role}`);
  };

  const handleRegister = (data: {
    fullName: string;
    email: string;
    password: string;
    role: "patient" | "doctor" | "pharmacy";
  }) => {
    console.log('Registration successful:', data);
    setLocation(`/${data.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
}
