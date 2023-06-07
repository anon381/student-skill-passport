import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users } from "@/lib/storage"

// In-memory storage (replace with database in production)
// const users: Record<
//   string,
//   {
//     id: string
//     email: string
//     password: string
//     name: string
//     role: "student" | "lecturer" | "employer"
//     program?: string
//     department?: string
//     company?: string
//   }
// > = {}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, program, department, company, github, linkedin } = await request.json()

    // Validate input
    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (role === "lecturer" && !linkedin) {
      return NextResponse.json({ error: "LinkedIn is required for lecturers" }, { status: 400 })
    }

    // Check if user already exists
    if (users[email]) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create user
    const userId = `user_${Date.now()}`
    users[email] = {
      id: userId,
      email,
      password, // In production, hash this with bcrypt
      name,
      role,
      program,
      department,
      company,
      github,
      linkedin,
    }

    console.log("[v0] User registered:", email, "Role:", role)

    // Create session
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify({ userId, email, role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        name,
        role,
        program,
        department,
        company,
        github,
        linkedin,
      },
    })
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
