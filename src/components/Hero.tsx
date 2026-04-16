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
  { x: "10%", y: "20%", delay: 0, size: 40, opacity: 0.1 },
  { x: "85%", y: "15%", delay: 1.5, size: 56, opacity: 0.07 },
  { x: "75%", y: "75%", delay: 3, size: 48, opacity: 0.08 },
  { x: "15%", y: "70%", delay: 2, size: 36, opacity: 0.06 },
  { x: "50%", y: "85%", delay: 4, size: 32, opacity: 0.05 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
      {/* Dot grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Soft gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[130px] animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] animate-float" style={{ animationDelay: "-5s" }} />

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
          <ClaudeLogo className="w-10 h-10" />
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/15 shimmer">
            <ClaudeLogo className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-8 glow-ring">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs sm:text-sm text-text-secondary font-mono">
              April 17–19, 2026
            </span>
            <span className="w-px h-3 bg-border" />
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
          <span className="text-gradient-animated">Claude</span>
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
          Build the future with AI. 100 students building
          groundbreaking projects powered by{" "}
          <span className="text-primary font-medium">Claude</span>.
          {" "}<span className="text-text-muted">Registration is now closed.</span>
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
          <div className="relative">
            <span className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary border border-primary/30 px-10 py-4 rounded-full text-lg font-semibold cursor-default inline-block">
              Registration Closed
            </span>
            <span className="block text-xs text-text-muted mt-2 font-mono">100/100 spots filled</span>
          </div>
          <Link
            href="/about"
            className="group glass glow-ring text-text-secondary px-10 py-4 rounded-full text-lg font-medium hover:text-text transition-colors"
          >
            Learn More
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </motion.div>

        {/* Judge company logos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 mb-8"
        >
          <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-5">Judges from</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* NVIDIA */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="h-5 w-5 text-[#76B900]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.948 8.798V7.157c.074-.009.15-.016.228-.02 2.272-.105 4.039 1.392 4.039 1.392s-2.086 2.417-4.267 2.417c0 0-.686-.089-1.382-.404V8.798h1.382zm0-3.834v1.36l-.228.024C5.202 6.723 3.1 9.645 3.1 9.645s2.985 3.53 6.278 3.53c1.259 0 2.666-.525 2.666-.525V7.205s-1.407-1.593-3.867-1.593c-.418 0-.832.06-1.229.152v.2zm0-2.048V1.5l-.128.012c-5.32.504-8.82 5.652-8.82 5.652S3.682 12.93 8.72 12.93c1.536 0 3.179-.618 3.179-.618V5.906S10.164 3.576 7.72 3.576c-.328 0-.564.04-.564.04v-.7h1.792zm7.072 1.284v9.6h2.4V4.2h-2.4zM24 4.2h-3.168l-3.072 5.376L20.832 14.8H24l-3.072-5.224L24 4.2z"/>
              </svg>
              <span className="text-sm sm:text-base font-display font-semibold text-text-secondary">NVIDIA</span>
            </div>
            {/* Meta */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="h-5 w-5 text-[#0081FB]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.915 4.03c-1.968 0-3.489 1.236-4.5 3.09C1.243 9.216.715 12.207.715 14.315c0 2.948 1.232 4.97 3.8 4.97 1.612 0 3.105-1.16 4.485-3.03l1.485-2.04c-.576-.9-1.08-1.92-1.44-2.97-.54-1.56-.84-3.12-.84-4.35 0-.72.12-1.35.36-1.86A3.12 3.12 0 006.915 4.03zM17.085 4.03c-1.968 0-3.489 1.236-4.5 3.09l.075.12c.576.9 1.08 1.92 1.44 2.97.54 1.56.84 3.12.84 4.35 0 .72-.12 1.35-.36 1.86a3.12 3.12 0 002.55 1.005c1.968 0 3.489-1.236 4.5-3.09 1.172-2.096 1.7-5.087 1.7-7.195 0-2.948-1.232-4.97-3.8-4.97-1.612 0-3.105 1.16-4.485 3.03l-1.485 2.04c.576.9 1.08 1.92 1.44 2.97z"/>
              </svg>
              <span className="text-sm sm:text-base font-display font-semibold text-text-secondary">Meta</span>
            </div>
            {/* Google */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm sm:text-base font-display font-semibold text-text-secondary">Google</span>
            </div>
            {/* IGS Energy */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-6 w-6 rounded-md bg-[#00A651] flex items-center justify-center">
                <span className="text-white font-display font-bold text-[10px]">IGS</span>
              </div>
              <span className="text-sm sm:text-base font-display font-semibold text-text-secondary">IGS Energy</span>
            </div>
            {/* AWS */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="h-5 w-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.348.348 0 01.056.192c0 .08-.048.16-.152.24l-.504.336a.38.38 0 01-.208.072c-.08 0-.16-.04-.24-.112a2.476 2.476 0 01-.288-.376 6.195 6.195 0 01-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648s1.136-.624 1.96-.624c.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.296-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.264a2.16 2.16 0 01-.264.096.464.464 0 01-.12.016c-.104 0-.152-.072-.152-.224V5.92c0-.12.016-.208.056-.264a.56.56 0 01.216-.136c.28-.144.616-.264 1.008-.36a4.636 4.636 0 011.24-.152c.944 0 1.632.216 2.072.64.432.424.656 1.072.656 1.928v2.54h.008zM3.52 11.24c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.52.128-.152.224-.32.28-.512.056-.2.088-.44.088-.72V9.04a6.37 6.37 0 00-.736-.128 5.947 5.947 0 00-.752-.048c-.536 0-.928.104-1.184.32-.256.216-.384.528-.384.936 0 .384.096.672.296.864.192.2.472.296.84.296l-.032.06zm8.12 1.096c-.136 0-.224-.024-.28-.08-.056-.048-.104-.16-.144-.304l-1.616-5.32a1.306 1.306 0 01-.064-.32c0-.128.064-.2.192-.2h.792c.144 0 .24.024.288.08.056.048.096.16.136.304l1.152 4.544 1.072-4.544c.032-.152.072-.256.128-.304a.458.458 0 01.296-.08h.648c.144 0 .24.024.296.08.056.048.104.16.128.304l1.088 4.6 1.192-4.6c.04-.152.088-.256.136-.304.056-.048.152-.08.288-.08h.752c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.088 1.088 0 01-.048.2l-1.664 5.32c-.04.152-.088.256-.144.304-.056.048-.152.08-.28.08h-.696c-.144 0-.24-.024-.296-.08-.056-.056-.104-.16-.128-.312l-1.064-4.432-1.056 4.424c-.032.152-.072.256-.128.312-.056.056-.16.08-.296.08h-.696v.004zm13.008.272c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.928-.312-.136-.072-.224-.152-.256-.224a.556.556 0 01-.048-.224V11.4c0-.152.056-.224.16-.224a.4.4 0 01.128.016l.176.072c.24.112.504.2.784.264.288.064.568.096.856.096.456 0 .808-.08 1.056-.24.248-.16.376-.4.376-.712a.783.783 0 00-.216-.56c-.144-.16-.416-.296-.808-.432l-1.16-.36c-.584-.184-1.016-.456-1.28-.816-.264-.352-.4-.744-.4-1.16 0-.336.072-.632.224-.888.152-.256.352-.48.608-.648a2.72 2.72 0 01.872-.408c.328-.096.68-.136 1.04-.136.184 0 .376.008.56.032.192.024.368.056.544.096.168.04.328.08.48.128.152.048.272.096.36.144a.72.72 0 01.256.2.448.448 0 01.072.272v.264c0 .152-.056.232-.16.232a.72.72 0 01-.264-.096 3.2 3.2 0 00-1.344-.28c-.416 0-.744.064-.984.2-.24.136-.36.344-.36.632 0 .208.08.392.24.544.16.152.456.304.872.44l1.128.36c.576.184 1 .44 1.256.768.256.328.384.704.384 1.12 0 .344-.072.656-.208.928-.144.272-.336.512-.584.696a2.6 2.6 0 01-.888.448c-.344.104-.712.16-1.1.16z"/>
                <path d="M21.384 16.752c-2.616 1.936-6.408 2.968-9.672 2.968-4.576 0-8.696-1.696-11.808-4.512-.248-.224-.024-.528.272-.352 3.36 1.96 7.52 3.136 11.816 3.136 2.896 0 6.08-.6 9.016-1.848.44-.2.816.288.376.608z"/>
                <path d="M22.46 15.464c-.336-.432-2.224-.208-3.08-.104-.256.032-.296-.192-.064-.36 1.504-1.056 3.976-.752 4.264-.4.288.36-.08 2.832-1.488 4.016-.216.184-.424.088-.328-.152.32-.792 1.032-2.576.696-3z"/>
              </svg>
              <span className="text-sm sm:text-base font-display font-semibold text-text-secondary">AWS</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats — bento pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-0"
        >
          {[
            { label: "3 Days", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Sold Out", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
            { label: "$1,800+", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.27.308 6.023 6.023 0 01-2.27-.308" },
            { label: "Free Credits", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-2 glass rounded-full px-4 py-2 sm:rounded-none sm:first:rounded-l-full sm:last:rounded-r-full sm:border-r-0 sm:last:border-r">
              <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="font-mono text-[10px] sm:text-xs text-text-muted">{item.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
