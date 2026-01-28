import { buildUrlParams, searchParams, useFilters } from "@/hooks/use-filters";
import { usePage } from "@/hooks/use-page";
import { QueryErrCodes } from "@/lib/query-errors";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect } from "react";
import z from "zod";

const JobSchema = z.object({
  id: z.string(),
  company: z.string(),
  logo: z.string(),
  new: z.boolean(),
  featured: z.boolean(),
  position: z.string(),
  role: z.string(),
  level: z.string(),
  postedAt: z.string(),
  postedDate: z.string(),
  contract: z.string(),
  location: z.string(),
  languages: z.array(z.string()),
  tools: z.array(z.string()),
});

const JobsResponseSchema = z.object({
  jobs: z.array(JobSchema),
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type JobsResponse = z.infer<typeof JobsResponseSchema>;
export type Job = z.infer<typeof JobSchema>;

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

  const queryKey = ["jobs", filters, page];
  const currentQueryKey = JSON.stringify(queryKey);
  const previousQueryKey = usePrevious(currentQueryKey);

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      try {
        // MSW ignores query params, but defining for consistency
        const urlParams = buildUrlParams(filters) + `&page=${page}`;
        const jobsEndpoint = new URL("/jobs", window.location.href);
        jobsEndpoint.search = urlParams;

        const response = await fetch(jobsEndpoint, { signal });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        return JobsResponseSchema.parse(data);
      } catch (err) {
        const [, previousFilters, previousPage] = JSON.parse(previousQueryKey);
        setFilters(previousFilters);
        setPage(previousPage);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
    retry: (failureCount) => {
      return failureCount < 2;
    },
    // retry: false,
    meta: {
      errCode: QueryErrCodes.JOBS_FETCH_FAILED,
    },
  });

  //? QUESTION: Only logged on mount if it fails, never after successful mount
  if (query.status === "error") {
    console.error("An error indeed");
  }

  const hasRetry = query.failureCount > 2;

  useEffect(() => {
    if (hasRetry) {
      onRetry();
    }
  }, [hasRetry, onRetry]);

  return query;
}

/* 
  types.ts
*/

type HasSameKeysAs<
  T,
  U extends Record<keyof T, unknown> & Record<keyof U, unknown>,
> = U;
