import Navbar from "@/components/Navbar";
import RegistrationsClosed from "@/components/registration/RegistrationsClosed";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Register | NatCon 2026",
  description: "Register for NatCon 2026",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-shrink-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1 w-full">
        <RegistrationsClosed />
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
