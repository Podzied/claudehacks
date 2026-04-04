"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-04-17T16:00:00-04:00").getTime();

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

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-5 justify-center">
        {["Days", "Hours", "Min", "Sec"].map((label) => (
          <div key={label} className="text-center">
            <div className="glass rounded-xl px-3 sm:px-5 py-3 min-w-[60px] sm:min-w-[76px]">
              <div className="text-2xl sm:text-3xl font-display font-bold text-gradient tabular-nums">--</div>
            </div>
            <div className="text-[10px] sm:text-xs text-text-muted mt-2 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  const blocks = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {blocks.map((b) => (
        <div key={b.label} className="text-center">
          <div className="glass rounded-xl px-3 sm:px-5 py-3 min-w-[60px] sm:min-w-[76px]">
            <div className="text-2xl sm:text-3xl font-display font-bold text-gradient tabular-nums">
              {String(b.value).padStart(2, "0")}
            </div>
          </div>
          <div className="text-[10px] sm:text-xs text-text-muted mt-2 uppercase tracking-widest">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
