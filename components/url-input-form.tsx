'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TranscriptRequestSchema } from '@/lib/schemas'
import type { TranscriptRequest } from '@/lib/schemas'
import { Loader2, Youtube } from 'lucide-react'

interface UrlInputFormProps {
  onSubmit: (data: TranscriptRequest) => Promise<void>
  isLoading?: boolean
}

export function UrlInputForm({ onSubmit, isLoading = false }: UrlInputFormProps) {
  const [error, setError] = useState<string | null>(null)
  
  const form = useForm<TranscriptRequest>({
    resolver: zodResolver(TranscriptRequestSchema),
    defaultValues: {
      url: '',
    },
  })

  const handleSubmit = async (data: TranscriptRequest) => {
    setError(null)
    try {
      await onSubmit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-2xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
            YouTube URL
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                id="url"
                placeholder="https://youtube.com/watch?v=... or youtu.be/..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
                {...form.register('url')}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || form.formState.isSubmitting}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading || form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Extracting...</span>
                </>
              ) : (
                <>
                  <span>Extract</span>
                </>
              )}
            </button>
          </div>
          {form.formState.errors.url && (
            <p className="mt-2 text-sm text-red-500">
              {form.formState.errors.url.message}
            </p>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>
    </form>
  )
}
