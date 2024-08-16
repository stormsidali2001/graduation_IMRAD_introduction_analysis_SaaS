import { getUsers } from "../services/user-service";
import { classifyCreateIntroductionUsecase } from "../use-cases/classifiy-create-introduction-use-case";
import fs from "fs/promises";
import path from "path";

export const seedIntroductions = async () => {
  try {
    const introductionsJSON = await fs.readFile(
      path.join("../../../public/test_intro.json"),
      { encoding: "utf8" },
    );
    const introductionsParsed = JSON.parse(introductionsJSON);
  } catch (err) {
    console.error("Failed to parse the introductions" + err);
    throw err;
  }

  const users = await getUsers({ page: 1 });
  if (users.total === 0) throw new Error("Please seed users first");

  for (const user of users.data) {
    if (user.role === "Admin") continue;
    for (let i = 0; i < 10; i++) {
      await classifyCreateIntroductionUsecase({
        sentences: [],
        userId: user.id,
        plan: "free",
      });
    }
  }
};
