"use client"

import type React from "react"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Award, Download, Share2, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const skillBadges = [
  {
    id: 1,
    name: "Git Version Control",
    category: "Technical",
    issuer: "Dr. Ahmed Khan",
    issuedBy: "Software Engineering Lab",
    date: "2024-01-15",
    status: "approved",
    description: "Advanced proficiency in Git workflows, branching strategies, and collaborative development",
  },
  {
    id: 2,
    name: "SQL & Database Design",
    category: "Technical",
    issuer: "Prof. Maria Garcia",
    issuedBy: "Database Systems Course",
    date: "2024-02-20",
    status: "approved",
    description: "Design and implement relational databases with complex queries and optimization",
  },
  {
    id: 3,
    name: "Research Methods",
    category: "Research",
    issuer: "Dr. James Wilson",
    issuedBy: "Research Lab",
    date: "2024-03-10",
    status: "approved",
    description: "Conducted independent research with proper methodology and documentation",
  },
  {
    id: 4,
    name: "Team Leadership",
    category: "Soft Skills",
    issuer: "Ms. Lisa Brown",
    issuedBy: "Student Tech Club",
    date: "2023-12-05",
    status: "approved",
    description: "Led a team of 8 students in organizing tech workshops and hackathons",
  },
  {
    id: 5,
    name: "Machine Learning Basics",
    category: "Technical",
    issuer: "Dr. Ahmed Khan",
    issuedBy: "AI Research Lab",
    date: "2024-04-01",
    status: "pending",
    description: "Completed introductory ML projects with supervised and unsupervised learning",
  },
]

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddSkill, setShowAddSkill] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const userResponse = await fetch("/api/auth/me")
        if (!userResponse.ok) {
          router.push("/login")
          return
        }
        const userData = await userResponse.json()
        if (userData.user.role !== "student") {
          router.replace(`/${userData.user.role || ""}` || "/")
          return
        }

        setUser(userData.user)

        // Get user's skills
        const skillsResponse = await fetch("/api/skills/my-skills")
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json()
          setSkills(skillsData.skills)
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const verifiedSkills = skills.filter((s) => s.status === "approved")
  const pendingSkills = skills.filter((s) => s.status === "pending")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Student Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.program}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-primary">
                      {user.github && (
                        <Link href={`https://github.com/${user.github}`} target="_blank" className="hover:underline">
                          GitHub: {user.github}
                        </Link>
                      )}
                      {user.linkedin && (
                        <Link href={user.linkedin} target="_blank" className="hover:underline">
                          LinkedIn
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={() => setShowAddSkill(true)}>
                    <Award className="mr-2 h-4 w-4" />
                    Request Skill Verification
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Profile
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Passport
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Summary */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Skills</p>
                  <p className="text-3xl font-bold text-chart-1">{verifiedSkills.length}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold text-chart-4">{pendingSkills.length}</p>
                </div>
                <Clock className="h-10 w-10 text-chart-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Skills</p>
                  <p className="text-3xl font-bold">{skills.length}</p>
                </div>
                <Award className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skill Portfolio Progress</CardTitle>
            <CardDescription>Build a comprehensive skill portfolio to stand out to employers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span className="font-medium">{Math.round((verifiedSkills.length / 20) * 100)}%</span>
              </div>
              <Progress value={(verifiedSkills.length / 20) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Add {20 - verifiedSkills.length} more verified skills to reach 100%
              </p>
            </div>
          </CardContent>
        </Card>

        {showAddSkill && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Request Skill Verification</CardTitle>
              <CardDescription>Submit a skill for verification by your lecturer or supervisor</CardDescription>
            </CardHeader>
            <CardContent>
              <AddSkillForm
                onSuccess={() => {
                  setShowAddSkill(false)
                  // Refresh skills
                  fetch("/api/skills/my-skills")
                    .then((res) => res.json())
                    .then((data) => setSkills(data.skills))
                }}
                onCancel={() => setShowAddSkill(false)}
              />
            </CardContent>
          </Card>
        )}

        {/* Verified Skills */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Verified Skills ({verifiedSkills.length})</h2>
          {verifiedSkills.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No verified skills yet. Request your first skill verification!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {verifiedSkills.map((skill) => (
                <Card key={skill.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-chart-1/10 p-2">
                          <Award className="h-5 w-5 text-chart-1" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{skill.skillName}</CardTitle>
                          <CardDescription className="text-xs">{skill.category}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-chart-1 text-chart-1">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">{skill.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium">Issued by:</span> {skill.issuer}
                      </p>
                      <p>
                        <span className="font-medium">Verified by:</span> {skill.issuedBy}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(skill.dateVerified).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Pending Skills */}
        {pendingSkills.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Pending Approval ({pendingSkills.length})</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {pendingSkills.map((skill) => (
                <Card key={skill.id} className="border-dashed">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <Award className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{skill.skillName}</CardTitle>
                          <CardDescription className="text-xs">{skill.category}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-chart-4 text-chart-4">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">{skill.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium">Submitted to:</span> {skill.issuer}
                      </p>
                      <p>
                        <span className="font-medium">Awaiting approval from:</span> {skill.issuedBy}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function AddSkillForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    skillName: "",
    category: "",
    description: "",
    evidence: "",
    issuer: "",
    issuedBy: "",
    issuedByEmail: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/skills/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create skill request")
        setLoading(false)
        return
      }

      onSuccess()
    } catch (err) {
      console.error("[v0] Create skill error:", err)
      setError("An error occurred")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="skillName">Skill Name</Label>
          <Input
            id="skillName"
            placeholder="e.g., Git Version Control"
            value={formData.skillName}
            onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g., Technical, Research, Soft Skills"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Describe what you can do with this skill"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="evidence">Evidence (optional)</Label>
        <Input
          id="evidence"
          placeholder="Links, certifications, or project descriptions"
          value={formData.evidence}
          onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuing Organization</Label>
          <Input
            id="issuer"
            placeholder="e.g., Software Engineering Lab"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuedBy">Verifier Name</Label>
          <Input
            id="issuedBy"
            placeholder="e.g., Dr. Ahmed Khan"
            value={formData.issuedBy}
            onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="issuedByEmail">Verifier Email</Label>
        <Input
          id="issuedByEmail"
          type="email"
          placeholder="verifier@university.edu"
          value={formData.issuedByEmail}
          onChange={(e) => setFormData({ ...formData, issuedByEmail: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Submitting..." : "Submit for Verification"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
