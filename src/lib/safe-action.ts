import { UserAlreadyRegistered } from "@/server/errors";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
  type MiddlewareFn,
} from "next-safe-action";
import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import prismaClient from "./prisma-client";

export class ActionError extends Error {}

// Base client.
export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof UserAlreadyRegistered) {
      return e.message;
    }
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // Define logging middleware.
}).use(async ({ next, clientInput, metadata }) => {
  console.log("prisma client---------------------", prismaClient);
  console.log("LOGGING MIDDLEWARE ------------------" + new Date().toString());

  // Here we await the action execution.
  const result = await next({ ctx: null });

  console.log("Result ->", JSON.stringify(result, null, 4));
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);

  console.log(
    "x-LOGGING MIDDLEWARE ------------------" + new Date().toString(),
  );
  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await auth();

    if (!session) {
      throw new Error("Session not found!");
    }

    const {
      id: userId,
      role: userRole,
      plan,
      name: username,
      image: userImage,
    } = session.user;

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { userId, userRole, plan, username, userImage } });
  });

export const adminAction = authActionClient.use(async ({ next, ctx }) => {
  if (ctx.userRole !== "Admin") {
    redirect("/user/dashboard");
  }

  return next({ ctx });
});

export const normalUserAction = authActionClient.use(async ({ next, ctx }) => {
  if (ctx.userRole !== "user") {
    redirect("/admin/dashboard");
  }

  return next({ ctx });
});

export const premiumUserAction = authActionClient.use(async ({ next, ctx }) => {
  if (ctx.plan !== "premium") {
    throw new ActionError("Upgrade to premiumn to access the feature");
  }

  return next({ ctx });
});
