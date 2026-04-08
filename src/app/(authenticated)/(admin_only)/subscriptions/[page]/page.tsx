import { Card } from "@/components/ui/card";
import Form from "./_partials/form";
import { getSubscriptionsAction } from "@/server/actions/get-subscriptions";

export default async function Page({ params: { page } }: { params: { page: string } }) {
  const subscriptions = (await getSubscriptionsAction({ page: Number(page) }))?.data;

  return <Form subscriptions={subscriptions} />;
}
