import { normalUserAction } from "@/lib/safe-action";
import {
  generateStripeCustomerPortalLink,
  generateSubscriptionCheckoutSession,
} from "../services/stripe";
import { z } from "zod";

export const getSubscriptionLinksAction = normalUserAction
  .metadata({ actionName: "getCustomerPortalLinkAction" })
  .action(async ({ ctx }) => {
    try {
      const redirectUrl = "http://localhost:3000/user/dashboard";
      const common = {
        successUrl: redirectUrl,
        cancelUrl: redirectUrl,

        customerId: ctx.customerId,
      };
      const [monthlyPlanLink, yearlyPlanLink] = await Promise.all([
        generateSubscriptionCheckoutSession({
          ...common,
          priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
        }),

        generateSubscriptionCheckoutSession({
          ...common,
          priceId: process.env.STRIPE_YEARLY_PRICE_ID,
        }),
      ]);
      return {
        monthlyPlanLink,
        yearlyPlanLink,
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to generate the customer billing portal link");
    }
  });
