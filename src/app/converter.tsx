"use client";

import { IntroductionAnalysis } from "./IntroductionAnalysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { split } from "sentence-splitter";
import { SentenceRow } from "./_partials/sentenceRow";
import { geMoveSubmove } from "@/server/actions/classifier";
import { FileUploader } from "@/components/ui/fileUpload";
import { useAction } from "next-safe-action/hooks";
import { pdfExtractorAction } from "@/server/actions/pdf-extractor";
import { ArrowDown, FileText, RefreshCw } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading-lottie.json";
import { useActionToast } from "@/hooks/use-action-toast";
import ImradMovesSubmovesInfoCard from "@/components/ui/Imrad-moves-sub-moves-card";
import { motion, AnimatePresence } from "framer-motion";

interface Sentence {
  sentence: string;
  move: number | null;
  subMove: number | null;
  moveConfidence?: number;
  subMoveConfidence?: number;
}

export const Converter = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [files, setFiles] = useState<File[]>();
  const {
    executeAsync,
    isExecuting,
    result,
    hasSucceeded,
    reset: resetUpload,
  } = useAction(pdfExtractorAction);
  const {
    executeAsync: executeAsyncGetMoveSubMove,
    isExecuting: isExecutingMoves,
    hasSucceeded: hasSucceededMoves,
    reset: resetMoves,
  } = useAction(geMoveSubmove);
  const [introduction, setIntroduction] = useState("");

  const updateSentences = debounce(async (text: string) => {
    const sentencesStrings =
      split(text)
        .map((s) => s.raw)
        .filter((sentence) => sentence.length > 5) ?? [];

    const sentences = sentencesStrings.map((sentence, index) => {
      return {
        sentence: sentence,
        move: null,
        subMove: null,
      };
    });

    setSentences(sentences);
  }, 500);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
    updateSentences(e.target.value);
  };

  const handlePredictions = async () => {
    const res = await executeAsyncGetMoveSubMove({
      sentences: sentences.map((s) => s.sentence),
    });
    if (handleError(res)) return;
    const predictions = res.data ?? [];
    setSentences((sentences) => {
      const transformedSentences = sentences.map((s, index) => {
        return {
          ...s,
          move: predictions[index].move,
          subMove: predictions[index].subMove,
          moveConfidence: predictions[index]?.moveConfidence,
          subMoveConfidence: predictions[index]?.subMoveConfidence,
        };
      });

      return transformedSentences;
    });
  };

  const { handleError } = useActionToast();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-16"
    >
      <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
        Try It Now
      </h2>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-6"
      >
        <div className="grid gap-4">
          <Textarea
            onChange={handleTextAreaChange}
            value={introduction}
            placeholder="Paste your introduction text here..."
            rows={5}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
          <FileUploader
            maxFiles={1}
            value={files}
            onValueChange={async (files: File[]) => {
              setFiles(files);
              const formData = new FormData();
              const file = files[0];
              if (!file) return;
              formData.append("file", file);
              const res = await executeAsync(formData);
              if (handleError(res)) {
                setFiles(null);
                return;
              }

              updateSentences(res?.data);
              setIntroduction(res?.data);
            }}
            accept={{
              "application/pdf": [],
            }}
          />
          <div className="flex justify-end gap-2">
            <AnimatePresence>
              {hasSucceededMoves && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => {
                      resetUpload();
                      setFiles(null);
                      resetMoves();
                      setIntroduction("");
                      setSentences([]);
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handlePredictions()}
                disabled={
                  hasSucceededMoves ||
                  isExecutingMoves ||
                  isExecuting ||
                  sentences.length === 0
                }
              >
                <FileText className="mr-2 h-4 w-4" />
                Analyse
              </Button>
            </motion.div>
          </div>
        </div>
        <AnimatePresence>
          {isExecuting && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center mt-4"
            >
              <span className="text-purple-600 font-semibold">Uploading...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ImradMovesSubmovesInfoCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            Introduction Analysis
          </h3>

          {!isExecutingMoves ? (
            <IntroductionAnalysis sentences={sentences} hideFeedbacks={true} />
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center justify-center w-full"
            >
              <Lottie
                animationData={loadingAnimation}
                style={{ width: 200, height: 200 }}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
