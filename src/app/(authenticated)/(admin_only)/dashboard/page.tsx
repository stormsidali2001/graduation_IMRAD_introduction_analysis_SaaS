import { DashboardMetricsCards } from "@/app/_partials/DashboardMetricCards";
import { RecentFeedbacksTable } from "../../_admin_partials/RecentFeedbacksTable";
import { LastUsersTable } from "../../_admin_partials/LastUsersTable";
import { SubscriptionsCard } from "../../_admin_partials/SubscriptionsCard";
import { SectionBadge } from "@/components/ui/section-badge";
import { GradientHeading } from "@/components/ui/gradient-heading";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <SectionBadge>Admin</SectionBadge>
        <GradientHeading className="text-3xl">Dashboard</GradientHeading>
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
