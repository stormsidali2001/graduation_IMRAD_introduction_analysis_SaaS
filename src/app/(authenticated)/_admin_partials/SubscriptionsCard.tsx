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

const SubscritpionRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div>Jane Appleseed</div>
        </div>
      </TableCell>
      <TableCell>$49.99</TableCell>
      <TableCell>December 31, 2023</TableCell>
    </TableRow>
  );
};
export const SubscriptionsCard = async () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Last Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Expires At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SubscritpionRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
