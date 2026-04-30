"use client";

import { LoginForm } from "../forms/LoginForm";
import { SignupForm } from "../forms/SignupForm";

interface AuthRightPanelProps {
  mode: "login" | "signup";
  onSubmit: () => void; // called when form submitted
}

export default function AuthRightPanel({ mode, onSubmit }: AuthRightPanelProps) {
  return (
    <div className="p-6 flex flex-col justify-center h-full">
      {mode === "login" ? (
        <LoginForm onSuccess={onSubmit}/>
      ) : (
        <SignupForm onSuccess={onSubmit} />
      )}
    </div>
  );
}