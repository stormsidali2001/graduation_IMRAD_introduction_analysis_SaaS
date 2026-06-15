import { z, type AnyZodObject } from "zod";

export const PaginatedResultDtoMaker = <T extends AnyZodObject>(data: T) =>
  z.object({
    data: z.array(data),
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
  });

export const getPaginatedResults = async <T extends AnyZodObject>(
  {
    data,
    ...others
  }: {
    data: object[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  },
  validator: T,
): Promise<{
  data: z.infer<T>[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}> => {
  return PaginatedResultDtoMaker(validator).parseAsync({
    data: data as z.infer<T>[],
    ...others,
  });
};
