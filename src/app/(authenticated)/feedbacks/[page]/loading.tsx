import { SkeletonTable } from "@/components/ui/skeleton-card";

export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="h-5 w-20 bg-gray-200 animate-pulse rounded-full" />
        <div className="h-10 w-40 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-72 bg-gray-100 animate-pulse rounded" />
      </div>
      <SkeletonTable />
    </div>
  );
}
