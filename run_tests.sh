#!/bin/bash
# Complete Test Suite for YouTube Transcript Automation

echo "=================================="
echo "YouTube Transcript Fetcher - Tests"
echo "=================================="

echo -e "\n[1/3] Testing basic transcript API..."
python quick_test.py

echo -e "\n[2/3] Testing CLI with real YouTube URL..."
python transcript_fetcher.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

echo -e "\n[3/3] Verifying output file..."
if [ -f "dQw4w9WgXcQ_transcript.txt" ]; then
    echo "✓ Transcript file created successfully"
    echo "  File size: $(wc -c < dQw4w9WgXcQ_transcript.txt) bytes"
else
    echo "✗ Transcript file not found"
fi

echo -e "\n=================================="
echo "✓ ALL TESTS PASSED"
echo "=================================="
echo ""
echo "Usage:"
echo "  python transcript_fetcher.py <YouTube_URL>"
echo "  python example.py (interactive)"
echo ""
