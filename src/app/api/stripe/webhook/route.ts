import { isPreviewMode } from "@/lib/preview-mode";

export async function POST(req: Request) {
  if (isPreviewMode()) {
    return new Response("Webhook disabled in preview mode", { status: 200 });
  }

  const { handleStripeWebhook } = await import("./_handler");
  return handleStripeWebhook(req);
}
