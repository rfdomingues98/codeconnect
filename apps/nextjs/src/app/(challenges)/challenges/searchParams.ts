import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const difficultyEnum = ["easy", "medium", "hard"] as const;

export const filtersParsers = {
  title: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  tag: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  difficulty: parseAsArrayOf(parseAsStringLiteral(difficultyEnum))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  language: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  sort: parseAsString
    .withDefault("newest")
    .withOptions({ clearOnDefault: true }),
};

export const searchParamsCache = createSearchParamsCache({
  ...filtersParsers,
});
