import { Card } from "@/components/ui/card";
import Form from "./_partials/form";
import { getSubscriptionsAction } from "@/server/actions/get-subscriptions";

export default async function Page({ params: { page } }) {
  const subscriptions = (await getSubscriptionsAction({ page: page[0] }))?.data;

  return <Form subscriptions={subscriptions} />;
}
