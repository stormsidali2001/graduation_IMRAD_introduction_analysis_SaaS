import { hashPassword } from "@/lib/server-utils";
import { createIntroduction } from "../services/user-data";
import { makePrediction } from "../services/predictions";
import { $Enums } from "@prisma/client";

export const classifyCreateIntroductionUsecase = async ({
  sentences,
  plan,
  userId,
}: {
  sentences: string[];
  userId: string;
  plan: $Enums.Plan;
}) => {
  try {
    const sha = await hashPassword(sentences.join("."));

    const predictions = await makePrediction(sentences);
    createIntroduction(
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
