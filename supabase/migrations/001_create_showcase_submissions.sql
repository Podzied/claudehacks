create table public.showcase_submissions (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  description text not null,
  builder_name text not null,
  builder_email text not null,
  team_members text,
  demo_url text,
  github_url text,
  tools_used text not null,
  status text not null default 'pending' check (status in ('pending', 'featured', 'rejected')),
  created_at timestamptz not null default now()
);

comment on table public.showcase_submissions is 'Project submissions from students building with Claude at Ohio State';

alter table public.showcase_submissions enable row level security;

create policy "Anyone can insert submissions"
  on public.showcase_submissions
  for insert
  to anon
  with check (true);

create policy "Anyone can read featured submissions"
  on public.showcase_submissions
  for select
  to anon
  using (status = 'featured');
