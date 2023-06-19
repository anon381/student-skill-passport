import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ error: "Only lecturers can reject skills" }, { status: 403 })
    }

    const { skillId, reason } = await request.json()

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 })
    }

    // Update skill status
    const skill = storage.updateSkill(skillId, {
      status: "rejected",
      dateVerified: new Date().toISOString(),
      rejectionReason: reason || "No reason provided",
    })

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, skill })
  } catch (error) {
    console.error("[v0] Reject skill error:", error)
    return NextResponse.json({ error: "Failed to reject skill" }, { status: 500 })
  }
}
