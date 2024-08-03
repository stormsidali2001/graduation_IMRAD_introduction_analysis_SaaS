import {Badge} from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
import { PredictionOutputItemDtoType } from '@/server/validation/PredictionDto';
import {ThumbsUp,ThumbsDown} from 'lucide-react'
interface SentenceRowProps extends PredictionOutputItemDtoType {
  sentenceNumber:number;
}
const movesDict = {
  0: "Establishing the research territory",
  1: " Establishing the niche",
  2: "Occupying the niche",
};
const subMoveDict = {
  0: {
    0: "Show that the research area is important, problematic, or relevant in some way",
    1: "Introduce and review previous research in the field",
  },
  1: {
    0: "Claim something is wrong with the previous research",
    1: "Highlight a gap in the field",
    2: "Raise a question where research in field is unclear",
    3: "Extend prior research to add more information on the topic",
  },
  2: {
    0: "Outline your purpose (s) and state the nature of your research",
    1: "State your hypothesis or research question you seek to answer",
    2: "Share your findings",
    3: "Elaborate on the value of your research",
    4: "Outline the structure that the research paper will follow",
  },
};
export const SentenceRow = ({
  sentence,
  move,
  subMove,
  sentenceNumber,
  moveConfidence,
  subMoveConfidence

}: SentenceRowProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-6">
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-2">
          {typeof move === "number" ? (
            <Badge variant="default">{movesDict[move]+` (${(moveConfidence*100).toFixed(1)}%)`}</Badge>
          ) : null}
          {typeof move === "number" && typeof subMove === "number" ? (
            <Badge variant="default">{subMoveDict[move]?.[subMove] +  ` (${(subMoveConfidence*100).toFixed(1)}%)`}</Badge>
          ) : null}
        </div>

        <h4 className="text-lg font-bold mb-2">Sentence {sentenceNumber}</h4>
        <p className="text-gray-600 dark:text-gray-400">{sentence}</p>
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost">

            <ThumbsUp size={24} />
          </Button>

          <Button variant="ghost">
            <ThumbsDown size={24} />
            </Button>

          

        </div>
      </div>
    </div>
  );
};