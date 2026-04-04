"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

function ClaudeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="30" r="5" fill="currentColor" />
      <circle cx="60" cy="90" r="5" fill="currentColor" />
      <circle cx="30" cy="60" r="5" fill="currentColor" />
      <circle cx="90" cy="60" r="5" fill="currentColor" />
      <circle cx="38.8" cy="38.8" r="5" fill="currentColor" />
      <circle cx="81.2" cy="38.8" r="5" fill="currentColor" />
      <circle cx="38.8" cy="81.2" r="5" fill="currentColor" />
      <circle cx="81.2" cy="81.2" r="5" fill="currentColor" />
    </svg>
  );
}

const floatingIcons = [
  { x: "10%", y: "20%", delay: 0, size: 40, opacity: 0.08 },
  { x: "85%", y: "15%", delay: 1.5, size: 56, opacity: 0.06 },
  { x: "75%", y: "75%", delay: 3, size: 48, opacity: 0.07 },
  { x: "15%", y: "70%", delay: 2, size: 36, opacity: 0.05 },
  { x: "50%", y: "85%", delay: 4, size: 32, opacity: 0.04 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient orbs — layered for depth */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[130px] animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-5s" }} />

      {/* Floating Claude logos */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-primary pointer-events-none"
          style={{ left: icon.x, top: icon.y, opacity: icon.opacity }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        >
          <ClaudeLogo className={`w-[${icon.size}px] h-[${icon.size}px]`} />
        </motion.div>
      ))}

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Claude logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <ClaudeLogo className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs sm:text-sm text-text-secondary font-mono">
              April 17–19, 2026
            </span>
            <span className="w-px h-3 bg-border-light" />
            <span className="text-xs sm:text-sm text-text-secondary font-mono">
              Pomerene Hall 280 &middot; Ohio State
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Build the future with AI. A 3-day hackathon where 200+ students
          create groundbreaking projects powered by{" "}
          <span className="text-primary font-medium">Claude</span>.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-10"
        >
          <Countdown />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
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

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 inline-flex items-center gap-6 glass rounded-full px-8 py-3"
        >
          {[
            { label: "3 Days", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "200+ Hackers", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
            { label: "$1,800+ in Prizes", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.27.308 6.023 6.023 0 01-2.27-.308" },
            { label: "Free API Credits", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" },
          ].map((item, i) => (
            <span key={item.label} className="hidden sm:flex items-center gap-2">
              {i > 0 && <span className="w-px h-4 bg-border-light -ml-3 mr-3" />}
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="font-mono text-xs text-text-muted">{item.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
