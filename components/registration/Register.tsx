"use client";

import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";

export default function RegisterSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-natcon-blue/80 backdrop-blur-sm z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              filter: [
                "drop-shadow(0 0 10px rgba(240,45,58,0.3))",
                "drop-shadow(0 0 20px rgba(240,45,58,0.6))",
                "drop-shadow(0 0 10px rgba(240,45,58,0.3))"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/topics/RegisterNow.png"
              alt="Register Now!"
              width={400}
              height={50}
              className="h-auto w-auto max-w-[280px] md:max-w-md"
              priority
            />
          </motion.div>
        </motion.div>


        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group w-full"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-natcon-red via-natcon-yellow to-natcon-green rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

          <div className="relative bg-white rounded-2xl p-2 sm:p-4 shadow-2xl overflow-hidden min-h-[600px] md:min-h-[800px]">
            <Script src="https://tally.so/widgets/embed.js" />
            <iframe
              data-tally-src="https://tally.so/r/gDqXN4?transparent=1"
              className="w-full h-full border-0 min-h-[600px] md:min-h-[800px]"
              title="Local Delegates Registration - NatCon 2026"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

