"use server";
import { adminAction } from "@/lib/safe-action";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";
import { getSubscriptions } from "../services/user-service";

export const getSubscriptionsAction = adminAction
  .metadata({ actionName: "getSubscriptionsAction" })
  .schema(RetrieverParamsDto)
  .action(async ({ parsedInput }) => {
    return getSubscriptions(parsedInput);
  });
