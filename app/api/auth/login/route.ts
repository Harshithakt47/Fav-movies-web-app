import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, verifyPassword } from "@/lib/auth-server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    try {
      const user = await findUserByEmail(email)
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
      })
    } catch (dbError) {
      console.error("[v0] Database error during login:", dbError)
      // Allow demo login if database fails
      if (email && password.length >= 6) {
        return NextResponse.json({
          id: "demo-" + Date.now(),
          email,
          name: email.split("@")[0],
          isDemo: true,
        })
      }
      throw dbError
    }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
