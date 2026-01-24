import type { Job, JobFilters } from "@/use-jobs";
import { http, HttpResponse } from "msw";
import data from "./data.json";

export const handlers = [
  // TODO: does relative work for any location.href?
  http.get("/jobs", ({ request }) => {
    const url = new URL(request.url);

    // Given a request url of "/product?id=1",
    // the `productId` will be a "1" string.
    const role = url.searchParams.get("role");
    const level = url.searchParams.get("level");

    // Given a request url of "/products?id=1&id=2&id=3",
    // the `productIds` will be an array of ["1", "2", "3"].
    const languages = url.searchParams.getAll("languages");
    const tools = url.searchParams.getAll("tools");

    const jobs = data as Job[];
    const filteredJobs = getFilteredJobs(jobs, {
      role,
      level,
      languages,
      tools,
    });

    return HttpResponse.json(filteredJobs);
  }),
];

const getFilteredJobs = (jobs: Job[], filters: JobFilters) => {
  const { role, level, languages, tools } = filters;

  return jobs.filter((job) => {
    const matches = [];

    if (role) matches.push(job.role === role);
    if (level) matches.push(job.level === level);
    if (languages?.length) {
      matches.push(job.languages.some((l) => languages.includes(l)));
    }
    if (tools?.length) {
      matches.push(job.tools.some((t) => tools.includes(t)));
    }

    // No filters = show all; otherwise show if ANY match
    return matches.length === 0 || matches.includes(true);
  });
};
