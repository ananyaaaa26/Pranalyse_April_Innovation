export default function ExploreCard({ title, image }: any) {
  return (
    <div className="min-w-[280px] relative mt-4 overflow-visible translate-x-6">
      
      {/* 👇 THIS is what scales */}
      <div className="
        bg-white
        rounded-xl
        border-2 border-transparent
        shadow-md
        transition duration-300
        hover:scale-105
        hover:border-[#4B3A70]
        hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
      ">
        
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={image}
            className="w-full aspect-video object-cover"
          />
        </div>

        <div className="p-3">
          <p className="font-semibold text-gray-900">{title}</p>
          <button className="text-sm text-[#6135F2] mt-1">
            Click to know more
          </button>
        </div>

      </div>
    </div>
  );
}