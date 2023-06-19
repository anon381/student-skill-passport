import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { storage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const user = storage.getUserByEmail(session.email)

    if (!user || user.role !== "employer") {
      return NextResponse.json({ error: "Only employers can search skills" }, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")?.toLowerCase() || ""

    // Get all approved skills
    let skills = storage.getAllApprovedSkills()

    // Filter by search query
    if (query) {
      skills = skills.filter(
        (skill) =>
          skill.studentName.toLowerCase().includes(query) ||
          skill.studentProgram.toLowerCase().includes(query) ||
          skill.skillName.toLowerCase().includes(query) ||
          skill.category.toLowerCase().includes(query),
      )
    }

    // Group skills by student
    const studentMap = new Map<
      string,
      {
        id: string
        name: string
        email: string
        program: string
        skills: typeof skills
      }
    >()

    skills.forEach((skill) => {
      if (!studentMap.has(skill.studentId)) {
        studentMap.set(skill.studentId, {
          id: skill.studentId,
          name: skill.studentName,
          email: skill.studentEmail,
          program: skill.studentProgram,
          skills: [],
        })
      }
      studentMap.get(skill.studentId)!.skills.push(skill)
    })

    const students = Array.from(studentMap.values())

    return NextResponse.json({ students })
  } catch (error) {
    console.error("[v0] Search skills error:", error)
    return NextResponse.json({ error: "Failed to search skills" }, { status: 500 })
  }
}
