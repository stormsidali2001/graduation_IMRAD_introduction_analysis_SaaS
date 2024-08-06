import { z } from "zod";
export const DashboardStatsDto = z.object({
  total: z.number(),
  avgMoveConfidence: z.number(),
  avgSubMoveConfidence: z.number(),
  totalFeedbacks: z.number(),
});

export type DashboardStatsDtoType = z.infer<typeof DashboardStatsDto>;
