import Navbar from "@/components/Navbar";
import RegisterSection from "@/components/registration/Register";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Local Delegates Registration - NatCon 2026",
  description: "Register for NatCon 2026 Local Delegates",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-shrink-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1 w-full">
        <RegisterSection />
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
