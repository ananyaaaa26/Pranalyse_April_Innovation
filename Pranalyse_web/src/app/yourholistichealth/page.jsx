import Card from "@/src/components/yourholistichealth/ui/Card";
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import data from "../../data/HolisticHealthTrial.json";
import CenterCard from "@/src/components/yourholistichealth/ui/CenterCard";
import Circle from "@/src/components/yourholistichealth/ui/Circle";

export default function YourHolisticHealth() {
  // First row: first card, center card, second card
  const firstRowCards = [data[0], data[1]]; // just two side cards
  const secondRowCards = data.slice(2); // rest of the cards

  return (
    <div className="bg-black pt-[140px] relative animate-fadeIn">
      <Navbar />

      {/* First Row */}
      <div className="flex flex-wrap justify-center items-start gap-10 mb-20 relative">
        {/* First side card */}
        <Card
          key={firstRowCards[0].id}
          id={firstRowCards[0].id}
          title={firstRowCards[0].title}
          summary={firstRowCards[0].summary}
          icon={firstRowCards[0].icon}
          hoverColor={firstRowCards[0].hoverColor}
        />

        {/* Center Card */}
        <CenterCard />

        {/* Second side card */}
        <Card
          key={firstRowCards[1].id}
          id={firstRowCards[1].id}
          title={firstRowCards[1].title}
          summary={firstRowCards[1].summary}
          icon={firstRowCards[1].icon}
          hoverColor={firstRowCards[1].hoverColor}
        />

        {/* Circle below the center card */}
        <div className="absolute w-full flex justify-center -bottom-40">
          <Circle />
        </div>
      </div>

      {/* Second Row */}
{/* Second Row */}
<div className="flex flex-wrap gap-10 justify-center items-start -mt-8 mb-10">
  {secondRowCards.map((item, i) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      summary={item.summary}
      icon={item.icon}
      hoverColor={item.hoverColor}
      index={i + 2} // +2 because first row has 2 cards
    />
  ))}
</div>

      <Footer />
    </div>
  );
}