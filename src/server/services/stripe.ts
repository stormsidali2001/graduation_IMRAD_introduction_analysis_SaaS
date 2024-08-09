import { stripe } from "@/lib/stripe";

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
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
    });

    return session.url;
  } catch (err) {
    console.error(err);
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
  }
};
