'use client';

import Image from "next/image";

export default function Store({ message = "Merch pre-orders are currently closed." }: { message?: string }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay — no backdrop-blur on mobile */}
      <div className="absolute inset-0 bg-black/60 md:backdrop-blur-md"></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
        {/* Title image */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <Image
            src="/topics/Merch-Closed.png"
            alt="Store Closed"
            width={512}
            height={128}
            className="w-full max-w-md h-auto drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          />
        </div>

        {/* Animated Text */}
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="h-1 w-full bg-natcon-red mt-1"></div>
          </div>

          <p className="text-xl md:text-3xl font-bold text-white max-w-2xl mx-auto leading-tight">
            {message}
          </p>

          <div className="pt-8">
          </div>
        </div>
      </div>
    </section>
  );
}