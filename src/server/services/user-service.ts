import prismaClient from "@/lib/prisma-client";
import { hashPassword } from "@/lib/server-utils";
import { RegisterUserInput } from "@/schema/validation/register-user.schema";
import { UserAlreadyRegistered } from "../errors";
import { RetrieverParamsDtoType } from "../validation/RetrieverParamsDto";
import { PAGE_SIZE } from "@/common/general";
import { getPaginatedResults } from "../validation/paginationMakerDto";
import { UserDto } from "../validation/UserDto";
import { type $Enums } from "@prisma/client";

export const registerUser = async (
  { email, password, name }: Omit<RegisterUserInput, "passwordConfirmation">,
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

export const getUsers = async ({ page, search }: RetrieverParamsDtoType) => {
  const [total, users] = await Promise.all([
    getTotalUsers(),
    prismaClient.user.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        ...(search ? { name: { contains: search } } : {}),
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
