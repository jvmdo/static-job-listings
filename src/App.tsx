import AppContainer from "@/components/app-container";
import ErrorFallback from "@/components/error-fallback";
import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import JobPagination from "@/components/job-pagination";
import NoResults from "@/components/no-results";
import SkeletonJobCardList from "@/components/skeleton-job-card-list";
import { useJobs } from "@/hooks/use-jobs";
import { toast } from "sonner";

function App() {
  const { data, isPending, isPlaceholderData, isError } = useJobs({
    onRetry: () => {
      toast.warning("Error while fetching jobs", {
        id: "retry",
        description: "We are doing our best to fix it",
      });
    },
  });

  if (isError) {
    console.error("blink blink");
    return <ErrorFallback />;
  }

  if (isPending) {
    return <SkeletonJobCardList />;
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
      <JobPagination count={pagination.total} pageSize={pagination.pageSize} />
    </AppContainer>
  );
}

export default App;
