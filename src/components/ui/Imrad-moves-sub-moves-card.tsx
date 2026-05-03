"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Flag, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function ImradMovesSubmovesInfoCard() {
  const moves = [
    {
      title: "Establishing the Research Territory",
      icon: <Flag className="h-5 w-5 text-blue-600" />,
      iconBg: "bg-blue-100",
      borderColor: "border-t-blue-400",
      submoves: [
        "Show importance or relevance of research area",
        "Introduce and review previous research",
      ],
    },
    {
      title: "Establishing the Niche",
      icon: <Target className="h-5 w-5 text-amber-600" />,
      iconBg: "bg-amber-100",
      borderColor: "border-t-amber-400",
      submoves: [
        "Claim issues with previous research",
        "Highlight gaps in the field",
        "Raise questions about unclear research",
        "Extend prior research",
      ],
    },
    {
      title: "Occupying the Niche",
      icon: <Lightbulb className="h-5 w-5 text-green-600" />,
      iconBg: "bg-green-100",
      borderColor: "border-t-green-400",
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
      <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
        IMRAD Introduction Moves
      </h3>
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
            <Card className={`bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md h-full border-t-4 ${move.borderColor}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <span className={`p-1.5 rounded-lg ${move.iconBg}`}>{move.icon}</span>
                  <span>{move.title}</span>
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
