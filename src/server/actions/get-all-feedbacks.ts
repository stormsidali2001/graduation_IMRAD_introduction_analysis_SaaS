"use action";

import { adminAction } from "@/lib/safe-action";

export const getAllFeedbacks = adminAction.metadata({
  actionName: "getAllFeedbacks",
});
