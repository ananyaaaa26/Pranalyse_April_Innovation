import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import Header from "@/src/components/contact/Header";
import Form from "@/src/components/contact/Form";

export default function Contact() {
  return (
    <>
    <div className="min-h-screen bg-cover bg-center pt-[90px]" style={{ backgroundImage: "url('/contact/messages.png')" }}>
      <Navbar/>
      <Header/>
      <Form/>
      <Footer/>
    </div>
    </>
  );
}