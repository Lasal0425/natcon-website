import Navbar from "@/components/Navbar";
import RegisterSection from "@/components/registration/Register";
import RegistrationsClosed from "@/components/registration/RegistrationsClosed";
import Footer from "@/components/Footer";
import RoomSearch from "@/components/rooms/rooms";

export default function Home() {
  return (
    <>
      <head>
        <title>Register</title>
        <meta name="Register" content="Register for NLDS 2025" />
      </head>
      <div className="min-h-screen bg-black text-white">
        {/* <Navbar /> */}
        <RegisterSection />
        <Footer />

      </div>
    </>
  );
}