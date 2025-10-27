"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import type { MovieShow } from "@/types/movie"
import MovieRow from "./movie-row"
import SearchFilterBar from "./search-filter-bar"
import { Loader2, Film } from "lucide-react"
import { filterMovies } from "@/lib/filter-utils"

interface CompactEditTableProps {
  refreshTrigger: number
}

export default function CompactEditTable({ refreshTrigger }: CompactEditTableProps) {
  const [allMovies, setAllMovies] = useState<MovieShow[]>([])
  const [filteredMovies, setFilteredMovies] = useState<MovieShow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = filterMovies(allMovies, searchQuery, filterType, filterYear)
    setFilteredMovies(filtered)
  }, [allMovies, searchQuery, filterType, filterYear])

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/movies?page=${page}&limit=10`)
      if (!response.ok) throw new Error("Failed to fetch movies")

      const data = await response.json()

      if (page === 1) {
        setAllMovies(data.data)
      } else {
        setAllMovies((prev) => [...prev, ...data.data])
      }

      setHasMore(page < data.pagination.pages)
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load movies:", error)
      setError("Failed to load movies. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [page, isLoading, hasMore])

  useEffect(() => {
    setAllMovies([])
    setFilteredMovies([])
    setPage(1)
    setHasMore(true)
    setError(null)
    setSearchQuery("")
    setFilterType("all")
    setFilterYear("all")
  }, [refreshTrigger])

  useEffect(() => {
    if (allMovies.length === 0 && page === 1) {
      loadMore()
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [loadMore, hasMore, isLoading])

  return (
    <div className="w-full space-y-4 px-2 sm:px-4 md:px-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-blue-800 font-medium">Edit Mode: Compact view for quick edits</p>
      </div>

      <div className="w-full overflow-x-auto">
        <SearchFilterBar
          onSearch={setSearchQuery}
          onFilterType={setFilterType}
          onFilterYear={setFilterYear}
          onReset={() => {
            setSearchQuery("")
            setFilterType("all")
            setFilterYear("all")
          }}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 sm:p-4 text-destructive text-xs sm:text-sm font-medium">
          {error}
        </div>
      )}

      {filteredMovies.length > 0 && (
        <div className="text-xs sm:text-sm text-muted-foreground px-2">
          Showing {filteredMovies.length} of {allMovies.length} movies
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-border/40 bg-card shadow-sm">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left font-semibold text-foreground whitespace-nowrap">
                Title
              </th>
              <th className="hidden sm:table-cell px-2 sm:px-3 py-2 sm:py-3 text-left font-semibold text-foreground whitespace-nowrap">
                Type
              </th>
              <th className="hidden md:table-cell px-2 sm:px-3 py-2 sm:py-3 text-left font-semibold text-foreground whitespace-nowrap">
                Director
              </th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left font-semibold text-foreground whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                <td className="px-2 sm:px-3 py-2 sm:py-3 font-medium text-foreground truncate text-xs sm:text-sm">
                  {movie.title}
                </td>
                <td className="hidden sm:table-cell px-2 sm:px-3 py-2 sm:py-3 text-muted-foreground text-xs truncate">
                  {movie.type}
                </td>
                <td className="hidden md:table-cell px-2 sm:px-3 py-2 sm:py-3 text-muted-foreground text-xs truncate">
                  {movie.director}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3">
                  <MovieRow movie={movie} onUpdate={() => setPage(1)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredMovies.length === 0 && !isLoading && !error && (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4">
            <Film className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-lg">
            {allMovies.length === 0
              ? "No movies or shows yet. Add one to get started!"
              : "No movies match your filters."}
          </p>
        </div>
      )}

      <div ref={observerTarget} className="flex justify-center py-6 sm:py-8">
        {isLoading && <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 animate-spin text-primary" />}
      </div>
    </div>
  )
}
