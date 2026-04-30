export default function DietCardList({ children }) {
  return (
    <div className="px-10">
      {/* Added 'items-stretch' to force children to same height */}
      <div className="flex items-stretch gap-8 overflow-x-auto pb-6 scroll-smooth no-scrollbar">
        {children}
      </div>
    </div>
  );
}