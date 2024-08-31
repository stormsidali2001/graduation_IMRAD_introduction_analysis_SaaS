"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserDtoType } from "@/server/validation/UserDto";
import { motion } from "framer-motion";
import React from "react";
import { MasonryGrid } from "./MasonryGrid";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { downloadFeedbackAction } from "@/server/actions/download-feedback";
import { useToast } from "@/components/ui/use-toast";
import { downloadFile } from "@/lib/utils";

export const Feedbacks = ({
  user,
  feedbacks,
  previousPage,
  nextPage,
}: {
  user: UserDtoType;
  feedbacks: any;
  previousPage: string;
  nextPage: string;
}) => {
  const { executeAsync } = useAction(downloadFeedbackAction);
  const { toast } = useToast();

  const handleDownload = async () => {
    // Implement download logic here

    console.log("Downloading feedbacks...");
    const res = await executeAsync({});
    if (res.serverError) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: res.serverError,
      });
      return;
    }

    downloadFile(res.data, "feedbacks.json");
    toast({
      title: "Success!",
      description: "Feedbacks downloaded successfully.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20"
    >
      <div className="space-y-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Feedbacks
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {user.role !== "Admin" && feedbacks.total > 0 ? (
              <>
                Thanks for your contribution! You've submitted a total of{" "}
                <span className="font-semibold text-purple-600">
                  {feedbacks.total}
                </span>{" "}
                feedbacks.
              </>
            ) : null}{" "}
            Explore and learn from your submitted feedbacks.
          </p>
          {user.role === "Admin" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6"
            >
              <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Feedbacks
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="space-y-8">
          <MasonryGrid feedbacks={feedbacks.data} />

          {feedbacks.total_pages > 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {previousPage && <PaginationPrevious href={previousPage} />}
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm text-muted-foreground">
                      Page {feedbacks.page} of {feedbacks.total_pages}
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
      </div>
    </motion.div>
  );
};
