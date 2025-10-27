"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import MovieTable from "@/components/movie-table"
import MovieGallery from "@/components/movie-gallery"
import AddMovieModal from "@/components/add-movie-modal"
import ViewToggle from "@/components/view-toggle"
import CompactEditTable from "@/components/compact-edit-table"
import { getUser } from "@/lib/auth"

export default function Home() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [viewMode, setViewMode] = useState<"table" | "gallery">("gallery")
  const [editMode, setEditMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.push("/auth")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleAddMovie = () => {
    setRefreshTrigger((prev) => prev + 1)
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header onAddClick={() => setIsModalOpen(true)} editMode={editMode} onEditModeChange={setEditMode} />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {!editMode && (
          <div className="flex justify-end mb-6">
            <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {editMode ? (
          <CompactEditTable refreshTrigger={refreshTrigger} />
        ) : viewMode === "table" ? (
          <MovieTable refreshTrigger={refreshTrigger} />
        ) : (
          <MovieGallery refreshTrigger={refreshTrigger} />
        )}
      </div>
      <AddMovieModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleAddMovie} />
    </main>
  )
}
