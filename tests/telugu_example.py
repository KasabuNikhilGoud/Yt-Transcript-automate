from transcript_fetcher import get_transcript

# Telugu Language Example
print("=" * 60)
print("Telugu Language Support - Example")
print("=" * 60)

# Example 1: Auto-detect Telugu
print("\n1. Auto-detect language (works for Telugu videos):")
print("   transcript, lang = get_transcript('YOUTUBE_URL')")
print("   # Automatically detects 'te' for Telugu videos")

# Example 2: Prefer Telugu
print("\n2. Prefer Telugu, fallback to Hindi and English:")
print("   transcript, lang = get_transcript(url, languages=['te', 'hi', 'en'])")

# Example 3: Command line
print("\n3. Command Line Usage:")
print("   python transcript_fetcher.py 'URL' 'te,hi,en'")

print("\n" + "=" * 60)
print("Telugu Language Code: te")
print("Output file format: VIDEO_ID_te_transcript.txt")
print("=" * 60)

print("\n\nSupported Indian Languages:")
indian_langs = {
    "te": "Telugu",
    "hi": "Hindi", 
    "ta": "Tamil",
    "bn": "Bengali",
    "mr": "Marathi",
    "gu": "Gujarati",
    "kn": "Kannada",
    "ml": "Malayalam",
    "pa": "Punjabi",
    "ur": "Urdu"
}

for code, name in indian_langs.items():
    print(f"  {code}: {name}")

print("\n✓ All Indian languages fully supported!")
print("✓ Auto-detection works for any language")
print("✓ Whisper provides high accuracy for Indian languages")
