import { z } from 'zod';

export const BookSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type BookDto = z.infer<typeof BookSchema>;
