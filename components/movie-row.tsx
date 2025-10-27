"use client"

import type { MovieShow } from "@/types/movie"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import EditMovieModal from "./edit-movie-modal"
import DeleteConfirmDialog from "./delete-confirm-dialog"

interface MovieRowProps {
  movie: MovieShow
  onUpdate: () => void
}

export default function MovieRow({ movie, onUpdate }: MovieRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <tr className="border-b border-border/40 hover:bg-primary/5 transition-smooth">
        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-foreground">
          <span className="line-clamp-2">{movie.title}</span>
        </td>
        <td className="hidden sm:table-cell px-6 py-4 text-sm text-foreground">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20">
            {movie.type}
          </span>
        </td>
        <td className="hidden md:table-cell px-6 py-4 text-sm text-foreground">
          <span className="line-clamp-1">{movie.director}</span>
        </td>
        <td className="hidden lg:table-cell px-6 py-4 text-sm text-muted-foreground">{movie.budget || "-"}</td>
        <td className="hidden lg:table-cell px-6 py-4 text-sm text-muted-foreground">
          <span className="line-clamp-1">{movie.location || "-"}</span>
        </td>
        <td className="hidden xl:table-cell px-6 py-4 text-sm text-muted-foreground">{movie.duration || "-"}</td>
        <td className="hidden xl:table-cell px-6 py-4 text-sm text-muted-foreground">{movie.yearTime || "-"}</td>
        <td className="px-4 sm:px-6 py-4 text-sm">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="gap-1 hover:bg-primary/10 hover:text-primary transition-smooth"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(true)}
              className="gap-1 text-destructive hover:bg-destructive/10 transition-smooth"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </td>
      </tr>

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
