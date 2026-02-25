"use client";

import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";

export default function RegisterSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay — no backdrop-blur on mobile */}
      <div className="absolute inset-0 bg-black/60 md:backdrop-blur-sm z-0"></div>

      {/* Animated glow orbs — desktop only */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block">
        <div
          className="absolute w-96 h-96 bg-natcon-red/15 rounded-full blur-[120px] animate-glow-pulse"
          style={{ top: "10%", left: "-5%" }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-natcon-green/10 rounded-full blur-[100px] animate-glow-pulse"
          style={{ bottom: "10%", right: "-5%", animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-natcon-orange/10 rounded-full blur-[80px] animate-glow-pulse"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute w-48 h-48 bg-natcon-yellow/8 rounded-full blur-[60px] animate-glow-pulse"
          style={{ top: "20%", right: "15%", animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating particles — desktop only */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block">
        {[
          { left: "8%", top: "15%", delay: "0s", size: "w-1.5 h-1.5" },
          { left: "88%", top: "25%", delay: "0.5s", size: "w-1 h-1" },
          { left: "12%", top: "65%", delay: "1s", size: "w-2 h-2" },
          { left: "92%", top: "60%", delay: "1.5s", size: "w-1.5 h-1.5" },
          { left: "45%", top: "8%", delay: "0.8s", size: "w-1 h-1" },
          { left: "75%", top: "75%", delay: "2s", size: "w-1.5 h-1.5" },
          { left: "25%", top: "80%", delay: "0.3s", size: "w-1 h-1" },
          { left: "5%", top: "45%", delay: "1.2s", size: "w-2 h-2" },
          { left: "60%", top: "90%", delay: "1.8s", size: "w-1 h-1" },
          { left: "35%", top: "5%", delay: "0.6s", size: "w-1.5 h-1.5" },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute ${p.size} bg-natcon-red/50 rounded-full animate-particle-drift`}
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          ></span>
        ))}
      </div>

      {/* Expanding ring pulses — desktop only */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/30 rounded-full animate-ring-expand"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/20 rounded-full animate-ring-expand"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/10 rounded-full animate-ring-expand"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              filter: [
                "drop-shadow(0 0 15px rgba(240,45,58,0.4))",
                "drop-shadow(0 0 30px rgba(240,45,58,0.7))",
                "drop-shadow(0 0 15px rgba(240,45,58,0.4))"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/topics/Register-Now.png"
              alt="Register Now!"
              width={500}
              height={60}
              className="h-auto w-auto max-w-[320px] md:max-w-lg"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Subtitle text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/60 text-sm sm:text-base text-center max-w-xl mx-auto"
        >
          Secure your spot at NatCon 2026, fill out the form below to register.
        </motion.p>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="relative group w-full"
        >
          {/* Animated Glow Border — desktop only */}
          <div className="absolute -inset-1 bg-gradient-to-r from-natcon-red via-natcon-orange via-natcon-yellow to-natcon-green rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-gradient-shift hidden md:block"></div>

          {/* Card with glassmorphism — lighter blur on mobile */}
          <div className="relative bg-white/5 backdrop-blur-sm md:backdrop-blur-xl rounded-2xl p-2 sm:p-4 shadow-2xl overflow-hidden border border-white/10 min-h-[600px] md:min-h-[800px]">
            {/* Corner accents — desktop only */}
            <div className="hidden md:block">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-natcon-red/40 rounded-tl-2xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-natcon-red/40 rounded-tr-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-natcon-red/40 rounded-bl-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-natcon-red/40 rounded-br-2xl pointer-events-none"></div>
            </div>

            {/* Scanning light bar — desktop only */}
            <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-natcon-red/40 to-transparent animate-line-scan pointer-events-none hidden md:block"></div>

            {/* Tally form embed */}
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
