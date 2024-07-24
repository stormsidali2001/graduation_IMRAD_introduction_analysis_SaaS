import {z} from 'zod'

export const AiModelOutputDto = z.array(z.object({
    class: z.number().int().min(0),
    probability:z.number().min(0).max(1)
}))
export type AiModelOutputDtoType = z.infer<typeof AiModelOutputDto>; 