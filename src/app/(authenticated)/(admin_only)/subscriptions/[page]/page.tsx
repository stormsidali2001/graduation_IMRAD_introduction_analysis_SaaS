import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { getAllUsersAction } from "@/server/actions/get-users";
import { UserDtoType } from "@/server/validation/UserDto";

const UserTableRow = (user: UserDtoType) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="text-center">
        <Toggle
          variant="outline"
          aria-label="Ban user"
          className="!px-3 !py-1 text-sm"
        >
          <LockIcon className="mr-2 h-4 w-4" />
          Banned
        </Toggle>
      </TableCell>
    </TableRow>
  );
};
export default async function Page({ params: { page } }) {
  const users = (await getAllUsersAction({ page: page[0] }))?.data;
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className=" mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Subscriptions
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Subscription description here
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 md:p-8 space-y-6">
          <p className="text-muted-foreground">
            This section provides a high-level summary of the introduction,
            including the key points and overall strategy. As a premium user,
            you have access to this exclusive content.
          </p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>Subscriptions</CardTitle>
              <CardDescription>
                Showing 1-{users?.per_page} of {users?.total} users accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.data?.map((u) => <UserTableRow key={u.id} {...u} />)}
                </TableBody>
              </Table>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function LockOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}
