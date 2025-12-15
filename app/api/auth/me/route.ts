import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users } from "@/lib/storage"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const user = users[session.email]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("[v0] User authenticated:", user.email, "Role:", user.role)

    return NextResponse.json({
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
    console.error("[v0] Get user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
