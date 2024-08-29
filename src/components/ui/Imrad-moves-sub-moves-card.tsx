"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Flag, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function ImradMovesSubmovesInfoCard() {
  const moves = [
    {
      title: "Establishing the Research Territory",
      icon: <Flag className="h-5 w-5" />,
      submoves: [
        "Show importance or relevance of research area",
        "Introduce and review previous research",
      ],
    },
    {
      title: "Establishing the Niche",
      icon: <Target className="h-5 w-5" />,
      submoves: [
        "Claim issues with previous research",
        "Highlight gaps in the field",
        "Raise questions about unclear research",
        "Extend prior research",
      ],
    },
    {
      title: "Occupying the Niche",
      icon: <Lightbulb className="h-5 w-5" />,
      submoves: [
        "Outline purposes and nature of research",
        "State hypothesis or research question",
        "Share findings",
        "Elaborate on research value",
        "Outline paper structure",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">IMRAD Introduction Moves</h3>
      <p className="text-sm text-gray-600 mb-6 text-left">
        IMRAD moves are essential components in structuring academic papers,
        providing a framework for organizing research and presenting findings
        effectively.
      </p>
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moves.map((move, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="shadow-md h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-semibold">
                  {move.icon}
                  <span className="ml-2">{move.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 mt-4">
                  {move.submoves.map((submove, subIndex) => (
                    <li key={subIndex} className="flex items-start text-sm">
                      <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-gray-700">{submove}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
