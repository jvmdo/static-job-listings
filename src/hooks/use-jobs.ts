import { buildUrlParams, searchParams } from "@/hooks/use-filters";
import { QueryErrCodes } from "@/lib/query-errors";
import { JobsResponseSchema } from "@/mocks/db";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  queryKey: [JobFilters, number];
  onError: (previousFilters: JobFilters, previousPage: number) => void;
  onRetry: () => void;
}

export function useJobs({ queryKey, onError, onRetry }: UseJobsParams) {
  const [filters, page] = queryKey;
  const previousQueryKey = usePrevious(JSON.stringify(["jobs", filters, page]));

  const query = useQuery({
    queryKey: ["jobs", filters, page],
    queryFn: async ({ signal }) => {
      // MSW ignores query params, but defining for consistency
      const urlParams = buildUrlParams(filters) + `&page=${page}`;
      const jobsEndpoint = new URL("/jobs", window.location.href);
      jobsEndpoint.search = urlParams;

      const response = await fetch(jobsEndpoint, { signal });

      if (!response.ok) {
        throw new Error(previousQueryKey ?? "[]");
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

  const setPreviousData = useEffectEvent(() => {
    const previousQueryKey = query.error ? query.error.message : "[]";
    const [, previousFilters, previousPage] = JSON.parse(previousQueryKey);
    onError(previousFilters, previousPage);
  });

  useEffect(() => {
    if (query.isError) {
      setPreviousData();
    }
  }, [query.isError]);

  const hasRetry = query.failureCount > 1;

  useEffect(() => {
    if (hasRetry) {
      onRetry();
    }
  }, [hasRetry, onRetry]);

  return query;
}

/* 
  somewhere-else.d.ts
*/

type HasSameKeysAs<
  T,
  U extends Record<keyof T, unknown> & Record<keyof U, unknown>,
> = U;
