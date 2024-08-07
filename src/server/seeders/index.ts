import { seedUsers } from "./users";
export async function seed() {
  console.log("seeding started ...");
  await seedUsers();
  console.log("seeding done ...");
}
