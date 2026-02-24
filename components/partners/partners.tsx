"use client";

import Image from "next/image";
import { mainPartners, refreshmentsPartners, otherPartners } from "../../constants/Partners";

const COMING_SOON = true;

export default function PartnersSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Title */}
        <div className="flex justify-center mb-16">
          <Image
            src="/topics/Our-Partners.png"
            alt="Our Partners"
            width={512}
            height={64}
            className="w-auto h-16 sm:h-20 md:h-28 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {COMING_SOON ? (
          /* Coming Soon Message — Eye-catching version */
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-16 sm:py-24 relative">

            {/* Animated glow orbs in background */}
            <div className="absolute w-72 h-72 bg-natcon-red/20 rounded-full blur-[100px] animate-glow-pulse top-0 -left-20 pointer-events-none"></div>
            <div className="absolute w-64 h-64 bg-red-500/15 rounded-full blur-[80px] animate-glow-pulse bottom-0 -right-16 pointer-events-none" style={{ animationDelay: "1.5s" }}></div>
            <div className="absolute w-48 h-48 bg-natcon-orange/10 rounded-full blur-[60px] animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay: "0.8s" }}></div>

            {/* Expanding ring pulses */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/40 rounded-full animate-ring-expand pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/30 rounded-full animate-ring-expand pointer-events-none" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/20 rounded-full animate-ring-expand pointer-events-none" style={{ animationDelay: "2s" }}></div>

            {/* Card container with border glow */}
            <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-16 sm:px-12 sm:py-20 overflow-hidden">

              {/* Scanning light bar */}
              <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-natcon-red/60 to-transparent animate-line-scan pointer-events-none"></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-natcon-red/50 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-natcon-red/50 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-natcon-red/50 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-natcon-red/50 rounded-br-2xl"></div>

              {/* Main heading with shimmer */}
              <div className="relative flex flex-col items-center">
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center animate-shimmer leading-tight pb-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #F02D3A 0%, #ff6b6b 25%, #ffb3b3 50%, #ff6b6b 75%, #F02D3A 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Coming Soon
                </h2>

                {/* Glow behind text */}
                <div className="absolute -inset-8 bg-natcon-red/15 blur-[60px] rounded-full -z-10 animate-glow-pulse"></div>
              </div>

              {/* Divider line */}
              <div className="flex items-center justify-center gap-4 mt-8 mb-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-natcon-red/50"></div>
                <div className="w-2 h-2 bg-natcon-red rounded-full animate-pulse"></div>
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-natcon-red/50"></div>
              </div>

              {/* Subtitle */}
              <p className="text-white/70 text-base sm:text-lg md:text-xl text-center max-w-xl mx-auto leading-relaxed">
                We&apos;re finalizing partnerships to bring you the best experience.
                <span className="text-natcon-red font-semibold"> Stay tuned!</span>
              </p>

              {/* Animated dots */}
              <div className="flex justify-center gap-4 mt-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 bg-natcon-red rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 120}ms`, animationDuration: "1.4s" }}
                  ></span>
                ))}
              </div>
            </div>

            {/* Floating particles around the card */}
            {[
              { left: "10%", top: "20%", delay: "0s", size: "w-1.5 h-1.5" },
              { left: "85%", top: "30%", delay: "0.5s", size: "w-1 h-1" },
              { left: "15%", top: "70%", delay: "1s", size: "w-2 h-2" },
              { left: "90%", top: "65%", delay: "1.5s", size: "w-1.5 h-1.5" },
              { left: "50%", top: "10%", delay: "0.8s", size: "w-1 h-1" },
              { left: "70%", top: "80%", delay: "2s", size: "w-1.5 h-1.5" },
              { left: "30%", top: "85%", delay: "0.3s", size: "w-1 h-1" },
              { left: "5%", top: "50%", delay: "1.2s", size: "w-2 h-2" },
            ].map((p, i) => (
              <span
                key={i}
                className={`absolute ${p.size} bg-natcon-red/60 rounded-full animate-particle-drift pointer-events-none`}
                style={{ left: p.left, top: p.top, animationDelay: p.delay }}
              ></span>
            ))}
          </div>
        ) : (
          /* Partners Sections */
          <div className="max-w-7xl mx-auto space-y-20">
            <PartnersGrid title=" " partners={mainPartners} />
            <PartnersGrid title="Refreshments Partners" partners={refreshmentsPartners} />
            {/* <PartnersGrid title="Other Partners" partners={otherPartners} /> */}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Reusable Partners Grid Component
 */
function PartnersGrid({ title, partners }: { title: string; partners: Array<{ name: string; logo: string; link?: string }> }) {
  return (
    <div className="w-full">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-natcon-red text-center mb-10 sm:mb-12">
        {title}
      </h2>

      {/* Partners Container */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {partners.map((partner, index) => {
          const content = (
            <>
              {/* Logo Container */}
              <div className="w-40 h-28 sm:w-48 sm:h-32 md:w-52 md:h-36 lg:w-56 lg:h-40 flex items-center justify-center bg-white rounded-lg p-4 backdrop-blur-sm border border-black/10 transition-all duration-300 group-hover:scale-110 group-hover:border-natcon-red/50 group-hover:shadow-lg group-hover:shadow-natcon-red/20">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 208px, 224px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Partner Name */}
              <p className="text-white/90 text-xs sm:text-sm md:text-base text-center mt-3 max-w-[140px] sm:max-w-[160px] md:max-w-[180px] px-2 font-medium h-10 sm:h-12 flex items-center justify-center leading-tight">
                {partner.name}
              </p>
            </>
          );

          return partner.link ? (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center group cursor-pointer"
            >
              {content}
            </a>
          ) : (
            <div
              key={index}
              className="flex flex-col items-center justify-center group"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
