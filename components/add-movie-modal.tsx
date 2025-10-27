"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MovieForm from "./movie-form"
import { Film } from "lucide-react"

interface AddMovieModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddMovieModal({ isOpen, onClose, onSuccess }: AddMovieModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Add New Entry</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Add a new movie or TV show to your favorites collection
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <MovieForm onSuccess={onSuccess} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}
