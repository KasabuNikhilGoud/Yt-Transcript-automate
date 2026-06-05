# Multi-Language Support

## Supported Languages

The system supports **50+ languages** through both YouTube Transcript API and OpenAI Whisper.

### Common Language Codes

| Code | Language | Code | Language |
|------|----------|------|----------|
| `en` | English | `es` | Spanish |
| `hi` | Hindi | `te` | Telugu |
| `zh` | Chinese | `ar` | Arabic |
| `pt` | Portuguese | `ru` | Russian |
| `ja` | Japanese | `de` | German |
| `fr` | French | `ko` | Korean |
| `it` | Italian | `tr` | Turkish |
| `vi` | Vietnamese | `pl` | Polish |
| `uk` | Ukrainian | `nl` | Dutch |
| `th` | Thai | `id` | Indonesian |
| `ro` | Romanian | `cs` | Czech |
| `sv` | Swedish | `hu` | Hungarian |
| `el` | Greek | `fi` | Finnish |
| `da` | Danish | `no` | Norwegian |
| `sk` | Slovak | `ta` | Tamil |
| `bn` | Bengali | `mr` | Marathi |
| `gu` | Gujarati | `kn` | Kannada |
| `ml` | Malayalam | `ur` | Urdu |

## Usage Examples

### Auto-detect any language
```python
from transcript_fetcher import get_transcript

transcript, language = get_transcript("https://youtube.com/watch?v=VIDEO_ID")
print(f"Detected language: {language}")
```

### Specify language preference
```python
# Try Telugu first, then Hindi, then English
transcript, lang = get_transcript(url, languages=['te', 'hi', 'en'])
```

### Command Line

```bash
# Auto-detect language
python transcript_fetcher.py "https://youtube.com/watch?v=VIDEO_ID"

# Prefer specific languages (Telugu, Hindi, English)
python transcript_fetcher.py "https://youtube.com/watch?v=VIDEO_ID" "te,hi,en"
```

## How Language Detection Works

1. **Existing Transcript**: 
   - Checks for transcripts in preferred languages
   - Falls back to any available language
   - Returns detected language code

2. **Whisper Transcription**:
   - Auto-detects language from audio
   - Supports 99 languages
   - High accuracy across languages

## Output Files

Files are saved with language codes:
- `VIDEO_ID_en_transcript.txt` (English)
- `VIDEO_ID_te_transcript.txt` (Telugu)
- `VIDEO_ID_hi_transcript.txt` (Hindi)
- `VIDEO_ID_es_transcript.txt` (Spanish)

## Whisper Language Support

Whisper supports these languages with high accuracy:

**Major Languages**: English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Telugu, Turkish, Vietnamese, Polish, Ukrainian, Thai, Indonesian, Greek, Czech, Swedish, Romanian, Hungarian, Finnish, Danish, Norwegian, Slovak, Hebrew, Malay, Catalan

**Indian Languages**: Telugu (te), Hindi (hi), Tamil (ta), Bengali (bn), Marathi (mr), Gujarati (gu), Kannada (kn), Malayalam (ml), Punjabi (pa), Urdu (ur)

**Additional Languages**: Bulgarian, Croatian, Estonian, Latvian, Lithuanian, Slovenian, Serbian, Macedonian, Icelandic, Welsh, Afrikaans, Swahili, Filipino, Tamil, Telugu, Urdu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, and more.

## Notes

- Language detection is automatic
- No configuration needed
- Works with any YouTube video
- Supports both manual and auto-generated captions
