export interface MovieShow {
  id: number
  title: string
  type: "Movie" | "TV Show"
  director: string
  budget?: string | null
  location?: string | null
  duration?: string | null
  yearTime?: string | null
  posterUrl?: string | null
  description?: string | null
  createdAt: string
  updatedAt: string
}
