"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, BarChartIcon, MessageCircleIcon } from "lucide-react";

const DashboardMetricsCardsContainer = ({
  avgMoveConfidence,
  avgSubMoveConfidence,
  total,
  totalFeedbacks,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cards = [
    {
      title: "Introductions Processed",
      value: total ?? 0,
      icon: ActivityIcon,
    },
    {
      title: "Average Move Confidence",
      value: `${((avgMoveConfidence ?? 0) * 100).toFixed(0)}%`,
      icon: BarChartIcon,
    },
    {
      title: "Average Submove Confidence",
      value: `${((avgSubMoveConfidence ?? 0) * 100).toFixed(0)}%`,
      icon: BarChartIcon,
    },
    {
      title: "Feedback Entries",
      value: totalFeedbacks,
      icon: MessageCircleIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="relative pb-8 pt-6">
              <div className="absolute inset-0 " />
              <CardTitle className="relative z-10 text-lg font-semibold text-white">
                {card.title}
              </CardTitle>
              <motion.div
                className="absolute bottom-2 right-2 z-10"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 + index * 0.1,
                }}
              >
                <card.icon className="h-6 w-6 text-white/80" />
              </motion.div>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.div
                className="text-3xl font-bold"
                variants={numberVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {card.value}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardMetricsCardsContainer;
