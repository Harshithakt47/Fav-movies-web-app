"use client"

import { Button } from "@/components/ui/button"
import { Plus, Film, LogOut, Edit2 } from "lucide-react"
import { getUser, clearUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface HeaderProps {
  onAddClick: () => void
  editMode: boolean
  onEditModeChange: (mode: boolean) => void
}

export default function Header({ onAddClick, editMode, onEditModeChange }: HeaderProps) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const currentUser = getUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    clearUser()
    router.push("/auth")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-gradient-to-r from-primary/5 via-background to-accent/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Favorites
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {user ? `Welcome, ${user.name}` : "Manage your favorite movies and TV shows"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={() => onEditModeChange(!editMode)}
              variant={editMode ? "default" : "outline"}
              className="gap-2 flex-1 sm:flex-none"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">{editMode ? "Exit Edit" : "Edit Mode"}</span>
              <span className="sm:hidden">{editMode ? "Exit" : "Edit"}</span>
            </Button>
            <Button
              onClick={onAddClick}
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Entry</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="gap-2 hidden sm:flex bg-transparent">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
