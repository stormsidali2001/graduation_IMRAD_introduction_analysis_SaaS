import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubscriptionsAction } from "@/server/actions/get-subscriptions";
import { SubscriptionDtoType } from "@/server/validation/SubscriptionDto";

const SubscriptionTableRow = (subscription: SubscriptionDtoType) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{subscription.User.name.at(0)}</AvatarFallback>
          </Avatar>
          <div>{subscription.User.name}</div>
        </div>
      </TableCell>

      <TableCell>{subscription.period}</TableCell>
      <TableCell>{subscription.startDate.toLocaleDateString()}</TableCell>
      <TableCell>{subscription.endDate.toLocaleDateString()}</TableCell>
    </TableRow>
  );
};
export const SubscriptionsCard = async () => {
  const subscriptions = (await getSubscriptionsAction({ page: 1 }))?.data;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Last Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expires At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions?.data?.map((s, index) => (
              <SubscriptionTableRow key={index} {...s} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
