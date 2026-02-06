import { buildUrlParams, searchParams, useFilters } from "@/hooks/use-filters";
import { usePage } from "@/hooks/use-page";
import { QueryErrCodes } from "@/lib/query-errors";
import { JobsResponseSchema, type JobsResponse } from "@/mocks/db";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent } from "react";

export type JobFilters = HasSameKeysAs<
  typeof searchParams,
  {
    role: string | null;
    level: string | null;
    languages: string[] | null;
    tools: string[] | null;
  }
>;

interface UseJobsParams {
  onRetry: () => void;
}

export function useJobs({ onRetry }: UseJobsParams) {
  const [page] = usePage();
  const { filters } = useFilters();

  const query = useQuery({
    queryKey: ["jobs", filters, page],
    queryFn: async ({ signal }) => {
      // MSW ignores query params, but defining for consistency
      const urlParams = buildUrlParams(filters) + `&page=${page}`;
      const jobsEndpoint = new URL("/jobs", window.location.href);
      jobsEndpoint.search = urlParams;

      const response = await fetch(jobsEndpoint, { signal });

      if (!response.ok) {
        throw new Error("[queryFn] says: what's wrong with this?");
      }

      const data = await response.json();

      return JobsResponseSchema.parse(data);
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
    meta: {
      errCode: QueryErrCodes.JOBS_FETCH_FAILED,
    },
  });

  useEffect(() => {
    if (query.failureCount > 1) {
      onRetry();
    }
  }, [query.failureCount, onRetry]);

  // * `useJobs` will work regardless whether this logic is applied or not
  // * However, if you remove it, the error screen will take place whenever an error occurs
  const data = useJobsWithRollback(query.data, query.isError);

  return { ...query, data };
}

/**
 * Enhances useJobs result with automatic error recovery.
 *
 * When a query error occurs:
 * 1. Rolls back URL params (page/filters) to their previous values
 * 2. Returns the last successful data from cache instead of `undefined`
 *
 * This provides seamless fallback to the last known good state
 * while preventing error screen flicker for renders whose `isError` is `true`.
 */
function useJobsWithRollback(data: JobsResponse | undefined, isError: boolean) {
  const [page, setPage] = usePage();
  const { filters, setFilters } = useFilters();
  const queryClient = useQueryClient();

  const previousPage = usePrevious(page);
  const previousFilters = usePrevious(filters);

  const rollbackQueryState = useEffectEvent(() => {
    setPage(previousPage);
    setFilters(previousFilters);
  });

  useEffect(() => {
    if (isError) {
      rollbackQueryState();
    }
  }, [isError]);

  const lastSuccessfulJobs = queryClient.getQueryData<JobsResponse>([
    "jobs",
    previousFilters,
    previousPage,
  ]);

  return isError ? lastSuccessfulJobs : data;
}

/* 
  somewhere-else.d.ts
*/

type HasSameKeysAs<
  T,
  U extends Record<keyof T, unknown> & Record<keyof U, unknown>,
> = U;
