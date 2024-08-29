"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { type SubscriptionDtoType } from "@/server/validation/SubscriptionDto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UsersIcon } from "lucide-react";
import { getNextPage, getPrevPage } from "@/common/getPage";

const SubscriptionTableRow = ({
  subscription,
}: {
  subscription: SubscriptionDtoType;
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-muted/50 transition-colors"
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={subscription.User.name}
            />
            <AvatarFallback>{subscription.User.name.at(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{subscription.User.name}</div>
            <div className="text-sm text-muted-foreground">
              {subscription.User.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="font-medium">
          {subscription.period}
        </Badge>
      </TableCell>
      <TableCell>{subscription.startDate.toLocaleDateString()}</TableCell>
      <TableCell>{subscription.endDate.toLocaleDateString()}</TableCell>
    </motion.tr>
  );
};

const Form = ({ subscriptions }) => {
  const next = getNextPage({
    page: subscriptions.page,
    total_pages: subscriptions.total_pages,
  });
  const nextPage =
    next === subscriptions.page ? null : `/subscriptions/${next}`;
  const prev = getPrevPage({ page: subscriptions.page });
  const previousPage =
    prev === subscriptions.page ? null : `/subscriptions/${prev}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 py-12"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Subscription Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor and manage all active subscriptions from one central
            dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg p-6 md:p-8 space-y-6 shadow-lg"
        >
          <div className="flex items-center space-x-4 text-primary">
            <UsersIcon size={24} />
            <h2 className="text-2xl font-semibold">Subscription Overview</h2>
          </div>
          <p className="text-muted-foreground">
            This section provides a high-level summary of subscription data,
            including key metrics and overall subscription management strategy.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl">Active Subscriptions</CardTitle>
              <CardDescription>
                Showing 1-{subscriptions?.per_page} of {subscriptions?.total}{" "}
                subscriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">User</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Expires At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {subscriptions?.data?.map((s, index) => (
                        <SubscriptionTableRow key={index} subscription={s} />
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
              <div className="mt-6">
                {subscriptions.total_pages > 1 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
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
                            Page {subscriptions.page} of{" "}
                            {subscriptions.total_pages}
                          </span>
                        </PaginationItem>
                        <PaginationItem>
                          {nextPage && <PaginationNext href={nextPage} />}
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Form;
