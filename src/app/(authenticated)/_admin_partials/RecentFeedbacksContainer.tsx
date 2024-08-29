"use client";
import React from "react";
import { motion } from "framer-motion";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { movesDict, subMoveDict } from "@/common/moves";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableRowProps {
  username: string;
  image?: string;
  predictedMove: number;
  predictedSubMove: number;
  isLiked: boolean;
  index: number;
}

const AnimatedIcon = ({ isLiked }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <motion.div
        animate={{
          color: isLiked ? "#22c55e" : "#ef4444",
        }}
        transition={{ duration: 0.3 }}
      >
        {isLiked ? (
          <ThumbsUpIcon className="w-5 h-5" />
        ) : (
          <ThumbsDownIcon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.div>
  );
};

const FeedbackRow = ({
  username,
  image,
  predictedMove,
  predictedSubMove,
  isLiked,
  index,
}: TableRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={image} />
            <AvatarFallback>{username.at(0)}</AvatarFallback>
          </Avatar>
          <div>{username}</div>
        </div>
      </TableCell>
      <TableCell>{movesDict[predictedMove]}</TableCell>
      <TableCell>{subMoveDict[predictedMove][predictedSubMove]}</TableCell>
      <TableCell>
        <AnimatedIcon isLiked={isLiked} />
      </TableCell>
    </motion.tr>
  );
};

const RecentFeedbacksContainer = ({ feedbacks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Correct Move</TableHead>
                <TableHead>Correct Submove</TableHead>
                <TableHead>Like/Dislike</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.data.map((f, index) => (
                <FeedbackRow
                  key={index}
                  username={f.feedback.username}
                  image={f.feedback.image}
                  predictedMove={f.move}
                  predictedSubMove={f.subMove}
                  isLiked={f.feedback.liked}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentFeedbacksContainer;
