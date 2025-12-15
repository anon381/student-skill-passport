"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Award, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const isStudent = pathname?.startsWith("/student")
  const isLecturer = pathname?.startsWith("/lecturer")
  const isEmployer = pathname?.startsWith("/employer")

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Award className="h-6 w-6" />
          <span>Skill Passport</span>
        </Link>

        <div className="flex items-center gap-4">
          {(!isStudent && !isLecturer && !isEmployer) || isStudent ? (
            <Link href="/student">
              <Button variant={pathname?.startsWith("/student") ? "default" : "ghost"} size="sm">
                Student
              </Button>
            </Link>
          ) : null}

          {(!isStudent && !isLecturer && !isEmployer) || isLecturer ? (
            <Link href="/lecturer">
              <Button variant={pathname?.startsWith("/lecturer") ? "default" : "ghost"} size="sm">
                Lecturer
              </Button>
            </Link>
          ) : null}

          {(!isStudent && !isLecturer && !isEmployer) || isEmployer ? (
            <Link href="/employer">
              <Button variant={pathname?.startsWith("/employer") ? "default" : "ghost"} size="sm">
                Employer
              </Button>
            </Link>
          ) : null}

          <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
