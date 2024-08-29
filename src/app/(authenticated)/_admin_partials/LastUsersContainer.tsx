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
import { UserDtoType } from "@/server/validation/UserDto";

const MotionTableRow = motion(TableRow);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const countVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const UserRow = ({
  email,
  image,
  name,
  createdAt,
  index,
}: UserDtoType & { index: number }) => {
  return (
    <MotionTableRow
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.at(0)}</AvatarFallback>
          </Avatar>
          <div>{name}</div>
        </div>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{createdAt.toLocaleDateString()}</TableCell>
    </MotionTableRow>
  );
};

const LastUsersContainer = ({ users }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="text-2xl font-bold"
            variants={countVariants}
            initial="hidden"
            animate="visible"
          >
            {users?.total ?? 0}
          </motion.div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {users?.data.map((u, index) => (
                  <UserRow key={u.email} {...u} index={index} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LastUsersContainer;
