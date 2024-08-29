"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <motion.div
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="mx-auto h-12 w-12 rounded-full bg-primary/10 p-2"
            variants={iconVariants}
          >
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
            Loading
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Please wait while we prepare your content...
          </p>
        </motion.div>
        <motion.div
          className="mt-8 bg-card shadow-lg rounded-lg p-8"
          variants={itemVariants}
        >
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
