"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { movesDict, subMoveDict } from "@/common/moves";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import {
  CreateSentenceFeedbackDto,
  type FeedbackDto,
  type CreateSentenceFeedbackDto as CreateSentenceFeedbackType,
} from "@/server/validation/feedbackDto";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { createSentenceFeedbackAction } from "@/server/actions/createSentenceFeedback";

interface FeedbackDialogBody {
  isLike: boolean;
  introductionId: string;
  sentenceId: string;
  defaultMove: number;
  defaultSubMove: number;
}
export default function FeedbackDialogBody({
  isLike = false,
  introductionId,
  sentenceId,
  defaultMove,
  defaultSubMove,
}: FeedbackDialogBody) {
  const form = useForm<CreateSentenceFeedbackType>({
    resolver: zodResolver(CreateSentenceFeedbackDto),
    defaultValues: {
      feedback: {
        correctMove: defaultMove,
        correctSubMove: defaultSubMove,
        liked: isLike,
      },
      introductionId,
      sentenceId,
    },
  });
  const { executeAsync, status } = useAction(createSentenceFeedbackAction);
  const move = useWatch({
    control: form.control,
    name: "feedback.correctMove",
  });
  console.log(move);
  const subMoves = subMoveDict[move as 0 | 1 | 2];
  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      alert("unvalid");
      return;
    }
    const data = form.getValues();
    try {
      const res = await executeAsync(data);
      form.reset();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
  return (
    <DialogContent className="sm:max-w-[500px]">
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Please provide feedback to help us improve our move prediction
            accuracy.
          </DialogDescription>
        </div>

        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            {!isLike ? (
              <>
                {/** 
            Correct Move Field
          **/}
                <FormField
                  control={form.control}
                  name="feedback.correctMove"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Move Prediction</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select move prediction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(movesDict).map(
                            ([key, value], index) => (
                              <SelectItem value={key}>{value}</SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** 
            Correct Sub Move Field
          **/}
                <FormField
                  control={form.control}
                  name="feedback.correctSubMove"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Sub Move Prediction</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select move prediction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(subMoves).map(
                            ([key, value], index) => (
                              <SelectItem value={key}>{value}</SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}
            {/*
             *Raison field
             */}
            <FormField
              control={form.control}
              name="feedback.reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="The reason behind your feedback."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DialogFooter className="flex justify-end gap-2">
        <div>
          <Button variant="ghost">Cancel</Button>
        </div>
        <Button type="submit" onClick={() => onSubmit()}>
          {status === "executing" ? "Loading..." : "Submit"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
