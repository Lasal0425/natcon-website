import Navbar from "@/components/Navbar";
import StoreClosed from "@/components/store/Store";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Store",
  description: "Buy NatCon 2026 merch",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* <StoreClosed /> */}
      {/* <Store /> */}
      <Footer />
    </div>
  );
}

