"use action";

import { adminAction, authActionClient } from "@/lib/safe-action";
import { getAllFeedbacks } from "../services/user-data";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";

export const getAllFeedbacksAction =
  // TODO: uncomment this later
  //adminAction
  authActionClient
    .metadata({
      actionName: "getAllFeedbacksAction",
    })
    .schema(RetrieverParamsDto)
    .action(async ({ parsedInput }) => {
      return getAllFeedbacks(parsedInput);
    });
