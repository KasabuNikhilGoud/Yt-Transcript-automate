from transcript_fetcher import get_transcript

# Example: Get transcript from a YouTube video
video_url = input("Enter YouTube URL: ")
languages = input("Enter language codes (comma-separated, or press Enter for auto): ").strip()

print("\nFetching transcript...\n")

# Parse language input
lang_list = [l.strip() for l in languages.split(',')] if languages else None

transcript, detected_lang = get_transcript(video_url, lang_list)

print(f"\n✓ Success!")
print(f"  Language: {detected_lang}")
print(f"  Transcript length: {len(transcript)} characters\n")
print("First 200 characters:")
print(transcript[:200])
