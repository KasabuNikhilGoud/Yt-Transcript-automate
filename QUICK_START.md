# Quick Start Guide

## For Developers

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for transcript extraction)
- Git

### 5-Minute Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/KasabuNikhilGoud/Yt-Transcript-automate.git
   cd Yt-Transcript-automate
   npm install
   pip install -r requirements.txt
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Try It Out**
   - Paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
   - Click "Extract"
   - View, search, and download the transcript

## For DevOps/Deployment

### Docker Setup (1 minute)

```bash
docker-compose up -d
```

Access at `http://localhost:3000`

### View Logs
```bash
docker-compose logs -f app
```

### Stop Container
```bash
docker-compose down
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run linter
npm run type-check      # Type check TypeScript

# Docker
docker-compose up       # Start services
docker-compose down     # Stop services
docker-compose logs -f  # View logs

# Git
git log --oneline       # View commits
git status              # Check changes
git push origin main    # Push to remote
```

## What's Included

✅ **Frontend**
- Next.js 15 with App Router
- TypeScript + Tailwind CSS
- Responsive design
- React Hook Form + Zod validation

✅ **Backend**
- REST API (`POST /api/transcript`)
- Type-safe validation
- Error handling

✅ **Deployment**
- Docker support
- GitHub Actions CI/CD
- Production-optimized build

✅ **Documentation**
- README.md - Full documentation
- PROJECT_SUMMARY.md - Project overview
- NEW_README.md - Comprehensive guide

## API Quick Reference

### Extract Transcript
```bash
curl -X POST http://localhost:3000/api/transcript \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

**Response:**
```json
{
  "title": "Video Title",
  "transcript": "Full transcript...",
  "language": "en"
}
```

## Features

✨ **Extract Transcripts**
- Supports youtube.com, youtu.be, shorts, live URLs
- Real-time URL validation
- Error handling with fallbacks

📋 **Download Options**
- TXT format
- Markdown format

🔍 **Search & Manage**
- Search within transcripts
- Copy to clipboard
- View metadata (video ID, language)

## Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm run dev
```

### Python Script Not Found
Ensure `transcript_fetcher.py` is in the root directory.

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run type-check
```

## Next Steps

### For Development
1. Review `/app` folder structure
2. Check `/components` for reusable components
3. See `/lib` for utilities and schemas
4. Read `NEW_README.md` for detailed docs

### For Deployment
1. Review `Dockerfile` configuration
2. Check `docker-compose.yml` setup
3. Review `.github/workflows/ci.yml` for CI/CD
4. Deploy using Docker or Vercel

### For Adding Features
1. Check `PROJECT_SUMMARY.md` for roadmap
2. Add components to `/components`
3. Create API routes in `/app/api`
4. Update documentation

## Project Structure
```
yt-transcript-automate/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/              # Utilities and schemas
├── public/           # Static files
├── Dockerfile        # Docker image definition
├── docker-compose.yml # Docker services
├── .github/          # GitHub Actions workflows
├── package.json      # Dependencies
└── README files      # Documentation
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Docker Documentation](https://docs.docker.com/)

## Support

For issues or questions:
1. Check `NEW_README.md` troubleshooting section
2. Review GitHub issues
3. Check console logs: `npm run dev` shows errors in terminal
4. Open a new issue on GitHub

## License

MIT License - See LICENSE file for details

---

**Ready to contribute?** See `CONTRIBUTING.md` for guidelines.
