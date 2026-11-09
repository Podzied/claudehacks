"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOOLS = [
  "Claude API",
  "Claude Code",
  "Claude.ai",
  "Claude MCP",
  "Computer Use",
  "Anthropic SDK",
];

interface FormData {
  builder_name: string;
  builder_email: string;
  github_handle: string;
  discord_handle: string;
  linkedin_url: string;
  project_name: string;
  description: string;
  tools_used: string[];
  team_members: string;
  demo_url: string;
  github_url: string;
}

const INITIAL: FormData = {
  builder_name: "",
  builder_email: "",
  github_handle: "",
  discord_handle: "",
  linkedin_url: "",
  project_name: "",
  description: "",
  tools_used: [],
  team_members: "",
  demo_url: "",
  github_url: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const transition = { type: "spring" as const, stiffness: 300, damping: 30 };
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function SubmitFlow() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const STEPS = [
    { id: "name", label: "You" },
    { id: "handles", label: "Socials" },
    { id: "project", label: "Project" },
    { id: "description", label: "Details" },
    { id: "tools", label: "Tools" },
    { id: "team", label: "Team" },
    { id: "links", label: "Links" },
  ];

  const totalSteps = STEPS.length;

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, [step]);

  function canAdvance(): boolean {
    switch (step) {
      case 0: return !!data.builder_name.trim() && !!data.builder_email.trim();
      case 1: return true;
      case 2: return !!data.project_name.trim();
      case 3: return !!data.description.trim();
      case 4: return data.tools_used.length > 0;
      default: return true;
    }
  }

  function next() {
    if (!canAdvance()) return;
    if (step < totalSteps - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }

  function back() {
    if (step > 0) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  }

  function toggleTool(tool: string) {
    setData((d) => ({
      ...d,
      tools_used: d.tools_used.includes(tool)
        ? d.tools_used.filter((t) => t !== tool)
        : [...d.tools_used, tool],
    }));
  }

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tools_used: data.tools_used.join(", "),
          team_members: data.team_members || null,
          demo_url: data.demo_url || null,
          github_url: data.github_url || null,
          github_handle: data.github_handle || null,
          discord_handle: data.discord_handle || null,
          linkedin_url: data.linkedin_url || null,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <section className="section" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ fontSize: "var(--t-h1)", marginBottom: "var(--s-5)" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto" }}>
                <motion.circle
                  cx="32" cy="32" r="30"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M20 33l8 8 16-18"
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
              </svg>
            </div>
            <h1 style={{ marginBottom: "var(--s-4)" }}>You&apos;re in</h1>
            <p className="t-lead muted" style={{ maxWidth: "36ch", margin: "0 auto var(--s-7)" }}>
              We&apos;ll review <strong style={{ color: "var(--ink)" }}>{data.project_name}</strong> and
              reach out when it goes live on the showcase.
            </p>
            <div style={{ display: "flex", gap: "var(--s-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="/showcase">See the showcase</a>
              <a className="btn btn--ghost" href="/">Back home</a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="wrap" style={{ maxWidth: 640 }}>

        {/* Progress */}
        <div style={{ marginBottom: "var(--s-8)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--s-3)" }}>
            <span className="t-label muted">
              {step + 1} of {totalSteps}
            </span>
            <span className="t-label muted">
              {STEPS[step].label}
            </span>
          </div>
          <div style={{
            height: 3,
            borderRadius: 2,
            background: "var(--line)",
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%",
                borderRadius: 2,
                background: "var(--accent)",
              }}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            />
          </div>
        </div>

        {/* Steps */}
        <div style={{ minHeight: 280, position: "relative" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {step === 0 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>First, who are you?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    So we know who built the project.
                  </p>
                  <div style={{ display: "grid", gap: "var(--s-5)" }}>
                    <InputField
                      ref={inputRef as React.Ref<HTMLInputElement>}
                      label="Your name"
                      value={data.builder_name}
                      onChange={(v) => setData({ ...data, builder_name: v })}
                      placeholder="Jane Buckeye"
                      onKeyDown={onKeyDown}
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={data.builder_email}
                      onChange={(v) => setData({ ...data, builder_email: v })}
                      placeholder="buckeye.42@osu.edu"
                      onKeyDown={onKeyDown}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>Where can we find you?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    Optional — helps us connect and give credit.
                  </p>
                  <div style={{ display: "grid", gap: "var(--s-5)" }}>
                    <InputField
                      ref={inputRef as React.Ref<HTMLInputElement>}
                      label="GitHub username"
                      value={data.github_handle}
                      onChange={(v) => setData({ ...data, github_handle: v })}
                      placeholder="janebuckeye"
                      onKeyDown={onKeyDown}
                    />
                    <InputField
                      label="Discord handle"
                      value={data.discord_handle}
                      onChange={(v) => setData({ ...data, discord_handle: v })}
                      placeholder="jane#1234"
                      onKeyDown={onKeyDown}
                    />
                    <InputField
                      label="LinkedIn"
                      type="url"
                      value={data.linkedin_url}
                      onChange={(v) => setData({ ...data, linkedin_url: v })}
                      placeholder="https://linkedin.com/in/janebuckeye"
                      onKeyDown={onKeyDown}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>What&apos;s your project called?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    The name people know it by.
                  </p>
                  <InputField
                    ref={inputRef as React.Ref<HTMLInputElement>}
                    label="Project name"
                    value={data.project_name}
                    onChange={(v) => setData({ ...data, project_name: v })}
                    placeholder="My Claude App"
                    onKeyDown={onKeyDown}
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>What does it do?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    What problem does it solve? How does it use Claude? The best submissions tell a story.
                  </p>
                  <TextareaField
                    ref={inputRef as React.Ref<HTMLTextAreaElement>}
                    label="Description"
                    value={data.description}
                    onChange={(v) => setData({ ...data, description: v })}
                    placeholder="EagleEye monitors highway cameras and uses Claude's vision to detect crashes in real time..."
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>What Claude tools did you use?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    Pick all that apply.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-3)" }}>
                    {TOOLS.map((tool) => {
                      const active = data.tools_used.includes(tool);
                      return (
                        <motion.button
                          key={tool}
                          type="button"
                          onClick={() => toggleTool(tool)}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 20px",
                            borderRadius: "var(--r-btn)",
                            border: active ? "2px solid var(--accent)" : "2px solid var(--line)",
                            background: active ? "color-mix(in oklab, var(--accent) 10%, transparent)" : "var(--bg)",
                            color: active ? "var(--accent)" : "var(--ink)",
                            fontFamily: "var(--font-text)",
                            fontSize: "var(--t-body)",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 150ms var(--ease)",
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {active && (
                              <motion.svg
                                key="check"
                                width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <path d="M4.5 12.75l6 6 9-13.5" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                          {tool}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>Who else is on the team?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    Solo builders welcome. Skip this if it&apos;s just you.
                  </p>
                  <InputField
                    ref={inputRef as React.Ref<HTMLInputElement>}
                    label="Team members"
                    value={data.team_members}
                    onChange={(v) => setData({ ...data, team_members: v })}
                    placeholder="Comma-separated names"
                    onKeyDown={onKeyDown}
                  />
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 style={{ marginBottom: "var(--s-3)" }}>Any links to share?</h2>
                  <p className="t-lead muted" style={{ marginBottom: "var(--s-7)" }}>
                    Optional. A demo or repo helps us review faster.
                  </p>
                  <div style={{ display: "grid", gap: "var(--s-5)" }}>
                    <InputField
                      ref={inputRef as React.Ref<HTMLInputElement>}
                      label="Demo URL"
                      type="url"
                      value={data.demo_url}
                      onChange={(v) => setData({ ...data, demo_url: v })}
                      placeholder="https://myapp.vercel.app"
                      onKeyDown={onKeyDown}
                    />
                    <InputField
                      label="GitHub repo"
                      type="url"
                      value={data.github_url}
                      onChange={(v) => setData({ ...data, github_url: v })}
                      placeholder="https://github.com/you/project"
                      onKeyDown={onKeyDown}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              className="t-small"
              style={{ color: "#b91c1c", marginTop: "var(--s-4)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "var(--s-8)",
          paddingTop: "var(--s-5)",
          borderTop: "1px solid var(--line)",
        }}>
          <button
            type="button"
            onClick={back}
            className="btn btn--ghost"
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            Back
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)" }}>
            <span className="t-small muted" style={{ display: step < totalSteps - 1 ? undefined : "none" }}>
              Press Enter
            </span>
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance() || status === "submitting"}
              className="btn btn--primary"
              style={{ opacity: canAdvance() ? 1 : 0.4, cursor: canAdvance() ? "pointer" : "not-allowed" }}
            >
              {status === "submitting"
                ? "Submitting..."
                : step === totalSteps - 1
                ? "Submit project"
                : "Continue"}
              {status !== "submitting" && (
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true" style={{ marginLeft: 6 }}>
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── form primitives using the kit tokens ────────────────────── */

import React from "react";

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "var(--r-md)",
  border: "1px solid var(--line-strong)",
  background: "var(--bg)",
  color: "var(--ink)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--t-body)",
  lineHeight: 1.55,
  outline: "none",
  transition: "border-color 150ms var(--ease), box-shadow 150ms var(--ease)",
};

const labelStyles: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontFamily: "var(--font-text)",
  fontSize: "var(--t-label)",
  fontWeight: 500,
  color: "var(--muted)",
  letterSpacing: "0.01em",
};

const InputField = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  }
>(function InputField({ label, value, onChange, placeholder, type = "text", onKeyDown }, ref) {
  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLInputElement>}
        style={inputStyles}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 15%, transparent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line-strong)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
});

const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  }
>(function TextareaField({ label, value, onChange, placeholder }, ref) {
  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{ ...inputStyles, resize: "none" }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 15%, transparent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line-strong)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
});
