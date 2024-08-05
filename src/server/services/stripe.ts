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
