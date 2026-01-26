import { useFilters, type FilterCategories } from "@/use-filters";
import type { Job } from "@/use-jobs";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type JobCardProps = Job &
  ComponentProps<"article"> & {
    isLoading: boolean;
  };

function JobCard(props: JobCardProps) {
  const {
    company,
    logo,
    new: isNew,
    featured: isFeatured,
    position,
    role,
    level,
    postedAt,
    postedDate,
    contract,
    location,
    languages,
    tools,
    className,
    isLoading,
    ...delegated
  } = props;

  return (
    <article
      {...delegated}
      className={twMerge(
        "pt-8 pb-6 px-5 flex flex-col gap-3 rounded-sm border-primary bg-surface shadow-xl shadow-primary/20 relative",
        "lg:px-10 lg:py-8 lg:flex-row lg:items-center lg:gap-6",
        isFeatured && "border-l-5",
        isLoading && "grayscale pointer-events-none",
        className,
      )}
    >
      <div
        className={twMerge(
          "size-12 absolute top-0 -translate-y-1/2 shrink-0",
          "lg:size-22 lg:static lg:translate-0",
          isFeatured && "-ml-1",
        )}
      >
        <img src={`/images/${logo}`} alt={company} className="block w-full" />
      </div>
      <div className="grow shrink-0 flex flex-col justify-between gap-3 lg:gap-1">
        <div className="flex items-center gap-2">
          <h4 className="text-primary text-[0.825rem] font-bold mt-1 mr-3 lg:text-base lg:mt-0">
            {company}
          </h4>
          {isNew && <JobBadgeNew />}
          {isFeatured && <JobBadgeFeatured />}
        </div>
        <h3 className="text-primary-dark text-[0.825rem] font-bold w-fit lg:text-xl hover:text-primary hover:cursor-help">
          {position}
        </h3>
        <ul className="flex items-center gap-4 pb-3 border-b border-secondary lg:border-none lg:pb-0 lg:-mt-1">
          <JobMeta>{<time dateTime={postedDate}>{postedAt}</time>}</JobMeta>
          <JobMeta>{contract}</JobMeta>
          <JobMeta>{location}</JobMeta>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 lg:pl-6 lg:justify-end lg:ml-auto">
        <JobTag category="role" value={role} />
        <JobTag category="level" value={level} />
        {languages.map((lang) => (
          <JobTag key={lang} category="languages" value={lang} />
        ))}
        {tools.map((tool) => (
          <JobTag key={tool} category="tools" value={tool} />
        ))}
      </div>
    </article>
  );
}

export default JobCard;

interface JobTagProps extends ComponentProps<"button"> {
  category: FilterCategories;
  value: string;
}

export function JobTag({
  category,
  value,
  className,
  ...delegated
}: JobTagProps) {
  const { addFilter } = useFilters();

  return (
    <button
      type="button"
      onClick={() => addFilter(category, value)}
      className={twMerge(
        "px-2 py-1  font-bold rounded-sm text-primary bg-background transition-colors",
        "hover:bg-primary hover:text-surface focus-within:bg-primary focus-within:text-surface",
        className,
      )}
      {...delegated}
    >
      {value}
    </button>
  );
}

export function JobMeta({
  children,
  className,
  ...delegated
}: ComponentProps<"li">) {
  return (
    <li
      {...delegated}
      className={twMerge("group text-secondary", "lg:text-lg", className)}
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
        "flex items-center h-6 px-2 rounded-full uppercase text-surface",
        className,
      )}
    >
      {children}
    </span>
  );
}
