import PageBackground from "../../components/auth/background/PageBackground";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground />
      {children}
    </div>
  );
}