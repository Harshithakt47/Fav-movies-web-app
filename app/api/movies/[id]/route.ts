import { type NextRequest, NextResponse } from "next/server"

// This would be imported from a shared store in a real app
let movies: any[] = []

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Fetch all movies first to get the current state
    const response = await fetch(`${request.nextUrl.origin}/api/movies`)
    const data = await response.json()
    movies = data.data

    const movie = movies.find((m) => m.id === id)

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error("[v0] Error fetching movie:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Fetch all movies first
    const response = await fetch(`${request.nextUrl.origin}/api/movies`)
    const data = await response.json()
    movies = data.data

    const movieIndex = movies.findIndex((m) => m.id === id)

    if (movieIndex === -1) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(movies[movieIndex])
  } catch (error) {
    console.error("[v0] Error updating movie:", error)
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Fetch all movies first
    const response = await fetch(`${request.nextUrl.origin}/api/movies`)
    const data = await response.json()
    movies = data.data

    const movieIndex = movies.findIndex((m) => m.id === id)

    if (movieIndex === -1) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    movies.splice(movieIndex, 1)

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting movie:", error)
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 })
  }
}
