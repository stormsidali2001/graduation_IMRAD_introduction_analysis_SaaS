import { seedUsers } from "./users";
(async function seed() {
  console.log("seeding started ...");
  await seedUsers();
  console.log("seeding done ...");
})();
