# Yt-Transcript-automate

[![Python](https://img.shields.io/badge/Python-3.7%2B-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/KasabuNikhilGoud/Yt-Transcript-automate?style=social)](https://github.com/KasabuNikhilGoud/Yt-Transcript-automate)

Automated YouTube transcript fetcher with fallback to speech-to-text. Gets existing transcripts instantly or uses OpenAI Whisper for accurate audio transcription. **Supports 50+ languages with auto-detection.**

## Features

- ✅ Fetches existing YouTube transcripts (instant & free)
- ✅ Falls back to Whisper speech-to-text if no transcript exists
- ✅ **Supports 50+ languages with auto-detection**
- ✅ **YouTube Shorts support**
- ✅ Unlimited usage (100% free)
- ✅ High accuracy transcription
- ✅ Automatic cleanup of temporary files

## Installation

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install ffmpeg (required for audio processing)
# Ubuntu/Debian:
sudo apt-get install ffmpeg

# macOS:
brew install ffmpeg

# Windows: Download from https://ffmpeg.org/download.html
```

## Usage

### Command Line

```bash
# Auto-detect language
python transcript_fetcher.py "https://www.youtube.com/watch?v=VIDEO_ID"

# YouTube Shorts support
python transcript_fetcher.py "https://youtube.com/shorts/VIDEO_ID"

# Specify language preference (Telugu, Hindi, then English)
python transcript_fetcher.py "https://www.youtube.com/watch?v=VIDEO_ID" "te,hi,en"
```

### Python Script

```python
from transcript_fetcher import get_transcript

# Auto-detect language
transcript, language = get_transcript("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
print(f"Language: {language}")
print(transcript)

# Prefer specific languages
transcript, lang = get_transcript(url, languages=['te', 'hi', 'en'])
```

## Multi-Language Support

### Supported Languages (50+)

English, Spanish, Hindi, Telugu, Tamil, Chinese, Arabic, Portuguese, Russian, Japanese, German, French, Korean, Italian, Turkish, Vietnamese, Polish, Ukrainian, Dutch, Thai, Indonesian, Romanian, Czech, Swedish, Hungarian, Greek, Finnish, Danish, Norwegian, Bengali, Marathi, Gujarati, Kannada, Malayalam, Urdu, and many more!

[See full language list →](LANGUAGES.md)

### How It Works

- **Auto-detection**: Automatically detects and uses any available language
- **Language preference**: Specify preferred languages in order
- **Whisper AI**: Supports 99 languages when transcribing audio
- **Output**: Files saved as `VIDEO_ID_LANG_transcript.txt`

### Examples

```bash
# Telugu video - auto-detect
python transcript_fetcher.py "https://youtube.com/watch?v=TELUGU_VIDEO"
# Output: VIDEO_ID_te_transcript.txt

# Prefer Telugu, fallback to Hindi, then English
python transcript_fetcher.py "https://youtube.com/watch?v=VIDEO" "te,hi,en"
```

## Run Tests

```bash
# Quick API test
python tests/quick_test.py

# Language support test
python tests/test_languages.py

# YouTube Shorts test
python tests/test_shorts.py

# Full test suite
./tests/run_tests.sh
```

## How It Works

1. **Extracts video ID** from YouTube URL
2. **Checks for existing transcript** using YouTube Transcript API
3. **If found**: Returns transcript immediately
4. **If not found**: 
   - Downloads audio using yt-dlp
   - Transcribes with OpenAI Whisper (auto-detects language)
   - Cleans up temporary files
5. **Saves transcript** to `{video_id}_{language}_transcript.txt`

## Output

Transcripts are saved as `{VIDEO_ID}_{LANGUAGE}_transcript.txt` in the current directory.

Examples:
- `dQw4w9WgXcQ_en_transcript.txt` (English)
- `VIDEO_ID_te_transcript.txt` (Telugu)
- `VIDEO_ID_hi_transcript.txt` (Hindi)
- `VIDEO_ID_es_transcript.txt` (Spanish)

## Notes

- Supports 50+ languages with automatic detection
- YouTube Shorts URLs fully supported
- First run downloads Whisper model (~140MB)
- Whisper transcription takes ~1-5 minutes depending on video length
- Works with any language that YouTube and Whisper support
- No API keys or authentication required

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Star History

If you find this project useful, please give it a star ⭐!
