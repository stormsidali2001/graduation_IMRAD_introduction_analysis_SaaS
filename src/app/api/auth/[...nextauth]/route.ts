import { isPreviewMode } from "@/lib/preview-mode";
import { NextRequest } from "next/server";

const previewResponse = () =>
  new Response(JSON.stringify({ message: "Auth disabled in preview mode" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req: NextRequest) {
  if (isPreviewMode()) return previewResponse();
  const { handlers } = await import("@/lib/auth");
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  if (isPreviewMode()) return previewResponse();
  const { handlers } = await import("@/lib/auth");
  return handlers.POST(req);
}
