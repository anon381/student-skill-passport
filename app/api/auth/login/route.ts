import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users[email]
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("[v0] User logged in:", email, "Role:", user.role)

    // Create session
    const cookieStore = await cookies()
    cookieStore.set(
      "session",
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      },
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        program: user.program,
        department: user.department,
        company: user.company,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
