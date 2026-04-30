import Header from "@/src/components/features/Header";
import Card from "@/src/components/features/Card";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import features from "../../data/features.json";

export default function Features() {
  return (
    <>
        <div className="min-h-screen bg-cover bg-center pt-[90px]" style={{ backgroundImage: "url('/features/MetalFlowerWall.png')" }}>
            <Navbar/>
            <Header/>
            <div className="flex flex-wrap justify-center gap-12 p-10">
                {features.map((feature) => (
                    <Card
                    key={feature.id}
                    name={feature.name}
                    image={feature.image}
                    description={feature.description}
                    link={`/features/${feature.id}`}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    </>
  );
}