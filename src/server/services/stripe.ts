import { stripe } from "@/lib/stripe";
import { AppError } from "@/server/errors";
import { isPreviewMode } from "@/lib/preview-mode";

export const createStripeCustomer = (email: string, name: string) => {
  try {
    const customer = stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (err) {
    throw err;
  }
};

export const generateStripeCustomerPortalLink = async (customerId: string) => {
  if (isPreviewMode()) return "#";
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
    });

    return session.url;
  } catch (err) {
    console.error(err);
    throw new AppError("Failed to contact Stripe. Please try again.");
  }
};

export const generateSubscriptionCheckoutSession = async ({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  if (isPreviewMode()) return "#";
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],

      customer: customerId,
      success_url: successUrl,
      cancel_url: cancelUrl,

      mode: "subscription",
    });

    return session.url;
  } catch (err) {
    console.error(err);
    throw new AppError("Failed to contact Stripe. Please try again.");
  }
};

export const getSession = async (id: string) => {
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items"],
  });
  return session;
};
