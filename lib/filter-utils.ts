import type { MovieShow } from "@/types/movie"

export function filterMovies(
  movies: MovieShow[],
  searchQuery: string,
  filterType: string,
  filterYear: string,
): MovieShow[] {
  return movies.filter((movie) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        (movie.description?.toLowerCase().includes(query) ?? false)

      if (!matchesSearch) return false
    }

    // Type filter
    if (filterType !== "all" && movie.type !== filterType) {
      return false
    }

    // Year filter
    if (filterYear !== "all" && movie.yearTime) {
      const year = movie.yearTime.trim()
      const movieYear = Number.parseInt(year, 10)

      if (filterYear === "2024" && year !== "2024") return false
      if (filterYear === "2023" && year !== "2023") return false
      if (filterYear === "2022" && year !== "2022") return false
      if (filterYear === "2021" && year !== "2021") return false
      if (filterYear === "2020" && year !== "2020") return false
      if (filterYear === "2010s" && (movieYear < 2010 || movieYear >= 2020)) return false
      if (filterYear === "2000s" && (movieYear < 2000 || movieYear >= 2010)) return false
      if (filterYear === "1990s" && (movieYear < 1990 || movieYear >= 2000)) return false
      if (filterYear === "older" && movieYear >= 1990) return false
    }

    return true
  })
}
