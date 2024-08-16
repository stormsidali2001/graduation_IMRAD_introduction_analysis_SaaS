"use server";

import { eurekaClient } from "@/lib/eureka-client";
import { actionClient, ActionError, authActionClient } from "@/lib/safe-action";
import { balance, hashPassword } from "@/lib/server-utils";
import axios from "axios";
import { z } from "zod";
import { getMoves } from "../dao/moves";
import { getSubmoves } from "../dao/sub-moves";
import { makePrediction } from "../services/predictions";
import { createIntroduction } from "../services/user-data";
import { auth } from "@/lib/auth";
import { $Enums } from "@prisma/client";
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
