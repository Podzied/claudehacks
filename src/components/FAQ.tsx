"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const faqs = [
  {
    q: "Who can participate?",
    a: "Any college student! Whether you're a beginner or experienced developer, Claude Hacks is open to all skill levels. You don't need prior AI or coding experience.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing! Claude Hacks is completely free. We provide meals, snacks, swag, and free Claude API credits for all participants.",
  },
  {
    q: "Do I need a team?",
    a: "You can register solo or with a team of up to 4 people. We'll have a team formation session at the start of the event for those looking for teammates.",
  },
  {
    q: "What should I build?",
    a: "Anything that uses Claude AI! We have multiple tracks including AI Agents, Education, Health & Wellness, and Open Innovation. Get creative!",
  },
  {
    q: "What do I need to bring?",
    a: "Just your laptop and charger. We'll provide everything else — food, drinks, workspace, Wi-Fi, and API credits.",
  },
  {
    q: "Will there be mentors?",
    a: "Yes! We'll have mentors from Anthropic and industry experts available throughout the event to help with technical questions and project guidance.",
  },
  {
    q: "Where is the venue?",
    a: "Claude Hacks will be held at Pomerene 280, 1760 Neil Ave, Columbus, OH 43210 on The Ohio State University campus. Friday 6–8 PM and Sunday 12–3 PM.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">FAQ</h2>
          <p className="text-text-muted text-center mb-12">
            Everything you need to know.
          </p>
        </FadeIn>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-surface-light/30 transition-colors"
                >
                  <span className="font-medium text-sm text-text pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-text-muted text-lg shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
