import sys
from transcript_fetcher import get_transcript, extract_video_id

def process_batch(urls_file, languages=None):
    """Process multiple YouTube URLs from a file"""
    
    with open(urls_file, 'r') as f:
        urls = [line.strip() for line in f if line.strip()]
    
    print(f"Processing {len(urls)} videos...")
    print("=" * 60)
    
    results = []
    
    for i, url in enumerate(urls, 1):
        print(f"\n[{i}/{len(urls)}] Processing: {url}")
        
        try:
            transcript, lang = get_transcript(url, languages)
            video_id = extract_video_id(url)
            output_file = f"{video_id}_{lang}_transcript.txt"
            
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(transcript)
            
            results.append({
                'url': url,
                'status': 'success',
                'file': output_file,
                'language': lang
            })
            print(f"✓ Success: {output_file}")
            
        except Exception as e:
            results.append({
                'url': url,
                'status': 'failed',
                'error': str(e)
            })
            print(f"✗ Failed: {str(e)}")
    
    print("\n" + "=" * 60)
    print("BATCH PROCESSING COMPLETE")
    print("=" * 60)
    
    success = sum(1 for r in results if r['status'] == 'success')
    failed = sum(1 for r in results if r['status'] == 'failed')
    
    print(f"\nTotal: {len(results)}")
    print(f"Success: {success}")
    print(f"Failed: {failed}")
    
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python batch_processor.py <urls_file> [language_codes]")
        print("\nExample:")
        print("  python batch_processor.py urls.txt")
        print("  python batch_processor.py urls.txt te,hi,en")
        print("\nCreate urls.txt with one YouTube URL per line")
        sys.exit(1)
    
    urls_file = sys.argv[1]
    languages = sys.argv[2].split(',') if len(sys.argv) > 2 else None
    
    process_batch(urls_file, languages)
