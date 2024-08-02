import {z } from 'zod';

export const SentenceDto = z.object({
        move: z.number(),
        subMove: z.number(),
        text: z.string(),
        order: z.number(),
        moveConfidence: z.number(),
        subMoveConfidence: z.number(),
    });

export const IntroductionDto = z.object({
    sha: z.string(),    
    userId:z.string(),
    sentences: z.array(SentenceDto),
    averageSubMoveConfidence:z.number().optional(),
    averageMoveConfidence:z.number().optional(),
})

export const introductionsArrayDto = z.array(IntroductionDto);

export const UpdateSentenceDto = SentenceDto.partial();


export type IntroductionDtoType = z.infer<typeof IntroductionDto>;
export type SentenceDtoType = z.infer<typeof SentenceDto>;
export type IntroductionsArrayDtoType = z.infer<typeof introductionsArrayDto>;
