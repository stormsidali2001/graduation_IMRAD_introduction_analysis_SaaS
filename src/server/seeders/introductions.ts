import { getUsers } from "../services/user-service";
import { classifyCreateIntroductionUsecase } from "../use-cases/classifiy-create-introduction-use-case";
import fs from "fs/promises";
import path from "path";

import { split } from "sentence-splitter";

export const seedIntroductions = async () => {
  let introductions: string[];
  try {
    const jsonPath = path.join(__dirname, "../../../public/test_intros.json");

    console.log({ jsonPath });
    const jsonIntros = await fs.readFile(jsonPath, {
      encoding: "utf8",
    });
    const parsed = JSON.parse(jsonIntros);
    introductions = Object.values(parsed["text"]);
  } catch (err) {
    console.error("Failed to parse the introductions" + err);
    throw err;
  }

  try {
    const users = await getUsers({ page: 1 });
    if (users.total === 0) throw new Error("Please seed users first");

    for (const user of users.data) {
      if (user.role === "Admin") continue;
      for (const introduction of introductions) {
        const sentences =
          split(introduction)
            .map((o) => o.raw)
            .filter((s) => s.length > 5) ?? [];

        await classifyCreateIntroductionUsecase({
          sentences,
          userId: user.id,
          plan: "free",
        });
      }
    }
  } catch (err) {
    console.error("Seeding failed: " + err);
    throw err;
  }
};
