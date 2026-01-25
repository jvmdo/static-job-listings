import { useFilters } from "@/use-filters";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function FilterBar({ className, ...delegated }: ComponentProps<"div">) {
  const { filterEntries, hasFilters, removeFilter, clearFilters } =
    useFilters();

  if (!hasFilters) {
    return null;
  }

  return (
    <div
      {...delegated}
      className={twMerge(
        "p-5 grid grid-cols-[1fr_auto] gap-6 rounded-md bg-surface shadow-xl shadow-primary/20 md:px-10",
        className,
      )}
    >
      <div className="flex flex-wrap gap-4">
        {filterEntries.map(([category, value]) => (
          <FilterTag key={value} onClick={() => removeFilter(category, value)}>
            {value}
          </FilterTag>
        ))}
      </div>
      <div className="self-center">
        <button
          type="button"
          className="text-secondary font-bold hover:text-primary hover:underline"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterBar;

function FilterTag({
  children,
  className,
  ...delegated
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "w-fit flex items-center gap-1 text-primary bg-background font-bold rounded-sm",
        className,
      )}
      {...delegated}
    >
      <span className="px-2">{children}</span>
      <button
        type="button"
        className="p-2 rounded-r-sm bg-primary hover:bg-primary-dark transition-colors"
      >
        <img src="/icons/remove.svg" alt="remove filter" className="size-3" />
      </button>
    </div>
  );
}
