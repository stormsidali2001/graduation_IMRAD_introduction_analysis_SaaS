
import {z} from 'zod'
export const RetrieverParamsDto = z.object({
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).optional().default(1)

})
export type     RetrieverParamsDtoType = z.infer<typeof RetrieverParamsDto>;