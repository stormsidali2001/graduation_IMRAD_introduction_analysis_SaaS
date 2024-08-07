import { getTotalUsers, registerUser } from "../services/user-service";
import { $Enums } from "@prisma/client";
const users = [
  {
    role: $Enums.Role.Admin,
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456789",
  },

  {
    role: $Enums.Role.User,
    name: "Sidali Assoul",
    email: "assoulsidali.contact@gmail.com",
    password: "123456789",
  },
];
export const seedUsers = async () => {
  console.log("Seeding Users");
  const total = await getTotalUsers();
  if (total > 0) {
    console.log("Already seeded");
    return;
  }
  await Promise.all(
    users.map(({ email, password, name, role }) =>
      registerUser({ email, password, name }, role),
    ),
  );
};
