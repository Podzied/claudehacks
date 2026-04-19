"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Submission {
  id: number;
  team_name: string;
  project_name: string;
  project_description: string;
  track: string;
  github_link: string;
  demo_link: string | null;
  members: { fullName: string; email: string }[];
  agent_score: number | null;
}

interface ExistingRating {
  innovation: number;
  technical_complexity: number;
  impact: number;
  presentation: number;
  feedback: string | null;
}

type Stage = "passcode" | "select-judge" | "team-list" | "rate";

const RUBRIC = [
  { key: "innovation", label: "Innovation / Coolness", desc: "Originality, creativity, and how impressive the idea is", max: 15 },
  { key: "technicalComplexity", label: "Technical Complexity", desc: "Difficulty of the engineering challenge", max: 15 },
  { key: "impact", label: "Impact", desc: "Potential to make a real difference", max: 5 },
  { key: "presentation", label: "Presentation", desc: "Clarity and quality of the demo", max: 10 },
] as const;

type RubricKey = typeof RUBRIC[number]["key"];

export default function JudgePanel() {
  const [stage, setStage] = useState<Stage>("passcode");
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [judgeName, setJudgeName] = useState("");
  const [judgeNameInput, setJudgeNameInput] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [ratedIds, setRatedIds] = useState<Set<number>>(new Set());
  const [selectedTeam, setSelectedTeam] = useState<Submission | null>(null);

  const [scores, setScores] = useState<Record<RubricKey, number>>({
    innovation: 8,
    technicalComplexity: 8,
    impact: 3,
    presentation: 5,
  });
  const [feedback, setFeedback] = useState("");
  const [rateStatus, setRateStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [trackFilter, setTrackFilter] = useState<"all" | "open" | "sustainability">("all");

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedPass = localStorage.getItem("ch_judge_pass");
    const savedJudge = localStorage.getItem("ch_judge_name");
    const savedFilter = localStorage.getItem("ch_judge_filter") as "all" | "open" | "sustainability" | null;
    if (savedFilter === "open" || savedFilter === "sustainability" || savedFilter === "all") {
      setTrackFilter(savedFilter);
    }
    if (savedPass) {
      setPasscode(savedPass);
      if (savedJudge) {
        setJudgeName(savedJudge);
        setStage("team-list");
        loadSubmissions(savedJudge);
      } else {
        setStage("select-judge");
      }
    }
  }, []);

  const loadSubmissions = async (judge: string) => {
    const { data: subs } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: true });
    setSubmissions(subs || []);

    const { data: ratings } = await supabase
      .from("ratings")
      .select("submission_id")
      .eq("judge_name", judge);
    setRatedIds(new Set((ratings || []).map((r) => r.submission_id as number)));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/judge/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setAuthError("Invalid passcode. Please try again.");
        setAuthLoading(false);
        return;
      }
      localStorage.setItem("ch_judge_pass", passcode);
      setStage("select-judge");
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const selectJudge = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setJudgeName(trimmed);
    localStorage.setItem("ch_judge_name", trimmed);
    await loadSubmissions(trimmed);
    setStage("team-list");
  };

  const openTeam = async (team: Submission) => {
    setSelectedTeam(team);
    setStage("rate");
    setRateStatus("idle");

    // Pre-fill if a rating exists
    const { data } = await supabase
      .from("ratings")
      .select("*")
      .eq("submission_id", team.id)
      .eq("judge_name", judgeName)
      .maybeSingle();
    const existing = data as ExistingRating | null;
    if (existing) {
      setScores({
        innovation: existing.innovation,
        technicalComplexity: existing.technical_complexity,
        impact: existing.impact,
        presentation: existing.presentation,
      });
      setFeedback(existing.feedback || "");
    } else {
      setScores({ innovation: 5, technicalComplexity: 8, impact: 5, presentation: 5 });
      setFeedback("");
    }
  };

  const submitRating = async () => {
    if (!selectedTeam) return;
    setRateStatus("saving");
    try {
      const res = await fetch("/api/judge/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedTeam.id,
          judgeName,
          innovation: scores.innovation,
          technicalComplexity: scores.technicalComplexity,
          impact: scores.impact,
          presentation: scores.presentation,
          feedback,
          passcode,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setRateStatus("saved");
      setRatedIds((prev) => new Set(prev).add(selectedTeam.id));
    } catch {
      setRateStatus("error");
    }
  };

  const signOut = () => {
    localStorage.removeItem("ch_judge_pass");
    localStorage.removeItem("ch_judge_name");
    setPasscode("");
    setJudgeName("");
    setStage("passcode");
  };

  const judgeSubtotal = scores.innovation + scores.technicalComplexity + scores.impact + scores.presentation;
  const agentScore = selectedTeam?.agent_score ?? 0;
  const totalScore = judgeSubtotal + agentScore;

  return (
    <div className="space-y-6">
      {/* Header bar with judge info & sign out */}
      {stage !== "passcode" && (
        <div className="flex items-center justify-between glass rounded-xl px-5 py-3">
          <div className="text-sm">
            {judgeName ? (
              <>
                Judging as <span className="font-semibold text-text">{judgeName}</span>
              </>
            ) : (
              <span className="text-text-muted">Select your name to begin</span>
            )}
          </div>
          <button
            onClick={signOut}
            className="text-xs text-text-muted hover:text-primary transition-colors"
          >
            Sign out
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* PASSCODE */}
        {stage === "passcode" && (
          <motion.form
            key="passcode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleAuth}
            className="gradient-border p-8 rounded-2xl space-y-6"
          >
            <div>
              <h2 className="font-display font-bold text-2xl mb-2">Judge Access</h2>
              <p className="text-sm text-text-muted">Enter the passcode shared with judges to continue.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-surface border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none"
                autoFocus
              />
              {authError && <p className="text-red-600 text-xs mt-2">{authError}</p>}
            </div>
            <button
              type="submit"
              disabled={!passcode || authLoading}
              className="btn-glow text-white px-8 py-3 rounded-full font-semibold w-full disabled:opacity-50"
            >
              {authLoading ? "Verifying..." : "Continue"}
            </button>
          </motion.form>
        )}

        {/* JUDGE NAME ENTRY */}
        {stage === "select-judge" && (
          <motion.form
            key="select-judge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={(e) => {
              e.preventDefault();
              selectJudge(judgeNameInput);
            }}
            className="gradient-border p-8 rounded-2xl space-y-6"
          >
            <div>
              <h2 className="font-display font-bold text-2xl mb-2">Who are you?</h2>
              <p className="text-sm text-text-muted">Enter your name as it should appear on your ratings.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Your name</label>
              <input
                type="text"
                value={judgeNameInput}
                onChange={(e) => setJudgeNameInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-surface border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none"
                placeholder="e.g. Jane Smith (NVIDIA)"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!judgeNameInput.trim()}
              className="btn-glow text-white px-8 py-3 rounded-full font-semibold w-full disabled:opacity-50"
            >
              Continue
            </button>
          </motion.form>
        )}

        {/* TEAM LIST */}
        {stage === "team-list" && (
          <motion.div
            key="team-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div>
              <h2 className="font-display font-bold text-2xl mb-2">Teams</h2>
              <p className="text-sm text-text-muted">
                {submissions.length} team{submissions.length === 1 ? "" : "s"} submitted ·
                {" "}{ratedIds.size} rated by you
              </p>
            </div>

            {/* Track filter */}
            <div className="flex flex-wrap gap-2">
              {(["all", "open", "sustainability"] as const).map((t) => {
                const count = t === "all"
                  ? submissions.length
                  : submissions.filter((s) => s.track === t).length;
                const active = trackFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setTrackFilter(t);
                      localStorage.setItem("ch_judge_filter", t);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-gradient-primary text-white shadow-sm"
                        : "bg-surface border border-border text-text-secondary hover:border-primary/40 hover:text-text"
                    }`}
                  >
                    <span className="capitalize">{t === "all" ? "All tracks" : t}</span>
                    <span className={`ml-2 text-xs font-mono ${active ? "opacity-80" : "text-text-muted"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {submissions.length === 0 && (
              <div className="gradient-border rounded-2xl p-8 text-center text-sm text-text-muted">
                No submissions yet.
              </div>
            )}

            <div className="grid gap-3">
              {submissions
                .filter((s) => trackFilter === "all" || s.track === trackFilter)
                .map((s) => {
                const rated = ratedIds.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => openTeam(s)}
                    className="gradient-border rounded-2xl p-5 text-left hover:bg-surface-light/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="font-display font-bold text-lg">{s.project_name}</div>
                        <div className="text-sm text-text-muted">{s.team_name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {s.track}
                        </span>
                        {rated && (
                          <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-green-500/10 text-green-700">
                            Rated
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2">{s.project_description}</p>
                  </button>
                );
              })}
              {submissions.length > 0 &&
                submissions.filter((s) => trackFilter === "all" || s.track === trackFilter).length === 0 && (
                  <div className="gradient-border rounded-2xl p-8 text-center text-sm text-text-muted">
                    No teams in this track.
                  </div>
                )}
            </div>
          </motion.div>
        )}

        {/* RATE SUCCESS */}
        {stage === "rate" && selectedTeam && rateStatus === "saved" && (
          <motion.div
            key="rate-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="gradient-border rounded-2xl p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="font-display font-bold text-3xl mb-2">Rating Submitted</h2>
            <p className="text-text-muted mb-1">
              Thanks, <span className="text-text font-medium">{judgeName}</span>.
            </p>
            <p className="text-sm text-text-muted mb-8">
              Your rating for <span className="text-text font-medium">{selectedTeam.project_name}</span> has been saved.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
              {RUBRIC.map((r) => (
                <div key={r.key} className="bg-surface/60 rounded-xl px-4 py-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    {r.label}
                  </div>
                  <div className="font-display font-bold text-lg text-text tabular-nums">
                    {scores[r.key]} <span className="text-text-muted text-xs font-body font-normal">/ {r.max}</span>
                  </div>
                </div>
              ))}
              <div className="bg-surface/60 rounded-xl px-4 py-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                  Code Review
                </div>
                <div className="font-display font-bold text-lg text-text tabular-nums">
                  {selectedTeam.agent_score ?? "—"} <span className="text-text-muted text-xs font-body font-normal">/ 5</span>
                </div>
              </div>
              <div className="bg-gradient-primary rounded-xl px-4 py-3 text-white">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                  Total
                </div>
                <div className="font-display font-bold text-lg tabular-nums">
                  {totalScore} <span className="opacity-80 text-xs font-body font-normal">/ 50</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setStage("team-list")}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold"
              >
                Rate another team
              </button>
              <button
                onClick={() => setRateStatus("idle")}
                className="px-8 py-3 rounded-full font-semibold border border-border text-text-secondary hover:bg-surface transition-colors"
              >
                Edit this rating
              </button>
            </div>
          </motion.div>
        )}

        {/* RATE FORM */}
        {stage === "rate" && selectedTeam && rateStatus !== "saved" && (
          <motion.div
            key="rate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <button
              onClick={() => setStage("team-list")}
              className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to teams
            </button>

            {/* Project info */}
            <div className="gradient-border rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl mb-1">{selectedTeam.project_name}</h2>
                  <div className="text-sm text-text-muted">{selectedTeam.team_name}</div>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary shrink-0">
                  {selectedTeam.track}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {selectedTeam.project_description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href={selectedTeam.github_link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-surface border border-border hover:border-primary/40 transition-colors"
                >
                  GitHub →
                </a>
                {selectedTeam.demo_link && (
                  <a
                    href={selectedTeam.demo_link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-surface border border-border hover:border-primary/40 transition-colors"
                  >
                    Live demo →
                  </a>
                )}
              </div>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                  Team ({selectedTeam.members.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.members.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-surface border border-border rounded-full pl-1.5 pr-3 py-1"
                    >
                      <span className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                        {m.fullName
                          .split(" ")
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span className="text-sm font-medium">{m.fullName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rubric */}
            <div className="gradient-border rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-1">Rubric</h3>
                <p className="text-xs text-text-muted">Rate each category from 1 to its maximum.</p>
              </div>
              {RUBRIC.map((r) => (
                <div key={r.key}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <label className="font-semibold text-sm">
                        {r.label}{" "}
                        <span className="text-text-muted font-normal text-xs">/ {r.max}</span>
                      </label>
                      <p className="text-xs text-text-muted">{r.desc}</p>
                    </div>
                    <span className="font-display font-bold text-2xl text-gradient tabular-nums">
                      {scores[r.key]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={r.max}
                    step={1}
                    value={scores[r.key]}
                    onChange={(e) =>
                      setScores((prev) => ({ ...prev, [r.key]: Number(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted mt-1 font-mono">
                    {Array.from({ length: r.max }, (_, i) => i + 1).map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Agent code review (auto) */}
              <div className="rounded-xl bg-surface/60 border border-dashed border-border p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <label className="font-semibold text-sm flex items-center gap-2">
                      Code Review{" "}
                      <span className="text-text-muted font-normal text-xs">/ 5</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                        Auto
                      </span>
                    </label>
                    <p className="text-xs text-text-muted">Auto-graded by review agent (working code)</p>
                  </div>
                  <span className="font-display font-bold text-2xl text-gradient tabular-nums">
                    {selectedTeam.agent_score ?? "—"}
                  </span>
                </div>
                {selectedTeam.agent_score === null && (
                  <p className="text-[11px] text-text-muted italic mt-2">Pending agent review</p>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-text-muted">Total</span>
                <span className="font-display font-bold text-3xl text-gradient">
                  {totalScore}{" "}
                  <span className="text-sm text-text-muted font-body font-normal">/ 50</span>
                </span>
              </div>
            </div>

            {/* Feedback */}
            <div className="gradient-border rounded-2xl p-6">
              <label className="block font-semibold text-sm mb-2">Feedback for the team</label>
              <p className="text-xs text-text-muted mb-3">
                Optional comments shared with participants after judging.
              </p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm bg-surface border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none resize-none"
                placeholder="What did they do well? What could they improve?"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs">
                {rateStatus === "error" && <span className="text-red-600">Failed to save. Try again.</span>}
              </div>
              <button
                onClick={submitRating}
                disabled={rateStatus === "saving"}
                className="btn-glow text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50"
              >
                {rateStatus === "saving" ? "Saving..." : ratedIds.has(selectedTeam.id) ? "Update Rating" : "Submit Rating"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
