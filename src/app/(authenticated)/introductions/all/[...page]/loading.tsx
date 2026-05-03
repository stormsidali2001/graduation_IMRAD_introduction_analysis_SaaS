import { SkeletonTable } from "@/components/ui/skeleton-card";

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-auto">
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="space-y-2">
            <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full" />
            <div className="h-8 w-56 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-72 bg-gray-100 animate-pulse rounded" />
          </div>
          <SkeletonTable />
        </div>
      </main>
    </div>
  );
}
