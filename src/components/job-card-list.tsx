import JobCard from "@/components/job-card";
import type { Job } from "@/mocks/db";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface JobCardListProps extends ComponentProps<"div"> {
  jobs: Job[];
  isLoading: boolean;
}

function JobCardList({
  jobs,
  isLoading,
  className,
  ...delegated
}: JobCardListProps) {
  return (
    <div
      {...delegated}
      className={twMerge("flex flex-col gap-14 lg:gap-10", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            layoutId={job.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <JobCard key={job.id} job={job} isLoading={isLoading} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default JobCardList;
