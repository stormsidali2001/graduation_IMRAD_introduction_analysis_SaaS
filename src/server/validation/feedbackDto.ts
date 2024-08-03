import {z} from 'zod'
export const FeedbackDto = z.object({
    correctMove: z.number().optional(),
    correctSubMove: z.number().optional(),
    liked: z.boolean(),
    reason: z.string().optional()
}) 

export const CreateSentenceFeedbackDto = z.object({
    introductionId: z.string(),
    sentenceId: z.string(),
    feedback: FeedbackDto,
    userId: z.string()
})
export type FeedbackDto = z.infer<typeof FeedbackDto>
export type CreateSentenceFeedbackDto = z.infer<typeof CreateSentenceFeedbackDto>