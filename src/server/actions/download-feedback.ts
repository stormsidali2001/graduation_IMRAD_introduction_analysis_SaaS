"use server";
import { ActionError, adminAction } from "@/lib/safe-action";
import { downloadFeedbackUseCase } from "../use-cases/download-feedback-use-case";

export const downloadFeedbackAction = adminAction
  .metadata({ actionName: "downloadFeedbackAction" })

  .action(async () => {
    try {
      return await downloadFeedbackUseCase();
    } catch (err) {
      throw new ActionError(err);
    }
  });
