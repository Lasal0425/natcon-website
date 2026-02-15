import Navbar from "@/components/Navbar";
import Checkout from "@/components/store/Checkout";

export const metadata = {
  title: "Checkout | NatCon 2026",
  description: "Complete your purchase for NatCon 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Checkout />
    </div>
  );
}
