import FilterBar from "@/components/filter-bar";
import JobCard from "@/components/job-card";
import { useFilters } from "@/use-filters";
import { useJobs } from "@/use-jobs";

function App() {
  const [filters] = useFilters();
  const { data } = useJobs(filters);

  const hasFilters =
    Object.values(filters).filter((f) => Boolean(f) && Boolean(f?.length))
      .length > 0;

  return (
    <div className="min-h-svh p-6 bg-background sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="h-39 absolute inset-x-0 top-0 bg-image bg-primary/90" />
      <main className="max-w-277.5 mx-auto mt-24 flex flex-col gap-14 lg:gap-10 relative">
        {hasFilters && <FilterBar />}
        {/* TODO FIX: centering on mobile */}
        {data?.map((job) => (
          <JobCard
            key={job.id}
            className="first:mt-23 lg:first:mt-28"
            {...job}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
