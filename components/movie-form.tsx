"use client"

import type React from "react"

import { useState } from "react"
import type { MovieShow } from "@/types/movie"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

interface MovieFormProps {
  initialData?: MovieShow
  onSuccess: () => void
  onCancel: () => void
}

export default function MovieForm({ initialData, onSuccess, onCancel }: MovieFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    type: initialData?.type || "Movie",
    director: initialData?.director || "",
    budget: initialData?.budget || "",
    location: initialData?.location || "",
    duration: initialData?.duration || "",
    yearTime: initialData?.yearTime || "",
    posterUrl: initialData?.posterUrl || "",
    description: initialData?.description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.director.trim()) {
      setError("Title and Director are required fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const url = initialData ? `/api/movies/${initialData.id}` : "/api/movies"
      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save")

      onSuccess()
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to save. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter movie or show title"
            required
            className="h-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-semibold">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger id="type" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Movie">Movie</SelectItem>
                <SelectItem value="TV Show">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="director" className="text-base font-semibold">
              Director <span className="text-destructive">*</span>
            </Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              placeholder="Director name"
              required
              className="h-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-border/40">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearTime" className="text-sm">
              Year/Time
            </Label>
            <Input
              id="yearTime"
              value={formData.yearTime}
              onChange={(e) => setFormData({ ...formData, yearTime: e.target.value })}
              placeholder="e.g., 2024"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm">
              Duration
            </Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 148 min"
              className="h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm">
              Budget
            </Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g., $160M"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., LA, Paris"
              className="h-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-border/40">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Poster & Description</h3>

        <div className="space-y-2">
          <Label htmlFor="posterUrl" className="text-sm">
            Poster URL
          </Label>
          <Input
            id="posterUrl"
            type="url"
            value={formData.posterUrl}
            onChange={(e) => {
              setFormData({ ...formData, posterUrl: e.target.value })
              setImageError(false)
            }}
            placeholder="https://example.com/poster.jpg"
            className="h-10"
          />
          {formData.posterUrl && !imageError && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border/40 bg-muted shadow-sm">
              <Image
                src={formData.posterUrl || "/placeholder.svg"}
                alt="Poster preview"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          {imageError && formData.posterUrl && (
            <div className="text-xs text-destructive flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Failed to load image. Check the URL and try again.</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter a brief description of the movie or show"
            rows={3}
            className="resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-border/40">
        <Button type="button" variant="outline" onClick={onCancel} className="px-6 bg-transparent">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="px-6 gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update" : "Add"} Entry
        </Button>
      </div>
    </form>
  )
}
