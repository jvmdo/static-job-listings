import { handleQueryErrors } from "@/lib/query-errors";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    //? QUESTION: Only shows up if `retry: false`
    onError: handleQueryErrors,
  }),
});
