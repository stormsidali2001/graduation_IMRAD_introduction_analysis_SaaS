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
import { getAllFeedbacksAction } from "@/server/actions/get-all-feedbacks";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

interface TableRowProps {
  username: string;
  image?: string;
  predictedMove: number;
  predictedSubMove: number;
  isLiked: boolean;
}
const FeedbackRow = ({
  username,
  image,
  predictedMove,
  predictedSubMove,
  isLiked,
}: TableRowProps) => {
  return (
    <TableRow>
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
        {isLiked ? (
          <ThumbsUpIcon className="w-4 h-4 text-primary" />
        ) : (
          <ThumbsDownIcon className="w-4 h-4 text-destructive" />
        )}
      </TableCell>
    </TableRow>
  );
};
export const RecentFeedbacksTable = async () => {
  try {
    const feedbacks = (await getAllFeedbacksAction({ page: 1 }))?.data;
    return (
      <Card className="col-span-1 lg:col-span-2 ">
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
              {feedbacks.data.map((f) => (
                <FeedbackRow
                  username={f.feedback.username}
                  image={f.feedback.image}
                  predictedMove={f.move}
                  predictedSubMove={f.subMove}
                  isLiked={f.feedback.liked}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (err) {
    console.error(err);
  }
};
