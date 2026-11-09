import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key);
}

async function sendToDiscord(body: Record<string, string | null>) {
  if (!DISCORD_WEBHOOK_URL) return;

  const fields: { name: string; value: string; inline?: boolean }[] = [
    { name: "Builder", value: body.builder_name ?? "—", inline: true },
    { name: "Email", value: body.builder_email ?? "—", inline: true },
  ];

  if (body.github_handle)
    fields.push({ name: "GitHub", value: `[${body.github_handle}](https://github.com/${body.github_handle})`, inline: true });
  if (body.discord_handle)
    fields.push({ name: "Discord", value: body.discord_handle, inline: true });
  if (body.linkedin_url)
    fields.push({ name: "LinkedIn", value: `[Profile](${body.linkedin_url})`, inline: true });
  if (body.tools_used)
    fields.push({ name: "Tools", value: body.tools_used, inline: false });
  if (body.team_members)
    fields.push({ name: "Team", value: body.team_members, inline: false });
  if (body.demo_url)
    fields.push({ name: "Demo", value: body.demo_url, inline: true });
  if (body.github_url)
    fields.push({ name: "Repo", value: body.github_url, inline: true });

  const embed = {
    title: `📦 ${body.project_name}`,
    description: body.description ?? "",
    color: 0xd97757,
    fields,
    footer: { text: "Claude Builders Club — Showcase Submission" },
    timestamp: new Date().toISOString(),
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Showcase Bot",
      embeds: [embed],
    }),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    project_name, description, builder_name, builder_email,
    team_members, demo_url, github_url, tools_used,
    github_handle, discord_handle, linkedin_url,
  } = body;

  if (!project_name || !description || !builder_name || !builder_email || !tools_used) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    project_name: project_name.trim(),
    description: description.trim(),
    builder_name: builder_name.trim(),
    builder_email: builder_email.trim(),
    team_members: team_members?.trim() || null,
    demo_url: demo_url?.trim() || null,
    github_url: github_url?.trim() || null,
    tools_used: typeof tools_used === "string" ? tools_used.trim() : tools_used,
    github_handle: github_handle?.trim() || null,
    discord_handle: discord_handle?.trim() || null,
    linkedin_url: linkedin_url?.trim() || null,
  };

  try {
    await sendToDiscord(payload);
  } catch (err) {
    console.error("Discord webhook error:", err);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("showcase_submissions").insert(payload);
    if (error) {
      console.error("Supabase insert error:", error);
    }
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("showcase_submissions")
    .select("id, project_name, description, builder_name, team_members, demo_url, github_url, tools_used, created_at")
    .eq("status", "featured")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data ?? []);
}
