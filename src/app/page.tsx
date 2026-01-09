import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import PhilosophySection from "@/components/PhilosophySection";
import InternationalSection from "@/components/InternationalSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <PhilosophySection />
      <InternationalSection />
      <TeamSection />
      <ServicesSection />
    </main>
  );
}
