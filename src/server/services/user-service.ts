import prismaClient from "@/lib/prisma-client";
import { hashPassword } from "@/lib/server-utils";
import { RegisterUserInput } from "@/schema/validation/register-user.schema";
import { UserAlreadyRegistered } from "../errors";
import { RetrieverParamsDtoType } from "../validation/RetrieverParamsDto";
import { PAGE_SIZE } from "@/common/general";
import { getPaginatedResults } from "../validation/paginationMakerDto";
import {
  PrivateUserDto,
  UpdateUserDtoSchemaType,
  UserDto,
  UserDtoType,
} from "../validation/UserDto";
import { $Enums } from "@prisma/client";
import { SubscriptionDto } from "../validation/SubscriptionDto";

export const findUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) return null;

  return UserDto.parseAsync(user);
};

export const findUserByCustomerId = async (customerId: string) => {
  const user = await prismaClient.user.findUnique({ where: { customerId } });
  if (!user) return null;

  return UserDto.parseAsync(user);
};

export const findUserById = async (id: string) => {
  const user = await prismaClient.user.findUnique({ where: { id } });
  if (!user) return null;

  return UserDto.parseAsync(user);
};
export const findUserByEmailWithCredentials = async (email: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) return null;

  return PrivateUserDto.parseAsync(user);
};

export const banUser = async (userId: string) => {
  await prismaClient.user.update({
    where: { id: userId },

    data: {
      isBanned: true,
    },
  });
};
export const unbanUser = async (userId: string) => {
  await prismaClient.user.update({
    where: { id: userId },
    data: {
      isBanned: false,
    },
  });
};
export const createUser = async (
  {
    email,
    password,
    name,
    customerId,
  }: Omit<RegisterUserInput, "passwordConfirmation"> & { customerId: string },
  role: $Enums.Role = "User",
) => {
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        customerId,
        plan: $Enums.Plan.free,
      },
    });

    return user;
  } catch (err) {
    if (err.code === "P2002") {
      throw new UserAlreadyRegistered();
    }
    throw err;
  }
};
export const getTotalUsers = async () => {
  try {
    return prismaClient.user.count();
  } catch (err) {
    console.error(err);
  }
};

export const getTotalSubscriptions = async () => {
  try {
    return prismaClient.subscription.count();
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async (
  { page, search }: RetrieverParamsDtoType,
  expectUserId: string = undefined,
) => {
  const [total, users] = await Promise.all([
    getTotalUsers(),
    prismaClient.user.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        ...(search ? { name: { contains: search } } : {}),
        ...(expectUserId
          ? {
              id: {
                not: expectUserId,
              },
            }
          : {}),
      },
    }),
  ]);

  return getPaginatedResults(
    {
      data: users,
      page,
      per_page: PAGE_SIZE,
      total,
      total_pages: Math.ceil(total / PAGE_SIZE),
    },
    UserDto,
  );
};

export const getSubscriptions = async ({
  page,
  search,
}: RetrieverParamsDtoType) => {
  const [total, users] = await Promise.all([
    getTotalSubscriptions(),
    prismaClient.subscription.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        User: true,
      },
      where: {
        ...(search ? { User: { name: { contains: search } } } : {}),
      },
    }),
  ]);

  return getPaginatedResults(
    {
      data: users,
      page,
      per_page: PAGE_SIZE,
      total,
      total_pages: Math.ceil(total / PAGE_SIZE),
    },
    SubscriptionDto,
  );
};

export const updateUser = async (id: string, user: UpdateUserDtoSchemaType) => {
  await prismaClient.user.update({
    where: {
      id,
    },
    data: {
      ...user,
    },
  });
};
export const getUserRedirectUrl = (user: UserDtoType) => {
  if (user.role === "Admin") {
    return "/dasbhoard";
  } else return "/generate";
};

export const resetToFreePlan = async (id: string) => {
  await prismaClient.$transaction([
    prismaClient.user.update({
      where: { id },
      data: { plan: "free" },
    }),
    prismaClient.subscription.delete({ where: { userId: id } }),
  ]);
};

export const upsertUserSubscription = async (
  userId: string,
  priceId: string,
) => {
  let endDate = new Date();
  if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
  } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
    endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
  } else {
    throw new Error("Invalid priceId");
  }
  await prismaClient.subscription.upsert({
    where: { userId },
    create: {
      userId,
      startDate: new Date(),
      endDate: endDate,
      plan: "premium",
      period:
        priceId === process.env.STRIPE_YEARLY_PRICE_ID! ? "yearly" : "monthly",
    },
    update: {
      plan: "premium",
      period:
        priceId === process.env.STRIPE_YEARLY_PRICE_ID! ? "yearly" : "monthly",
      startDate: new Date(),
      endDate: endDate,
    },
  });
};
