'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TranscriptViewer } from '@/components/transcript-viewer'
import { ArrowLeft, Loader2, BookOpen } from 'lucide-react'

interface TranscriptData {
  videoId: string
  title: string
  transcript: string
  language: string
}

export default function ViewerPage() {
  const router = useRouter()
  const [transcript, setTranscript] = useState<TranscriptData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('[v0] ViewerPage mounted')
    
    // Get transcript from session storage
    const stored = sessionStorage.getItem('transcript')
    console.log('[v0] Stored data:', stored ? 'found' : 'not found')
    
    if (stored) {
      try {
        const data = JSON.parse(stored)
        console.log('[v0] Parsed transcript data:', {
          videoId: data.videoId,
          title: data.title,
          transcriptLength: data.transcript?.length || 0
        })
        setTranscript(data)
      } catch (error) {
        console.error('[v0] Error parsing stored transcript:', error)
      }
    }
    
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading transcript...</p>
        </div>
      </main>
    )
  }

  if (!transcript) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">TranscriptHub</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">No Transcript Found</h2>
            <p className="text-muted-foreground mb-6">
              Please go back and extract a transcript first.
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">TranscriptHub</h1>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TranscriptViewer
          title={transcript.title}
          transcript={transcript.transcript}
          language={transcript.language}
          videoId={transcript.videoId}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </main>
  )
}
