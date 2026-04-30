export default function CardList({ children }:any) {
  return (
    <div className="px-10"> {/* outer wrapper */}
      <div className="flex gap-8 overflow-x-auto pb-6 scroll-smooth no-scrollbar">
        {children}
      </div>
    </div>
  );
}