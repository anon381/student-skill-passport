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

    if (!user || user.role !== "lecturer") {
      return NextResponse.json({ error: "Only lecturers can view pending skills" }, { status: 403 })
    }

    // Get pending skills
    const skills = storage.getPendingSkills()

    return NextResponse.json({ skills })
  } catch (error) {
    console.error("[v0] Get pending skills error:", error)
    return NextResponse.json({ error: "Failed to get pending skills" }, { status: 500 })
  }
}
