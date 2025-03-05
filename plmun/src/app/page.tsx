import About from "@/components/About";
import ClientTestimonials from "@/components/ClientTestimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavigationBar from "@/components/NavigationBar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="">
      <NavigationBar/>
      <Hero/>
      <About/>
      <Services/>
      <ClientTestimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}
