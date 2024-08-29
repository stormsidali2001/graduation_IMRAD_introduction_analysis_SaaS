import { getDashboardStatsAction } from "@/server/actions/get-dashboard-stats";
import DashboardMetricsCardsContainer from "./DasbhoardMetricsCardsContainer";

export const DashboardMetricsCards = async () => {
  try {
    const stats = (await getDashboardStatsAction({}))?.data || {};

    //@ts-ignore
    return <DashboardMetricsCardsContainer {...stats} />;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
