import { z } from 'zod'

export const TranscriptRequestSchema = z.object({
  url: z.string()
    .url('Please enter a valid URL')
    .refine(
      (url) => {
        const videoIdPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([^&?/]+)/
        return videoIdPattern.test(url)
      },
      { message: 'Please enter a valid YouTube URL' }
    ),
})

export type TranscriptRequest = z.infer<typeof TranscriptRequestSchema>

export const TranscriptResponseSchema = z.object({
  title: z.string(),
  transcript: z.string(),
  language: z.string(),
})

export type TranscriptResponseType = z.infer<typeof TranscriptResponseSchema>
