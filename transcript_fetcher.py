import os
import sys
from youtube_transcript_api import YouTubeTranscriptApi
import yt_dlp

def extract_video_id(url):
    """Extract video ID from YouTube URL"""
    if "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    elif "youtube.com/watch?v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtube.com/shorts/" in url:
        return url.split("shorts/")[1].split("?")[0]
    return url

def get_existing_transcript(video_id, languages=None):
    """Try to fetch existing transcript in any available language"""
    try:
        api = YouTubeTranscriptApi()
        
        # If specific languages requested, try them
        if languages:
            try:
                transcript_obj = api.fetch(video_id, languages)
                lang = transcript_obj.language_code
                text = "\n".join([entry.text for entry in transcript_obj.snippets])
                return text, lang
            except:
                pass
        
        # Try to get any available transcript
        transcript_list = api.list(video_id)
        
        # Get first available transcript (manual or auto-generated)
        for transcript_info in transcript_list:
            try:
                transcript_obj = transcript_info.fetch()
                lang = transcript_obj.language_code
                text = "\n".join([entry.text for entry in transcript_obj.snippets])
                return text, lang
            except:
                continue
        
        return None, None
    except Exception:
        return None, None

def download_audio(video_id):
    """Download audio from YouTube video"""
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{video_id}.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }],
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([f'https://www.youtube.com/watch?v={video_id}'])
    return f'{video_id}.mp3'

def transcribe_audio(audio_file, language=None):
    """Transcribe audio using Whisper with auto language detection"""
    try:
        import whisper
    except ImportError:
        raise ImportError("Whisper not installed. Run: pip install openai-whisper")
    
    model = whisper.load_model("base")
    
    # Whisper auto-detects language if not specified
    if language:
        result = model.transcribe(audio_file, language=language)
    else:
        result = model.transcribe(audio_file)
    
    detected_lang = result.get('language', 'unknown')
    return result['text'], detected_lang

def get_transcript(url, languages=None):
    """Main function to get transcript with multi-language support
    
    Args:
        url: YouTube video URL
        languages: List of language codes (e.g., ['en', 'es', 'hi']) or None for auto-detect
    
    Returns:
        tuple: (transcript_text, language_code)
    """
    video_id = extract_video_id(url)
    print(f"Processing video: {video_id}")
    
    # Try existing transcript first
    print("Checking for existing transcript...")
    transcript, lang = get_existing_transcript(video_id, languages)
    
    if transcript:
        print(f"✓ Found existing transcript (Language: {lang})")
        return transcript, lang
    
    # Fall back to audio transcription
    print("No transcript found. Downloading audio...")
    audio_file = download_audio(video_id)
    
    print("Transcribing audio with Whisper (auto-detecting language)...")
    # Pass first language preference to Whisper if specified
    prefer_lang = languages[0] if languages else None
    transcript, lang = transcribe_audio(audio_file, prefer_lang)
    
    # Cleanup
    if os.path.exists(audio_file):
        os.remove(audio_file)
    
    print(f"✓ Transcription complete (Language: {lang})")
    return transcript, lang

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transcript_fetcher.py <YouTube_URL> [language_codes]")
        print("Example: python transcript_fetcher.py <URL> en,es,hi")
        sys.exit(1)
    
    url = sys.argv[1]
    
    # Parse language preferences if provided
    languages = None
    if len(sys.argv) > 2:
        languages = sys.argv[2].split(',')
        print(f"Language preference: {', '.join(languages)}")
    
    transcript, lang = get_transcript(url, languages)
    
    # Save to file
    video_id = extract_video_id(url)
    output_file = f"{video_id}_{lang}_transcript.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(transcript)
    
    print(f"\nTranscript saved to: {output_file}")
    print(f"Language: {lang}")
    print(f"\nPreview:\n{transcript[:500]}...")
