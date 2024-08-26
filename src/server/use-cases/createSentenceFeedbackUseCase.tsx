import { createSentenceFeedback, getIntroduction } from "../services/user-data";
import { SentenceFeedbackDtoType } from "../validation/feedbackDto";

export const createSentenceFeedbackUseCase = async (
  input: SentenceFeedbackDtoType,
  userId: string,
  {
    userRole,
    username,
    image,
  }: {
    userRole: "Admin" | "User";
    username: string;
    image?: string;
  },
) => {
  try {
    const introduction = await getIntroduction(
      input.introductionId,
      userId,
      userRole,
    );
    if (!introduction) {
      throw new Error("Introduciton not found");
    }
    if (introduction.userId !== userId) {
      throw new Error("Introduction not found");
    }
    await createSentenceFeedback(
      {
        ...input,
        feedback: {
          ...input.feedback,
          username: username,
          image,
        },
      },
      userId,
    );
  } catch (err) {
    console.error("Failed to create feedback" + err);
  }
};
