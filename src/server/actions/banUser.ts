"use server";
import { adminAction } from "@/lib/safe-action";
import { z } from "zod";
import { banUser, unbanUser } from "@/server/services/user-service";
import { revalidatePath } from "next/cache";

export const banUserAction = adminAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ actionName: "banUserAction" })
  .action(async ({ parsedInput: { userId } }) => {
    try {
      console.log("baaaaaaaaan------------------" + userId);
      await banUser(userId);
      revalidatePath("/users");
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

export const unbanUserAction = adminAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ actionName: "UnbanUserAction" })
  .action(async ({ parsedInput: { userId } }) => {
    try {
      await unbanUser(userId);
      revalidatePath("/users");
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
