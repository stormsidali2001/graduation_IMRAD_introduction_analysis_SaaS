import { getSubscriptionsAction } from "@/server/actions/get-subscriptions";
import SubscriptionsCardContainer from "./SubscriptionsCardContainer";
export const SubscriptionsCard = async () => {
  const subscriptions = (await getSubscriptionsAction({ page: 1 }))?.data;
  return <SubscriptionsCardContainer subscriptions={subscriptions} />;
};
