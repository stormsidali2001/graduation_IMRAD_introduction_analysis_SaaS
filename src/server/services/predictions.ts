import { getMoves } from "../dao/moves";
import { getSubmoves } from "../dao/sub-moves";
import {
  PredictionOutputDto,
  PredictionOutputDtoType,
} from "../validation/PredictionDto";
import { isPreviewMode } from "@/lib/preview-mode";
import { makeMockPredictions } from "@/server/mock/mock-predictions";

export const makePrediction = async (sentences: string[]) => {
  if (isPreviewMode()) return makeMockPredictions(sentences);
  const movesPredictions: PredictionOutputDtoType = (
    await getMoves(sentences)
  ).map((prediction, index) => ({
    move: prediction.class,
    sentence: sentences[index],
    subMove: null,
    moveConfidence: prediction.probability,
  }));

  const move0 = movesPredictions.filter((m) => m.move === 0);
  const move1 = movesPredictions.filter((m) => m.move === 1);
  const move2 = movesPredictions.filter((m) => m.move === 2);

  const [res0, res1, res2] = await Promise.all([
    move0.length > 0 ? getSubmoves(move0.map((m) => m.sentence), 0) : null,
    move1.length > 0 ? getSubmoves(move1.map((m) => m.sentence), 1) : null,
    move2.length > 0 ? getSubmoves(move2.map((m) => m.sentence), 2) : null,
  ]);

  // Build O(1) lookup map: sentence → { subMove, subMoveConfidence }
  type SubMoveEntry = { subMove: number; subMoveConfidence: number };
  const subMoveMap = new Map<string, SubMoveEntry>();

  move0.forEach((m, i) => {
    subMoveMap.set(m.sentence, {
      subMove: res0?.[i].class,
      subMoveConfidence: res0?.[i].probability,
    });
  });
  move1.forEach((m, i) => {
    subMoveMap.set(m.sentence, {
      subMove: res1?.[i].class,
      subMoveConfidence: res1?.[i].probability,
    });
  });
  move2.forEach((m, i) => {
    subMoveMap.set(m.sentence, {
      subMove: res2?.[i].class,
      subMoveConfidence: res2?.[i].probability,
    });
  });

  const predictions = movesPredictions.map((m) => ({
    ...m,
    ...subMoveMap.get(m.sentence),
  }));

  return PredictionOutputDto.parseAsync(predictions);
};
