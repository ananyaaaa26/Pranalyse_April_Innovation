"use client";

import { useState } from "react";
import AuthLeftPanel from "../panels/AuthLeftPanel";
import AuthRightPanel from "../panels/AuthRightPanel";
import Book from "../animation/Book";

export default function AuthCard({ mode, onSuccess }) {
  const [isClosing, setIsClosing] = useState(false);

  // called when form is submitted
  const handleFormSuccess = () => {
    setIsClosing(true);
  };

  // called after closing animation finishes
  const handleCloseFinish = () => {
    if (onSuccess) onSuccess();
  };

  return (
    <Book
      leftContent={<AuthLeftPanel />}
      rightContent={
        <AuthRightPanel
          mode={mode}
          onSuccess={handleFormSuccess}
        />
      }
      onCloseComplete={handleCloseFinish}
      isClosing={isClosing} // 👈 pass closing state
    />
  );
}