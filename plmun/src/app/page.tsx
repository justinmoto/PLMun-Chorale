import About from "@/components/About";
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
    </div>
  );
}
