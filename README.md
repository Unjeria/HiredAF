# HiredAF

AI-powered recruiting workspace for growing teams.

## Getting started
1. Copy `.env.example` to `.env.local`.
2. Add your Supabase project URL and publishable key.
3. Run `npm install`, then `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Stack
- Next.js App Router, React, TypeScript
- Tailwind CSS and Lucide
- Supabase Auth, Postgres, and Row Level Security

## Supabase
Apply the SQL files in `supabase/migrations/` in timestamp order. They create profiles, organizations, memberships, jobs, candidates, applications, and activity events; enable workspace-scoped Row Level Security; move authorization helpers into a private schema; and expose a signed-in-only workspace-creation RPC.

Set the following variables in `.env.local` and the deployment provider:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Never expose a Supabase secret or service-role key in browser code or commit it to Git.

## Current foundation
- HiredAF public landing page
- Supabase SSR clients and session refresh middleware
- Email/password registration and login
- Protected employer dashboard and workspace creation
- Initial recruiting database schema and generated TypeScript types

Job creation, candidate intake, invitations, AI-assisted summaries/matching, and production domain/email configuration remain next milestones. AI recommendations must support human review—not make employment decisions.
