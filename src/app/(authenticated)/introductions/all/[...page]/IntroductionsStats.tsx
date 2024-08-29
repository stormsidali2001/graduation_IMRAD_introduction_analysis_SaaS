"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ParenthesesIcon } from "lucide-react";

const MotionCard = motion(Card);

export const IntroductionsStats = ({
  averageConfidenceScore,
  averageConfidenceScoreByMove,
  averageSentencePositionScore,
  averageSentencePositionScoreByMove,
  totalIntroductions,
  totalIntroductionsByMove,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MotionCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <CardHeader>
          <CardTitle>IMRAD Introduction Moves</CardTitle>
          <CardDescription className="text-blue-100">
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
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-hidden"
      >
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardTitle>Confidence Scores</CardTitle>
          <CardDescription className="text-green-100">
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
              <div className="text-2xl font-bold text-teal-600">
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
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="overflow-hidden"
      >
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardTitle>Sentence Order</CardTitle>
          <CardDescription className="text-orange-100">
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
              <div className="text-2xl font-bold text-red-600">
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
