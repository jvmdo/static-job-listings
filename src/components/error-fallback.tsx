import AppContainer from "@/components/app-container";
import { useFilters } from "@/hooks/use-filters";
import { usePage } from "@/hooks/use-page";
import { useQueryClient } from "@tanstack/react-query";

function ErrorFallback() {
  const queryClient = useQueryClient();
  const [page] = usePage();
  const { filters } = useFilters();

  return (
    <AppContainer className="mt-[30svmin] text-center items-center">
      <h1 className="text-3xl text-balance text-primary-dark">
        We're sorry for the inconvenience
      </h1>
      <p className="text-8xl">😕</p>
      <button
        type="button"
        className="py-2 w-full rounded-sm bg-primary text-surface"
        onClick={async () => {
          await queryClient.refetchQueries({
            queryKey: ["jobs", filters, page],
          });
        }}
      >
        Try again
      </button>
    </AppContainer>
  );
}

export default ErrorFallback;
