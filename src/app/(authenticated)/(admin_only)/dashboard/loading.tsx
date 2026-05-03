import { SkeletonMetricCards, SkeletonTable } from "@/components/ui/skeleton-card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full" />
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-80 bg-gray-100 animate-pulse rounded" />
      </div>
      <SkeletonMetricCards />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonTable />
        <SkeletonTable />
        <SkeletonTable />
      </div>
    </div>
  );
}
