# GitHub Actions Workflow

## Fetch YouTube Transcript

This workflow fetches transcripts from YouTube videos automatically.

### How to Use

1. Go to the **Actions** tab in GitHub
2. Select **"Fetch YouTube Transcript"** workflow
3. Click **"Run workflow"** button (green button)
4. (Optional) Enter a custom YouTube URL
5. (Optional) Enter language preferences like `te,hi,en`
6. Click **"Run workflow"** to start
7. Wait for completion
8. Download transcript from **Artifacts** section

### Default Video

Default: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

This video has existing transcripts available, so it works instantly.

### Tested Videos with Transcripts

These videos are known to work:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` (English)
- `https://www.youtube.com/watch?v=jNQXAC9IVRw` (Multiple languages)

### Note

Some videos may fail if:
- No transcripts are available
- Video requires authentication (age-restricted, private)
- Creator disabled transcripts
- YouTube blocks bot detection

For videos without transcripts, the system attempts audio transcription using Whisper, but this may be blocked by YouTube's bot protection.

### Custom Video URL

You can test with your own video URL by entering it in the workflow input field. Make sure the video has transcripts enabled.
