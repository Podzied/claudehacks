import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

interface SubmissionBody {
  teamName: string;
  projectName: string;
  projectDescription: string;
  track: string;
  githubLink: string;
  demoLink: string;
  members: { fullName: string; email: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: SubmissionBody = await req.json();

    const { teamName, projectName, projectDescription, track, githubLink, demoLink, members } = body;

    // Validate required fields
    if (!teamName || !projectName || !projectDescription || !track || !githubLink || !members || members.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    for (const m of members) {
      if (!m.fullName || !m.email) {
        return NextResponse.json({ error: "Name and email are required for all members" }, { status: 400 });
      }
    }

    // Verify GitHub repo is public
    const repoMatch = githubLink.match(/github\.com\/([^/]+)\/([^/\s#?]+)/);
    if (!repoMatch) {
      return NextResponse.json({ error: "Invalid GitHub repository URL" }, { status: 400 });
    }
    const [, owner, repo] = repoMatch;
    const repoName = repo.replace(/\.git$/, "");
    try {
      const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
        headers: { "Accept": "application/vnd.github.v3+json" },
      });
      if (ghRes.status === 404) {
        return NextResponse.json({ error: "GitHub repository not found — make sure it exists and is public" }, { status: 400 });
      }
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        if (ghData.private) {
          return NextResponse.json({ error: "GitHub repository is private — please make it public before submitting" }, { status: 400 });
        }
      }
    } catch {
      // If GitHub API is unreachable, allow submission to proceed
    }

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

      const memberNames = members.map((m) => m.fullName).join(", ");
      const memberEmails = members.map((m) => m.email).join(", ");

      const row = [
        new Date().toISOString(),
        teamName,
        projectName,
        projectDescription,
        track,
        githubLink,
        demoLink || "",
        memberNames,
        memberEmails,
        members.length.toString(),
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Submissions!A:J",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
    } else {
      console.log("Submission (no Google Sheets configured):", {
        timestamp: new Date().toISOString(),
        teamName,
        projectName,
        projectDescription,
        track,
        githubLink,
        demoLink,
        members: members.map((m) => ({ name: m.fullName, email: m.email })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
