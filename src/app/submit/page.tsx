import type { Metadata } from "next";
import SubmitFlow from "@/components/SubmitFlow";

export const metadata: Metadata = {
  title: "Submit Your Project | Claude Builders Club at Ohio State",
  description:
    "Share what you're building with Claude at Ohio State. Submit your project for a chance to get featured on the showcase.",
};

export default function SubmitPage() {
  return <SubmitFlow />;
}
