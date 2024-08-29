"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PredictionOutputItemDtoType } from "@/server/validation/PredictionDto";
import {
  ThumbsUp,
  ThumbsDown,
  LucideThumbsUp,
  LucideThumbsDown,
} from "lucide-react";
import FeedbackDialogBody from "./FeedbackDialogBody";
import { movesDict, subMoveDict } from "@/common/moves";
import { FeedbackDto } from "@/server/validation/feedbackDto";
import { motion } from "framer-motion";

interface SentenceRowProps extends PredictionOutputItemDtoType {
  sentenceNumber: number;
  id?: string;
  introductionId?: string;
  feedback?: FeedbackDto;
  hideFeedbacks?: boolean;
}

export const SentenceRow = ({
  sentence,
  move,
  subMove,
  sentenceNumber,
  moveConfidence,
  subMoveConfidence,
  id,
  introductionId,
  feedback,
  hideFeedbacks = true,
}: SentenceRowProps) => {
  const feedbackSection = !hideFeedbacks ? (
    <>
      {!feedback ? (
        <div className="flex items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="rounded-full p-2">
                  <ThumbsUp
                    size={24}
                    className="text-primary/80 hover:text-primary transition-all duration-300 ease-in-out"
                  />
                </Button>
              </motion.div>
            </DialogTrigger>
            <FeedbackDialogBody
              isLike
              introductionId={introductionId}
              sentenceId={id}
            />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="rounded-full p-2">
                  <ThumbsDown
                    size={24}
                    className="text-primary/80 hover:text-primary transition-all duration-300 ease-in-out"
                  />
                </Button>
              </motion.div>
            </DialogTrigger>
            <FeedbackDialogBody
              defaultMove={move}
              defaultSubMove={subMove}
              isLike={false}
              introductionId={introductionId}
              sentenceId={id}
            />
          </Dialog>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-end gap-2 text-sm text-primary/80"
        >
          Feedback received (
          {feedback.liked ? (
            <LucideThumbsUp className="w-4" />
          ) : (
            <LucideThumbsDown className="w-4" />
          )}
          )
        </motion.div>
      )}
    </>
  ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card text-card-foreground shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {typeof move === "number" && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2 py-1"
              >
                {movesDict[move]} ({(moveConfidence * 100).toFixed(1)}%)
              </Badge>
            </motion.div>
          )}
          {typeof move === "number" && typeof subMove === "number" && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2 py-1"
              >
                {subMoveDict[move]?.[subMove]} (
                {(subMoveConfidence * 100).toFixed(1)}%)
              </Badge>
            </motion.div>
          )}
        </div>

        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold mb-2"
        >
          Sentence {sentenceNumber}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground"
        >
          {sentence}
        </motion.p>

        {feedbackSection}
      </div>
    </motion.div>
  );
};
