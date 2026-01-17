import Head from "next/head";
import Navbar from "@/components/Navbar";
import Cart from "@/components/store/Cart";
import NotFound from "@/components/NotFound";

export default function Home() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="Register" content="Register for NLDS 2025" />
      </Head>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        {/* <NotFound /> */}
        <Cart />
      </div>
    </>
  );
}
