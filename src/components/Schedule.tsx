"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const schedule = {
  "Day 1 — April 17": [
    { time: "4:00 PM", event: "Check-in & Registration", type: "main" },
    { time: "5:00 PM", event: "Opening Ceremony & Keynote", type: "main" },
    { time: "6:00 PM", event: "Dinner & Team Formation", type: "food" },
    { time: "7:00 PM", event: "Hacking Begins!", type: "highlight" },
    { time: "9:00 PM", event: "Workshop: Getting Started with Claude API", type: "workshop" },
    { time: "11:00 PM", event: "Late Night Snacks", type: "food" },
  ],
  "Day 2 — April 18": [
    { time: "8:00 AM", event: "Breakfast", type: "food" },
    { time: "10:00 AM", event: "Workshop: Advanced Prompt Engineering", type: "workshop" },
    { time: "12:00 PM", event: "Lunch", type: "food" },
    { time: "2:00 PM", event: "Workshop: Building AI Agents", type: "workshop" },
    { time: "4:00 PM", event: "Mentor Office Hours", type: "main" },
    { time: "6:00 PM", event: "Dinner", type: "food" },
    { time: "8:00 PM", event: "Fun Activities & Games", type: "highlight" },
    { time: "11:00 PM", event: "Midnight Snacks", type: "food" },
  ],
  "Day 3 — April 19": [
    { time: "8:00 AM", event: "Breakfast", type: "food" },
    { time: "10:00 AM", event: "Hacking Ends — Submissions Due", type: "highlight" },
    { time: "11:00 AM", event: "Project Expo & Judging", type: "main" },
    { time: "1:00 PM", event: "Lunch", type: "food" },
    { time: "2:00 PM", event: "Closing Ceremony & Awards", type: "highlight" },
    { time: "3:30 PM", event: "Wrap Up & Goodbye", type: "main" },
  ],
};

const days = Object.keys(schedule);

const typeColors: Record<string, string> = {
  main: "bg-text-muted/20",
  food: "bg-green-500/20",
  workshop: "bg-blue-500/20",
  highlight: "bg-primary/20",
};

const typeDots: Record<string, string> = {
  main: "bg-text-muted",
  food: "bg-green-500",
  workshop: "bg-blue-500",
  highlight: "bg-primary",
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <section className="py-24" id="schedule">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">Schedule</h2>
          <p className="text-text-muted text-center mb-12 max-w-md mx-auto">
            Three days of hacking, learning, and building with Claude AI.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex justify-center gap-2 mb-10">
            {days.map((day, i) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeDay === day
                    ? "btn-glow text-white"
                    : "glass text-text-muted hover:text-text"
                }`}
              >
                Day {i + 1}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-center mb-8">
              <span className="font-mono text-xs text-primary">{activeDay}</span>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[79px] sm:left-[95px] top-0 bottom-0 w-px bg-border" />
              <div className="space-y-1">
                {schedule[activeDay as keyof typeof schedule].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="text-xs sm:text-sm text-text-muted font-mono w-16 sm:w-20 shrink-0 text-right">
                      {item.time}
                    </span>
                    <div className="relative z-10">
                      <div className={`w-2.5 h-2.5 rounded-full ${typeDots[item.type]} ring-4 ring-bg`} />
                    </div>
                    <div className={`flex-1 py-3 px-4 rounded-lg ${typeColors[item.type]} group-hover:bg-surface-light/50 transition-colors`}>
                      <span className="text-sm text-text">{item.event}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
