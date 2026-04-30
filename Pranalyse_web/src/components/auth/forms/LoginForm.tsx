"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ onSuccess }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const router= useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && password) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col items-center">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#46357F] mb-12 text-center">
        Login
      </h1>

      {/* Email */}
      <div className="w-full mb-12">
        <label className="text-sm text-black">Username / Email ID</label>
        <input
          value={email}
          onFocus={() => setActiveField("email")}
          onBlur={() => setActiveField(null)}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-1 outline-none bg-transparent"
        />
        <div
          className={`h-[2px] transition-all duration-300 ${
            activeField === "email" ? "bg-[#46357F]" : "bg-black"
          }`}
        />
      </div>

      {/* Password */}
      <div className="w-full mb-8">
        <label className="text-sm text-black">Password</label>
        <input
          type="password"
          value={password}
          onFocus={() => setActiveField("password")}
          onBlur={() => setActiveField(null)}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-1 outline-none bg-transparent"
        />
        <div
          className={`h-[2px] transition-all duration-300 ${
            activeField === "password" ? "bg-[#46357F]" : "bg-black"
          }`}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 rounded text-white font-medium mt-5 mb-6"
        style={{
          background: "radial-gradient(circle, #7C5AEB 0%, #2C2881 100%)",
        }}
      >
        Submit
      </button>

      <button
        onClick={async(e)=>{
          e.preventDefault(); // Extra insurance
          // 1. Trigger the sign-in process
          const result = await signIn("google", { 
            redirect: false, 
            callbackUrl: "/" 
          });

          // 2. Check if the sign-in was successful
          if (result?.ok) {
            // result.url will be "/yourdetails" because we set it as callbackUrl above
            onSuccess()
          } else {
            // Handle errors (e.g., backend sync failed)
            console.error("Sign in failed:", result?.error);
          }
        }}
        className="w-full flex items-center justify-center py-2 rounded text-white font-medium mb-3 disabled:opacity-50 space-x-3"
        style={{
          background: "radial-gradient(circle, #7C5AEB 0%, #2C2881 100%)",
        }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Sign In</span>
      </button>

      {/* Signup Text */}
      <p className="text-sm text-gray-500">
        Don’t have an account?{" "}
        <span className="text-[#886AC9] cursor-pointer hover:underline"
          onClick={()=>{
            router.push("/auth/signup")
          }}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}