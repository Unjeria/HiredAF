drop policy if exists "Recruiters can manage applications" on public.applications;
create policy "Recruiters can add applications" on public.applications for insert to authenticated
with check(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[])
 and exists(select 1 from public.jobs j where j.id=job_id and j.organization_id=applications.organization_id)
 and exists(select 1 from public.candidates c where c.id=candidate_id and c.organization_id=applications.organization_id));
create policy "Recruiters can update applications" on public.applications for update to authenticated
using(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[]))
with check(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[])
 and exists(select 1 from public.jobs j where j.id=job_id and j.organization_id=applications.organization_id)
 and exists(select 1 from public.candidates c where c.id=candidate_id and c.organization_id=applications.organization_id));
create policy "Recruiters can delete applications" on public.applications for delete to authenticated
using(private.has_org_role(organization_id,array['owner','admin','recruiter']::public.member_role[]));
