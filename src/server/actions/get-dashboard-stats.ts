"use action";

import { adminAction, authActionClient } from "@/lib/safe-action";
import { getAllAFeedbacks, getDashboardStats } from "../services/user-data";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";

export const getDashboardStatsAction =
  // TODO: uncomment this later
  //adminAction
  authActionClient
    .metadata({
      actionName: "getDashboardStatsAction",
    })
    .action(async ({}) => {
      const stats = await getDashboardStats();
      return stats;
    });
