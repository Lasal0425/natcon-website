import Navbar from "@/components/Navbar";
import Store_closed from "@/components/store/Store-closed";
import Store from "@/components/store/Store";
import Store_openingsoon from "@/components/store/Store-openingsoon";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Store",
  description: "Buy NatCon 2026 merch",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* <Store /> */}
      {/* <Store_closed /> */}
      <Store_openingsoon />
      <Footer />
    </div>
  );
}

