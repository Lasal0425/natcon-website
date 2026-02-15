"use client";

import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const router = useRouter();

  return (
    <section className="relative py-16 min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/squid-game-bg.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
        <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center max-w-2xl">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Order Confirmed!
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Thank you for your purchase!
          </p>

          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              What happens next?
            </h2>
            <div className="space-y-3 text-gray-300 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-natcon-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p>We&apos;ll review your order and proof of purchase</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-natcon-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p>
                  You&apos;ll receive a confirmation email within 24 hours
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-natcon-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p>
                  Merch can be collected on the event day or will be handed
                  over to your entity
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-natcon-green/10 to-natcon-green/5 rounded-2xl p-6 mb-8 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Questions about your order?
            </h3>
            <p className="text-gray-300 mb-5">
              Our Organizing Committee is here to help. Reach out to us:
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-natcon-green text-lg"></span>
                <div>
                  <p className="text-natcon-green noticia-text-regular">
                    <a href="mailto:nivedhitha@aiesec.net" className="text-natcon-green font-semibold hover:underline"> 📧 nivedhitha@aiesec.net</a>
                    <span className="text-natcon-orange font-semibold"> (+94 74 293 6786)</span>
                  </p>
                  <p className="text-gray-400 text-sm"></p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-natcon-green text-lg"></span>
                <div>
                  <p className="text-natcon-green noticia-text-regular">
                    <a href="mailto:mihisarajayathilaka@aiesec.net" className="text-natcon-green font-semibold hover:underline"> 📧 mihisarajayathilaka@aiesec.net</a>
                    <span className="text-natcon-orange font-semibold"> (+94 70 717 7132)</span>
                  </p>
                  <p className="text-gray-400 text-sm"></p>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/store")}
              className="bg-natcon-green hover:bg-natcon-green/80 text-white py-3 px-8 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => router.push("/")}
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 py-3 px-8 rounded-xl transition-all duration-300 font-medium"
            >
              Back Home
            </button>
          </div>

          {/* Order Reference */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Order submitted on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}