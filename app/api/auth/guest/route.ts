import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const guestId = "guest-" + Date.now()
    return NextResponse.json({
      id: guestId,
      email: `guest-${guestId}@demo.local`,
      name: "Guest User",
      isGuest: true,
    })
  } catch (error) {
    console.error("[v0] Guest login error:", error)
    return NextResponse.json({ error: "Guest login failed" }, { status: 500 })
  }
}
