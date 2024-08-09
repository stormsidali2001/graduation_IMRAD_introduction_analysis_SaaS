import { DashboardMetricsCards } from "@/app/_partials/DashboardMetricCards";
import { RadialStackedChart } from "@/components/ui/charts/RadialStackedChart";
import { RecentFeedbacksTable } from "../../_admin_partials/RecentFeedbacksTable";
import { LastUsersTable } from "../../_admin_partials/LastUsersTable";
import { SubscriptionsCard } from "../../_admin_partials/SubscriptionsCard";

export default function Page() {
  return (
    <>
      <DashboardMetricsCards />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentFeedbacksTable />
        <LastUsersTable />
        <SubscriptionsCard />
      </div>
    </>
  );
}
