import { normalUserAction } from "@/lib/safe-action";
import { generateStripeCustomerPortalLink } from "../services/stripe";

export const getCustomerPortalLinkAction = normalUserAction
  .metadata({ actionName: "getCustomerPortalLinkAction" })
  .action(async ({ ctx }) => {
    try {
      const link = await generateStripeCustomerPortalLink(ctx.customerId);
      return link;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to generate the customer billing portal link");
    }
  });
