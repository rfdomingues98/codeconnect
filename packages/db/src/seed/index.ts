
import { seedWithLanguages } from "./challenges-with-languages";

/**
 * Main seed function that runs all seed operations
 */
export async function seed() {
  await seedWithLanguages();
  console.log("All seed operations completed successfully!");
}
