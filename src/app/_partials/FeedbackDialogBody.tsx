import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
          <ThumbsDownIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription>
              Please provide feedback to help us improve our move prediction accuracy.
            </DialogDescription>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="move-prediction">Correct Move Prediction</Label>
              <Select id="move-prediction" defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select move prediction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Move 1</SelectItem>
                  <SelectItem value="2">Move 2</SelectItem>
                  <SelectItem value="3">Move 3</SelectItem>
                  <SelectItem value="4">Move 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="submove-prediction">Correct Submove Prediction</Label>
              <Select id="submove-prediction" defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select submove prediction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Submove 1</SelectItem>
                  <SelectItem value="2">Submove 2</SelectItem>
                  <SelectItem value="3">Submove 3</SelectItem>
                  <SelectItem value="4">Submove 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Provide feedback on how we can improve" className="min-h-[100px]" />
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <div>
            <Button variant="ghost">Cancel</Button>
          </div>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ThumbsDownIcon(props) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}