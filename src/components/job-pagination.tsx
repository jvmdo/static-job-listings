import { Pagination, usePaginationContext } from "@ark-ui/react/pagination";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface JobPaginationProps {
  page: number;
  setPage: (page: number) => void;
  count?: number;
  pageSize?: number;
}

function JobPagination({
  page,
  setPage,
  count = 300,
  pageSize = 10,
}: JobPaginationProps) {
  return (
    <Pagination.Root
      page={page}
      pageSize={pageSize}
      count={count}
      siblingCount={2}
      onPageChange={({ page }) => setPage(page)}
    >
      <Pagination.Context>
        {({ pages, totalPages }) => (
          <div className="grid grid-cols-4 gap-3 mx-auto max-w-125 lg:flex lg:items-center lg:max-w-none">
            <PaginationButtonStart
              disabled={page === 1}
              className="order-3 lg:order-1 lg:mr-auto"
            />
            <PaginationButtonPrev
              disabled={page === 1}
              className="order-4 lg:order-2"
            />
            <div className="col-span-4 order-1 flex flex-wrap items-center justify-center gap-3 sm:justify-between lg:order-3 lg:col-span-1">
              {pages.map((page, index) =>
                page.type === "page" ? (
                  <PaginationButtonItem key={index} {...page} />
                ) : (
                  <Pagination.Ellipsis key={index} index={index}>
                    &#8230;
                  </Pagination.Ellipsis>
                ),
              )}
            </div>
            <PaginationButtonNext
              disabled={page === totalPages}
              className="order-5 ml-auto lg:order-4 lg:ml-0"
            />
            <PaginationButtonEnd
              disabled={page === totalPages}
              className="order-6 ml-auto lg:order-5"
            />
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  );
}

export default JobPagination;

/* 
  The power of React composition right before your eyes! 🤯
*/

function PaginationButtonStart(props: ComponentProps<typeof PaginationButton>) {
  const { goToFirstPage } = usePaginationContext();

  return (
    <PaginationButton {...props} onClick={goToFirstPage}>
      &lt;&lt;
    </PaginationButton>
  );
}

function PaginationButtonPrev(
  props: ComponentProps<typeof Pagination.PrevTrigger>,
) {
  return (
    <Pagination.PrevTrigger {...props} asChild>
      <PaginationButton>&lt;</PaginationButton>
    </Pagination.PrevTrigger>
  );
}

function PaginationButtonItem(props: ComponentProps<typeof Pagination.Item>) {
  return (
    <Pagination.Item asChild {...props}>
      <PaginationButton>{props.value}</PaginationButton>
    </Pagination.Item>
  );
}

function PaginationButtonNext(
  props: ComponentProps<typeof Pagination.NextTrigger>,
) {
  return (
    <Pagination.NextTrigger {...props} asChild>
      <PaginationButton>&gt;</PaginationButton>
    </Pagination.NextTrigger>
  );
}

function PaginationButtonEnd(props: ComponentProps<typeof PaginationButton>) {
  const { goToLastPage } = usePaginationContext();

  return (
    <PaginationButton {...props} onClick={goToLastPage}>
      &gt;&gt;
    </PaginationButton>
  );
}

function PaginationButton({
  children,
  className,
  ...delegated
}: ComponentProps<"button">) {
  return (
    <button
      {...delegated}
      type="button"
      style={{ width: "3rem", height: "3rem", aspectRatio: 1 }} // tf is going on Ark UI?
      className={twMerge(
        "rounded-sm border border-primary text-primary transition-colors",
        "hover:bg-primary not-disabled:hover:text-surface focus-within:bg-primary focus-within:text-surface",
        "data-selected:bg-primary data-selected:text-surface",
        "disabled:bg-secondary/40 disabled:text-secondary disabled:border-none disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}
