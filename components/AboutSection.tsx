"use client";

import { useRef, useState, useEffect, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── SVG Icons ─────────────────────────────────────────────────────────────

function UniversityIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      className="transition-all duration-300 ease-in-out"
    >
      <path
        d="M32 8 L6 24 L58 24 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="8" y="24" width="48" height="5" rx="1.5" fill="currentColor" opacity="0.35" />
      {[14, 24, 34, 44].map((x) => (
        <rect key={x} x={x} y="32" width="5" height="13" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
      ))}
      <path d="M4 48 L60 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      className="transition-all duration-300 ease-in-out"
    >
      <rect x="8" y="14" width="48" height="38" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M8 24 L56 24" stroke="currentColor" strokeWidth="2.5" />
      <rect x="19" y="8" width="4" height="9" rx="2" fill="currentColor" />
      <rect x="41" y="8" width="4" height="9" rx="2" fill="currentColor" />
      <circle cx="22" cy="37" r="3.5" fill="currentColor" opacity="0.55" />
      <circle cx="32" cy="37" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="42" cy="37" r="3.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      className="transition-all duration-300 ease-in-out"
    >
      <circle cx="21" cy="20" r="6.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="43" cy="20" r="6.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path
        d="M5 52 C5 42 12.5 36 21 36 C29.5 36 37 42 37 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M43 36 C51.5 36 58 42 58 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

// ─── Animated counter hook ────────────────────────────────────────────────

function useCounter(target: number, duration: number = 1800, active: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const start = performance.now();
    let frame: number;

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return count;
}

// ─── Single stat card ─────────────────────────────────────────────────────

const STATS = [
  { Icon: UniversityIcon, target: 20, suffix: "+", label: "Universities", color: "natcon-red" },
  { Icon: CalendarIcon, target: 3, suffix: "", label: "Days", color: "natcon-orange" },
  { Icon: PeopleIcon, target: 350, suffix: "+", label: "Delegates", color: "natcon-green" },
];

interface StatCardProps {
  Icon: ElementType;
  target: number;
  suffix: string;
  label: string;
  color: string;
  active: boolean;
  index: number;
}

function StatCard({ Icon, target, suffix, label, color, active, index }: StatCardProps) {
  const count = useCounter(target, 1800, active);

  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; via: string }> = {
    "natcon-red": {
      bg: "bg-natcon-red/10",
      text: "text-natcon-red",
      border: "border-natcon-red/30",
      glow: "shadow-natcon-red/20",
      via: "via-natcon-red",
    },
    "natcon-orange": {
      bg: "bg-natcon-orange/10",
      text: "text-natcon-orange",
      border: "border-natcon-orange/30",
      glow: "shadow-natcon-orange/20",
      via: "via-natcon-orange",
    },
    "natcon-green": {
      bg: "bg-natcon-green/10",
      text: "text-natcon-green",
      border: "border-natcon-green/30",
      glow: "shadow-natcon-green/20",
      via: "via-natcon-green",
    },
  };

  const c = colorMap[color] || colorMap["natcon-red"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="group relative"
    >
      {/* Animated gradient border wrapper */}
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift blur-[1px]`}></div>

      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center hover:scale-[1.03] transition-all duration-500 ease-out overflow-hidden border border-white/5">
        {/* Top accent line */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent ${c.via} to-transparent group-hover:w-full transition-all duration-700`}></div>

        {/* Hover glow */}
        <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>

        {/* Icon container with ring */}
        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 ${c.border} group-hover:border-opacity-80 flex items-center justify-center mb-4 transition-all duration-500`}>
          <div className={`relative ${c.text} transition-colors duration-300`}>
            <Icon />
          </div>
        </div>

        {/* Animated number */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-center text-white relative">
          <span className="tabular-nums">{count}</span>
          <span className={`${c.text}`}>{suffix}</span>
        </h3>

        {/* Label */}
        <span className="block text-xs sm:text-sm font-medium text-gray-400 mt-2 uppercase tracking-[0.25em] group-hover:text-gray-200 transition-colors duration-300">
          {label}
        </span>

        {/* Bottom glow accent */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[1px] bg-gradient-to-r from-transparent ${c.via} to-transparent transition-all duration-700`}></div>
      </div>
    </motion.div>
  );
}

// ─── Floating particle component ──────────────────────────────────────────

// FloatingParticles removed — 15 infinitely-animating elements crash mobile GPUs


// ─── Main component ───────────────────────────────────────────────────────

