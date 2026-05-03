function Bone({ className }: { className: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md rounded-xl p-6 space-y-3">
      <Bone className="h-4 w-1/3" />
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonMetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-gray-100"
        >
          <Bone className="h-8 w-8 rounded-full flex-shrink-0" />
          <Bone className="h-3 flex-1" />
          <Bone className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
