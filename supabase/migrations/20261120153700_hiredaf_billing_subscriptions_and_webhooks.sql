create table public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan_key text not null check (plan_key in ('launch','growth','scale')),
  status text not null default 'incomplete' check (status in ('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid','paused')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  risk_status text not null default 'clear' check (risk_status in ('clear','review')),
  risk_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index billing_subscriptions_customer_idx on public.billing_subscriptions(stripe_customer_id);
create index billing_subscriptions_status_idx on public.billing_subscriptions(status);
create table public.billing_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);
create table public.billing_risk_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  organization_id uuid references public.organizations(id) on delete set null,
  event_type text not null,
  created_at timestamptz not null default now()
);
alter table public.billing_subscriptions enable row level security;
alter table public.billing_webhook_events enable row level security;
alter table public.billing_risk_events enable row level security;
create policy "Organization members can view billing subscription"
on public.billing_subscriptions for select to authenticated
using (public.is_org_member(organization_id));
create policy "Organization owners and admins can view billing risk events"
on public.billing_risk_events for select to authenticated
using (organization_id is not null and public.has_org_role(organization_id, array['owner','admin']::public.member_role[]));
grant select on public.billing_subscriptions to authenticated;
grant select on public.billing_risk_events to authenticated;
revoke all on public.billing_webhook_events from anon, authenticated;
revoke insert, update, delete on public.billing_subscriptions from anon, authenticated;
revoke insert, update, delete on public.billing_risk_events from anon, authenticated;
