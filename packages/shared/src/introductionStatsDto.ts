import { z } from "zod";

export const IntroductionStatsDto = z.object({
  totalIntroductions: z.number().int().min(0),
  totalIntroductionsByMove: z.array(
    z.object({
      count: z.number(),
      move: z.coerce.number(),
    }),
  ),
  averageConfidenceScore: z.object({
    avgMoveConfidence: z.number().min(0),
    avgSubMoveConfidence: z.number().min(0),
  }),
  averageConfidenceScoreByMove: z.array(
    z.object({
      avgMoveConfidence: z.number().min(0),
      avgSubMoveConfidence: z.number().min(0),
      move: z.coerce.number(),
    }),
  ),
  averageSentencePositionScore: z.object({
    avgOrder: z.number(),
  }),
  averageSentencePositionScoreByMove: z.array(
    z.object({
      move: z.coerce.number(),
      avgOrder: z.number(),
    }),
  ),
});

// Declaration merging: allows using IntroductionStatsDto as both schema and type
export type IntroductionStatsDto = z.infer<typeof IntroductionStatsDto>;
export type IntroductionStatsDtoType = z.infer<typeof IntroductionStatsDto>;
