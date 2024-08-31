"use server";

import { authActionClient } from "@/lib/safe-action";
import { getFeedbacks } from "../services/user-data";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";

export const getAllFeedbacksAction = authActionClient
  .metadata({
    actionName: "getAllFeedbacksAction",
  })
  .schema(RetrieverParamsDto)
  .action(async ({ parsedInput, ctx }) => {
    return getFeedbacks(parsedInput, ctx.userId, ctx.userRole);
  });
