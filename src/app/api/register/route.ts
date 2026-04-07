import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

interface RegistrationBody {
  teamStatus: string;
  teamSize: number;
  teamName: string;
  members: MemberData[];
  track: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationBody = await req.json();

    const { teamStatus, teamSize, teamName, members, track } = body;

    // Validate required fields
    if (!teamStatus || !track || !members || members.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Only name, email, and phone are required
    for (const m of members) {
      if (!m.fullName || !m.email || !m.phone) {
        return NextResponse.json({ error: "Name, email, and phone are required for all members" }, { status: 400 });
      }
    }

    // If Google Sheets credentials are configured, save to sheet
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (serviceEmail && privateKey && sheetId) {
      const auth = new google.auth.JWT({
        email: serviceEmail,
        key: privateKey.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // One row per member, with team info on each row
      const rows = members.map((m) => [
        new Date().toISOString(),
        teamStatus,
        teamSize.toString(),
        teamName || "",
        m.fullName,
        m.email,
        m.phone,
        m.major || "",
        m.minor || "",
        m.graduationYear || "",
        m.dietary || "",
        m.resumeLink || "",
        m.linkedin || "",
        m.languagePreference || "",
        track,
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:O",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: rows,
        },
      });
    } else {
      // Log to console if no Google Sheets configured
      console.log("Registration (no Google Sheets configured):", {
        timestamp: new Date().toISOString(),
        teamStatus,
        teamSize,
        teamName,
        track,
        members: members.map((m) => ({ name: m.fullName, email: m.email })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
