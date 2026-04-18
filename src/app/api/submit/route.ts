import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isSubmissionsClosed } from "@/lib/deadline";

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
    if (isSubmissionsClosed()) {
      return NextResponse.json({ error: "Submissions are closed." }, { status: 403 });
    }

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

    // Insert into Supabase
    const { error: dbError } = await supabase.from("submissions").insert({
      team_name: teamName,
      project_name: projectName,
      project_description: projectDescription,
      track,
      github_link: githubLink,
      demo_link: demoLink || null,
      members,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
