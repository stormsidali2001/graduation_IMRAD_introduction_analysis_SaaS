"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BookOpenIcon } from "lucide-react";
import { IntroductionDtoType } from "@/server/validation/introductionDto";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

interface IntroductionProps extends IntroductionDtoType {}

const Introduction = ({
  sentences,
  averageMoveConfidence,
  averageSubMoveConfidence,
  id,
}: IntroductionProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TableCell className="max-[400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-medium line-clamp-2"
        >
          {sentences[0].text}
        </motion.div>
      </TableCell>
      <TableCell className="w-14">
        <div className="flex items-center gap-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((averageMoveConfidence ?? 0) * 100).toFixed(0)}%`,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium"
          >
            {((averageMoveConfidence ?? 0) * 100).toFixed(0)}%
          </motion.span>
        </div>
      </TableCell>
      <TableCell className="w-14">
        <div className="flex items-center gap-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((averageSubMoveConfidence ?? 0) * 100).toFixed(0)}%`,
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm font-medium"
          >
            {((averageSubMoveConfidence ?? 0) * 100).toFixed(0)}%
          </motion.span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveVerticalIcon className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/introductions/${id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
  );
};

interface IntroductionsTableProps {
  data?: IntroductionDtoType[];
  total?: number;
  page?: number;
  per_page?: number;
  total_pages?: number;
  nextPage?: string | null;
  previousPage?: string | null;
}

export const IntroductionsTable = ({
  data = [],
  total,
  page,
  per_page,
  total_pages,
  nextPage,
  previousPage,
}: IntroductionsTableProps = {}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/80 to-indigo-500">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CardTitle className="text-white">Introductions</CardTitle>
          <CardDescription className="text-purple-100">
            Showing 1-{per_page} of {total} introductions. You&apos;re currently on
            page {page}.
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState
            icon={BookOpenIcon}
            title="No introductions yet"
            description="Analyze your first introduction to see it here."
            action={
              <Button asChild>
                <Link href="/generate">Analyze Introduction</Link>
              </Button>
            }
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Introduction</TableHead>
                <TableHead>Move Confidence</TableHead>
                <TableHead>Sub Move Confidence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {data.map((introduction, index) => (
                  <Introduction key={index} {...introduction} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
        {total_pages > 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {previousPage && <PaginationPrevious href={previousPage} />}
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {total_pages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  {nextPage && <PaginationNext href={nextPage} />}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

function MoveVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
