"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemberData {
  fullName: string;
  email: string;
  phone: string;
  major: string;
  minor: string;
  graduationYear: string;
  dietary: string;
  resumeLink: string;
  linkedin: string;
  languagePreference: string;
}

interface FormData {
  teamStatus: "solo" | "have_team" | "need_pairing" | "";
  teamSize: number;
  teamName: string;
  members: MemberData[];
  track: string;
}

const emptyMember: MemberData = {
  fullName: "",
  email: "",
  phone: "",
  major: "",
  minor: "",
  graduationYear: "",
  dietary: "",
  resumeLink: "",
  linkedin: "",
  languagePreference: "",
};

const initialForm: FormData = {
  teamStatus: "",
  teamSize: 1,
  teamName: "",
  members: [{ ...emptyMember }],
  track: "",
};

interface Errors {
  [key: string]: string;
}

function validate(form: FormData): Errors {
  const errors: Errors = {};
  if (!form.teamStatus) errors.teamStatus = "Please select a team option";
  if (!form.track) errors.track = "Please select a track";

  form.members.forEach((m, i) => {
    const prefix = `member_${i}_`;
    if (!m.fullName.trim()) errors[`${prefix}fullName`] = "Name is required";
    if (!m.email.trim()) errors[`${prefix}email`] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) errors[`${prefix}email`] = "Invalid email";
    if (!m.phone.trim()) errors[`${prefix}phone`] = "Phone is required";
  });

  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormData>(initialForm);
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

  const handleTeamStatus = (value: "solo" | "have_team" | "need_pairing") => {
    let newSize = 1;
    if (value === "have_team") {
      newSize = form.teamSize > 1 ? form.teamSize : 2;
    }
    const members = Array.from({ length: newSize }, (_, i) => form.members[i] || { ...emptyMember });
    setForm((prev) => ({ ...prev, teamStatus: value, teamSize: newSize, members }));
    clearError("teamStatus");
  };

  const handleTeamSize = (size: number) => {
    const members = Array.from({ length: size }, (_, i) => form.members[i] || { ...emptyMember });
    setForm((prev) => ({ ...prev, teamSize: size, members }));
  };

  const handleMemberChange = (index: number, field: keyof MemberData, value: string) => {
    setForm((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
    clearError(`member_${index}_${field}`);
  };

  const handleTrackChange = (value: string) => {
    setForm((prev) => ({ ...prev, track: value }));
    clearError("track");
  };

  const canGoToStep2 = form.teamStatus !== "";
  const canGoToStep3 = () => {
    let valid = true;
    const errs: Errors = {};
    form.members.forEach((m, i) => {
      const prefix = `member_${i}_`;
      if (!m.fullName.trim()) { errs[`${prefix}fullName`] = "Name is required"; valid = false; }
      if (!m.email.trim()) { errs[`${prefix}email`] = "Email is required"; valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) { errs[`${prefix}email`] = "Invalid email"; valid = false; }
      if (!m.phone.trim()) { errs[`${prefix}phone`] = "Phone is required"; valid = false; }
    });
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
      const res = await fetch("/api/register", {
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
        <h2 className="text-3xl font-display font-bold mb-4">You&apos;re In!</h2>
        <p className="text-text-muted max-w-md mx-auto">
          We&apos;ve received your registration for Claude Hacks.
          Check your email for confirmation. See you April 17!
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

  const selectClass = (field: string) =>
    `${inputClass(field)} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236E6E76%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center]`;

  const labelClass = "block text-sm font-medium text-text-secondary mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {[1, 2, 3].map((s) => (
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
            {s < 3 && (
              <div className={`w-12 h-0.5 ${s < step ? "bg-primary/40" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Team Status */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="gradient-border p-6 sm:p-8 rounded-2xl">
              <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">1</span>
                Team Setup
              </h3>

              <p className="text-sm text-text-secondary mb-6">How would you like to participate?</p>

              <div className="grid gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => handleTeamStatus("solo")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.teamStatus === "solo"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="font-semibold text-sm">Solo participant</span>
                  </div>
                  <p className="text-xs text-text-muted">I&apos;ll register myself and handle team details later</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleTeamStatus("have_team")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.teamStatus === "have_team"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <span className="font-semibold text-sm">I have a team</span>
                  </div>
                  <p className="text-xs text-text-muted">I&apos;ll register for myself and my teammates</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleTeamStatus("need_pairing")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.teamStatus === "need_pairing"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="font-semibold text-sm">I need a team</span>
                  </div>
                  <p className="text-xs text-text-muted">Match me with teammates based on language and interest preferences</p>
                </button>
              </div>

              {errors.teamStatus && <p className="text-red-600 text-xs mb-4">{errors.teamStatus}</p>}

              {form.teamStatus === "have_team" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <label className={labelClass}>How many people on your team (including yourself)? *</label>
                  <div className="flex gap-3">
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleTeamSize(size)}
                        className={`w-14 h-14 rounded-xl border-2 font-bold text-lg transition-all ${
                          form.teamSize === size
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30 text-text-muted"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                disabled={!canGoToStep2}
                onClick={() => setStep(2)}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Member Information */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {form.members.map((member, i) => (
              <div key={i} className="gradient-border p-6 sm:p-8 rounded-2xl">
                <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  {form.members.length === 1 ? "Your Information" : `Team Member ${i + 1}${i === 0 ? " (You)" : ""}`}
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
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
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input
                      value={member.phone}
                      onChange={(e) => handleMemberChange(i, "phone", e.target.value)}
                      className={inputClass(`member_${i}_phone`)}
                      placeholder="(614) 555-0123"
                    />
                    {errors[`member_${i}_phone`] && <p className="text-red-600 text-xs mt-1.5">{errors[`member_${i}_phone`]}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Major</label>
                    <input
                      value={member.major}
                      onChange={(e) => handleMemberChange(i, "major", e.target.value)}
                      className={inputClass(`member_${i}_major`)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Graduation Year</label>
                    <select
                      value={member.graduationYear}
                      onChange={(e) => handleMemberChange(i, "graduationYear", e.target.value)}
                      className={selectClass(`member_${i}_graduationYear`)}
                    >
                      <option value="">Select year</option>
                      {[2026, 2027, 2028, 2029, 2030].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Language Preference</label>
                    <select
                      value={member.languagePreference}
                      onChange={(e) => handleMemberChange(i, "languagePreference", e.target.value)}
                      className={selectClass(`member_${i}_languagePreference`)}
                    >
                      <option value="">Select language</option>
                      <option value="English">English</option>
                      <option value="Chinese">Chinese (Mandarin)</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Korean">Korean</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Other">Other</option>
                    </select>
                    {form.teamStatus === "need_pairing" && i === 0 && (
                      <p className="text-xs text-text-muted mt-1">Used for international student pairing</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Dietary Restrictions</label>
                    <input
                      value={member.dietary}
                      onChange={(e) => handleMemberChange(i, "dietary", e.target.value)}
                      className={inputClass(`member_${i}_dietary`)}
                      placeholder="None, Vegetarian, Vegan, etc."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Resume Link</label>
                    <input
                      value={member.resumeLink}
                      onChange={(e) => handleMemberChange(i, "resumeLink", e.target.value)}
                      className={inputClass(`member_${i}_resumeLink`)}
                      placeholder="Google Drive, Dropbox, etc."
                    />
                    <p className="text-xs text-text-muted mt-1">Shared with sponsors for internship &amp; job opportunities</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-full font-semibold border border-border text-text-secondary hover:bg-surface transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => { if (canGoToStep3()) setStep(3); }}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Track & Team Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="gradient-border p-6 sm:p-8 rounded-2xl">
              <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">3</span>
                Team Details &amp; Track
              </h3>

              {form.teamStatus === "have_team" && (
                <div className="mb-6">
                  <label className={labelClass}>Team Name</label>
                  <input
                    value={form.teamName}
                    onChange={(e) => setForm((prev) => ({ ...prev, teamName: e.target.value }))}
                    className={inputClass("teamName")}
                    placeholder="e.g. Claude Crusaders"
                  />
                </div>
              )}

              <p className="text-sm text-text-secondary mb-6">Which track does your team want to compete in?</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTrackChange("open")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.track === "open"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-1">Open</span>
                  <p className="text-xs text-text-muted">Build anything you want with Claude AI — no restrictions on topic or domain.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleTrackChange("sustainability")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.track === "sustainability"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="font-semibold text-sm block mb-1">Sustainability</span>
                  <p className="text-xs text-text-muted">Build solutions that address environmental or sustainability challenges.</p>
                </button>
              </div>

              {errors.track && <p className="text-red-600 text-xs mt-4">{errors.track}</p>}
            </div>

            {status === "error" && (
              <div className="glass border-red-500/20 rounded-xl p-4 text-sm text-red-600">
                Something went wrong. Please try again.
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
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
                  "Register for Claude Hacks"
                )}
              </button>
            </div>

            <p className="text-xs text-text-muted text-center leading-relaxed mt-4">
              By registering, you agree to our Code of Conduct and acknowledge that your
              information will be shared with event sponsors.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
