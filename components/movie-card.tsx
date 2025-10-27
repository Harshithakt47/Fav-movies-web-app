"use client"

import type { MovieShow } from "@/types/movie"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import EditMovieModal from "./edit-movie-modal"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import Image from "next/image"

interface MovieCardProps {
  movie: MovieShow
  onUpdate: () => void
}

export default function MovieCard({ movie, onUpdate }: MovieCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div className="group relative rounded-lg overflow-hidden border border-border/40 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
          {movie.posterUrl && !imageError ? (
            <Image
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-xs text-muted-foreground">No poster</p>
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div />
          <div className="space-y-2">
            <h3 className="font-semibold text-white line-clamp-2 text-sm">{movie.title}</h3>
            <p className="text-xs text-gray-200">{movie.director}</p>
            <p className="text-xs text-gray-300">{movie.type}</p>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditOpen(true)}
                className="gap-1 flex-1 h-8 text-xs"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteOpen(true)}
                className="gap-1 flex-1 h-8 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EditMovieModal
        movie={movie}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={() => {
          setIsEditOpen(false)
          onUpdate()
        }}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false)
          onUpdate()
        }}
        movieId={movie.id}
        movieTitle={movie.title}
      />
    </>
  )
}
