create table if not exists leads (
    id bigserial primary key,
    email text not null,
    phone text,
    source text not null default 'eligibility-checker',
    answers jsonb not null default '{}'::jsonb,
    result jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists leads_email_idx on leads (email);
create index if not exists leads_created_at_idx on leads (created_at desc);