export default function AboutEvent() {
  const COMING_SOON = true;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative z-20 py-20 sm:py-28 px-4 sm:px-6 md:px-12 overflow-hidden bg-black/90"
    >
      {/* ── Ambient glow blobs — lightweight ── */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-natcon-red/8 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute -bottom-20 right-1/4 w-56 h-56 bg-natcon-blue/10 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-natcon-orange/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* ── Decorative top gradient divider ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-natcon-red/60 to-transparent"></div>

      {/* ── Title with enhanced glow ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-4 sm:mb-6 flex items-center justify-center relative"
      >
        {/* Glow behind title */}
        <div className="absolute w-64 h-16 bg-natcon-red/15 blur-[40px] rounded-full"></div>
        <Image
          src="/topics/About-Natcon.png"
          alt="About Natcon"
          width={800}
          height={64}
          className="pb-5 max-w-[90vw] md:max-w-none hover:scale-105 hover:drop-shadow-[0_0_35px_rgba(240,45,58,0.4)] transition-all duration-500 ease-in-out relative z-10"
        />
      </motion.div>

      {/* ── About paragraph with enhanced glassmorphism card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-4xl mx-auto text-center pb-16 sm:pb-20 relative px-2 sm:px-0"
      >


        <div className="relative p-6 sm:p-8 md:p-12 rounded-3xl bg-gray-900/60 backdrop-blur-sm border border-white/5 shadow-2xl overflow-hidden">
          {/* Top accent gradient */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green animate-gradient-shift"></div>



          <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-gray-200 font-sans tracking-wide relative z-10">
            The{" "}
            <span
              className="font-bold text-xl sm:text-2xl font-mono"
              style={{
                backgroundImage: "linear-gradient(90deg, #F02D3A, #FEAD34)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              National Conference (NatCon){" "}
            </span>
            is the largest conference organized by AIESEC in Sri Lanka,
            bringing together over <span className="text-natcon-yellow font-bold">350+ delegates</span> from more than <span className="text-natcon-yellow font-bold">20 prestigious
              universities</span> across the country. It serves as a platform for
            AIESECers from all over Sri Lanka to connect, expand their networks,
            and foster the development of the next generation of leaders.
          </p>


        </div>
      </motion.div>

      {/* ── Stats grid (counter triggers here) ── */}
      <div
        ref={statsRef}
        className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-16 sm:mb-20 font-mono relative z-10"
      >
        {STATS.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} active={statsVisible} />
        ))}
      </div>

      {/* ── Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 max-w-5xl mx-auto mb-20 sm:mb-24 font-mono px-4"
      >
        <a
          href="/register"
          className="group relative overflow-hidden text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 flex items-center justify-center gap-3 text-lg sm:text-xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-natcon-red to-natcon-red/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl shadow-[0_0_0_1px_rgba(240,45,58,0.5)] group-hover:shadow-[0_0_30px_rgba(240,45,58,0.4),0_0_0_1px_rgba(240,45,58,0.8)] transition-shadow duration-300"></div>
          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>

          <div className="w-8 h-8 flex items-center justify-center border-2 border-white/70 rounded-full group-hover:border-white transition-colors relative z-10">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <span className="relative z-10">Register</span>
        </a>

        <a
          href="/store"
          className="group relative overflow-hidden text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 flex items-center justify-center gap-3 text-lg sm:text-xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-natcon-green/90 to-natcon-green/70 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl shadow-[0_0_0_1px_rgba(0,196,154,0.5)] group-hover:shadow-[0_0_30px_rgba(0,196,154,0.4),0_0_0_1px_rgba(0,196,154,0.8)] transition-shadow duration-300"></div>
          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>

          <div className="w-8 h-8 flex items-center justify-center border-2 border-white/70 rounded-full group-hover:border-white transition-colors relative z-10">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 13h10l1.1-3H5.9l1.1 3zm9.83-7.83C16.55 5.05 16.25 5 16 5H5.83l-.59-1.76L4.5 2H2v2h1.67l3.5 10.5h10.67l3.5-10.5H22v-2h-1.17l-.83 2.47z" />
            </svg>
          </div>
          <span className="relative z-10">Buy Merch</span>
        </a>
      </motion.div>

      {/* ── Toggleable Sections ── */}
      {COMING_SOON ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-mono pt-10 pb-20"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white animate-pulse">
            <span className="text-yellow-700">Stay tuned!</span>
          </h2>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white animate-pulse pt-6">
            More details will be revealed soon.
          </h2>
        </motion.div>
      ) : (
        <>
          {/* ── Watch Trailer ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 font-mono"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Watch Trailer
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/g5W1SHX7Pc8"
                title="NatCon Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* ── Details (Location + Date) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12 font-mono">
            <motion.a
              whileHover={{ scale: 1.03 }}
              href="https://www.citrusleisure.com/waskaduwa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group"
            >
              <div className="bg-gray-900 border-2 border-natcon-green group-hover:border-natcon-red group-hover:shadow-[0_0_15px_rgba(240,45,58,0.5)] rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-full">
                <div className="w-20 h-20 flex items-center justify-center border-2 border-natcon-green group-hover:border-natcon-red rounded-full mb-6 transition-colors duration-300">
                  <svg className="w-10 h-10 text-gray-300 group-hover:text-natcon-red transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-mono text-center text-white group-hover:text-natcon-red transition-colors">
                  Citrus Hotel Waskaduwa
                </h3>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900 border-2 border-natcon-green hover:border-natcon-red hover:shadow-[0_0_15px_rgba(240,45,58,0.5)] rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-full"
            >
              <div className="w-20 h-20 flex items-center justify-center border-2 border-natcon-green group-hover:border-natcon-red rounded-full mb-6 transition-colors duration-300">
                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-mono text-center text-white">April 24th - 26th</h3>
            </motion.div>
          </div>

          {/* ── Watch Location Reveal ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 font-mono pt-5"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Location Reveal
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/CHTtsI7xGx8"
                title="Location Reveal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
