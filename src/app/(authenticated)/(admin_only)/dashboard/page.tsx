import { DashboardMetricsCards } from "@/app/_partials/DashboardMetricCards";
import { RadialStackedChart } from "@/components/ui/charts/RadialStackedChart";
import { RecentFeedbacksTable } from "../../_admin_partials/RecentFeedbacksTable";
import { LastUsersTable } from "../../_admin_partials/LastUsersTable";
import { SubscriptionsCard } from "../../_admin_partials/SubscriptionsCard";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-semibold rounded-full">
          Admin
        </Badge>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Overview of platform activity, users, and subscriptions.</p>
      </div>
      <DashboardMetricsCards />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RecentFeedbacksTable />
        <LastUsersTable />
        <SubscriptionsCard />
      </div>
    </div>
  );
}
