import type { Job, JobFilters } from "@/use-jobs";

import { delay, http, HttpResponse } from "msw";
import data from "./data.json";

export const handlers = [
  // TODO: does relative work for any location.href?
  http.get("/jobs", async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const filters = {
      role: url.searchParams.get("role"),
      level: url.searchParams.get("level"),
      languages: url.searchParams.getAll("languages"),
      tools: url.searchParams.getAll("tools"),
    };

    const filteredJobs = getFilteredJobs(data, filters);
    const total = filteredJobs.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const jobs = filteredJobs.slice(start, end);

    return HttpResponse.json({
      jobs,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    });
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
