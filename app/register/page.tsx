"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, BookOpen, Briefcase, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleFromQuery = searchParams.get("role")
  const initialRole =
    roleFromQuery === "student" || roleFromQuery === "lecturer" || roleFromQuery === "employer"
      ? roleFromQuery
      : null

  const [role, setRole] = useState<"student" | "lecturer" | "employer" | null>(() => initialRole)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    program: "",
    department: "",
    company: "",
    github: "",
    linkedin: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (role === "lecturer" && !formData.linkedin.trim()) {
      setError("LinkedIn is required for lecturers")
      return
    }

    setLoading(true)

    try {
      const payload: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role!,
        github: formData.github,
        linkedin: formData.linkedin,
      }

      if (role === "student") payload.program = formData.program
      if (role === "lecturer") payload.department = formData.department
      if (role === "employer") payload.company = formData.company

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        setLoading(false)
        return
      }

      // Redirect based on role (use replace to ensure fresh load with new cookies)
      if (role === "student") {
        router.replace("/student")
      } else if (role === "lecturer") {
        router.replace("/lecturer")
      } else if (role === "employer") {
        router.replace("/employer")
      }
      router.refresh()
    } catch (err) {
      console.error("[v0] Registration error:", err)
      setError("An error occurred during registration")
      setLoading(false)
    }
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-4xl font-bold mb-2 text-balance">Create Your Account</h1>
            <p className="text-muted-foreground text-lg">Choose your role to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
              onClick={() => setRole("student")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Student</CardTitle>
                <CardDescription>Build your skill passport and showcase verified achievements</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
              onClick={() => setRole("lecturer")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lecturer</CardTitle>
                <CardDescription>Verify student skills and support their career readiness</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
              onClick={() => setRole("employer")}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Employer</CardTitle>
                <CardDescription>Find the right talent based on verified practical skills</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const roleConfig = {
    student: {
      title: "Student Registration",
      description: "Start building your skill passport",
      icon: GraduationCap,
      extraField: { name: "program", label: "Program/Major", placeholder: "e.g., Computer Science" },
    },
    lecturer: {
      title: "Lecturer Registration",
      description: "Join as a skill verifier",
      icon: BookOpen,
      extraField: { name: "department", label: "Department", placeholder: "e.g., Engineering" },
    },
    employer: {
      title: "Employer Registration",
      description: "Find verified talent",
      icon: Briefcase,
      extraField: { name: "company", label: "Company Name", placeholder: "e.g., Tech Corp Inc." },
    },
  }

  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setRole(null)} className="w-fit -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change role
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={config.extraField.name}>{config.extraField.label}</Label>
              <Input
                id={config.extraField.name}
                type="text"
                placeholder={config.extraField.placeholder}
                value={formData[config.extraField.name as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [config.extraField.name]: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username (optional)</Label>
              <Input
                id="github"
                type="text"
                placeholder="e.g., linamakes"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL {role === "lecturer" ? "(required)" : "(optional)"}</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://www.linkedin.com/in/your-profile"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                required={role === "lecturer"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href={role ? `/login?role=${role}` : "/login"} className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
