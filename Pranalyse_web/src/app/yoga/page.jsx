import Hero from "@/src/components/yoga/Hero";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import Working from "@/src/components/yoga/Working";
import WhyYoga from "@/src/components/yoga/WhyYoga";
import WorkoutPlanCTA from "@/src/components/yoga/WorkoutPlanCTA";
import Quote from "@/src/components/yoga/Quote";

export default function Yoga() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Working/>
      <WhyYoga/>
      <WorkoutPlanCTA/>
      <Quote/>
      <Footer/>
    </>
  );
}