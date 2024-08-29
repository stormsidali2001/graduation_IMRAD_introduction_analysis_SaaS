import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { getAllUsersAction } from "@/server/actions/get-users";
import { UserDtoType } from "@/server/validation/UserDto";
import { UserBanAlertDialogBody } from "../../_partials/UserBanAlertDialogBody";
import { LockOpen } from "lucide-react";
import Form from "./_partials/form";

export default async function Page({ params: { page } }) {
  const users = (await getAllUsersAction({ page: page[0] }))?.data;
  return <Form users={users} />;
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
