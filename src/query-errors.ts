import type { Query } from "@tanstack/react-query";
import { toast } from "sonner";

export const QueryErrCodes = {
  JOBS_FETCH_FAILED: "JOBS_FETCH_FAILED",
} as const;

export function handleQueryErrors(
  _: Error,
  query: Query<unknown, unknown, unknown>,
) {
  switch (query.meta?.errCode) {
    case QueryErrCodes.JOBS_FETCH_FAILED: {
      return toast.error("Error while fetching new jobs", {
        description: "Please, try again",
      });
    }
    default:
      return toast.error("It is over. Nothing remains.");
  }
}
