import { z } from "zod";
export const FeedbackDto = z.object({
  correctMove: z.coerce.number().optional(),
  correctSubMove: z.coerce.number().optional(),
  liked: z.boolean(),
  reason: z.string().optional(),
});

export const CreateSentenceFeedbackDto = z.object({
  introductionId: z.string(),
  sentenceId: z.string(),
  feedback: FeedbackDto,
});
export type FeedbackDto = z.infer<typeof FeedbackDto>;
export type CreateSentenceFeedbackDto = z.infer<
  typeof CreateSentenceFeedbackDto
>;

