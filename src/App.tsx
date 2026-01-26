import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import JobPagination from "@/components/job-pagination";
import SkeletonJobCard from "@/components/skeleton-job-card";
import { useFilters } from "@/use-filters";
import { useJobs } from "@/use-jobs";
import { parseAsInteger, useQueryState } from "nuqs";
import type { ReactNode } from "react";

// TODO: reset pagination on filter (in/out)

function App() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { filters } = useFilters();
  const { data, isPlaceholderData, isPending } = useJobs(filters, page);

  // console.log({ isPending, isFetching, isLoading });

  if (isPending || data === undefined) {
    return (
      <AppContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonJobCard key={index} />
        ))}
      </AppContainer>
    );
  }

  const { jobs, pagination } = data;

  return (
    <AppContainer>
      <FilterBar isLoading={isPlaceholderData} />
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          className="first:mt-23 lg:first:mt-28"
          isLoading={isPlaceholderData}
          {...job}
        />
      ))}
      {/* TODO: hide if no data */}
      <JobPagination
        page={page}
        count={pagination.total}
        setPage={setPage}
        pageSize={pagination.pageSize}
      />
    </AppContainer>
  );
}

export default App;

function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh p-6 pb-30 bg-background sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="h-39 absolute inset-x-0 top-0 bg-image bg-primary/90" />
      <main className="max-w-277.5 mx-auto mt-24 flex flex-col gap-14 lg:gap-10 relative">
        {children}
      </main>
    </div>
  );
}
