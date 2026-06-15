import { z } from "zod";

export const FeedbackDto = z.object({
  correctMove: z.coerce.number().optional(),
  correctSubMove: z.coerce.number().optional(),
  liked: z.boolean(),
  reason: z.string().optional(),
  username: z.string().optional(),
  image: z.string().optional().nullable(),
});

export const CreateSentenceFeedbackDto = z.object({
  introductionId: z.string(),
  sentenceId: z.string(),
  feedback: FeedbackDto,
  userId: z.string().optional(),
});

export const SentenceFeedbackDto = z.object({
  feedback: FeedbackDto,
  sentenceText: z.string(),
  sentenceId: z.string(),
  introductionId: z.string(),
  move: z.number().optional(),
  subMove: z.number().optional(),
});

export const SentenceFeedbacksDto = z.array(SentenceFeedbackDto);

export const SentenceFindParamsDto = z.object({
  sentenceId: z.string(),
  introductionId: z.string(),
});

export type FeedbackDto = z.infer<typeof FeedbackDto>;
// Declaration merging: allows using CreateSentenceFeedbackDto as both schema and type
export type CreateSentenceFeedbackDto = z.infer<typeof CreateSentenceFeedbackDto>;
export type CreateSentenceFeedbackDtoType = z.infer<typeof CreateSentenceFeedbackDto>;
export type SentenceFeedbackDtoType = z.infer<typeof SentenceFeedbackDto>;
export type SentenceFeedbacksDtoType = z.infer<typeof SentenceFeedbacksDto>;
export type SentenceFindParamsDtoType = z.infer<typeof SentenceFindParamsDto>;
