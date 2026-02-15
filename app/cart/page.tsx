import Navbar from "@/components/Navbar";
import Cart from "@/components/store/Cart";

export const metadata = {
  title: "Shopping Cart | NatCon 2026",
  description: "View your shopping cart for NatCon 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Cart />
    </div>
  );
}
