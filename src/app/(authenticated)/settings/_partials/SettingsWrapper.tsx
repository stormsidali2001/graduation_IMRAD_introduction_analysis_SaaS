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
import { AlertCircle } from "lucide-react";
import type { UserDtoType } from "@/server/validation/UserDto";
import UpdateNameForm from "../_partials/UpdateNameForm";
import UpdatePasswordForm from "../_partials/UpdatePasswordForm";

const MotionCard = motion(Card);


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

const SettingsWrapper = ({ user }: { user: UserDtoType }) => {
  return (
    <motion.div
      className="container mx-auto p-4 space-y-6"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-3xl font-bold mb-6" variants={cardVariants}>
        Settings
      </motion.h1>
      <MotionCard variants={cardVariants} whileHover="hover">
        <CardHeader>
          <CardTitle>Update Name</CardTitle>
          <CardDescription>Change your display name</CardDescription>
        </CardHeader>
        <UpdateNameForm user={user} />
      </MotionCard>

      <MotionCard variants={cardVariants} whileHover="hover">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <UpdatePasswordForm user={user} />
      </MotionCard>
    </motion.div>
  );
};

export default SettingsWrapper;
