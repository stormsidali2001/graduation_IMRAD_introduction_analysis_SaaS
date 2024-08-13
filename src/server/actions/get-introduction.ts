import { authActionClient } from "@/lib/safe-action";
import { getIntroduction } from "../services/user-data";
import { z } from "zod";

export const getIntroductionAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .metadata({ actionName: "getIntroductionAction" })
  .action(async ({ ctx, parsedInput: { id } }) => {
    const introduction = await getIntroduction(id, ctx.userId, ctx.userRole);
    console.log("introduction:--->", introduction);

    return introduction;
  });

