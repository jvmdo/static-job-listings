import JobCard from "@/components/job-card";
import JobFilter from "@/components/job-filter";
import type { Job } from "@/use-jobs";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data } = useQuery({
    queryKey: ["job-tag"],
    queryFn: async () => {
      return (await fetch("/data.json").then((res) => res.json())) as Job[];
    },
  });

  const hasFilters = true;

  return (
    <div className="min-h-svh p-6 bg-background sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="h-39 absolute inset-x-0 top-0 bg-image bg-primary/90" />
      <main className="max-w-277.5 mx-auto mt-24 flex flex-col gap-14 lg:gap-10 relative">
        {hasFilters && <JobFilter className="" />}
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
