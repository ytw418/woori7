-- 시즌 1 참여 신청 (랜딩 페이지)
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  gender text not null check (gender in ('남성', '여성')),
  purpose text not null,
  birth_year int not null check (birth_year <= 2007),
  district text not null,
  pref_age_min int not null,
  pref_age_max int not null,
  intro text not null,
  phone text not null unique,
  instagram text,
  agree_marketing boolean not null default false,
  utm_source text,
  ref text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected', 'withdrawn'))
);

-- 서버(service role)만 쓰고 읽는다. 익명 키로는 접근 불가.
alter table public.applications enable row level security;
