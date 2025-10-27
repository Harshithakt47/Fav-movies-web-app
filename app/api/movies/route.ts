import { type NextRequest, NextResponse } from "next/server"

// In production, you can replace this with a real database connection

// Mock data for demonstration
const mockMovies = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    type: "Movie",
    director: "Frank Darabont",
    budget: "$25 million",
    location: "Ohio, USA",
    duration: "142 minutes",
    year: "1994",
    posterUrl: "/shawshank-redemption.jpg",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Dark Knight",
    type: "Movie",
    director: "Christopher Nolan",
    budget: "$185 million",
    location: "Chicago, USA",
    duration: "152 minutes",
    year: "2008",
    posterUrl: "/dark-knight.jpg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Store movies in memory (will reset on server restart)
const movies = [...mockMovies]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedMovies = movies.slice(startIndex, endIndex)
    const totalPages = Math.ceil(movies.length / limit)

    return NextResponse.json({
      data: paginatedMovies,
      pagination: {
        page,
        limit,
        total: movies.length,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newMovie = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    movies.push(newMovie)
    return NextResponse.json(newMovie, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating movie:", error)
    return NextResponse.json({ error: "Failed to create movie" }, { status: 500 })
  }
}
