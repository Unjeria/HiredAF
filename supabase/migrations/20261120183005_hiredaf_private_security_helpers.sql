-- Keep authorization helpers outside the exposed public API schema.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create or replace function private.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path=''
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=(select auth.uid())); $$;

create or replace function private.has_org_role(target_org uuid, allowed_roles public.member_role[])
returns boolean language sql stable security definer set search_path=''
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=(select auth.uid()) and m.role=any(allowed_roles)); $$;

revoke all on function private.is_org_member(uuid) from public, anon;
revoke all on function private.has_org_role(uuid, public.member_role[]) from public, anon;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, public.member_role[]) to authenticated;

do $$
declare p record;
begin
 for p in
  select schemaname, tablename, policyname, qual, with_check
  from pg_policies
  where schemaname='public'
   and (qual ilike '%public.is_org_member%' or qual ilike '%public.has_org_role%' or with_check ilike '%public.is_org_member%' or with_check ilike '%public.has_org_role%')
 loop
  execute format('drop policy %I on %I.%I',p.policyname,p.schemaname,p.tablename);
  execute format('create policy %I on %I.%I using (%s) with check (%s)',p.policyname,p.schemaname,p.tablename,
   replace(replace(coalesce(p.qual,'true'),'public.is_org_member','private.is_org_member'),'public.has_org_role','private.has_org_role'),
   replace(replace(coalesce(p.with_check,'true'),'public.is_org_member','private.is_org_member'),'public.has_org_role','private.has_org_role'));
 end loop;
end $$;

drop function if exists public.is_org_member(uuid);
drop function if exists public.has_org_role(uuid, public.member_role[]);

drop function if exists public.handle_new_user() cascade;
create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path=''
as $$ begin
 insert into public.profiles(id,full_name) values(new.id,nullif(new.raw_user_meta_data->>'full_name','')) on conflict(id) do nothing;
 return new;
end; $$;
revoke all on function private.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure private.handle_new_user();


drop policy if exists "Owners and admins can add members" on public.organization_members;
create policy "Owners and admins can add members" on public.organization_members for insert to authenticated
with check(private.has_org_role(organization_id,array['owner','admin']::public.member_role[])
 and (role <> 'owner' or private.has_org_role(organization_id,array['owner']::public.member_role[])));
drop policy if exists "Owners and admins can update members" on public.organization_members;
create policy "Owners and admins can update members" on public.organization_members for update to authenticated
using(private.has_org_role(organization_id,array['owner','admin']::public.member_role[]))
with check(private.has_org_role(organization_id,array['owner','admin']::public.member_role[])
 and (role <> 'owner' or private.has_org_role(organization_id,array['owner']::public.member_role[])));

create index if not exists activity_events_actor_id_idx on public.activity_events(actor_id);
create index if not exists applications_candidate_id_idx on public.applications(candidate_id);
create index if not exists candidates_created_by_idx on public.candidates(created_by);
create index if not exists jobs_created_by_idx on public.jobs(created_by);
create index if not exists organizations_created_by_idx on public.organizations(created_by);

drop policy if exists "Recruiters and admins can manage applications" on public.applications;
drop policy if exists "Recruiters can manage applications" on public.applications;
create policy "Recruiters can manage applications" on public.applications for all to authenticated
using(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[]))
with check(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[])
 and exists(select 1 from public.jobs j where j.id=job_id and j.organization_id=applications.organization_id)
 and exists(select 1 from public.candidates c where c.id=candidate_id and c.organization_id=applications.organization_id));

