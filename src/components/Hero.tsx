"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs sm:text-sm text-text-secondary font-mono">
              April 17–19, 2026 &middot; The Ohio State University
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">Claude</span>
          <br />
          <span className="text-text">Hacks</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Build the future with AI. A 3-day hackathon where 200+ students
          create groundbreaking projects powered by{" "}
          <span className="text-primary font-medium">Claude</span>.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Countdown />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            Register Now
          </Link>
          <Link
            href="/about"
            className="group glass text-text-secondary px-10 py-4 rounded-full text-lg font-medium hover:text-text transition-colors"
          >
            Learn More
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </motion.div>

        {/* Bottom stats line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex items-center justify-center gap-8 text-sm text-text-muted"
        >
          {["3 Days", "200+ Hackers", "$1,800+ in Prizes", "Free API Credits"].map((item, i) => (
            <span key={item} className="hidden sm:flex items-center gap-8">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-border-light mr-8" />}
              <span className="font-mono text-xs">{item}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
