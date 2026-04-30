export default function AnimatedWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition-all duration-500 ease-in-out">
      {children}
    </div>
  );
}