import { buildUrlParams, searchParams } from "@/use-filters";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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

export function useJobs(filters: JobFilters, page: number) {
  return useQuery({
    queryKey: ["jobs", filters, page],
    queryFn: async () => {
      const urlParams = buildUrlParams(filters) + `&page=${page}`;
      const jobsEndpoint = new URL("/jobs", window.location.href);
      jobsEndpoint.search = urlParams;

      // MSW ignores query params, but defining for consistency
      const data = await fetch(jobsEndpoint).then((res) => res.json());

      return JobsResponseSchema.parse(data);
    },
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
}

type HasSameKeysAs<
  T,
  U extends Record<keyof T, unknown> & Record<keyof U, unknown>,
> = U;
