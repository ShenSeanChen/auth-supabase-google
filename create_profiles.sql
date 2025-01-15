create table
  public.profiles (
    id uuid not null default gen_random_uuid (),
    email text not null,
    created_at timestamp with time zone null default now(),
    deleted_at timestamp with time zone null,
    deleted_count integer null default 0,
    is_deleted boolean null default false,
    reactivated_at timestamp without time zone null,
    constraint profiles_pkey primary key (id)
  ) tablespace pg_default;