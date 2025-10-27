import express, { type Request, type Response } from "express"
import { prisma } from "../lib/db"
import { movieShowSchema } from "../lib/validation"
import { z } from "zod"

const router = express.Router()

// Get all movies/shows with pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      prisma.movieShow.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.movieShow.count(),
    ])

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" })
  }
})

// Get single movie/show
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const movie = await prisma.movieShow.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" })
    }

    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" })
  }
})

// Create new movie/show
router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = movieShowSchema.parse(req.body)

    const movie = await prisma.movieShow.create({
      data: validatedData,
    })

    res.status(201).json(movie)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors })
    }
    res.status(500).json({ error: "Failed to create movie" })
  }
})

// Update movie/show
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const validatedData = movieShowSchema.parse(req.body)

    const movie = await prisma.movieShow.update({
      where: { id: Number.parseInt(id) },
      data: validatedData,
    })

    res.json(movie)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors })
    }
    res.status(500).json({ error: "Failed to update movie" })
  }
})

// Delete movie/show
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prisma.movieShow.delete({
      where: { id: Number.parseInt(id) },
    })

    res.json({ message: "Movie deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie" })
  }
})

export default router
