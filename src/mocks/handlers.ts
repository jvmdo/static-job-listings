import type { Job, JobFilters } from "@/use-jobs";

import { delay, http, HttpResponse } from "msw";
import data from "./data.json";

export const handlers = [
  // TODO: does relative work for any location.href?
  http.get("/jobs", async ({ request }) => {
    await delay();

    const url = new URL(request.url);
    const filters = {
      role: url.searchParams.get("role"),
      level: url.searchParams.get("level"),
      languages: url.searchParams.getAll("languages"),
      tools: url.searchParams.getAll("tools"),
    };

    const filteredJobs = getFilteredJobs(data, filters);

    return HttpResponse.json(filteredJobs);
  }),
];

const getFilteredJobs = (jobs: Job[], filters: JobFilters) => {
  const { role, level, languages, tools } = filters;

  return jobs.filter((job) => {
    if (role && job.role !== role) return false;

    if (level && job.level !== level) return false;

    if (
      languages?.length &&
      !languages.every((l) => job.languages.includes(l))
    ) {
      return false;
    }

    if (tools?.length && !tools.every((t) => job.tools.includes(t))) {
      return false;
    }

    return true;
  });
};
