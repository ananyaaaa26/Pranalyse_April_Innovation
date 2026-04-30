"use client";

import DemoVideoBox from "./DemoVideoBox";
import ReviewsCarousel from "./ReviewsCarousel";

export default function DemoReviewSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-stretch justify-center gap-20 py-28 px-4 md:px-20">
      <DemoVideoBox />
      <ReviewsCarousel />
    </section>
  );
}