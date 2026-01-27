import AppContainer from "@/components/app-container";
import ErrorFallback from "@/components/error-fallback";
import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import JobPagination from "@/components/job-pagination";
import NoResults from "@/components/no-results";
import SkeletonJobCardList from "@/components/skeleton-job-card-list";
import { useFilters } from "@/hooks/use-filters";
import { useJobs } from "@/hooks/use-jobs";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";

// TODO: reset pagination on filter (in/out)

function App() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { filters, setFilters } = useFilters();
  const { data, isPending, isPlaceholderData, isError } = useJobs({
    queryKey: [filters, page],
    onError: (previousFilters, previousPage) => {
      setFilters(previousFilters);
      setPage(previousPage);
    },
    onRetry: () => {
      toast.warning("Error while fetching jobs", {
        id: "retry",
        description: "We are doing our best to fix it",
      });
    },
  });

  if (isPending) {
    return <SkeletonJobCardList />;
  }

  // I think it flashes whenever [isError] is true
  if (isError) {
    return <ErrorFallback />;
  }

  const { jobs, pagination } = data;

  if (jobs.length === 0) {
    return <NoResults />;
  }

  return (
    <AppContainer>
      <FilterBar isLoading={isPlaceholderData} />
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isLoading={isPlaceholderData}
          className="first:mt-23 lg:first:mt-28"
        />
      ))}
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
