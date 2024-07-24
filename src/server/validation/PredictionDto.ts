import {z} from 'zod'

export const predictionOutputItemDto = z.object({
    sentence: z.string(),
    move: z.number(),
    subMove: z.number(),
    moveConfidence: z.number(),
    subMoveConfidence: z.number(),
})
export const PredictionOutputDto =z.array(predictionOutputItemDto)

export type PredictionOutputDtoType = z.infer<typeof PredictionOutputDto>;
export type PredictionOutputItemDtoType = z.infer<typeof predictionOutputItemDto>;