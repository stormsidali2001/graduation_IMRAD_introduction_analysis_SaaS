"use server";
import {
  ActionError,
  authActionClient,
  normalUserAction,
} from "@/lib/safe-action";
import { CreateSentenceFeedbackDto } from "../validation/feedbackDto";
import { createSentenceFeedback, getIntroduction } from "../services/user-data";
import { revalidatePath } from "next/cache";
import { createSentenceFeedbackUseCase } from "../use-cases/createSentenceFeedbackUseCase";

export const createSentenceFeedbackAction = normalUserAction
  .schema(CreateSentenceFeedbackDto)
  .metadata({ actionName: "createSentenceFeedback" })
  .action(async ({ parsedInput, ctx }) => {
    try {
      await createSentenceFeedbackUseCase(parsedInput, ctx.userId, {
        userRole: ctx.userRole,
        image: ctx.userImage,
        username: ctx.username,
      });
      revalidatePath("/introductions/" + parsedInput.introductionId);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create sentence feedback");
    }
  });
