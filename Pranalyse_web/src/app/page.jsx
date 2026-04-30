import AboutSection from "../components/landing/AboutSection";
import DemoReviewSection from "../components/landing/DemoReviewsSection";
import HeroSection from "../components/landing/HeroSection";
import Quote from "../components/landing/Quote";
import WhyUsSection from "../components/landing/WhyUsSection";
import DownloadSection from "../components/landing/DownloadSection";
import HolisticPlanSection from "../components/landing/HolisticPlanSection";
import FAQsSection from "../components/landing/FAQsSection";
import NewsletterSection from "../components/landing/NewsletterSection";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import ExploreSection from "../components/landing/ExploreSection";

export default function Home() {
  return (
    <>
      <div className="pt-[50px]">
        <Navbar />

        {/* HeroSection with solid background */}
        <div className="bg-gradient-to-b from-[#F0E7FF] via-[#886AC9] via-40% via-[#4B3A70] via-65% to-[#2C2242]">
          <HeroSection />
          <AboutSection />
          <WhyUsSection />
          <DemoReviewSection />
          <ExploreSection />
          <Quote />
          <DownloadSection />
          <HolisticPlanSection />
          <FAQsSection />
          <NewsletterSection />
          <Footer />
        </div>
      </div>
    </>
  );
}