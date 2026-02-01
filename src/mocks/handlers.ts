import { delay, http, HttpResponse } from "msw";
import db from "./db";

export const handlers = [
  http.get("/jobs", async ({ request }) => {
    await delay();
    const shouldFail = Math.random() < 0.1; // 10% error rate

    if (shouldFail) {
      return new HttpResponse(null, { status: 500 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const role = url.searchParams.get("role");
    const level = url.searchParams.get("level");
    const languages = url.searchParams.getAll("languages");
    const tools = url.searchParams.getAll("tools");

    const jobsFiltered = db.jobs.findMany(
      (q) =>
        q
          .where({
            role: role ? role : () => true,
            level: level ? level : () => true,
          })
          .where(
            //@ts-expect-error Library typing does not support overload
            (job) =>
              languages.every((l) => job.languages.includes(l)) &&
              tools.every((t) => job.tools.includes(t)),
          ),
      //? Unfortunately, there are two downsides here
      //? First, ordering is applied per page, not in the entire results
      //? Second, we can't count the number of results properly, since jobs.length = take
      // {
      //   orderBy: { postedDate: "desc" },
      //   skip: (page - 1) * pageSize,
      //   take: pageSize,
      // },
    );

    const jobsSorted = jobsFiltered.sort(
      ({ postedDate: a }, { postedDate: b }) =>
        new Date(b).getTime() - new Date(a).getTime(),
    );

    const jobsPaginated = jobsSorted.slice(
      (page - 1) * pageSize,
      pageSize * page,
    );

    const total = jobsFiltered.length;
    const totalPages = Math.ceil(total / pageSize);

    return HttpResponse.json({
      jobs: jobsPaginated,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    });
  }),
];
