import { handleQueryErrors } from "@/lib/query-errors";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleQueryErrors,
  }),
});
