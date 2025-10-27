import express from "express"
import cors from "cors"
import movieRoutes from "./routes/movies"

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/movies", movieRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
