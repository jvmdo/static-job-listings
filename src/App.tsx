import JobCard from "@/components/job-card";
import JobFilter from "@/components/job-filter";

function App() {
  return (
    <div className="min-h-svh p-6 bg-background">
      <JobFilter />
      <JobCard />
    </div>
  );
}

export default App;
