# YouTube Transcript Extractor

A full-stack web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** that extracts YouTube video transcripts with ease. Perfect for researchers, content creators, and accessibility advocates.

## Features

- ✅ **Instant Extraction**: Get transcripts in seconds
- 📋 **Multiple Export Formats**: Download as TXT or Markdown
- 🔍 **Search Functionality**: Find specific content within transcripts
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🐳 **Docker Support**: Easy containerization and deployment
- 🔄 **CI/CD Pipeline**: Automated testing and building with GitHub Actions
- 🎯 **Type-Safe**: Full TypeScript implementation
- 🚀 **Production-Ready**: Optimized and secure

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- `https://www.youtube.com/live/VIDEO_ID`

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Hook Form**: Efficient form handling
- **Zod**: Schema validation
- **Lucide React**: Beautiful icons

### Backend
- **Next.js API Routes**: Serverless endpoints
- **Python Integration**: Transcript fetching via Python scripts

### Deployment & DevOps
- **Docker**: Container orchestration
- **Docker Compose**: Multi-service setup
- **GitHub Actions**: CI/CD automation

## Project Structure

```
yt-transcript-automate/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── api/
│   │   └── transcript/
│   │       └── route.ts     # Transcript API endpoint
│   └── viewer/
│       └── page.tsx         # Transcript viewer page
├── components/
│   ├── url-input-form.tsx   # URL input component
│   └── transcript-viewer.tsx # Transcript viewer component
├── lib/
│   ├── youtube.ts           # YouTube utilities
│   ├── schemas.ts           # Zod schemas
│   └── types/               # TypeScript types
├── public/                  # Static assets
├── Dockerfile               # Container image definition
├── docker-compose.yml       # Multi-service setup
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
├── next.config.js           # Next.js config
└── transcript_fetcher.py    # Python transcript extraction
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for transcript extraction)
- Docker & Docker Compose (optional, for containerized deployment)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KasabuNikhilGoud/Yt-Transcript-automate.git
   cd Yt-Transcript-automate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Extracting a Transcript

1. **Enter YouTube URL**: Paste any YouTube URL in the input field
2. **Click Extract**: Wait for the transcript to be processed
3. **View & Download**: The transcript will appear with options to:
   - Search within the transcript
   - Copy to clipboard
   - Download as TXT file
   - Download as Markdown file

### API Usage

Extract transcripts programmatically using the REST API:

**Endpoint**: `POST /api/transcript`

**Request**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response**:
```json
{
  "title": "Video Title",
  "transcript": "Full transcript text...",
  "language": "en"
}
```

## Development

### Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Start Production Server
```bash
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

Access the application at `http://localhost:3000`

### Manual Docker Build

```bash
# Build the image
docker build -t yt-transcript-automate .

# Run the container
docker run -p 3000:3000 yt-transcript-automate
```

### Docker Compose Services

- **app**: Next.js application running on port 3000

Check health status:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs -f app
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:
- ✅ Installs dependencies
- ✅ Runs linting checks
- ✅ Performs type checking
- ✅ Builds the application
- ✅ Builds Docker image (on main branch push)
- ✅ Verifies all components and APIs

Workflow file: `.github/workflows/ci.yml`

### Running Locally

To test the CI workflow locally, use [act](https://github.com/nektos/act):

```bash
act push -b
```

## Configuration

### Environment Variables

Currently, the application doesn't require environment variables. To extend it, create `.env.local`:

```env
# Example for future AI features
OPENAI_API_KEY=your_key_here
```

### Tailwind CSS Customization

Edit `tailwind.config.ts` to customize colors, fonts, and spacing.

### Next.js Configuration

Edit `next.config.js` for advanced Next.js settings.

## Performance Optimizations

- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ CSS minification via Tailwind
- ✅ Server-side validation with Zod
- ✅ Efficient form handling with React Hook Form

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Roadmap

### Phase 1 (Current) ✅
- YouTube URL input and validation
- Transcript extraction
- Download as TXT/Markdown
- Search functionality
- Docker support
- CI/CD pipeline

### Phase 2 (Planned)
- AI-powered summaries
- Blog post generation
- Social media thread creation (X, LinkedIn, Reddit)
- Transcript caching
- User authentication
- Multiple language support

### Phase 3 (Future)
- Video metadata display
- Timestamp extraction
- PDF/DOCX export
- Rate limiting
- Advanced search filters

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Troubleshooting

### Issue: "Failed to fetch transcript"

**Solution**: Ensure the YouTube URL is valid and the video has accessible transcripts. Some videos may not have transcripts available.

### Issue: Python script not found in Docker

**Solution**: Ensure `transcript_fetcher.py` is in the root directory when building the Docker image.

### Issue: "Cannot find module 'next'"

**Solution**: Run `npm install` to ensure all dependencies are installed.

### Issue: Port 3000 already in use

**Solution**: Use a different port:
```bash
PORT=3001 npm run dev
```

Or kill the process using port 3000:
```bash
# Linux/Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## API Documentation

### POST /api/transcript

Extract transcript from a YouTube URL.

**Query Parameters**: None

**Request Body**:
```typescript
{
  url: string  // Valid YouTube URL
}
```

**Response (200 OK)**:
```typescript
{
  title: string        // Video title
  transcript: string   // Full transcript text
  language: string     // Language code (e.g., 'en')
}
```

**Error Response (400 Bad Request)**:
```typescript
{
  error: string        // Error message
  details?: any        // Detailed error information
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) - Original Python library
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video downloading
- [OpenAI Whisper](https://github.com/openai/whisper) - Speech-to-text fallback
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI component patterns

## Support

For issues, questions, or suggestions, please open an [GitHub Issue](https://github.com/KasabuNikhilGoud/Yt-Transcript-automate/issues).

---

**Built with ❤️ for creators, researchers, and developers**

**Last Updated**: June 2026
