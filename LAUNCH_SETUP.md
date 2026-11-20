# HiredAF production launch setup

This repository is configured for a Next.js 15 application on Netlify with Supabase and Stripe Billing. Do not commit live secret keys.

## 1. Deploy the repository to Netlify
- Import the GitHub repository `Unjeria/HiredAF` into Netlify.
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22`
- Netlify's Next.js runtime/adapter must be enabled for server actions, route handlers, and SSR. Do not deploy this as a static export.

## 2. Add environment variables in Netlify
Use `.env.example` as the variable-name checklist.
- Set `NEXT_PUBLIC_SITE_URL` to the actual Netlify production URL.
- Add `SUPABASE_SERVICE_ROLE_KEY` only as a server-side environment variable. Never use a `NEXT_PUBLIC_` prefix for it.
- Create a restricted live Stripe API key with only the required Checkout Sessions, Billing Portal, Subscriptions, and read permissions, then set `STRIPE_SECRET_KEY`.
- Keep the three Stripe price IDs exactly as listed in `.env.example`.
- Add `STRIPE_WEBHOOK_SECRET` after creating the webhook endpoint in Stripe.
- Redeploy after setting the variables.

## 3. Configure Supabase Auth
In Supabase Authentication URL Configuration:
- Set Site URL to the production Netlify URL.
- Add `https://YOUR-NETLIFY-SITE.netlify.app/auth/callback` to allowed redirect URLs.
- Confirm email delivery and password policies are configured.

The production database migrations are already applied to the HiredAF Supabase project. All exposed application and billing tables have RLS enabled.

## 4. Configure Stripe live webhook
Create a webhook endpoint at:
`https://YOUR-NETLIFY-SITE.netlify.app/api/stripe/webhook`

Subscribe to:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.subscription.paused`
- `customer.subscription.resumed`
- `invoice.paid`
- `invoice.payment_failed`
- `charge.dispute.created`
- `charge.refunded`
- `radar.early_fraud_warning.created`

Copy the endpoint's signing secret into Netlify as `STRIPE_WEBHOOK_SECRET`, then redeploy. Checkout is deliberately blocked until the webhook secret and Stripe secret are present, to prevent accepting payment without subscription fulfillment.

The HiredAF customer portal configuration has been created in live Stripe with payment-method updates, invoice history, plan changes, and end-of-period cancellation.

## 5. Tax and legal launch review
Prices are tax-exclusive. Stripe Tax settings currently report pending setup, and automatic tax is not enabled. Do not enable automatic tax until the correct tax registrations, product tax category, and business location have been reviewed by a qualified tax professional.

The Privacy Policy and Terms pages in this repository are clearly marked drafts. They are not a substitute for final legal documents. Complete the operator identity, business mailing address, privacy contact, retention schedule, subprocessors, candidate notices, and applicable hiring/privacy-law review before collecting real candidate data.

## 6. Production smoke tests
Before opening checkout to customers:
- Create a test account and workspace on the production domain.
- Confirm email verification and password login.
- Create a role, candidate, and application under an active test subscription.
- Verify one workspace cannot read another workspace's records.
- Run a Stripe test-mode checkout in a sandbox first; verify webhook fulfillment, cancellation, payment failure, and portal access.
- Only then confirm the live webhook and live checkout path.

## Current product scope
The current release supports workspace creation, job management, candidate profiles, application tracking, and pipeline status. Launch allows up to 3 open roles and 100 candidate profiles; Growth allows up to 15 open roles and 1,000 candidate profiles; Scale is unlimited for these two resources. AI-assisted screening, matching, job-description generation, and automated follow-ups are not yet included.
