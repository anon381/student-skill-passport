"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, BookOpen, Briefcase, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<"student" | "lecturer" | "employer" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }

      // Check if user role matches selected role
      if (data.user.role !== role) {
        setError(`This account is registered as a ${data.user.role}, not a ${role}`)
        setLoading(false)
        return
      }

      // Redirect based on role
      if (role === "student") {
        router.push("/student")
      } else if (role === "lecturer") {
        router.push("/lecturer")
      } else if (role === "employer") {
        router.push("/employer")
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("An error occurred during login")
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
            <h1 className="text-4xl font-bold mb-2 text-balance">Welcome Back</h1>
            <p className="text-muted-foreground text-lg">Choose your role to continue</p>
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
                <CardDescription>Access your skill passport and track your verified achievements</CardDescription>
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
                <CardDescription>Review and approve student skill verifications with one click</CardDescription>
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
                <CardDescription>Search candidates by verified skills instead of just GPA</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const roleConfig = {
    student: {
      title: "Student Login",
      description: "Access your skill passport",
      icon: GraduationCap,
    },
    lecturer: {
      title: "Lecturer Login",
      description: "Review pending verifications",
      icon: BookOpen,
    },
    employer: {
      title: "Employer Login",
      description: "Search verified candidates",
      icon: Briefcase,
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
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
