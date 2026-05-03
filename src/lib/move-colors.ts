export function getMoveColorClasses(move: number) {
  if (move === 0)
    return {
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      badgeSoft: "bg-blue-50 text-blue-700 border-blue-100",
      border: "border-blue-400",
      icon: "bg-blue-100 text-blue-600",
    };
  if (move === 1)
    return {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      badgeSoft: "bg-amber-50 text-amber-700 border-amber-100",
      border: "border-amber-400",
      icon: "bg-amber-100 text-amber-600",
    };
  return {
    badge: "bg-green-100 text-green-800 border-green-200",
    badgeSoft: "bg-green-50 text-green-700 border-green-100",
    border: "border-green-400",
    icon: "bg-green-100 text-green-600",
  };
}

export function getMoveName(move: number) {
  return (
    ["Establishing Territory", "Establishing Niche", "Occupying Niche"][move] ??
    "Unknown"
  );
}
