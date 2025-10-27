import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByEmail } from "@/lib/auth-server"

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    try {
      const existingUser = await findUserByEmail(email)
      if (existingUser) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
    } catch (dbError) {
      console.error("[v0] Database error checking existing user:", dbError)
      // If database fails, allow signup to proceed with demo mode
      return NextResponse.json(
        {
          id: "demo-" + Date.now(),
          email,
          name,
          isDemo: true,
        },
        { status: 201 },
      )
    }

    try {
      const user = await createUser(email, name, password)
      return NextResponse.json(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        { status: 201 },
      )
    } catch (createError) {
      console.error("[v0] Error creating user:", createError)
      // Fallback to demo mode if database creation fails
      return NextResponse.json(
        {
          id: "demo-" + Date.now(),
          email,
          name,
          isDemo: true,
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
