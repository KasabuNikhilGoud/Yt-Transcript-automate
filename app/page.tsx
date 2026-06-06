'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UrlInputForm } from '@/components/url-input-form'
import type { TranscriptRequest } from '@/lib/schemas'
import { extractVideoId } from '@/lib/youtube'
import { Github, BookOpen } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: TranscriptRequest) => {
    setIsLoading(true)
    try {
      console.log('[v0] Form submitted with URL:', data.url)
      
      const videoId = extractVideoId(data.url)
      if (!videoId) {
        throw new Error('Could not extract video ID from URL')
      }

      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch transcript')
      }

      const transcript = await response.json()
      console.log('[v0] Transcript received:', { 
        title: transcript.title,
        length: transcript.transcript.length
      })

      // Store in session storage for the viewer page
      sessionStorage.setItem(
        'transcript',
        JSON.stringify({ videoId, ...transcript })
      )

      // Navigate to viewer page
      router.push('/viewer')
    } catch (error) {
      console.error('[v0] Error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
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
          <a
            href="https://github.com/KasabuNikhilGoud/Yt-Transcript-automate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block bg-primary/10 rounded-full p-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Extract YouTube Transcripts Instantly
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Paste a YouTube URL and get the full transcript in seconds. Perfect for research, content creation, and accessibility.
          </p>

          <div className="mb-12">
            <UrlInputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">⚡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Instant</h3>
              <p className="text-sm text-muted-foreground">Get transcripts in seconds</p>
            </div>

            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">📋</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Download</h3>
              <p className="text-sm text-muted-foreground">Export as TXT or Markdown</p>
            </div>

            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">🔍</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Search</h3>
              <p className="text-sm text-muted-foreground">Find content within transcripts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and Tailwind CSS • Open source on GitHub</p>
        </div>
      </footer>
    </main>
  )
}
