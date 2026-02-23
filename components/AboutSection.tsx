"use client";

import { useRef, useState, useEffect, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── SVG Icons (replace Circle.png / Triangle.png / Square.png) ───────────

function UniversityIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="pb-5 transition-all duration-300 ease-in-out"
    >
      {/* Roof */}
      <path
        d="M32 8 L6 24 L58 24 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Roof base bar */}
      <rect x="8" y="24" width="48" height="5" rx="1.5" fill="currentColor" opacity="0.35" />
      {/* Windows — 4 columns */}
      {[14, 24, 34, 44].map((x) => (
        <rect key={x} x={x} y="32" width="5" height="13" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
      ))}
      {/* Ground line */}
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
      {/* Outer rect */}
      <rect x="8" y="14" width="48" height="38" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Top bar */}
      <path d="M8 24 L56 24" stroke="currentColor" strokeWidth="2.5" />
      {/* Knobs */}
      <rect x="19" y="8" width="4" height="9" rx="2" fill="currentColor" />
      <rect x="41" y="8" width="4" height="9" rx="2" fill="currentColor" />
      {/* Three day dots */}
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
      {/* Left person head */}
      <circle cx="21" cy="20" r="6.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Right person head */}
      <circle cx="43" cy="20" r="6.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Left person body */}
      <path
        d="M5 52 C5 42 12.5 36 21 36 C29.5 36 37 42 37 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right person body (behind, slightly transparent) */}
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
      // cubic ease-out
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
}

function StatCard({ Icon, target, suffix, label, active }: StatCardProps) {
  const count = useCounter(target, 1800, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-gray-900/80 backdrop-blur-sm border-2 border-natcon-green hover:border-natcon-red rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(240,45,58,0.6)]"
    >
      {/* Icon */}
      <div className="text-gray-300 group-hover:text-natcon-red transition-colors duration-300 flex items-center justify-center">
        <Icon />
      </div>

      {/* Animated number + suffix */}
      <h3 className="text-xl md:text-2xl font-bold font-mono text-center mt-2 text-white group-hover:text-natcon-yellow transition-colors duration-300">
        <span>{count}</span>
        <span className="text-natcon-yellow">{suffix}</span>{" "}
        <span className="block text-sm md:text-base font-normal text-gray-400 mt-1 uppercase tracking-widest">{label}</span>
      </h3>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────

export default function AboutEvent() {
  const COMING_SOON = true;
  // Ref on the stats grid so we trigger the counter exactly when it scrolls in
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative z-20 py-16 px-6 md:px-12"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-center justify-center"
      >
        <Image
          src="/topics/AboutNatcon01.png"
          alt="About Natcon"
          width={800}
          height={64}
          className="pb-5 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out"
        />
      </motion.div>

      {/* ── About paragraph ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center pb-16"
      >
        <div className="relative p-8 rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-natcon-red to-transparent opacity-50"></div>

          <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-sans tracking-wide">
            The{" "}
            <span className="text-natcon-red font-bold text-2xl font-mono">
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
          <StatCard key={stat.label} {...stat} active={statsVisible} />
        ))}
      </div>

      {/* ── Buttons ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-center gap-6 max-w-5xl mx-auto mb-20 font-mono px-4"
      >
        <a
          href="/register"
          className="group relative bg-gray-900 border border-natcon-red text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:bg-natcon-red hover:shadow-[0_0_20px_rgba(240,45,58,0.5)] flex items-center justify-center gap-3 text-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
          <div className="w-8 h-8 flex items-center justify-center border-2 border-current rounded-full group-hover:border-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          Register
        </a>
        <a
          href="/store"
          className="group relative bg-gray-900 border border-green-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:bg-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center gap-3 text-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
          <div className="w-8 h-8 flex items-center justify-center border-2 border-current rounded-full group-hover:border-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 13h10l1.1-3H5.9l1.1 3zm9.83-7.83C16.55 5.05 16.25 5 16 5H5.83l-.59-1.76L4.5 2H2v2h1.67l3.5 10.5h10.67l3.5-10.5H22v-2h-1.17l-.83 2.47z" />
            </svg>
          </div>
          Buy Merch
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

