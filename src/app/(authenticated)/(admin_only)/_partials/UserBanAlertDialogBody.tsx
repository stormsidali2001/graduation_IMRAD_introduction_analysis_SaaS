"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { banUserAction, unbanUserAction } from "@/server/actions/banUser";
import { UserDtoType } from "@/server/validation/UserDto";
import { useAction } from "next-safe-action/hooks";

export const UserBanAlertDialogBody = ({ user }: { user: UserDtoType }) => {
  const { executeAsync: banUser, status: banUserStatus } =
    useAction(banUserAction);
  const { executeAsync: unbanUser, status: unbanUserStatus } =
    useAction(unbanUserAction);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you pretty sure that you want to{" "}
          {!user.isBanned ? "Ban" : "Unban"} the user.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={async (e) => {
            if (!user.isBanned) {
              await banUser({ userId: user.id });
            } else {
              await unbanUser({ userId: user.id });
            }
          }}
        >
          {banUserStatus === "executing" || unbanUserStatus === "executing"
            ? "Loading..."
            : "Continue"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
