"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import type { MovieShow } from "@/types/movie"
import MovieRow from "./movie-row"
import SearchFilterBar from "./search-filter-bar"
import { Loader2, Film } from "lucide-react"
import { filterMovies } from "@/lib/filter-utils"

interface MovieTableProps {
  refreshTrigger: number
}

export default function MovieTable({ refreshTrigger }: MovieTableProps) {
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
    <div className="space-y-6">
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

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      {filteredMovies.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredMovies.length} of {allMovies.length} movies
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border/40 bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-foreground">Title</th>
              <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">
                Director
              </th>
              <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">Budget</th>
              <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">
                Location
              </th>
              <th className="hidden xl:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">
                Duration
              </th>
              <th className="hidden xl:table-cell px-6 py-4 text-left text-sm font-semibold text-foreground">Year</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <MovieRow key={movie.id} movie={movie} onUpdate={() => setPage(1)} />
            ))}
          </tbody>
        </table>
      </div>

      {filteredMovies.length === 0 && !isLoading && !error && (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Film className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            {allMovies.length === 0
              ? "No movies or shows yet. Add one to get started!"
              : "No movies match your filters."}
          </p>
        </div>
      )}

      <div ref={observerTarget} className="flex justify-center py-8">
        {isLoading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
      </div>
    </div>
  )
}
