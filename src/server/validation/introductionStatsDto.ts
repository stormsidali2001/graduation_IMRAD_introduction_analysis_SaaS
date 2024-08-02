import {z} from 'zod'

export const IntroductionStatsDto = z.object({
  totalIntroductions: z.number().int().positive(),
  totalIntroductionsByMove: z.array(
    z.object({
      count: z.number(),
      move: z.coerce.number(),
    })
  ),

  averageConfidenceScore: z.object({
    avgMoveConfidence: z.number().positive(),
    avgSubMoveConfidence: z.number().positive(),
  }),
  averageConfidenceScoreByMove: z.array(
    z.object({
      avgMoveConfidence: z.number().positive(),
      avgSubMoveConfidence: z.number().positive(),
      move: z.coerce.number(),
    })
  ),
  //
  averageSentencePositionScore: z.object({
    avgOrder: z.number(),
    
  }),
  averageSentencePositionScoreByMove: z.array(
    z.object({
      move: z.coerce.number(),
      avgOrder: z.number(),
    })
  ),
});
export type IntroductionStatsDto = z.infer<typeof IntroductionStatsDto>;