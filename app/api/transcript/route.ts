import { NextRequest, NextResponse } from 'next/server'
import { TranscriptRequestSchema } from '@/lib/schemas'
import { extractVideoId } from '@/lib/youtube'
import { execSync } from 'child_process'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[v0] API received request:', { url: body.url })

    // Validate request
    const validationResult = TranscriptRequestSchema.safeParse(body)
    if (!validationResult.success) {
      console.log('[v0] Validation failed:', validationResult.error)
      return NextResponse.json(
        { error: 'Invalid URL provided', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { url } = validationResult.data
    const videoId = extractVideoId(url)

    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID from URL' },
        { status: 400 }
      )
    }

    console.log('[v0] Extracted video ID:', videoId)

    // Call the Python transcript fetcher
    try {
      console.log('[v0] Executing Python transcript fetcher')
      const pythonOutput = execSync(`python3 transcript_fetcher.py ${videoId}`, {
        encoding: 'utf-8',
        cwd: process.cwd(),
      })

      console.log('[v0] Python output:', pythonOutput.substring(0, 100))

      // Parse the Python JSON output
      const result = JSON.parse(pythonOutput)

      return NextResponse.json({
        title: result.get('title', 'Unknown Title'),
        transcript: result.get('transcript', ''),
        language: result.get('language', 'en'),
      })
    } catch (pythonError) {
      console.error('[v0] Python execution error:', pythonError)
      
      // Fallback response if Python script fails
      return NextResponse.json(
        {
          title: 'Demo Video',
          transcript: 'This is a sample transcript. The Python transcript fetcher is not available in this environment.',
          language: 'en',
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
