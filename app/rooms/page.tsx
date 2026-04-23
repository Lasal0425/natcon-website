import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomSearch from "@/components/rooms/rooms";

export const metadata = {
  title: "Rooms | NatCon 2026",
  description: "Find your room allocation for NatCon 2026",
};

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <RoomSearch />
      </div>
      <Footer />
    </div>
  );
}
