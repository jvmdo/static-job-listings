import { serialize } from "@/use-filters";
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
  contract: string;
  location: string;
  languages: string[];
  tools: [];
};

export type JobFilters = {
  role?: string | null;
  level?: string | null;
  languages?: string[] | null;
  tools?: string[] | null;
};

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const urlParams = serialize(filters);
      const jobsEndpoint = new URL("/jobs", window.location.href);
      jobsEndpoint.search = urlParams;
      // MSW ignores query params, but defining for consistency
      return (await fetch(jobsEndpoint).then((res) => res.json())) as Job[];
    },
  });
}
