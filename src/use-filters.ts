import { flattenObject } from "es-toolkit";
import {
  createSerializer,
  parseAsNativeArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";

export const searchParams = {
  role: parseAsString,
  level: parseAsString,
  languages: parseAsNativeArrayOf(parseAsString),
  tools: parseAsNativeArrayOf(parseAsString),
};

export type FilterCategories = keyof typeof searchParams;

export const buildUrlParams = createSerializer(searchParams);

export function useFilters() {
  const [filters, setFilters] = useQueryStates(searchParams);

  const filterValues = Object.values(filters).flat().filter(Boolean);

  const filterEntries = Object.entries(flattenObject(filters))
    .map(([key, value]) => [key.split(".")[0], value])
    .filter(([, value]) => filterValues.includes(value));

  const hasFilters = filterValues.filter(Boolean).length > 0;

  const addFilter = (type: FilterCategories, value: string) => {
    let newFilter: unknown = value;

    if (type === "languages") {
      newFilter = Array.from(new Set(filters.languages).add(value));
    }

    if (type === "tools") {
      newFilter = Array.from(new Set(filters.tools).add(value));
    }

    setFilters({ [type]: newFilter });
  };

  const removeFilter = (type: FilterCategories, value: string) => {
    let nextFilter = null;

    if (type === "languages") {
      nextFilter = filters.languages?.filter((l) => l !== value);
    }

    if (type === "tools") {
      nextFilter = filters.tools?.filter((t) => t !== value);
    }

    setFilters({ [type]: nextFilter });
  };

  const clearFilters = () => {
    setFilters({
      role: null,
      level: null,
      languages: [],
      tools: [],
    });
  };

  return {
    filters,
    setFilters,
    filterEntries,
    addFilter,
    removeFilter,
    clearFilters,
    hasFilters,
  };
}
