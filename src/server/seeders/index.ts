import { seedFeedbacks } from "./feedbacks";
import { seedIntroductions } from "./introductions";
import { seedUsers } from "./users";
(async function seed() {
  console.log("seeding started ...");
  await seedUsers();
  await seedIntroductions();
  await seedFeedbacks();
  console.log("seeding done ...");
})();
