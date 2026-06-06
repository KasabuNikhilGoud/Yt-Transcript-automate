export interface TranscriptResponse {
  title: string
  transcript: string
  language: string
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([^&?/]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export async function fetchTranscript(videoId: string): Promise<TranscriptResponse> {
  try {
    console.log('[v0] Fetching transcript for videoId:', videoId)
    
    // For now, we'll use a simple fetch to a Python backend or external API
    // Since we don't have youtube-transcript-api npm available, we'll create a backend endpoint
    // that can use the Python transcript_fetcher.py
    
    const response = await fetch('http://localhost:5000/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_id: videoId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('[v0] Transcript data received:', { 
      title: data.title, 
      language: data.language,
      length: data.transcript?.length || 0 
    })
    
    return {
      title: data.title,
      transcript: data.transcript,
      language: data.language,
    }
  } catch (error) {
    console.error('[v0] Error fetching transcript:', error)
    throw error
  }
}
