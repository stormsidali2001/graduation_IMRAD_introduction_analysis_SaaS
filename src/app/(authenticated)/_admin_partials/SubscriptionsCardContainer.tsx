"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { SubscriptionDtoType } from "@/server/validation/SubscriptionDto";

const MotionCard = motion(Card);
const MotionTableRow = motion(TableRow);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tableBodyVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const SubscriptionTableRow = (subscription: SubscriptionDtoType) => {
  return (
    <MotionTableRow
      variants={rowVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={subscription.User.name}
            />
            <AvatarFallback>{subscription.User.name.at(0)}</AvatarFallback>
          </Avatar>
          <div>{subscription.User.name}</div>
        </div>
      </TableCell>
      <TableCell>{subscription.period}</TableCell>
      <TableCell>{subscription.startDate.toLocaleDateString()}</TableCell>
      <TableCell>{subscription.endDate.toLocaleDateString()}</TableCell>
    </MotionTableRow>
  );
};

const SubscriptionsCardContainer = ({ subscriptions }) => {
  return (
    <MotionCard
      className=""
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
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
          <AnimatePresence>
            <motion.tbody
              variants={tableBodyVariants}
              initial="hidden"
              animate="visible"
            >
              {subscriptions?.data?.map((s, index) => (
                <SubscriptionTableRow key={index} {...s} />
              ))}
            </motion.tbody>
          </AnimatePresence>
        </Table>
      </CardContent>
    </MotionCard>
  );
};

export default SubscriptionsCardContainer;
