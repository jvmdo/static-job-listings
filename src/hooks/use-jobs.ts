import { buildUrlParams, searchParams, useFilters } from "@/hooks/use-filters";
import { usePage } from "@/hooks/use-page";
import { QueryErrCodes } from "@/lib/query-errors";
import { JobsResponseSchema } from "@/mocks/db";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent, useRef } from "react";

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
  const [page, setPage] = usePage();
  const { filters, setFilters } = useFilters();
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
        throw new Error("[queryFn] says: ");
      }

      const data = await response.json();

      return JobsResponseSchema.parse(data);
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
    retry: false,
    meta: {
      errCode: QueryErrCodes.JOBS_FETCH_FAILED,
    },
  });

  const rollbackQuery = useEffectEvent(() => {
    const [, previousFilters, previousPage] = JSON.parse(
      previousQueryKey ?? "[]",
    );
    setPage(previousPage);
    setFilters(previousFilters);
  });

  useEffect(() => {
    if (query.isError) {
      rollbackQuery();
    }
  }, [query.isError]);

  useEffect(() => {
    if (query.failureCount > 1) {
      onRetry();
    }
  }, [query.failureCount, onRetry]);

  const data = useLastSuccessfulData(query.data, query.isSuccess);

  return { ...query, data };
}

/* 
  e-hooks-dot-com.ts
*/
function useLastSuccessfulData<T>(data: T | undefined, isSuccess: boolean) {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    if (isSuccess) {
      ref.current = data;
    }
  }, [isSuccess, data]);

  return ref.current ?? data;
}

/* 
  somewhere-else.d.ts
*/

type HasSameKeysAs<
  T,
  U extends Record<keyof T, unknown> & Record<keyof U, unknown>,
> = U;
