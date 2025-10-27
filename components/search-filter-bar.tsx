"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilterType: (type: string) => void
  onFilterYear: (year: string) => void
  onReset: () => void
}

export default function SearchFilterBar({ onSearch, onFilterType, onFilterYear, onReset }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [isActive, setIsActive] = useState(false)

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value)
      onSearch(value)
    },
    [onSearch],
  )

  const handleTypeChange = useCallback(
    (value: string) => {
      setSelectedType(value)
      onFilterType(value)
    },
    [onFilterType],
  )

  const handleYearChange = useCallback(
    (value: string) => {
      setSelectedYear(value)
      onFilterYear(value)
    },
    [onFilterYear],
  )

  const handleReset = useCallback(() => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedYear("all")
    setIsActive(false)
    onReset()
  }, [onReset])

  const hasActiveFilters = searchQuery || selectedType !== "all" || selectedYear !== "all"

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, director, or description..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
        </div>

        <Button variant="outline" size="sm" onClick={() => setIsActive(!isActive)} className="gap-2 sm:hidden">
          {isActive ? "Hide" : "Show"} Filters
        </Button>
      </div>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-3 transition-all duration-300 ${isActive ? "block sm:grid" : "hidden sm:grid"}`}
      >
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="TV Show">TV Show</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2010s">2010s</SelectItem>
            <SelectItem value="2000s">2000s</SelectItem>
            <SelectItem value="1990s">1990s</SelectItem>
            <SelectItem value="older">Before 1990</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2 col-span-2 sm:col-span-1 bg-transparent"
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="text-xs text-muted-foreground">
          Filters active: {searchQuery && `"${searchQuery}"`}
          {selectedType !== "all" && ` • ${selectedType}`}
          {selectedYear !== "all" && ` • ${selectedYear}`}
        </div>
      )}
    </div>
  )
}
