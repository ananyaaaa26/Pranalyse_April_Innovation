import Hero from "../../components/holistichealing/Hero";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";

export default function AboutUs() {
  return (
    <>
    <div className="bg-[linear-gradient(110deg,#4B3A70_0%,#886AC9_50%,#FEDA3B_80%)] pt-[90px]">
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
    </>
  );
}