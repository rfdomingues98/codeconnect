export function getRandom<T>(array: T[], seed?: string): T {
  const index = seed
    ? Math.abs(hashCode(seed)) % array.length
    : Math.floor(Math.random() * array.length);
  // @ts-expect-error we know it always has a child
  return array[index];
}

function hashCode(string: string) {
  let hash = 0;

  if (string.length > 0) {
    let index = 0;

    while (index < string.length) {
      hash = ((hash << 5) - hash + string.charCodeAt(index++)) | 0;
    }
  }

  return hash;
}

/**
 * Random colors used in the app.
 */
export const colors = [
  "#0077ff",
  "#00bbff",
  "#00cc88",
  "#88cc11",
  "#ffbb00",
  "#ff8811",
  "#ee1144",
  "#ee44bb",
  "#8855bf",
];
