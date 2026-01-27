import { parseAsInteger, useQueryState } from "nuqs";

export function usePage(queryParam = "page") {
  return useQueryState(queryParam, parseAsInteger.withDefault(1));
}
