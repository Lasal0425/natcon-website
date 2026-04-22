import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TitlePartner from "@/components/TitlePartner";

export const metadata = {
  title: "Title Partner | NatCon 2026",
  description: "Ceylinco Life - Official Title Partner of NatCon 2026",
};

export default function TitlePartnerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <TitlePartner />
      <Footer />
    </div>
  );
}
