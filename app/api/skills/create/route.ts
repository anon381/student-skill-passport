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

    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Only students can create skill requests" }, { status: 403 })
    }

    const { skillName, category, description, evidence, issuer, issuedBy, issuedByEmail } = await request.json()

    // Validate input
    if (!skillName || !category || !description || !issuer || !issuedBy || !issuedByEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create skill
    const skill = storage.createSkill({
      id: `skill_${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      studentProgram: user.program || "Unknown",
      skillName,
      category,
      description,
      evidence: evidence || "",
      issuer,
      issuedBy,
      issuedByEmail,
      status: "pending",
      dateRequested: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, skill })
  } catch (error) {
    console.error("[v0] Create skill error:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
