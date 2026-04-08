/**
 * Merges contiguous sentences that share the same (move, subMove) into a single entry.
 * Sentences with null move/subMove are never merged — each stays its own entry.
 * Confidence values are averaged across the merged group.
 */
export function mergeContiguousSentences<
  T extends {
    sentence: string;
    move: number | null;
    subMove: number | null;
    moveConfidence?: number;
    subMoveConfidence?: number;
  },
>(sentences: T[]): T[] {
  const merged: T[] = [];

  for (const current of sentences) {
    const last = merged[merged.length - 1];

    const canMerge =
      last !== undefined &&
      current.move !== null &&
      current.subMove !== null &&
      last.move === current.move &&
      last.subMove === current.subMove;

    if (canMerge) {
      // Append text and average confidences
      merged[merged.length - 1] = {
        ...last,
        sentence: `${last.sentence} ${current.sentence}`,
        moveConfidence:
          ((last.moveConfidence ?? 0) + (current.moveConfidence ?? 0)) / 2,
        subMoveConfidence:
          ((last.subMoveConfidence ?? 0) + (current.subMoveConfidence ?? 0)) / 2,
      };
    } else {
      merged.push({ ...current });
    }
  }

  return merged;
}
