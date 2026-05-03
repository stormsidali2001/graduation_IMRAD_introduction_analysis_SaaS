"use client";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animation-variants";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UserDtoType } from "@/server/validation/UserDto";
import UpdateNameForm from "../_partials/UpdateNameForm";
import UpdatePasswordForm from "../_partials/UpdatePasswordForm";

const MotionCard = motion(Card);


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const SettingsWrapper = ({ user }: { user: UserDtoType }) => {
  return (
    <motion.div
      className="container mx-auto p-4 space-y-6 max-w-2xl"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants} className="space-y-2">
        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-semibold rounded-full">
          Account
        </Badge>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          Settings
        </h1>
      </motion.div>
      <MotionCard variants={cardVariants} className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
          <CardTitle className="text-white">Update Name</CardTitle>
          <CardDescription className="text-purple-100">Change your display name</CardDescription>
        </CardHeader>
        <UpdateNameForm user={user} />
      </MotionCard>

      <MotionCard variants={cardVariants} className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
          <CardTitle className="text-white">Change Password</CardTitle>
          <CardDescription className="text-purple-100">Update your account password</CardDescription>
        </CardHeader>
        <UpdatePasswordForm user={user} />
      </MotionCard>
    </motion.div>
  );
};

export default SettingsWrapper;
