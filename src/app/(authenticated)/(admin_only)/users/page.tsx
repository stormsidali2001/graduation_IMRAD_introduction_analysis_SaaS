/**
 * v0 by Vercel.
 * @see https://v0.dev/t/c6Z5CWjxlsF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";

export default function Page() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage the users on your platform.
          </p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
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
              <TableRow>
                <TableCell className="font-medium">Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell className="text-center">
                  <Toggle
                    variant="outline"
                    aria-label="Unban user"
                    className="!px-3 !py-1 text-sm"
                  >
                    <LockOpenIcon className="mr-2 h-4 w-4" />
                    Active
                  </Toggle>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bob Johnson</TableCell>
                <TableCell>bob@example.com</TableCell>
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
              <TableRow>
                <TableCell className="font-medium">Sarah Lee</TableCell>
                <TableCell>sarah@example.com</TableCell>
                <TableCell className="text-center">
                  <Toggle
                    variant="outline"
                    aria-label="Unban user"
                    className="!px-3 !py-1 text-sm"
                  >
                    <LockOpenIcon className="mr-2 h-4 w-4" />
                    Active
                  </Toggle>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tom Wilson</TableCell>
                <TableCell>tom@example.com</TableCell>
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
            </TableBody>
          </Table>
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
