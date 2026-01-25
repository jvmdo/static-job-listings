import { buildUrlParams, searchParams } from "@/use-filters";
import { useQuery } from "@tanstack/react-query";

export type Job = {
  id: string;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  postedDate: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

export type JobFilters = {
  [K in keyof typeof searchParams]?: K extends "languages" | "tools"
    ? string[] | null
    : string | null;
};

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const urlParams = buildUrlParams(filters);
      const jobsEndpoint = new URL("/jobs", window.location.href);
      jobsEndpoint.search = urlParams;
      // MSW ignores query params, but defining for consistency
      return (await fetch(jobsEndpoint).then((res) => res.json())) as Job[];
    },
  });
}
