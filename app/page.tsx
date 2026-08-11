import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white pt-20">
      <Navbar />
      <Hero />
      <Booking />
      {/* 
        TODO: Add remaining sections
        <Benefits />
        <Stories />
        <About />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      */}
      <Footer />
    </main>
  );
}
