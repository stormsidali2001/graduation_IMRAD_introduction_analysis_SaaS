import React from "react";
import { SentenceRow } from "./_partials/sentenceRow";
import { ArrowDown } from "lucide-react";
import { mergeContiguousSentences } from "@/common/groupSentences";
import type { FeedbackDto } from "@/server/validation/feedbackDto";

interface SentenceItem {
  sentence: string;
  move: number | null;
  subMove: number | null;
  moveConfidence?: number;
  subMoveConfidence?: number;
  sentenceNumber?: number;
  id?: string;
  introductionId?: string;
  feedback?: FeedbackDto;
}

interface IntroductionAnalysisProps {
  sentences: SentenceItem[];
  hideFeedbacks?: boolean;
}

export const IntroductionAnalysis = ({
  sentences,
  hideFeedbacks = false,
}: IntroductionAnalysisProps) => {
  const numberedSentences = sentences.map((s: SentenceItem, i: number): SentenceItem & { sentenceNumber: number } => ({ ...s, sentenceNumber: i + 1 }));
  const merged = mergeContiguousSentences(numberedSentences);

  return (
    <div className="grid gap-4">
      {merged.map((sentence, index) => (
        <React.Fragment key={index}>
          <SentenceRow
            {...sentence}
            hideFeedbacks={hideFeedbacks}
          />
          {index !== merged.length - 1 && (
            <div className="w-full items-center flex justify-center">
              <ArrowDown className="w-6 h-6 text-purple-300" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
