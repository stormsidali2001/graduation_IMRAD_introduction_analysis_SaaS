import { authActionClient } from "@/lib/safe-action";
import { getIntroductionsStats } from "../services/user-data";

export const getIntroductionStatsAction = authActionClient
  .metadata({ actionName: "getIntroductionStats" })
  .action(async ({ ctx }) => {
    return getIntroductionsStats(ctx.userId, ctx.userRole);
  });
