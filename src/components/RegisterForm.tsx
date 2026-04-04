"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  experience: string;
  teamSize: string;
  track: string;
  dietary: string;
  tshirt: string;
  howHeard: string;
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  university: "The Ohio State University",
  major: "",
  graduationYear: "",
  experience: "",
  teamSize: "",
  track: "",
  dietary: "",
  tshirt: "",
  howHeard: "",
};

interface Errors {
  [key: string]: string;
}

function validate(form: FormData): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  if (!form.university.trim()) errors.university = "University is required";
  if (!form.major.trim()) errors.major = "Major is required";
  if (!form.graduationYear) errors.graduationYear = "Required";
  if (!form.experience) errors.experience = "Required";
  if (!form.teamSize) errors.teamSize = "Required";
  if (!form.track) errors.track = "Required";
  if (!form.tshirt) errors.tshirt = "Required";
  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
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
      {/* Personal Info */}
      <div className="gradient-border p-6 sm:p-8 rounded-2xl">
        <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">1</span>
          Personal Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className={inputClass("fullName")} placeholder="John Doe" />
            {errors.fullName && <p className="text-red-400 text-xs mt-1.5">{errors.fullName}</p>}
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass("email")} placeholder="you@osu.edu" />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className={inputClass("phone")} placeholder="(614) 555-0123" />
          </div>
          <div>
            <label className={labelClass}>University *</label>
            <input name="university" value={form.university} onChange={handleChange} className={inputClass("university")} />
            {errors.university && <p className="text-red-400 text-xs mt-1.5">{errors.university}</p>}
          </div>
        </div>
      </div>

      {/* Academic Info */}
      <div className="gradient-border p-6 sm:p-8 rounded-2xl">
        <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">2</span>
          Academic Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Major *</label>
            <input name="major" value={form.major} onChange={handleChange} className={inputClass("major")} placeholder="Computer Science" />
            {errors.major && <p className="text-red-400 text-xs mt-1.5">{errors.major}</p>}
          </div>
          <div>
            <label className={labelClass}>Graduation Year *</label>
            <select name="graduationYear" value={form.graduationYear} onChange={handleChange} className={selectClass("graduationYear")}>
              <option value="">Select year</option>
              {[2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {errors.graduationYear && <p className="text-red-400 text-xs mt-1.5">{errors.graduationYear}</p>}
          </div>
        </div>
      </div>

      {/* Hackathon Details */}
      <div className="gradient-border p-6 sm:p-8 rounded-2xl">
        <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">3</span>
          Hackathon Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Experience Level *</label>
            <select name="experience" value={form.experience} onChange={handleChange} className={selectClass("experience")}>
              <option value="">Select level</option>
              <option value="beginner">Beginner — First hackathon</option>
              <option value="intermediate">Intermediate — A few hackathons</option>
              <option value="advanced">Advanced — Many hackathons</option>
            </select>
            {errors.experience && <p className="text-red-400 text-xs mt-1.5">{errors.experience}</p>}
          </div>
          <div>
            <label className={labelClass}>Team Size *</label>
            <select name="teamSize" value={form.teamSize} onChange={handleChange} className={selectClass("teamSize")}>
              <option value="">Select size</option>
              <option value="solo">Solo (looking for team)</option>
              <option value="2">2 members</option>
              <option value="3">3 members</option>
              <option value="4">4 members</option>
            </select>
            {errors.teamSize && <p className="text-red-400 text-xs mt-1.5">{errors.teamSize}</p>}
          </div>
          <div>
            <label className={labelClass}>Preferred Track *</label>
            <select name="track" value={form.track} onChange={handleChange} className={selectClass("track")}>
              <option value="">Select track</option>
              <option value="agents">AI Agents</option>
              <option value="education">Education</option>
              <option value="health">Health & Wellness</option>
              <option value="open">Open Innovation</option>
            </select>
            {errors.track && <p className="text-red-400 text-xs mt-1.5">{errors.track}</p>}
          </div>
          <div>
            <label className={labelClass}>T-Shirt Size *</label>
            <select name="tshirt" value={form.tshirt} onChange={handleChange} className={selectClass("tshirt")}>
              <option value="">Select size</option>
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.tshirt && <p className="text-red-400 text-xs mt-1.5">{errors.tshirt}</p>}
          </div>
          <div>
            <label className={labelClass}>Dietary Restrictions</label>
            <input name="dietary" value={form.dietary} onChange={handleChange} className={inputClass("dietary")} placeholder="None, Vegetarian, Vegan, etc." />
          </div>
          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <select name="howHeard" value={form.howHeard} onChange={handleChange} className={selectClass("howHeard")}>
              <option value="">Select one</option>
              <option value="friend">Friend / Word of mouth</option>
              <option value="social">Social media</option>
              <option value="email">Email / Newsletter</option>
              <option value="class">Class announcement</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="glass border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          Something went wrong. Please try again or email us at claudebuildersclub@gmail.com.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full btn-glow text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
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

      <p className="text-xs text-text-muted text-center leading-relaxed">
        By registering, you agree to our Code of Conduct and acknowledge that your
        information will be shared with event sponsors.
      </p>
    </form>
  );
}
