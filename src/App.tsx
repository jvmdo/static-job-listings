import AppContainer from "@/components/app-container";
import ErrorFallback from "@/components/error-fallback";
import FilterBar from "@/components/filter-bar";
import JobCardList from "@/components/job-card-list";
import JobPagination from "@/components/job-pagination";
import NoResults from "@/components/no-results";
import SkeletonJobCardList from "@/components/skeleton-job-card-list";
import { useJobs } from "@/hooks/use-jobs";

import { toast } from "sonner";

function App() {
  const { data, isPending, isPlaceholderData } = useJobs({
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

  if (!data) {
    console.error("blink blink");
    return <ErrorFallback />;
  }

  const { jobs, pagination } = data;

  if (jobs.length === 0) {
    return <NoResults />;
  }

  return (
    <AppContainer>
      <FilterBar isLoading={isPlaceholderData} />
      <JobCardList
        jobs={jobs}
        isLoading={isPlaceholderData}
        className="first:mt-23 lg:first:mt-28"
      />
      <JobPagination count={pagination.total} pageSize={pagination.pageSize} />
    </AppContainer>
  );
}

export default App;
