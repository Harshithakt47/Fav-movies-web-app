# Favorite Movies & TV Shows Web Application

A modern, fully responsive web application for managing your favorite movies and TV shows with infinite scroll, CRUD operations, and a beautiful UI.

## Features

- ✅ Add new movies and TV shows with detailed information
- ✅ View all entries in a responsive table with infinite scroll
- ✅ Edit existing entries with a modal form
- ✅ Delete entries with confirmation dialog
- ✅ Pagination support for efficient data loading
- ✅ Input validation on both frontend and backend
- ✅ Beautiful, modern UI with Tailwind CSS
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Type-safe with TypeScript
- ✅ Production-ready and deployable to Vercel

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Project Structure

\`\`\`
├── app/                          # Next.js app directory
│   ├── api/                      # API route handlers
│   │   └── movies/              # Movie endpoints (fully self-contained)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components
│   ├── header.tsx               # Header component
│   ├── movie-table.tsx          # Table with infinite scroll
│   ├── movie-row.tsx            # Table row component
│   ├── movie-form.tsx           # Add/Edit form
│   ├── add-movie-modal.tsx      # Add modal
│   ├── edit-movie-modal.tsx     # Edit modal
│   └── delete-confirm-dialog.tsx # Delete confirmation
├── types/                        # TypeScript types
│   └── movie.ts                 # Movie interface
├── public/                       # Static assets
└── scripts/                      # Utility scripts
\`\`\`

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd favorite-movies-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

This app is production-ready and can be deployed to Vercel with zero configuration:

### Option 1: Using Vercel CLI
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

Your app will be live in seconds!

## Features

### Core Functionality
- **Add Movies/Shows**: Create new entries with title, type, director, budget, location, duration, year, poster URL, and description
- **View Entries**: Browse all entries in a responsive table with infinite scroll
- **Edit Entries**: Update any entry with a modal form
- **Delete Entries**: Remove entries with a confirmation dialog
- **Pagination**: Efficient data loading with infinite scroll

### User Experience
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Beautiful gradient backgrounds, smooth transitions, and intuitive interactions
- **Error Handling**: Clear error messages and loading states
- **Form Validation**: Real-time validation with helpful error messages
- **Empty State**: Friendly message when no entries exist

## API Endpoints

All endpoints are self-contained within the Next.js app:

### Get All Movies/Shows
\`\`\`
GET /api/movies?page=1&limit=10
\`\`\`

Response:
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
\`\`\`

### Get Single Movie/Show
\`\`\`
GET /api/movies/:id
\`\`\`

### Create Movie/Show
\`\`\`
POST /api/movies
Content-Type: application/json

{
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": "$160M",
  "location": "LA, Paris",
  "duration": "148 min",
  "year": "2010",
  "posterUrl": "...",
  "description": "..."
}
\`\`\`

### Update Movie/Show
\`\`\`
PUT /api/movies/:id
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
\`\`\`

### Delete Movie/Show
\`\`\`
DELETE /api/movies/:id
\`\`\`

## Sample Data

The app comes pre-populated with sample movies to demonstrate functionality:
- The Shawshank Redemption (Movie)
- The Dark Knight (Movie)

## Development

### Running the Development Server
\`\`\`bash
npm run dev
\`\`\`

### Building for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Linting
\`\`\`bash
npm run lint
\`\`\`

## Production Notes

- **Data Storage**: Currently uses in-memory storage (resets on server restart)
- **For Persistent Data**: Connect to a database by updating the API routes in `/app/api/movies/`
- **Recommended Databases**: Supabase, Neon, PlanetScale, or any PostgreSQL/MySQL provider
- **Environment Variables**: No environment variables required for basic deployment

## Troubleshooting

### App won't start
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Check for port conflicts on port 3000

### Infinite scroll not working
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

### Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the development server
- Ensure Tailwind CSS is properly installed

## Future Enhancements

- Database integration for persistent storage
- User authentication
- Search and filtering
- Sorting options
- Image upload functionality
- Dark mode toggle
- Export to CSV/JSON

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact support.
