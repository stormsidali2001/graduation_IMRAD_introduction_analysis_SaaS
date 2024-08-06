import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStatsAction } from "@/server/actions/get-dashboard-stats";
import { ActivityIcon, BarChartIcon, MessageCircleIcon } from "lucide-react";

export const DashboardMetricsCards = async () => {
  try {
    const { avgMoveConfidence, avgSubMoveConfidence, total, totalFeedbacks } =
      (await getDashboardStatsAction({}))?.data || {};

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Introductions Processed
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Move Confidence
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${((avgMoveConfidence ?? 0) * 100).toFixed(0)}%`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Submove Confidence
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {`${((avgSubMoveConfidence ?? 0) * 100).toFixed(0)}%`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Feedback Entries
            </CardTitle>
            <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFeedbacks}</div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
