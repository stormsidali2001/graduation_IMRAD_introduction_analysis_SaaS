import { authActionClient } from "@/lib/safe-action";
import { getIntroductions } from "../services/user-data";
import { z } from "zod";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";

export const getIntroductionsAction = authActionClient
  .schema(RetrieverParamsDto)
  .metadata({ actionName: "getIntroductions" })
  .action(async ({ ctx, parsedInput: { page = 1, search } }) => {
    return getIntroductions(ctx.userId, { page, search }, ctx.userRole);
  });

