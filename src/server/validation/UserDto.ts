import { $Enums } from "@prisma/client";
import { z } from "zod";
export const UserDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  createdAt: z.date(),
  customerId: z.string(),
  role: z.enum([$Enums.Role.Admin, $Enums.Role.User]),
  plan: z.enum([$Enums.Plan.free, $Enums.Plan.premium]),
});

export const PrivateUserDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  role: z.enum([$Enums.Role.Admin, $Enums.Role.User]),
  plan: z.enum([$Enums.Plan.free, $Enums.Plan.premium]),
  createdAt: z.date(),
  password: z.string(),
  customerId: z.string().optional(),
});
export type UserDtoType = z.infer<typeof UserDto>;
