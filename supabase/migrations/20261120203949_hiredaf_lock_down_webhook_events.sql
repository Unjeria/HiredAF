create index if not exists billing_risk_events_organization_id_idx on public.billing_risk_events(organization_id);
create policy "No direct access to billing webhook events"
on public.billing_webhook_events for all to anon, authenticated
using (false) with check (false);
