"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/info", label: "Club" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-sm shadow-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">CH</span>
          </div>
          <span className="font-display font-bold text-lg text-text group-hover:text-primary transition-colors">
            Claude Hacks
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text transition-colors rounded-lg hover:bg-surface-light/50"
            >
              {l.label}
            </Link>
          ))}
          <span className="ml-3 bg-surface text-text-muted border border-border px-6 py-2.5 rounded-full text-sm font-semibold cursor-default">
            Sold Out
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-light/50 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span
              className={`block h-[2px] bg-text transition-all duration-300 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-text transition-all duration-300 ${
                open ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-text transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="px-6 py-6 space-y-1">
              {[...navLinks, { href: "#", label: "Sold Out" }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-text-secondary hover:text-text hover:bg-surface-light/50 rounded-lg transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
