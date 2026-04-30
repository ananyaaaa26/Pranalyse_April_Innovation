import Hero from "@/src/components/physio/Hero";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import Working from "@/src/components/physio/Working";
import WhyPhysio from "@/src/components/physio/WhyPhysio";
import WorkoutPlanCTA from "@/src/components/yoga/WorkoutPlanCTA";
import Quote from "@/src/components/physio/Quote";

export default function Physiotherapy() {
  return (
    <>
        <div className="pt-[48px]">
            <Navbar/>
            <Hero/>
            <Working/>
            <WhyPhysio/>
            <WorkoutPlanCTA/>
            <Quote/>
            <Footer/>
        </div>
    </>
  );
}