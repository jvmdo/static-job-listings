import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function JobCard({ className, ...delegated }: ComponentProps<"article">) {
  return (
    <article
      {...delegated}
      className={twMerge(
        className,
        "pt-8 pb-6 px-5 flex flex-col gap-3 max-w-125 rounded-sm border-l-5 border-primary bg-surface shadow-xl shadow-primary/20 relative",
        "md:max-w-none md:px-10 md:py-8 md:flex-row md:items-center md:gap-6",
      )}
    >
      <div
        className={twMerge(
          "size-12 absolute top-0 -translate-y-1/2 -ml-1 shrink-0",
          "md:size-22 md:static md:translate-0",
        )}
      >
        <img
          src="/images/photosnap.svg"
          alt="photosnap"
          className="block w-full"
        />
      </div>
      <div className="grow flex flex-col justify-between gap-3 md:gap-1">
        <div className="flex items-center gap-2">
          <h4 className="text-primary text-[0.825rem] font-bold mr-3 md:text-base">
            Photosnap
          </h4>
          <JobBadgeNew />
          <JobBadgeFeatured />
        </div>
        <h3 className="text-primary-dark text-[0.825rem] font-bold md:text-xl hover:text-primary hover:cursor-help">
          Senior Frontend Developer
        </h3>
        <ul className="flex items-center gap-4 pb-3 border-b border-secondary md:border-none md:pb-0 md:-mt-1">
          <JobMeta>1d ago</JobMeta>
          <JobMeta>Full Time</JobMeta>
          <JobMeta>USA Only</JobMeta>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 md:pl-6 md:justify-end md:ml-auto">
        <JobTag>Frontend</JobTag>
        <JobTag>Senior</JobTag>
        <JobTag>HTML</JobTag>
        <JobTag>CSS</JobTag>
        <JobTag>JavaScript</JobTag>
      </div>
    </article>
  );
}

export default JobCard;

function JobTag({
  children,
  className,
  ...delegated
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={twMerge(
        className,
        "px-2 py-1 text-primary bg-background font-bold rounded-sm hover:bg-primary hover:text-surface transition-colors",
      )}
      {...delegated}
    >
      {children}
    </button>
  );
}

function JobMeta({ children, className, ...delegated }: ComponentProps<"li">) {
  return (
    <li
      {...delegated}
      className={twMerge(className, "group text-secondary", "md:text-lg")}
    >
      {children}
      <span className="inline-block align-middle size-1 rounded-full relative left-2 -top-0.5 bg-secondary group-last:hidden" />
    </li>
  );
}

function JobBadgeFeatured() {
  return <JobBadge className="bg-gray-800">Featured</JobBadge>;
}

function JobBadgeNew() {
  return <JobBadge className="bg-primary">New!</JobBadge>;
}

function JobBadge({
  children,
  className,
  ...delegated
}: ComponentProps<"span">) {
  return (
    <span
      {...delegated}
      className={twMerge(
        className,
        "flex items-center h-6 px-2 rounded-full uppercase text-surface",
      )}
    >
      {children}
    </span>
  );
}
