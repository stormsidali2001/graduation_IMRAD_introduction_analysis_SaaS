import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="bg-purple-50 rounded-full p-4">
        <Icon className="h-8 w-8 text-purple-400" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-gray-700">{title}</p>
        {description && (
          <p className="text-sm text-gray-400 max-w-xs">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
