create or replace function private.create_organization(org_name text)
returns uuid language plpgsql security definer set search_path=''
as $$
declare new_org_id uuid;
begin
 if auth.uid() is null then raise exception 'Sign in required'; end if;
 if char_length(trim(org_name))<2 or char_length(trim(org_name))>120 then raise exception 'Workspace name must be 2-120 characters'; end if;
 insert into public.organizations(name,created_by) values(trim(org_name),auth.uid()) returning id into new_org_id;
 insert into public.organization_members(organization_id,user_id,role) values(new_org_id,auth.uid(),'owner');
 return new_org_id;
end; $$;
revoke all on function private.create_organization(text) from public, anon;
grant execute on function private.create_organization(text) to authenticated;
