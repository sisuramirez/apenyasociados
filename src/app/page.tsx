import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import PhilosophySection from "@/components/PhilosophySection";
import InternationalSection from "@/components/InternationalSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import LatestNews from "@/components/LatestNews";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Enable ISR with 60 second revalidation for the homepage
export const revalidate = 60;

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
      <LatestNews />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
