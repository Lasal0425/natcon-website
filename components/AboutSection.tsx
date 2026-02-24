"use client";

import { useRef, useState, useEffect, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── SVG Icons ─────────────────────────────────────────────────────────────

function UniversityIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="pb-5 transition-all duration-300 ease-in-out"
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
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="pb-5 transition-all duration-300 ease-in-out"
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
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="pb-5 transition-all duration-300 ease-in-out"
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
  { Icon: UniversityIcon, target: 20, suffix: "+", label: "Universities" },
  { Icon: CalendarIcon, target: 3, suffix: "", label: "Days" },
  { Icon: PeopleIcon, target: 350, suffix: "+", label: "Delegates" },
];

interface StatCardProps {
  Icon: ElementType;
  target: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}

function StatCard({ Icon, target, suffix, label, active, index }: StatCardProps) {
  const count = useCounter(target, 1800, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative"
    >
      {/* Animated gradient border wrapper */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift blur-[1px]"></div>

      <div className="relative bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-natcon-red to-transparent group-hover:w-full transition-all duration-500"></div>

        {/* Hover glow behind card */}
        <div className="absolute inset-0 bg-natcon-red/0 group-hover:bg-natcon-red/5 transition-colors duration-500 rounded-2xl"></div>

        {/* Icon with glow */}
        <div className="relative text-gray-300 group-hover:text-natcon-red transition-colors duration-300 flex items-center justify-center">
          <div className="absolute inset-0 bg-natcon-red/0 group-hover:bg-natcon-red/20 blur-xl rounded-full transition-all duration-500"></div>
          <div className="relative">
            <Icon />
          </div>
        </div>

        {/* Animated number + suffix */}
        <h3 className="text-xl md:text-3xl font-bold font-mono text-center mt-2 text-white group-hover:text-natcon-yellow transition-colors duration-300 relative">
          <span className="tabular-nums">{count}</span>
          <span className="text-natcon-yellow">{suffix}</span>
          <span className="block text-sm md:text-base font-normal text-gray-400 mt-2 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors duration-300">{label}</span>
        </h3>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[1px] bg-gradient-to-r from-transparent via-natcon-orange to-transparent transition-all duration-700"></div>
      </div>
    </motion.div>
  );
}

// ─── Floating particle component ──────────────────────────────────────────

function FloatingParticles() {
  const particles = [
    { x: "5%", y: "10%", size: 3, delay: 0, duration: 8 },
    { x: "15%", y: "60%", size: 2, delay: 1.5, duration: 10 },
    { x: "25%", y: "30%", size: 4, delay: 0.8, duration: 7 },
    { x: "40%", y: "80%", size: 2, delay: 2.2, duration: 9 },
    { x: "55%", y: "15%", size: 3, delay: 0.5, duration: 11 },
    { x: "70%", y: "50%", size: 2, delay: 1.8, duration: 8 },
    { x: "80%", y: "25%", size: 3, delay: 3.0, duration: 10 },
    { x: "90%", y: "70%", size: 2, delay: 0.3, duration: 9 },
    { x: "35%", y: "45%", size: 2, delay: 2.5, duration: 12 },
    { x: "65%", y: "85%", size: 3, delay: 1.0, duration: 7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: i % 3 === 0
              ? "rgba(240, 45, 58, 0.4)"
              : i % 3 === 1
                ? "rgba(254, 173, 52, 0.3)"
                : "rgba(0, 196, 154, 0.3)",
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            scale: [1, 1.5, 1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────

export default function AboutEvent() {
  const COMING_SOON = true;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative z-20 py-20 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* ── Background effects ── */}
      <FloatingParticles />

      {/* Large ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-natcon-red/8 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-natcon-blue/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-natcon-orange/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ── Decorative top gradient divider ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-natcon-red/60 to-transparent"></div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14 flex items-center justify-center relative"
      >
        {/* Glow behind title */}
        <div className="absolute w-64 h-16 bg-natcon-red/15 blur-[60px] rounded-full"></div>
        <Image
          src="/topics/AboutNatcon.png"
          alt="About Natcon"
          width={800}
          height={64}
          className="pb-5 hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(240,45,58,0.3)] transition-all duration-500 ease-in-out relative z-10"
        />
      </motion.div>

      {/* ── About paragraph with enhanced card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-4xl mx-auto text-center pb-16 relative"
      >
        {/* Animated border glow wrapper */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-natcon-red/40 via-natcon-orange/30 to-natcon-green/40 animate-gradient-shift opacity-60"></div>

        <div className="relative p-10 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/5 shadow-2xl overflow-hidden">
          {/* Animated top accent gradient */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-green animate-gradient-shift"></div>

          {/* Subtle inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-natcon-red/5 blur-[40px] pointer-events-none"></div>

          {/* Scanning light effect */}
          <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-line-scan pointer-events-none"></div>

          <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-sans tracking-wide relative z-10">
            The{" "}
            <span
              className="font-bold text-2xl font-mono"
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
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 font-mono relative z-10"
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
        className="flex flex-col sm:flex-row justify-center gap-6 max-w-5xl mx-auto mb-20 font-mono px-4"
      >
        <a
          href="/register"
          className="group relative overflow-hidden text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 flex items-center justify-center gap-3 text-xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-natcon-red to-natcon-red/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl shadow-[0_0_0_1px_rgba(240,45,58,0.5)] group-hover:shadow-[0_0_25px_rgba(240,45,58,0.5),0_0_0_1px_rgba(240,45,58,0.8)] transition-shadow duration-300"></div>
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
          className="group relative overflow-hidden text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 flex items-center justify-center gap-3 text-xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-natcon-green/90 to-natcon-green/70 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl shadow-[0_0_0_1px_rgba(0,196,154,0.5)] group-hover:shadow-[0_0_25px_rgba(0,196,154,0.5),0_0_0_1px_rgba(0,196,154,0.8)] transition-shadow duration-300"></div>
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
          className="max-w-5xl mx-auto flex flex-col items-center justify-center py-16 sm:py-24 relative"
        >
          {/* Animated glow orbs in background */}
          <div className="absolute w-72 h-72 bg-natcon-red/20 rounded-full blur-[100px] animate-glow-pulse top-0 -left-20 pointer-events-none"></div>
          <div className="absolute w-64 h-64 bg-red-500/15 rounded-full blur-[80px] animate-glow-pulse bottom-0 -right-16 pointer-events-none" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute w-48 h-48 bg-natcon-orange/10 rounded-full blur-[60px] animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animationDelay: "0.8s" }}></div>

          {/* Expanding ring pulses */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/40 rounded-full animate-ring-expand pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/30 rounded-full animate-ring-expand pointer-events-none" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-natcon-red/20 rounded-full animate-ring-expand pointer-events-none" style={{ animationDelay: "2s" }}></div>

          {/* Card container with animated border */}
          <div className="relative z-10 w-full max-w-3xl">
            {/* Animated gradient border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-natcon-red via-natcon-orange to-natcon-red animate-gradient-shift opacity-50"></div>

            <div className="relative rounded-2xl bg-gray-900/80 backdrop-blur-md px-8 py-16 sm:px-12 sm:py-20 overflow-hidden">
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
                The reveal is approaching...
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
