"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animatedLogo from "../public/animations/animated-bg-logo.json";

export default function HeroSection() {
  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-04-24T08:30:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden z-0"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/squid-game-bg.webm" type="video/webm" />
          <source src="/squid-game-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Animated Logo Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Lottie
          animationData={animatedLogo}
          loop
          autoplay
          className="w-96 h-96 md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] xl:w-[1300px] xl:h-[1300px]"
        />
      </div>

      {/* Countdown Timer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex justify-center gap-4 text-2xl font-mono">
          <div className="bg-squid-dark w-20 h-20 rounded-lg flex flex-col items-center justify-center">
            <div className="text-squid-pink font-bold">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-white/70">Days</div>
          </div>
          <div className="bg-squid-dark w-20 h-20 rounded-lg flex flex-col items-center justify-center">
            <div className="text-squid-pink font-bold">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-white/70">Hours</div>
          </div>
          <div className="bg-squid-dark w-20 h-20 rounded-lg flex flex-col items-center justify-center">
            <div className="text-squid-pink font-bold">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-white/70">Minutes</div>
          </div>
          <div className="bg-squid-dark w-20 h-20 rounded-lg flex flex-col items-center justify-center">
            <div className="text-squid-pink font-bold">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-white/70">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  );
}