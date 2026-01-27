import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function AppContainer({
  children,
  className,
  ...delegated
}: ComponentProps<"div">) {
  return (
    <div className="min-h-svh p-6 pb-30 bg-background sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="h-39 absolute inset-x-0 top-0 bg-image bg-primary/90" />
      <main
        {...delegated}
        className={twMerge(
          "max-w-277.5 mx-auto mt-24 flex flex-col gap-14 lg:gap-10 relative",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default AppContainer;
