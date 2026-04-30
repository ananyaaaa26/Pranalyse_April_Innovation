"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const exploreItems = [
  { img: "/home/explore/E1.png", label: "Yoga", route: "/yoga" },
  { img: "/home/explore/E2.png", label: "Physio", route: "/physio" },
  { img: "/home/explore/E3.png", label: "Zumba", route: "/comingsoon" },
  { img: "/home/explore/E4.png", label: "Meditation", route: "/explore" },
  { img: "/home/explore/E5.png", label: "Mental Health", route: "/explore" },
  { img: "/home/explore/E6.png", label: "Nutrition", route: "/explore" },
];

export default function ExploreSection() {
  const router = useRouter();

  return (
    <section className="w-full flex flex-col py-8 px-4 md:px-20">
      {/* Title aligned left */}
      <h2 className="text-white text-3xl md:text-4xl font-semibold mb-12 text-left">
        Explore by
      </h2>

      {/* Items Row (centered) */}
      <div className="flex flex-wrap justify-center gap-24">
        {exploreItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:scale-125 hover:-translate-y-2"
            onClick={() => router.push(item.route)}
          >
            {/* Circle image with shadow only */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white mb-3 relative transition-shadow duration-300 hover:shadow-2xl">
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>

            {/* Label moves with parent container */}
            <span className="text-white text-sm md:text-base font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}