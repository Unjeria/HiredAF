# HiredAF

AI-powered recruiting workspace for growing teams.

## Getting started

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase project URL and publishable key.
3. Run `npm install`, then `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + Lucide
- Supabase Auth + Postgres + Row Level Security

## Supabase setup

The initial schema is in `supabase/migrations/20261120000000_hiredaf_initial_recruiting_schema.sql`.
It creates profiles, organizations, organization memberships, jobs, candidates, applications, and activity events, with tenant-scoped Row Level Security policies.

Set these environment variables in your local `.env.local` and your deployment provider:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

Never put a Supabase secret key or service-role key in a `NEXT_PUBLIC_*` variable or commit it to Git.

## Current product foundation

- Public HiredAF landing page
- Supabase browser/server clients and session refresh middleware
- Email/password sign-up and sign-in
- Protected employer dashboard
- Workspace creation and first recruiting data views

AI screening, resume parsing, candidate portal, invitations, and production email/domain configuration are future milestones. AI-generated recommendations should support—not make—employment decisions.
