-- 시즌 1 참여 신청 (랜딩 페이지). 다른 서비스와 같은 DB를 써도 겹치지 않도록 woori7_ 접두사 사용
create table if not exists public.woori7_applications (
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
alter table public.woori7_applications enable row level security;
