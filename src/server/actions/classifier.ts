"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { classifyCreateIntroductionUsecase } from "../use-cases/classifiy-create-introduction-use-case";

export const geMoveSubmove = authActionClient
  .metadata({ actionName: "geMoveSubmove" })
  .schema(
    z.object({
      sentences: z.array(z.string()),
    }),
  )
  .action(async ({ parsedInput: { sentences }, ctx }) => {
    return await classifyCreateIntroductionUsecase({
      sentences,
      userId: ctx.userId,
      plan: ctx.plan,
    });
  });
