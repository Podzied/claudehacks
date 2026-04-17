"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubmissionData {
  teamName: string;
  projectName: string;
  projectDescription: string;
  track: string;
  githubLink: string;
  demoLink: string;
  members: { fullName: string; email: string }[];
}

const initialForm: SubmissionData = {
  teamName: "",
  projectName: "",
  projectDescription: "",
  track: "",
  githubLink: "",
  demoLink: "",
  members: [{ fullName: "", email: "" }],
};

interface Errors {
  [key: string]: string;
}

function validate(form: SubmissionData): Errors {
  const errors: Errors = {};
  if (!form.teamName.trim()) errors.teamName = "Team name is required";
  if (!form.projectName.trim()) errors.projectName = "Project name is required";
  if (!form.projectDescription.trim()) errors.projectDescription = "Project description is required";
  if (!form.track) errors.track = "Please select a track";
  if (!form.githubLink.trim()) errors.githubLink = "GitHub link is required";

  form.members.forEach((m, i) => {
    if (!m.fullName.trim()) errors[`member_${i}_fullName`] = "Name is required";
    if (!m.email.trim()) errors[`member_${i}_email`] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email))
      errors[`member_${i}_email`] = "Invalid email";
  });

  return errors;
}

export default function SubmitForm() {
  const [form, setForm] = useState<SubmissionData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [step, setStep] = useState(1);

  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleMemberChange = (index: number, field: "fullName" | "email", value: string) => {
    setForm((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
    clearError(`member_${index}_${field}`);
  };

  const addMember = () => {
    if (form.members.length < 4) {
      setForm((prev) => ({
        ...prev,
        members: [...prev.members, { fullName: "", email: "" }],
      }));
    }
  };

  const removeMember = (index: number) => {
    if (form.members.length > 1) {
      setForm((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const canGoToStep2 = () => {
    const errs: Errors = {};
    let valid = true;
    form.members.forEach((m, i) => {
      if (!m.fullName.trim()) { errs[`member_${i}_fullName`] = "Name is required"; valid = false; }
      if (!m.email.trim()) { errs[`member_${i}_email`] = "Email is required"; valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) { errs[`member_${i}_email`] = "Invalid email"; valid = false; }
    });
    if (!form.teamName.trim()) { errs.teamName = "Team name is required"; valid = false; }
    if (!valid) setErrors((prev) => ({ ...prev, ...errs }));
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Submitted!</h2>
        <p className="text-text-muted max-w-md mx-auto">
          Your project has been submitted for Claude Hacks. Good luck!
          Judging begins at 12:00 PM on Sunday, April 19.
        </p>
      </motion.div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm text-text transition-all outline-none ${
      errors[field]
        ? "bg-red-500/10 border border-red-500/30 focus:border-red-500/60"
        : "bg-surface border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
    }`;

  const labelClass = "block text-sm font-medium text-text-secondary mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (s < step) setStep(s);
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s === step
                  ? "bg-gradient-primary text-white"
                  : s < step
                  ? "bg-primary/20 text-primary cursor-pointer"
                  : "bg-surface border border-border text-text-muted"
              }`}
            >
              {s < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </button>
            {s < 2 && (
              <div className={`w-12 h-0.5 ${s < step ? "bg-primary/40" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Team Info */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="gradient-border p-6 sm:p-8 rounded-2xl">
              <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">1</span>
                Team Info
              </h3>

              <div className="mb-6">
                <label className={labelClass}>Team Name *</label>
                <input
                  value={form.teamName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, teamName: e.target.value }));
                    clearError("teamName");
                  }}
                  className={inputClass("teamName")}
                  placeholder="e.g. Claude Crusaders"
                />
                {errors.teamName && <p className="text-red-600 text-xs mt-1.5">{errors.teamName}</p>}
              </div>

              {form.members.map((member, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-text-secondary">
                      {form.members.length === 1 ? "Your Info" : `Member ${i + 1}${i === 0 ? " (You)" : ""}`}
                    </h4>
                    {form.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(i)}
                        className="text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input
                        value={member.fullName}
                        onChange={(e) => handleMemberChange(i, "fullName", e.target.value)}
                        className={inputClass(`member_${i}_fullName`)}
                        placeholder="John Doe"
                      />
                      {errors[`member_${i}_fullName`] && <p className="text-red-600 text-xs mt-1.5">{errors[`member_${i}_fullName`]}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(i, "email", e.target.value)}
                        className={inputClass(`member_${i}_email`)}
                        placeholder="you@osu.edu"
                      />
                      {errors[`member_${i}_email`] && <p className="text-red-600 text-xs mt-1.5">{errors[`member_${i}_email`]}</p>}
                    </div>
                  </div>
                </div>
              ))}

              {form.members.length < 4 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/30 text-sm text-text-muted hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Team Member
                </button>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => { if (canGoToStep2()) setStep(2); }}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="gradient-border p-6 sm:p-8 rounded-2xl">
              <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">2</span>
                Project Details
              </h3>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Project Name *</label>
                  <input
                    value={form.projectName}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, projectName: e.target.value }));
                      clearError("projectName");
                    }}
                    className={inputClass("projectName")}
                    placeholder="e.g. ClaudeAssist"
                  />
                  {errors.projectName && <p className="text-red-600 text-xs mt-1.5">{errors.projectName}</p>}
                </div>

                <div>
                  <label className={labelClass}>Project Description *</label>
                  <textarea
                    value={form.projectDescription}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, projectDescription: e.target.value }));
                      clearError("projectDescription");
                    }}
                    className={`${inputClass("projectDescription")} resize-none h-32`}
                    placeholder="Describe what your project does, how it uses Claude AI, and what problem it solves..."
                  />
                  {errors.projectDescription && <p className="text-red-600 text-xs mt-1.5">{errors.projectDescription}</p>}
                </div>

                <div>
                  <label className={labelClass}>GitHub Repository *</label>
                  <input
                    value={form.githubLink}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, githubLink: e.target.value }));
                      clearError("githubLink");
                    }}
                    className={inputClass("githubLink")}
                    placeholder="https://github.com/your-team/your-project"
                  />
                  {errors.githubLink && <p className="text-red-600 text-xs mt-1.5">{errors.githubLink}</p>}
                </div>

                <div>
                  <label className={labelClass}>Live Demo Link</label>
                  <input
                    value={form.demoLink}
                    onChange={(e) => setForm((prev) => ({ ...prev, demoLink: e.target.value }))}
                    className={inputClass("demoLink")}
                    placeholder="https://your-project.vercel.app (optional)"
                  />
                  <p className="text-xs text-text-muted mt-1">Optional — include if you have a deployed demo</p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-4">Which track are you submitting to? *</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, track: "open" }));
                        clearError("track");
                      }}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.track === "open"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <span className="font-semibold text-sm block mb-1">Open</span>
                      <p className="text-xs text-text-muted">Build anything you want with Claude AI.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, track: "sustainability" }));
                        clearError("track");
                      }}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.track === "sustainability"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <span className="font-semibold text-sm block mb-1">Sustainability</span>
                      <p className="text-xs text-text-muted">Solutions for environmental challenges.</p>
                    </button>
                  </div>
                  {errors.track && <p className="text-red-600 text-xs mt-4">{errors.track}</p>}
                </div>
              </div>
            </div>

            {status === "error" && (
              <div className="glass border-red-500/20 rounded-xl p-4 text-sm text-red-600">
                Something went wrong. Please try again.
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-full font-semibold border border-border text-text-secondary hover:bg-surface transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Project"
                )}
              </button>
            </div>

            <p className="text-xs text-text-muted text-center leading-relaxed mt-4">
              Submissions are final. Make sure your GitHub repo is public and all
              code was written during the hackathon period.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
