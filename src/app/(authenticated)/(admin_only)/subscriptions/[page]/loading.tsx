import { SkeletonTable } from "@/components/ui/skeleton-card";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-6">
      <div className="space-y-2">
        <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full" />
        <div className="h-8 w-44 bg-gray-200 animate-pulse rounded" />
      </div>
      <SkeletonTable />
    </div>
  );
}
