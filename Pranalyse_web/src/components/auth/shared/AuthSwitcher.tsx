"use client";

import { useRouter } from "next/navigation";

export default function AuthSwitcher({ mode }: { mode: string }) {
  const router = useRouter();

  return (
    <p className="mt-4 text-sm text-center">
      {mode === "login" ? "Don't have an account?" : "Already have an account?"}
      <button
        onClick={() =>
          router.push(mode === "login" ? "/auth/signup" : "/auth/login")
        }
        className="ml-2 text-indigo-600 font-semibold"
      >
        {mode === "login" ? "Sign up" : "Login"}
      </button>
    </p>
  );
}