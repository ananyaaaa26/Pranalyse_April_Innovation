import Hero from "../../components/explore/Hero";
import SearchBar from "../../components/explore/SearchBar";
import Section from "../../components/explore/Section";
import CardList from "../../components/explore/CardList";
import ExploreCard from "../../components/explore/ExploreCard";
import exploreData from "../../data/exploreData.json"
import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";

export default function ExplorePage() {
  return (
    <>
      <div className="pt-[90px]">
        <Navbar/>  
        <Hero/>

        {/* Sections with reduced top spacing */}
        <div className="-mt-16 mb-20">
          {exploreData.sections.map((section, index) => (
            <Section key={index} title={section.title}>
              <CardList>
                {section.items.map((item, i) => (
                  <ExploreCard
                    key={i}
                    title={item.title}
                    image={item.image}
                  />
                ))}
              </CardList>
            </Section>
          ))}
        </div>

        <Footer/>
      </div>
    </>
  )
}