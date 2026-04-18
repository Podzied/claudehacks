import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const expected = process.env.JUDGE_PASSCODE;

    if (!expected) {
      return NextResponse.json({ error: "Judging not configured" }, { status: 500 });
    }

    if (passcode !== expected) {
      return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
