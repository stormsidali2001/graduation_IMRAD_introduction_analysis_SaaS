import prismaClient from "@/lib/prisma-client";
import { hashPassword } from "@/lib/server-utils";
import { RegisterUserInput } from "@/schema/validation/register-user.schema";
import { UserAlreadyRegistered } from "../errors";
import { RetrieverParamsDtoType } from "../validation/RetrieverParamsDto";
import { PAGE_SIZE } from "@/common/general";
import { getPaginatedResults } from "../validation/paginationMakerDto";
import { PrivateUserDto, UserDto } from "../validation/UserDto";
import { $Enums } from "@prisma/client";
import { SubscriptionDto } from "../validation/SubscriptionDto";

export const findUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });
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
