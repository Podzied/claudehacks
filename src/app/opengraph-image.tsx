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
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #D97757, #CB6CE6)",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "white", fontSize: 36, fontWeight: 700 }}>CH</span>
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(135deg, #D97757, #CB6CE6)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Claude Hacks
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#a0a0b0",
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          April 17–19, 2026 &middot; The Ohio State University
        </p>
        <p
          style={{
            fontSize: 20,
            color: "#707080",
            marginTop: 12,
          }}
        >
          Build the future with AI
        </p>
      </div>
    ),
    { ...size }
  );
}
