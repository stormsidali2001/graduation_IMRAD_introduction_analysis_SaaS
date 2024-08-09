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
import { getAllUsersAction } from "@/server/actions/get-users";
import { UserDtoType } from "@/server/validation/UserDto";

const UserRow = ({ email, image, name, createdAt }: UserDtoType) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image} />
            <AvatarFallback>{name.at(0)}</AvatarFallback>
          </Avatar>
          <div>{name}</div>
        </div>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{createdAt.toLocaleDateString()}</TableCell>
    </TableRow>
  );
};
export const LastUsersTable = async () => {
  try {
    const users = (await getAllUsersAction({ page: 1 }))?.data;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users?.total ?? 0}</div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{users?.data.map((u) => <UserRow {...u} />)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
