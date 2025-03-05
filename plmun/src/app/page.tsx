import About from "@/components/About";
import ClientTestimonials from "@/components/ClientTestimonials";
import Contact from "@/components/Contact";
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
    </div>
  );
}
