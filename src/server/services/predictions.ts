import { getMoves } from "../dao/moves";
import { getSubmoves } from "../dao/sub-moves";
import {
  PredictionOutputDto,
  PredictionOutputDtoType,
} from "../validation/PredictionDto";

export const makePrediction = async (sentences: string[]) => {
  const movesPredictions: PredictionOutputDtoType = (
    await getMoves(sentences)
  ).map((prediction, index) => {
    return {
      move: prediction.class,
      sentence: sentences[index],
      subMove: null,
      moveConfidence: prediction.probability,
    };
  });
  console.log("movesPredictions", movesPredictions);
  // move 0 submoves
  let move0 = movesPredictions.filter((m) => m.move === 0);
  let move1 = movesPredictions.filter((m) => m.move === 1);
  let move2 = movesPredictions.filter((m) => m.move === 2);
  const res0 =
    move0.length > 0
      ? await getSubmoves(
          move0.map((m) => m.sentence),
          0,
        )
      : null;
  console.log(res0);
  const res1 =
    move1.length > 0
      ? await getSubmoves(
          move1.map((m) => m.sentence),
          1,
        )
      : null;

  console.log(res1);
  const res2 =
    move2.length > 0
      ? await getSubmoves(
          move2.map((m) => m.sentence),
          2,
        )
      : null;
  console.log(res2);
  move0 = move0.map((m, index) => {
    return {
      ...m,
      subMove: res0?.[index].class,
      subMoveConfidence: res0?.[index].probability,
    };
  });
  move1 = move1.map((m, index) => {
    return {
      ...m,
      subMove: res1?.[index].class,
      subMoveConfidence: res1?.[index].probability,
    };
  });

  move2 = move2.map((m, index) => {
    return {
      ...m,
      subMove: res2?.[index].class,
      subMoveConfidence: res2?.[index].probability,
    };
  });

  const predictions = movesPredictions.map((m, index) => {
    if (m.move === 0) {
      const item = move0.find((m0) => m0.sentence === m.sentence);
      return {
        ...m,
        subMove: item.subMove,
        subMoveConfidence: item.subMoveConfidence,
      };
    }
    if (m.move === 1) {
      const item = move1.find((m1) => m1.sentence === m.sentence);
      return {
        ...m,
        subMove: item.subMove,
        subMoveConfidence: item.subMoveConfidence,
      };
    }
    if (m.move === 2) {
      const item = move2.find((m2) => m2.sentence === m.sentence);
      return {
        ...m,
        subMove: item.subMove,
        subMoveConfidence: item.subMoveConfidence,
      };
    }
  });

  return PredictionOutputDto.parseAsync(predictions);
};

