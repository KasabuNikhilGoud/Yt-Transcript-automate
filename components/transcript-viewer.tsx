'use client'

import { useState } from 'react'
import { Copy, Download, Search, X } from 'lucide-react'

interface TranscriptViewerProps {
  title: string
  transcript: string
  language: string
  videoId: string
}

export function TranscriptViewer({
  title,
  transcript,
  language,
  videoId,
}: TranscriptViewerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)

  const filteredTranscript = searchQuery
    ? transcript
        .split('\n')
        .filter((line) =>
          line.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .join('\n')
    : transcript

  const handleCopy = () => {
    navigator.clipboard.writeText(filteredTranscript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsText = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(filteredTranscript)
    )
    element.setAttribute('download', `${videoId}-transcript.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadAsMarkdown = () => {
    const markdown = `# ${title}\n\n**Video ID:** ${videoId}\n**Language:** ${language}\n\n---\n\n${filteredTranscript}`
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdown)
    )
    element.setAttribute('download', `${videoId}-transcript.md`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Video ID: {videoId}</span>
          <span>Language: {language}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search in transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            copied
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'border-border text-foreground hover:bg-muted'
          }`}
        >
          <Copy className="w-4 h-4" />
          <span className="text-sm font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={downloadAsText}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            TXT
          </button>
          <button
            onClick={downloadAsMarkdown}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            MD
          </button>
        </div>
      </div>

      {/* Transcript Content */}
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap break-words font-mono text-sm text-foreground leading-relaxed overflow-x-auto">
            {filteredTranscript}
          </pre>
        </div>
      </div>

      {/* Info */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {filteredTranscript.split('\n').length} matching lines
        </p>
      )}
    </div>
  )
}
