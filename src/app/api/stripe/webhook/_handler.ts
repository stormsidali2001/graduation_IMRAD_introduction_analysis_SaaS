import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { getSession } from "@/server/services/stripe";
import {
  findUserByCustomerId,
  findUserByEmail,
  resetToFreePlan,
  updateUser,
  upsertUserSubscription,
} from "@/server/services/user-service";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function handleStripeWebhook(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature verification failed.", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await getSession(
          (event.data.object as Stripe.Checkout.Session).id,
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await findUserByEmail(customerDetails.email);
          if (!user) throw new Error("User not found");

          if (!user.customerId) {
            await updateUser(user.id, { customerId });
          }

          const lineItems = session.line_items?.data || [];
          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";
            if (isSubscription) {
              await upsertUserSubscription(user.id, priceId);
              await updateUser(user.id, { plan: "premium" });
            }
          }
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id,
        );
        const user = await findUserByCustomerId(subscription.customer as string);
        if (!user) throw new Error("Could not find the user associated with the subscription");
        resetToFreePlan(user.id);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
