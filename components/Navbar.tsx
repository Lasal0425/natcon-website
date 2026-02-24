"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS } from "../constants/NavBar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src="/loog.png"
                  alt="NLDS Logo"
                  width={120}
                  height={0}
                  className="h-auto w-[120px]"
                  priority
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 font-mono">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white transition-colors duration-200 font-medium relative group pl-4"
                >
                  <span className="relative">
                    {item.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out"
                      style={{ backgroundColor: "var(--natcon-red, #ff69b4)" }}
                    ></span>
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button text-white hover:text-gray-300 transition-colors duration-200 relative z-60"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Slide Panel */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/80 backdrop-blur-xl border-l border-gray-800/50 z-50 transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-end p-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-6">
          <nav className="space-y-2">
            {NAV_LINKS.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-6 py-4 text-white hover:bg-gray-800/50 transition-all duration-200 font-medium border-l-2 border-transparent hover:border-white/30 transform hover:translate-x-1 relative group`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <span className="relative">
                    {item.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out"
                      style={{ backgroundColor: "var(--natcon-red, #ff69b4)" }}
                    ></span>
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}