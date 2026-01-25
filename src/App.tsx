import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import JobPagination from "@/components/job-pagination";
import { useFilters } from "@/use-filters";
import { useJobs } from "@/use-jobs";
import { parseAsInteger, useQueryState } from "nuqs";

function App() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { filters } = useFilters();
  const { data } = useJobs(filters, page);

  return (
    <div className="min-h-svh p-6 bg-background sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="h-39 absolute inset-x-0 top-0 bg-image bg-primary/90" />
      <main className="max-w-277.5 mx-auto mt-24 flex flex-col gap-14 lg:gap-10 relative">
        <FilterBar />
        {data?.jobs.map((job) => (
          <JobCard
            key={job.id}
            className="first:mt-23 lg:first:mt-28"
            {...job}
          />
        ))}
        {/* TODO: hide if no data */}
        <JobPagination
          page={page}
          setPage={setPage}
          count={data?.pagination.total}
          pageSize={data?.pagination.pageSize}
        />
        <div className="h-10 border"></div>
      </main>
    </div>
  );
}

export default App;
