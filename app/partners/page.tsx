import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/partners/partners";

export const metadata = {
  title: "Partners | NatCon 2026",
  description: "Our Partners for NatCon 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <PartnersSection />
      <Footer />
    </div>
  );
}
