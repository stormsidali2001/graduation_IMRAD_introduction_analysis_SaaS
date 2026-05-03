import { Badge } from "@/components/ui/badge";

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-semibold rounded-full"
    >
      {children}
    </Badge>
  );
}
