"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { deleteFeedbackAction } from "@/server/actions/delete-feedback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { motion } from "framer-motion";
import { Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "./use-toast";

interface FeedbackCardProps {
  predictedMove: string;
  predictedSubMove: string;
  correctMove: string;
  correctSubMove: string;
  reason?: string;
  username: string;
  image?: string;
  userHandle: string;
  sentenceText: string;
  introductionId: string;
  sentenceId: string;
  isLiked: boolean;
}

export default function FeedbackCard({
  predictedMove,
  predictedSubMove,
  correctMove,
  correctSubMove,
  reason,
  username,
  userHandle,
  image = "",
  sentenceText,
  introductionId,
  sentenceId,
  isLiked,
}: FeedbackCardProps) {
  const { isExecuting, executeAsync } = useAction(deleteFeedbackAction);
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 ">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src={image} alt={`${username}'s avatar`} />
                <AvatarFallback className="bg-purple-300 text-purple-800">
                  {username.at(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-white">{username}</h3>
                <p className="text-sm text-purple-200">
                  @{userHandle.toLowerCase().replaceAll(" ", "-")}
                </p>
              </div>
            </motion.div>
            <div className="flex items-center gap-2">
              {isLiked ? (
                <ThumbsUp className="w-6 h-6 text-green-300" />
              ) : (
                <ThumbsDown className="w-6 h-6 text-red-300 " />
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-purple-600/50 text-white transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                    <span className="sr-only">
                      {isExecuting ? "Deleting..." : "Delete"}
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the feedback and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        const res = await executeAsync({
                          introductionId,
                          sentenceId,
                        });
                        if (res.serverError) {
                          toast({
                            title: "Error :(",
                            variant: "destructive",
                            description: res.serverError,
                          });
                          return;
                        }
                        toast({
                          title: "Success",
                          description: "Feedback deleted successfully",
                        });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6 pt-6 bg-gradient-to-br from-purple-50 to-white">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-purple-700 mb-2">
                Sentence
              </p>
              <p className="text-sm text-gray-700">{sentenceText}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FeedbackItem label="Predicted Move" value={predictedMove} />
              <FeedbackItem
                label="Predicted Sub Move"
                value={predictedSubMove}
              />
              {!isLiked && (
                <>
                  <FeedbackItem label="Correct Move" value={correctMove} />
                  <FeedbackItem
                    label="Correct Sub Move"
                    value={correctSubMove}
                  />
                </>
              )}
            </div>
            {reason && (
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-purple-700 mb-2">
                  Reason
                </p>
                <p className="text-sm text-gray-700">{reason}</p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FeedbackItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-purple-600 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
