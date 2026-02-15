"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 text-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* 404 Image */}
      {/* <div className="mb-8">
        <Image
          src="/topics/404.png"
          alt="404 Not Found"
          width={400}
          height={200}
          className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </div> */}

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-wider font-mono">
        Page Not Found
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-mono mb-8">
        Oops! It seems like you’ve wandered off the path.  
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-5">
        <Link
          href="/"
          className="bg-gray-900 border-2 border-natcon-red hover:bg-natcon-red hover:text-gray-900 text-white font-semibold py-3 sm:py-4 px-8 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-3 text-lg sm:text-xl"
        >
          <div className="w-7 h-7 flex items-center justify-center border-2 border-natcon-red rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          Go Home
        </Link>

        {/* <Link
          href="/contact"
          className="bg-gray-900 border-2 border-natcon-green hover:bg-natcon-green hover:text-gray-900 text-white font-semibold py-3 sm:py-4 px-8 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-3 text-lg sm:text-xl"
        >
          <div className="w-7 h-7 flex items-center justify-center border-2 border-natcon-green rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8V7l-3 2-2-1-4 3-4-3-2 1-3-2v1l3 2v5l7 4 7-4V10l3-2z" />
            </svg>
          </div>
          Contact Support
        </Link> */}
      </div>
    </section>
  );
}

