import AppContainer from "@/components/app-container";
import SkeletonJobCard from "@/components/skeleton-job-card";

function SkeletonJobCardList({ length = 10 }: { length?: number }) {
  return (
    <AppContainer>
      {Array.from({ length }).map((_, index) => (
        <SkeletonJobCard key={index} />
      ))}
    </AppContainer>
  );
}

export default SkeletonJobCardList;
