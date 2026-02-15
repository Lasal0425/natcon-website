import Navbar from "@/components/Navbar";
import OrderConfirmation from "@/components/store/OrderConfirmation";

export const metadata = {
  title: "Order Confirmation | NatCon 2026",
  description: "Thank you for your purchase!",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <OrderConfirmation />
    </div>
  );
}
