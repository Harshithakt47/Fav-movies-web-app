"use client"

import type { MovieShow } from "@/types/movie"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MovieForm from "./movie-form"

interface EditMovieModalProps {
  movie: MovieShow
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function EditMovieModal({ movie, isOpen, onClose, onSuccess }: EditMovieModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Entry</DialogTitle>
          <DialogDescription>Update the details of this movie or TV show</DialogDescription>
        </DialogHeader>
        <MovieForm initialData={movie} onSuccess={onSuccess} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}
