import { z } from "zod"

export const movieShowSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1, "Director is required").max(255),
  budget: z.string().max(100).optional().nullable(),
  location: z.string().max(255).optional().nullable(),
  duration: z.string().max(100).optional().nullable(),
  yearTime: z.string().max(100).optional().nullable(),
  posterUrl: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
})

export type MovieShowInput = z.infer<typeof movieShowSchema>
