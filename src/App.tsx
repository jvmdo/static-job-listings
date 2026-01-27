import { useEffect, useEffectEvent, type ReactNode } from "react";

import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import JobPagination from "@/components/job-pagination";
import SkeletonJobCard from "@/components/skeleton-job-card";
import { useFilters } from "@/use-filters";
import { useJobs } from "@/use-jobs";
import { parseAsInteger, useQueryState } from "nuqs";

// TODO: reset pagination on filter (in/out)

function App() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { filters, clearFilters, setFilters } = useFilters();
  const { data, error, isError, isPlaceholderData, isPending, failureCount } =
    useJobs(filters, page);

  const setPreviousData = useEffectEvent(() => {
    const previousQueryKey = error ? error.message : "[]";
    const [, filters, page] = JSON.parse(previousQueryKey);
    setPage(page);
    setFilters(filters);
  });

  useEffect(() => {
    if (isError) {
      setPreviousData();
    }
  }, [isError]);

  if (isPending) {
    return (
      <AppContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonJobCard key={index} />
        ))}
      </AppContainer>
    );
  }

  // I think it flashes whenever [isError] is true
  if (isError) {
    return (
      <AppContainer>
        <button
          type="button"
          className="py-2 w-25 rounded-sm bg-primary text-surface"
          onClick={() => location.reload()}
        >
          Try again
        </button>
      </AppContainer>
    );
  }

  const { jobs, pagination } = data;

  if (jobs.length === 0) {
    return (
      <AppContainer>
        <div className="mt-23 grid place-items-center gap-10 lg:mt-28">
          <h1 className="text-3xl">No results</h1>
          <p className="text-9xl opacity-50">👻</p>
          <div className="flex gap-10">
            <button
              type="button"
              className="py-2 w-25 rounded-sm bg-primary text-surface"
              onClick={() => history.back()}
            >
              Go back
            </button>
            <button
              type="button"
              className="py-2 w-25 rounded-sm border border-primary text-primary"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          </div>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      {failureCount > 1 && (
        <div className="z-10 fixed top-0 left-1/2 -translate-x-1/2 p-3 w-max text-center bg-background rounded-b-md shadow">
          <strong className="text-red-400">Error while fetching jobs</strong>
          <p>Wait a second. We are doing our best to fix it.</p>
        </div>
      )}
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
