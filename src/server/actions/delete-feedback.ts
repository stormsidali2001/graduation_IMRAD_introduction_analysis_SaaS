"use server";
import { adminAction, authActionClient } from "@/lib/safe-action";
import { SentenceFindParamsDto } from "../validation/feedbackDto";
import { deleteFeedback } from "../services/user-data";
import { revalidatePath } from "next/cache";

export const deleteFeedbackAction =
  // TODO: remove this
  //adminAction
  authActionClient
    .schema(SentenceFindParamsDto)
    .metadata({ actionName: "deleteFeedbackAction" })
    .action(async ({ parsedInput }) => {
      try {
        await deleteFeedback(parsedInput);
        revalidatePath("/feedbacks");
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
