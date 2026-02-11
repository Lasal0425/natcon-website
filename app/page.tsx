"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <head>
        <title>NatCon 2026</title>
        <meta name="NatCon 2026" content="National Conference 2026" />
      </head>
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
    </>
  );
}
