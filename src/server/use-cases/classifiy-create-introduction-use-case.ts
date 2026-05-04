import { hashPassword } from "@/lib/crypto";
import { createIntroduction } from "../services/user-data";
import { makePrediction } from "../services/predictions";
export const classifyCreateIntroductionUsecase = async ({
  sentences,
  plan,
  userId,
}: {
  sentences: string[];
  userId: string;
  plan: "free" | "premium";
}) => {
  try {
    const sha = await hashPassword(sentences.join("."));

    const predictions = await makePrediction(sentences);
    await createIntroduction(
      {
        sha,
        userId,
        sentences: predictions?.map((p, index) => ({
          move: p.move,
          subMove: p.subMove,
          order: index,
          text: p.sentence,
          moveConfidence: p.moveConfidence,
          subMoveConfidence: p.subMoveConfidence,
        })),
      },
      plan === "premium",
    );
    return predictions;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
