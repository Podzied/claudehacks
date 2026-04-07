"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-04-17T17:30:00-04:00").getTime();

function calc() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calc());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: mounted ? time.days : null, label: "Days" },
    { value: mounted ? time.hours : null, label: "Hours" },
    { value: mounted ? time.minutes : null, label: "Min" },
    { value: mounted ? time.seconds : null, label: "Sec" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {blocks.map((b) => (
        <div key={b.label} className="text-center">
          <div className="gradient-border rounded-2xl px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[80px] hover:!transform-none">
            <div className="text-2xl sm:text-4xl font-display font-bold text-gradient tabular-nums">
              {b.value !== null ? String(b.value).padStart(2, "0") : "--"}
            </div>
          </div>
          <div className="text-[10px] sm:text-xs text-text-muted mt-2.5 uppercase tracking-widest font-medium">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
