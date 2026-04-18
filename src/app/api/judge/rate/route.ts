import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface RatingBody {
  submissionId: number;
  judgeName: string;
  innovation: number;
  technicalComplexity: number;
  impact: number;
  presentation: number;
  feedback: string;
  passcode: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RatingBody = await req.json();

    if (body.passcode !== process.env.JUDGE_PASSCODE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { submissionId, judgeName, innovation, technicalComplexity, impact, presentation, feedback } = body;

    if (!submissionId || !judgeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    for (const [name, val] of [
      ["innovation", innovation],
      ["technical_complexity", technicalComplexity],
      ["impact", impact],
      ["presentation", presentation],
    ] as const) {
      if (typeof val !== "number" || val < 1 || val > 10) {
        return NextResponse.json({ error: `${name} must be between 1 and 10` }, { status: 400 });
      }
    }

    // Upsert: a judge can update their rating before judging closes
    const { error } = await supabase
      .from("ratings")
      .upsert(
        {
          submission_id: submissionId,
          judge_name: judgeName,
          innovation,
          technical_complexity: technicalComplexity,
          impact,
          presentation,
          feedback: feedback || null,
        },
        { onConflict: "submission_id,judge_name" }
      );

    if (error) {
      console.error("Rating insert error:", error);
      return NextResponse.json({ error: "Failed to save rating" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rating error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
