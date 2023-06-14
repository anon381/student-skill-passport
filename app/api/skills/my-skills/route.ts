import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { storage } from "@/lib/storage"

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const user = storage.getUserByEmail(session.email)

    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Only students can view their skills" }, { status: 403 })
    }

    // Get student's skills
    const skills = storage.getSkillsByStudentId(user.id)

    return NextResponse.json({ skills })
  } catch (error) {
    console.error("[v0] Get skills error:", error)
    return NextResponse.json({ error: "Failed to get skills" }, { status: 500 })
  }
}
