"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
    <div className="flex min-h-screen items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="mx-auto h-12 w-12 rounded-full bg-destructive/10 p-2"
            variants={iconVariants}
          >
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
            Oops! An Error Occurred
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Something went wrong. Please try again.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 bg-card shadow-lg rounded-lg p-8"
          variants={itemVariants}
        >
          <AnimatePresence>
            <motion.div variants={itemVariants}>
              <p className="text-foreground/80 mb-6">
                {error.message ||
                  "An unexpected error occurred. Please try again."}
              </p>
              <Button
                onClick={() => reset()}
                className="w-full"
                //@ts-ignore
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
