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

interface SentenceRowProps extends PredictionOutputItemDtoType {
  sentenceNumber: number;
  id?: string;
  introductionId?: string;
  feedback?: FeedbackDto;
  isAdmin?: boolean;
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
  isAdmin = false,
}: SentenceRowProps) => {
  const feedbackSection = !isAdmin ? (
    <>
      {!feedback ? (
        <div className="flex items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost">
                <ThumbsUp
                  size={24}
                  className="hover:text-primary transition-all ease-in-out"
                />
              </Button>
            </DialogTrigger>
            <FeedbackDialogBody
              isLike
              introductionId={introductionId}
              sentenceId={id}
            />
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button variant="ghost">
                <ThumbsDown
                  size={24}
                  className="hover:text-primary transition-all ease-in-out"
                />
              </Button>
            </DialogTrigger>
            <FeedbackDialogBody
              isLike={false}
              introductionId={introductionId}
              sentenceId={id}
            />
          </Dialog>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2 text-sm text-gray-200">
          Feedback recieved (
          {feedback.liked ? (
            <LucideThumbsUp className="w-4" />
          ) : (
            <LucideThumbsDown className="w-4" />
          )}
          ).
        </div>
      )}
    </>
  ) : null;
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-6">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          {typeof move === "number" ? (
            <Badge variant="default">
              {movesDict[move] + ` (${(moveConfidence * 100).toFixed(1)}%)`}
            </Badge>
          ) : null}
          {typeof move === "number" && typeof subMove === "number" ? (
            <Badge variant="default">
              {subMoveDict[move]?.[subMove] +
                ` (${(subMoveConfidence * 100).toFixed(1)}%)`}
            </Badge>
          ) : null}
        </div>

        <h4 className="text-lg font-bold mb-2">Sentence {sentenceNumber}</h4>
        <p className="text-gray-600 dark:text-gray-400">{sentence}</p>

        {feedbackSection}
      </div>
    </div>
  );
};
