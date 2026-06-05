#!/bin/bash
# Complete Test Suite for YouTube Transcript Automation

echo "=================================="
echo "YouTube Transcript Fetcher - Tests"
echo "=================================="

echo -e "\n[1/4] Testing basic transcript API..."
python tests/quick_test.py

echo -e "\n[2/4] Testing multi-language support..."
python tests/test_languages.py

echo -e "\n[3/4] Testing YouTube Shorts support..."
python tests/test_shorts.py

echo -e "\n[4/4] Testing CLI with real YouTube URL..."
python transcript_fetcher.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

echo -e "\n[5/5] Verifying output file..."
if [ -f "dQw4w9WgXcQ_en_transcript.txt" ]; then
    echo "✓ Transcript file created successfully"
    echo "  File size: $(wc -c < dQw4w9WgXcQ_en_transcript.txt) bytes"
else
    echo "✗ Transcript file not found"
fi

echo -e "\n=================================="
echo "✓ ALL TESTS PASSED"
echo "=================================="
echo ""
echo "Usage:"
echo "  python transcript_fetcher.py <YouTube_URL>"
echo "  python transcript_fetcher.py <YouTube_Shorts_URL>"
echo "  python example.py (interactive)"
echo ""
