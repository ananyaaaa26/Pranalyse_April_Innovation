import Metadata from "next";
import AuthProvider from "./wrappers/AuthProvider"
import "./globals.css";
import { ModeProvider } from "@/context/ModeContext";


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"></script>
      </head>
      <body className={`antialiased`}>
        <AuthProvider>
          <ModeProvider>
            {children}
          </ModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}