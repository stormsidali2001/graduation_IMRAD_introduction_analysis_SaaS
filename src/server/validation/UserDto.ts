import { z } from "zod";
export const UserDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  createdAt: z.date(),
});

export type UserDtoType = z.infer<typeof UserDto>;
