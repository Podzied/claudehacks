import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claude Hacks @ Ohio State — April 17–19, 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF9F5",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #D97757, #C15F3C)",
          }}
        />

        {/* Claude constellation icon */}
        <svg width="72" height="72" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="30" r="6" fill="#D97757" />
          <circle cx="60" cy="90" r="6" fill="#D97757" />
          <circle cx="30" cy="60" r="6" fill="#D97757" />
          <circle cx="90" cy="60" r="6" fill="#D97757" />
          <circle cx="38.8" cy="38.8" r="6" fill="#D97757" />
          <circle cx="81.2" cy="38.8" r="6" fill="#D97757" />
          <circle cx="38.8" cy="81.2" r="6" fill="#D97757" />
          <circle cx="81.2" cy="81.2" r="6" fill="#D97757" />
        </svg>

        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#141413",
            margin: 0,
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          Claude Hacks
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#544F47",
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          April 17–19, 2026 · The Ohio State University
        </p>
        <p
          style={{
            fontSize: 20,
            color: "#B0AEA5",
            marginTop: 12,
          }}
        >
          Build the future with AI · Pomerene Hall 280
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 16, color: "#B0AEA5" }}>Powered by</span>
          <span style={{ fontSize: 16, color: "#D97757", fontWeight: 600 }}>Claude AI</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
