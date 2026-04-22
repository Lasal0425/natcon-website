"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TitlePartner() {
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
      <div className="absolute inset-0 bg-black/60 md:backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Page Title */}
        <div className="flex justify-center mb-12 sm:mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                filter: [
                  "drop-shadow(0 0 15px rgba(240,45,58,0.4))",
                  "drop-shadow(0 0 30px rgba(240,45,58,0.7))",
                  "drop-shadow(0 0 15px rgba(240,45,58,0.4))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono text-center">
                <span className="natcon-gradient-text">Title Partner</span>
              </h1>
            </motion.div>
          </motion.div>
        </div>

        {/* Title Partner Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-5xl mx-auto mb-16 sm:mb-20 relative px-2 sm:px-0"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-natcon-red/15 via-natcon-orange/15 to-natcon-green/15 border border-natcon-orange/30 text-natcon-orange text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z"/></svg>
              Official Title Partner
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z"/></svg>
            </span>
          </motion.div>

          {/* Ceylinco Life Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-10"
          >
            <a
              href="https://www.ceylincolife.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 relative bg-white rounded-2xl p-6 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(240,45,58,0.3)] border border-white/20">
                <Image
                  src="/partners/Ceylinco Life.png"
                  alt="Ceylinco Life"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                />
              </div>
            </a>
          </motion.div>

          {/* Card */}
          <div className="group relative">
            {/* Animated gradient border */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-gradient-shift blur-[2px]"></div>

            <div className="relative rounded-3xl bg-gray-900/80 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl">
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green animate-gradient-shift"></div>

              {/* Ambient glow inside */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-natcon-orange/8 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-natcon-red/8 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 sm:p-8 md:p-12 relative z-10">

                {/* Image section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex-shrink-0 relative"
                >
                  {/* Gradient ring behind image */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-natcon-red via-natcon-orange to-natcon-green opacity-60 animate-gradient-shift blur-[3px]"></div>
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-natcon-red via-natcon-orange to-natcon-green opacity-30 animate-gradient-shift"></div>

                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-[3px] border-gray-900">
                    <Image
                      src="/partners/chamath-alwis.png"
                      alt="Chamath Alwis"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                    />
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-natcon-green animate-pulse"></div>
                  <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-natcon-orange animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                </motion.div>

                {/* Content section */}
                <div className="flex-1 text-center md:text-left">
                  {/* Opening quote */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-natcon-orange/40 mb-3 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </motion.div>

                  {/* Message paragraphs */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-4"
                  >
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-sans">
                      Over the past two years, our association with <span className="text-natcon-green font-semibold">AIESEC Sri Lanka</span> has been both enriching and inspiring. It has provided us with a unique opportunity to engage with a vibrant youth community that is constantly evolving, challenging norms, and pushing boundaries.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-sans">
                      What stands out most about AIESEC Sri Lanka is its <span className="text-natcon-orange font-semibold">dynamic and innovative spirit</span>. The organization continuously reinvents itself, creating impactful experiences that nurture leadership, adaptability, and global thinking—qualities that strongly resonate with the values we uphold as a brand.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-sans">
                      At <span className="natcon-gradient-text font-bold">Ceylinco Life</span>, we pride ourselves on being forward-thinking, resilient, and people-centric. Our continued partnership with AIESEC Sri Lanka is a natural alignment of these shared values, and we look forward to strengthening this relationship as we collectively <span className="text-natcon-yellow font-semibold">shape the leaders of tomorrow</span>.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 font-sans italic">
                      We are eager and excited to see where the future of this meaningful partnership takes us.
                    </p>
                  </motion.div>

                  {/* Person info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-6 pt-5 border-t border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4">
                      <div className="text-center md:text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-white font-mono tracking-wide">
                          Chamath Alwis
                        </h4>
                        <p className="text-natcon-orange text-sm sm:text-base font-medium">
                          AGM Brand Development
                        </p>
                        <p className="natcon-gradient-text text-sm sm:text-base font-bold tracking-wider mt-0.5">
                          Ceylinco Life
                        </p>
                      </div>

                      {/* Ceylinco Life logo */}
                      <div className="sm:ml-auto">
                        <div className="w-24 h-12 sm:w-28 sm:h-14 relative opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                          <Image
                            src="/partners/Ceylinco Life.png"
                            alt="Ceylinco Life"
                            fill
                            className="object-contain"
                            sizes="112px"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom accent gradient */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-natcon-green via-natcon-orange to-natcon-red animate-gradient-shift"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
