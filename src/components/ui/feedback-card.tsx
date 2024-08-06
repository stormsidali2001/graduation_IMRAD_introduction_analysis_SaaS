/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lYSBGyNaJhB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FeedbackCardProps {
  predictedMove: string;
  predictedSubMove: string;
  correctMove: string;
  correctSubMove: string;
  reason?: string;
  username: string;
  image?: string;
  userHandle: string;
}
export default function FeedbackCard({
  predictedMove,
  predictedSubMove,
  correctMove,
  correctSubMove,
  reason,
  username,
  userHandle,
  image = "",
}: FeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={image} alt="User Avatar" />
              <AvatarFallback>{username.at(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{username}</h3>
              <p className="text-sm text-muted-foreground">
                @{userHandle.toLowerCase().replaceAll(" ", "-")}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted/50 text-muted-foreground"
            >
              <TrashIcon className="w-5 h-5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Predicted Move</p>
            <p className="font-medium">{predictedMove}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Predicted Sub Move</p>
            <p className="font-medium">{predictedSubMove}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Correct Move</p>
            <p className="font-medium">{correctMove}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Correct Sub Move</p>
            <p className="font-medium">{correctSubMove}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Reason</p>
            <p>{reason}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
