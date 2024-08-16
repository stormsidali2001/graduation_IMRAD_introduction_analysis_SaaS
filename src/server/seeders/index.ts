import { seedIntroductions } from "./introductions";
import { seedUsers } from "./users";
(async function seed() {
  console.log("seeding started ...");
  await seedUsers();
  await seedIntroductions();
  console.log("seeding done ...");
})();
