import Stripe from 'stripe';

export const stripeClient = new Stripe(
  process.env.STRIPE_CLIENT_SECRET as string
);
