"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { UserDtoType } from "@/server/validation/UserDto";
import { LockIcon, LockOpen, Users } from "lucide-react";
import { UserBanAlertDialogBody } from "../../../_partials/UserBanAlertDialogBody";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNextPage, getPrevPage } from "@/common/getPage";

const UserTableRow = ({ user }: { user: UserDtoType }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="text-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <Toggle
              variant="outline"
              aria-label={user.isBanned ? "Ban" : "Unban"}
              className={`!px-3 !py-1 text-sm transition-all duration-300 ${
                user.isBanned
                  ? "bg-red-100 hover:bg-red-200"
                  : "bg-green-100 hover:bg-green-200"
              }`}
            >
              {user.isBanned ? (
                <LockIcon className="mr-2 h-4 w-4 text-red-500" />
              ) : (
                <LockOpen className="mr-2 h-4 w-4 text-green-500" />
              )}
              {user.isBanned ? "Banned" : "Active"}
            </Toggle>
          </AlertDialogTrigger>
          <UserBanAlertDialogBody user={user} />
        </AlertDialog>
      </TableCell>
    </motion.tr>
  );
};

const Form = ({ users }) => {
  const next = getNextPage({
    page: users.page,
    total_pages: users.total_pages,
  });
  const nextPage = next === users.page ? null : `/users/${next}`;
  const prev = getPrevPage({ page: users.page });
  const previousPage = prev === users.page ? null : `/users/${prev}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 py-12"
    >
      <div className="mx-auto space-y-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            User Management Dashboard
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Monitor and manage all users from one central, intuitive interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg p-6 md:p-8 space-y-6 shadow-lg"
        >
          <div className="flex items-center space-x-4 text-primary">
            <Users size={24} />
            <h2 className="text-2xl font-semibold">User Overview</h2>
          </div>
          <p className="text-muted-foreground">
            This section provides a high-level summary of user data, including
            key metrics and overall user management strategy. As a premium user,
            you have access to this exclusive content.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border rounded-lg overflow-hidden shadow-md"
        >
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>
                Displaying {users?.per_page} out of {users?.total} total user
                accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {users?.data?.map((u) => (
                        <UserTableRow key={u.id} user={u} />
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>

              {users.total_pages > 1 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-6"
                >
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        {previousPage && (
                          <PaginationPrevious href={previousPage} />
                        )}
                      </PaginationItem>
                      <PaginationItem>
                        <span className="text-sm text-muted-foreground">
                          Page {users.page} of {users.total_pages}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        {nextPage && <PaginationNext href={nextPage} />}
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Form;
