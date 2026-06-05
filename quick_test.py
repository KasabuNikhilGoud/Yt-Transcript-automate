from youtube_transcript_api import YouTubeTranscriptApi

# Test with a popular video that has transcript
video_id = "dQw4w9WgXcQ"

print("=" * 50)
print("Testing YouTube Transcript API (Quick Test)")
print("=" * 50)

try:
    print(f"\nFetching transcript for video: {video_id}")
    api = YouTubeTranscriptApi()
    transcript_obj = api.fetch(video_id, ['en'])
    transcript_data = transcript_obj.snippets
    full_text = "\n".join([entry.text for entry in transcript_data])
    
    print("\n✓ TEST PASSED - Transcript API works!")
    print(f"Transcript length: {len(full_text)} characters")
    print(f"Number of segments: {len(transcript_data)}")
    print(f"\nFirst 300 characters:\n{full_text[:300]}")
    print("\n" + "=" * 50)
    print("✓ Basic functionality verified!")
    print("Note: Install Whisper for videos without transcripts")
    print("=" * 50)
except Exception as e:
    print(f"\n✗ TEST FAILED: {str(e)}")
