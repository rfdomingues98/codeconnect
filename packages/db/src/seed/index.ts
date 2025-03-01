import { seedChallenges } from "./challenges";

/**
 * Main seed function that runs all seed operations
 */
export async function seed() {
  await seedChallenges();
  console.log("All seed operations completed successfully!");
}

export { seedChallenges };
