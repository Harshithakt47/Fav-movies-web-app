"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

interface ViewToggleProps {
  currentView: "table" | "gallery"
  onViewChange: (view: "table" | "gallery") => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 bg-card border border-border/40 rounded-lg p-1 w-fit">
      <Button
        variant={currentView === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className="gap-2"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
      <Button
        variant={currentView === "gallery" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("gallery")}
        className="gap-2"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Gallery</span>
      </Button>
    </div>
  )
}
