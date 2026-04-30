import Descrip1 from "@/src/components/about/Descrip1";
import Descrip2 from "@/src/components/about/Descrip2"
import Descrip3 from "@/src/components/about/Descrip3";
import Hero from "@/src/components/about/Hero";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";

export default function AboutUs() {
  return (
    <>
    <div className="pt-[90px]">
      <Navbar/>
      <Hero/>
      <Descrip1/>
      <Descrip2/>
      <Descrip3/>
      <Footer/>
    </div>
    </>
  );
}