import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  if (!stripeClient) stripeClient = new Stripe(key);
  return stripeClient;
}

export const planPrices = {
  launch: process.env.STRIPE_PRICE_LAUNCH,
  growth: process.env.STRIPE_PRICE_GROWTH,
  scale: process.env.STRIPE_PRICE_SCALE,
} as const;

export type PlanKey = keyof typeof planPrices;
export function isPlanKey(value: string): value is PlanKey {
  return value === "launch" || value === "growth" || value === "scale";
}
