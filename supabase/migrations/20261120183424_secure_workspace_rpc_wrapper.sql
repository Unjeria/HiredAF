-- Public API entry point is invoker-only; elevated writes stay in the private schema.
create or replace function public.create_organization(org_name text)
returns uuid
language sql
security invoker
set search_path = ''
as $$ select private.create_organization(org_name); $$;

revoke all on function public.create_organization(text) from public, anon;
grant execute on function public.create_organization(text) to authenticated;
