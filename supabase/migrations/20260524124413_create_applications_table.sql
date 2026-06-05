create table public.applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  mobile text not null,
  password text,
  state text not null,
  city text not null,
  course text not null,
  specialization text not null,
  institute text not null
);

-- Enable RLS
alter table public.applications enable row level security;

-- Allow anyone to insert
create policy "Allow public inserts" on public.applications
  for insert with check (true);

-- Allow anon to read for demo purposes (optional, usually you wouldn't)
-- create policy "Allow public read" on public.applications for select using (true);
