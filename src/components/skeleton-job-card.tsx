import { JobMeta, JobTag } from "@/components/job-card";
import { twMerge } from "tailwind-merge";

function SkeletonJobCard() {
  return (
    <article
      className={twMerge(
        "font-cursive animate-pulse first:mt-23 lg:first:mt-28",
        "pt-8 pb-6 px-5 flex flex-col gap-3 rounded-sm border-primary bg-surface shadow-xl shadow-primary/20 relative",
        "lg:px-10 lg:py-8 lg:flex-row lg:items-center lg:gap-6",
      )}
    >
      <div
        className={twMerge(
          "shrink-0 size-12 rounded-full absolute top-0 -translate-y-1/2 bg-secondary",
          "lg:size-22 lg:static lg:translate-0",
        )}
      />
      <div className="grow shrink-0 flex flex-col justify-between gap-3 lg:gap-1">
        <div className="flex items-center gap-2">
          <h4 className="text-primary text-[0.825rem] font-bold mt-1 mr-3 lg:text-base lg:mt-0">
            Free Agents
          </h4>
        </div>
        <h3 className="text-primary-dark text-[0.825rem] font-bold lg:text-xl hover:text-primary hover:cursor-help">
          Mid React Developer
        </h3>
        <ul className="flex items-center gap-4 pb-3 border-b border-secondary lg:border-none lg:pb-0 lg:-mt-1">
          <JobMeta>Just now</JobMeta>
          <JobMeta>Full Time</JobMeta>
          <JobMeta>Worldwide</JobMeta>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 lg:pl-6 lg:justify-end lg:ml-auto">
        <JobTag category="role" value={"Router"} disabled={true} />
        <JobTag category="role" value={"Tailwind"} disabled={true} />
        <JobTag category="role" value={"Query"} disabled={true} />
        <JobTag category="role" value={"Motion"} disabled={true} />
        <JobTag category="role" value={"Jobless"} disabled={true} />
      </div>
    </article>
  );
}

export default SkeletonJobCard;
