import React from "react";
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
import { Badge } from "@/components/ui/badge";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {ArrowLeft,ArrowRight} from 'lucide-react'
import { IntroductionDto, IntroductionDtoType } from "@/server/validation/introductionDto";
import { PaginatedResultType } from "@/server/validation/paginationMakerDto";
import Link from "next/link";

interface IntroductionsTableProps extends PaginatedResultType<typeof IntroductionDto>{


}
interface IntroductionProps extends IntroductionDtoType {

}

const Introduction = ({sentences,sha,averageMoveConfidence,averageSubMoveConfidence,id}:IntroductionProps) => {

  return (
    <TableRow>
      <TableCell className="max-[400px]">
        <div className="font-medium line-clamp-2">
         {sentences[0].text} 
        </div>
      </TableCell>
      <TableCell className="w-14">
        <div className="flex items-center gap-2">
          <div className="h-2 w-full bg-muted rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${((averageMoveConfidence?? 0)*100).toFixed(0)}%` }}
            />
          </div>
          <span className="text-sm font-medium">{((averageMoveConfidence ?? 0)*100).toFixed(0)}%</span>
        </div>
      </TableCell>

      <TableCell className="w-14">
        <div className="flex items-center gap-2">
          <div className="h-2 w-full bg-muted rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${((averageSubMoveConfidence ?? 0)*100).toFixed(0)}%` }}
            />
          </div>
          <span className="text-sm font-medium">{((averageSubMoveConfidence ?? 0)*100).toFixed(0)}%</span>
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
            <DropdownMenuItem><Link href={`/user/dashboard/introductions/${id}`}>Details</Link></DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
export const IntroductionsTable = ({  data=[],total,page,per_page,total_pages}:IntroductionsTableProps={}) => (
  <>

  <Card>
    <CardHeader>
      <CardTitle>Introductions</CardTitle>
      <CardDescription>Showing 1-{per_page} of {total} introductions</CardDescription>
    </CardHeader>
    <CardContent>
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
          {
data.map((introduction,index)=>(

          <Introduction key={index} {...introduction} />
))
          }
        </TableBody>
      </Table>

<Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  

    </CardContent>
  </Card>
  </>

);

function MoveVerticalIcon(props) {
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
