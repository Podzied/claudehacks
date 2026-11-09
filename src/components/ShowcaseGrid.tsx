"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  project_name: string;
  description: string;
  builder_name: string;
  team_members: string | null;
  demo_url: string | null;
  github_url: string | null;
  tools_used: string;
  created_at: string;
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: "p1",
    project_name: "EagleEye",
    description: "AI-assisted emergency dispatch that watches highway camera feeds and triages incidents in seconds using Claude’s vision.",
    builder_name: "Will Campbell",
    team_members: "Rishik Panjugala, Connor Walmsley",
    demo_url: null,
    github_url: null,
    tools_used: "Claude API, Claude Code",
    created_at: "2026-10-15T00:00:00Z",
  },
  {
    id: "p2",
    project_name: "TokenLens",
    description: "Paste any GitHub repo URL and instantly see how much that codebase spends on LLM API calls across 20+ models.",
    builder_name: "Sathvik Allipuram",
    team_members: "Harrison Hahner, Srijan Puli, Prajuval Prakash",
    demo_url: "https://osutokenlens.vercel.app/",
    github_url: null,
    tools_used: "Claude API, Anthropic SDK",
    created_at: "2026-10-14T00:00:00Z",
  },
  {
    id: "p3",
    project_name: "Pilot",
    description: "A macOS agent that drives your iPhone — Claude vision + synthetic taps through iPhone Mirroring.",
    builder_name: "Athin Shetty",
    team_members: "Sohum Suthar",
    demo_url: null,
    github_url: null,
    tools_used: "Claude API, Claude MCP, Computer Use",
    created_at: "2026-10-13T00:00:00Z",
  },
  {
    id: "p4",
    project_name: "Greenify",
    description: "A smart home agent that adjusts devices to cut energy use from plain-English intent, with a 3D dollhouse frontend.",
    builder_name: "Siddarth Tummala",
    team_members: "Kanishk Kovuru, Shukanth Jojodae, Shirish Parasa, Pathiv Medidi",
    demo_url: null,
    github_url: null,
    tools_used: "Claude API, Claude Code",
    created_at: "2026-10-12T00:00:00Z",
  },
  {
    id: "p5",
    project_name: "EnergyWatch",
    description: "AI dispatch for home solar — when to sell, when to charge, when to pull from the grid, in plain English.",
    builder_name: "Ayush Pandit",
    team_members: "Aaryan Sharma",
    demo_url: null,
    github_url: null,
    tools_used: "Claude API, Anthropic SDK",
    created_at: "2026-10-11T00:00:00Z",
  },
];

function allMembers(p: Project): string[] {
  const members = [p.builder_name];
  if (p.team_members) {
    members.push(...p.team_members.split(",").map((s) => s.trim()).filter(Boolean));
  }
  return members;
}

export default function ShowcaseGrid() {
  const [projects, setProjects] = useState<Project[]>(PLACEHOLDER_PROJECTS);

  useEffect(() => {
    fetch("/api/showcase")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="showcase-grid">
      {projects.map((p) => {
        const members = allMembers(p);
        return (
          <article key={p.id} className="showcase-card">
            <div className="showcase-card__head">
              <h3>{p.project_name}</h3>
              <span className="t-small muted">
                {p.builder_name}{members.length > 1 ? ` + ${members.length - 1}` : ""}
              </span>
            </div>

            <p className="t-small" style={{ color: "var(--muted)", lineHeight: 1.55, flex: 1 }}>
              {p.description}
            </p>

            <div className="showcase-card__tools">
              {p.tools_used.split(",").map((tool) => (
                <span key={tool} className="showcase-chip">{tool.trim()}</span>
              ))}
            </div>

            {(p.demo_url || p.github_url) && (
              <div className="showcase-card__links">
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noreferrer" className="link">
                    Live demo
                  </a>
                )}
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="link">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </article>
        );
      })}

      {/* Placeholder card */}
      <article className="showcase-card showcase-card--cta">
        <div className="showcase-card__head">
          <h3>Your project?</h3>
          <span className="t-small muted">Submit below</span>
        </div>
        <p className="t-small" style={{ color: "var(--muted)", lineHeight: 1.55, flex: 1 }}>
          We&apos;re looking for the next great project built with Claude at Ohio State. Ship something and see it here.
        </p>
        <a className="link" href="/submit">Submit your project</a>
      </article>
    </div>
  );
}
