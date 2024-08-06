"use server";
import { authActionClient } from "@/lib/safe-action";
import { CreateSentenceFeedbackDto } from "../validation/feedbackDto";
import { createSentenceFeedback } from "../services/user-data";
import { revalidatePath } from "next/cache";

export const createSentenceFeedbackAction = authActionClient
  .schema(CreateSentenceFeedbackDto)
  .metadata({ actionName: "createSentenceFeedback" })
  .action(async ({ parsedInput, ctx }) => {
    try {
      await createSentenceFeedback(
        {
          ...parsedInput,
          feedback: {
            ...parsedInput.feedback,
            username: ctx.username,
            image: ctx.userImage,
          },
        },
        ctx.userId,
      );
      revalidatePath(
        "/user/dashboard/introductions/" + parsedInput.introductionId,
      );
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create sentence feedback");
    }
  });
