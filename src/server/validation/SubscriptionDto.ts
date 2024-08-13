import { z } from "zod";
import { UserDto } from "./UserDto";
export const SubscriptionDto = z.object({
  User: UserDto,
  period: z.string(),
  plan: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export type SubscriptionDtoType = z.infer<typeof SubscriptionDto>;
