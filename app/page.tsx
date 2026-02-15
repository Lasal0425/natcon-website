import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NatCon 2026",
  description: "National Conference 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />

      {/* Scrollable Content Container */}
      <div className="relative z-10">
        {/* Spacer to push content down initially */}
        <div className="h-screen"></div>

        {/* Content sections that will scroll over the hero */}
        <hr></hr>
        <AboutSection />
        {/* <hr></hr>
            <RegisterSection /> */}
        <Footer />
      </div>
    </div>
  );
}
