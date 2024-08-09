"use action";

import { authActionClient } from "@/lib/safe-action";
import { getAllFeedbacks } from "../services/user-data";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";

export const getAllFeedbacksAction = authActionClient
  .metadata({
    actionName: "getAllFeedbacksAction",
  })
  .schema(RetrieverParamsDto)
  .action(async ({ parsedInput, ctx }) => {
    return getAllFeedbacks(parsedInput, ctx.userId, ctx.userRole);
  });
