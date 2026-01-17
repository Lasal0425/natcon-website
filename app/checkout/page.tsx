import Head from "next/head";
import Navbar from "@/components/Navbar";
import Checkout from "@/components/store/Checkout";
import NotFound from "@/components/NotFound";

export default function Home() {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="Checkout" content="Checkout" />
      </Head>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
                {/* <NotFound /> */}
                <Checkout />
      </div>
    </>
  );
}
