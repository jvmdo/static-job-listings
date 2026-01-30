import { handleQueryErrors } from "@/lib/query-errors";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleQueryErrors,
    onSuccess: () => {
      toast.dismiss("retry");
      toast.dismiss("error");
    },
  }),
});
