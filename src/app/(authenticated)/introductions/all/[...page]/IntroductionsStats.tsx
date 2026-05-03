"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animation-variants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ParenthesesIcon } from "lucide-react";

const MotionCard = motion(Card);

interface IntroductionsStatsProps {
  totalIntroductions?: number;
  totalIntroductionsByMove?: { count?: number; move?: number }[];
  averageConfidenceScore?: { avgMoveConfidence?: number; avgSubMoveConfidence?: number };
  averageConfidenceScoreByMove?: { move?: number; avgMoveConfidence?: number }[];
  averageSentencePositionScore?: { avgOrder?: number };
  averageSentencePositionScoreByMove?: { move?: number; avgOrder?: number }[];
}

export const IntroductionsStats = ({
  averageConfidenceScore,
  averageConfidenceScoreByMove,
  averageSentencePositionScore,
  averageSentencePositionScoreByMove,
  totalIntroductions,
  totalIntroductionsByMove,
}: IntroductionsStatsProps) => {
  const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MotionCard
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md"
      >
        <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
          <CardTitle className="text-white">IMRAD Introduction Moves</CardTitle>
          <CardDescription className="text-purple-100">
            Total: {totalIntroductions ?? 0}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {[
            { name: "Establishing a research territory", move: 0 },
            { name: "Establishing a niche", move: 1 },
            { name: "Occupying the niche", move: 2 },
          ].map((item, index) => (
            <motion.div
              key={item.move}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="mb-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ParenthesesIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {totalIntroductionsByMove?.find((i) => i.move === item.move)
                  ?.count ?? 0}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </MotionCard>

      <MotionCard
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md"
      >
        <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
          <CardTitle className="text-white">Confidence Scores</CardTitle>
          <CardDescription className="text-purple-100">
            Average:{" "}
            {((averageConfidenceScore?.avgMoveConfidence ?? 0) * 100).toFixed(
              0,
            ) + "%"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {[
            { name: "Establishing a research territory", move: 0 },
            { name: "Establishing a niche", move: 1 },
            { name: "Occupying the niche", move: 2 },
          ].map((item, index) => (
            <motion.div
              key={item.move}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mb-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ParenthesesIcon className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {(
                  (averageConfidenceScoreByMove?.find(
                    (m) => m.move === item.move,
                  )?.avgMoveConfidence ?? 0) * 100
                ).toFixed(1) + "%"}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </MotionCard>

      <MotionCard
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md"
      >
        <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
          <CardTitle className="text-white">Sentence Order</CardTitle>
          <CardDescription className="text-purple-100">
            Average: {averageSentencePositionScore?.avgOrder ?? 0}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {[
            { name: "Establishing a research territory", move: 0 },
            { name: "Establishing a niche", move: 1 },
            { name: "Occupying the niche", move: 2 },
          ].map((item, index) => (
            <motion.div
              key={item.move}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 + index * 0.1 }}
              className="mb-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ParenthesesIcon className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-2xl font-bold text-indigo-600">
                {(
                  averageSentencePositionScoreByMove?.find(
                    (m) => m.move === item.move,
                  )?.avgOrder ?? 0
                ).toFixed(1)}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </MotionCard>
    </div>
  );
};
