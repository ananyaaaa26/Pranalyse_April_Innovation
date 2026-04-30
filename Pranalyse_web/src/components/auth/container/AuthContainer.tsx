"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Book from "../animation/Book";
import AuthLeftPanel from "../panels/AuthLeftPanel";
import AuthRightPanel from "../panels/AuthRightPanel";

export default function AuthContainer({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    router.push("/yourdetails");
    setSubmitted(true); // triggers closing
  };

  const handleCloseComplete = () => {
    router.push("/about"); // redirect after book closes
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Book
        leftContent={<AuthLeftPanel />}
        rightContent={<AuthRightPanel mode={mode} onSubmit={handleSubmit} />}
        onCloseComplete={handleCloseComplete}
        submitted={submitted}
      />
    </div>
  );
}