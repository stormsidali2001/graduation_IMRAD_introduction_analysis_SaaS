import type { PredictionOutputDtoType } from "@/server/validation/PredictionDto";

// Deterministic: same input always produces same output (no Math.random)
const MOVE_SUB_MOVE_TABLE: [move: number, subMove: number][] = [
  [0, 0], [0, 1], [0, 0],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2], [2, 3],
];

export const makeMockPredictions = (sentences: string[]): PredictionOutputDtoType =>
  sentences.map((sentence, i) => {
    const [move, subMove] = MOVE_SUB_MOVE_TABLE[i % MOVE_SUB_MOVE_TABLE.length];
    return {
      sentence,
      move,
      subMove,
      moveConfidence: parseFloat((0.82 + (i % 5) * 0.03).toFixed(2)),
      subMoveConfidence: parseFloat((0.74 + (i % 7) * 0.02).toFixed(2)),
    };
  });
