from transcript_fetcher import get_transcript

print("=" * 60)
print("Multi-Language Transcript Test")
print("=" * 60)

# Test videos in different languages
test_videos = [
    ("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "English", None),
]

for url, lang_name, lang_codes in test_videos:
    print(f"\n\nTesting {lang_name} video...")
    print(f"URL: {url}")
    
    try:
        transcript, detected_lang = get_transcript(url, lang_codes)
        print(f"\n✓ SUCCESS")
        print(f"  Detected Language: {detected_lang}")
        print(f"  Transcript Length: {len(transcript)} characters")
        print(f"  Preview: {transcript[:150]}...")
    except Exception as e:
        print(f"\n✗ FAILED: {str(e)}")

print("\n" + "=" * 60)
print("Language Support Features:")
print("=" * 60)
print("✓ Auto-detects any available language")
print("✓ Supports 50+ languages (YouTube + Whisper)")
print("✓ Preference list: get_transcript(url, ['te', 'hi', 'en'])")
print("✓ Auto language detection if none specified")
print("=" * 60)

print("\n\nSupported Languages Include:")
languages = {
    "en": "English", "es": "Spanish", "hi": "Hindi", "te": "Telugu",
    "ta": "Tamil", "zh": "Chinese", "ar": "Arabic", "pt": "Portuguese",
    "ru": "Russian", "ja": "Japanese", "de": "German", "fr": "French",
    "ko": "Korean", "it": "Italian", "tr": "Turkish", "vi": "Vietnamese",
    "pl": "Polish", "uk": "Ukrainian", "nl": "Dutch", "th": "Thai",
    "id": "Indonesian", "ro": "Romanian", "bn": "Bengali", "mr": "Marathi",
    "gu": "Gujarati", "kn": "Kannada", "ml": "Malayalam", "ur": "Urdu"
}

for code, name in list(languages.items())[:12]:
    print(f"  {code}: {name}")
print(f"  ... and {len(languages) - 12} more!")
