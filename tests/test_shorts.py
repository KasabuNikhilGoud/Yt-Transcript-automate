from transcript_fetcher import get_transcript

print("=" * 60)
print("Testing YouTube Shorts URL Support")
print("=" * 60)

# Test with YouTube Shorts URL
shorts_url = "https://youtube.com/shorts/fVc95xxfg80?si=bmLBRCnmKrZsWTAg"

print(f"\nTesting Shorts URL: {shorts_url}")

try:
    transcript, language = get_transcript(shorts_url)
    print(f"\n✓ SUCCESS")
    print(f"  Language: {language}")
    print(f"  Transcript Length: {len(transcript)} characters")
    print(f"\n  Preview:\n  {transcript[:300]}...")
except Exception as e:
    print(f"\n✗ FAILED: {str(e)}")
    print("\nNote: Some videos may require authentication or have no transcript available")

print("\n" + "=" * 60)
