-- Revoke default public execution on authorization-sensitive functions.
revoke execute on function public.create_organization(text) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.is_org_member(uuid) from public, anon;
revoke execute on function public.has_org_role(uuid, public.member_role[]) from public, anon;
grant execute on function public.create_organization(text) to authenticated;
grant execute on function public.is_org_member(uuid) to authenticated;
grant execute on function public.has_org_role(uuid, public.member_role[]) to authenticated;

drop policy if exists "Admins can add members" on public.organization_members;
drop policy if exists "Admins can update members" on public.organization_members;
create policy "Owners and admins can add members" on public.organization_members for insert to authenticated
with check(public.has_org_role(organization_id,array['owner','admin']::public.member_role[])
 and (role <> 'owner' or public.has_org_role(organization_id,array['owner']::public.member_role[])));
create policy "Owners and admins can update members" on public.organization_members for update to authenticated
using(public.has_org_role(organization_id,array['owner','admin']::public.member_role[]))
with check(public.has_org_role(organization_id,array['owner','admin']::public.member_role[])
 and (role <> 'owner' or public.has_org_role(organization_id,array['owner']::public.member_role[])));
