import AppContainer from "@/components/app-container";
import { useFilters } from "@/hooks/use-filters";

function NoResults() {
  const { clearFilters } = useFilters();

  return (
    <AppContainer>
      <div className="mt-23 grid place-items-center gap-10 lg:mt-28">
        <h1 className="text-3xl">No results</h1>
        <p className="text-9xl opacity-50">👻</p>
        <div className="flex gap-10">
          <button
            type="button"
            className="py-2 w-25 rounded-sm bg-primary text-surface"
            onClick={() => history.back()}
          >
            Go back
          </button>
          <button
            type="button"
            className="py-2 w-25 rounded-sm border border-primary text-primary"
            onClick={clearFilters}
          >
            Reset filters
          </button>
        </div>
      </div>
    </AppContainer>
  );
}

export default NoResults;
