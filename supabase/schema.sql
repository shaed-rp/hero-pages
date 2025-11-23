-- Create the vehicles table
create table if not exists vehicles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table vehicles enable row level security;

-- Create policies
-- Allow public read access
create policy "Enable read access for all users" on vehicles for select using (true);

-- Allow anon insert/update for migration (You might want to disable this after migration)
create policy "Enable insert for anon" on vehicles for insert with check (true);
create policy "Enable update for anon" on vehicles for update using (true);
