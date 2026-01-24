import {
  createSerializer,
  parseAsNativeArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";

const searchParams = {
  role: parseAsString,
  level: parseAsString,
  languages: parseAsNativeArrayOf(parseAsString),
  tools: parseAsNativeArrayOf(parseAsString),
};

export const serialize = createSerializer(searchParams);

export function useFilters() {
  return useQueryStates(searchParams);
}
