from transcript_fetcher import get_transcript

# Test with a video that has transcript
test_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

print("=" * 50)
print("Testing YouTube Transcript Fetcher")
print("=" * 50)

try:
    transcript = get_transcript(test_url)
    print("\n✓ TEST PASSED")
    print(f"Transcript length: {len(transcript)} characters")
    print(f"\nFirst 300 characters:\n{transcript[:300]}")
except Exception as e:
    print(f"\n✗ TEST FAILED: {str(e)}")
