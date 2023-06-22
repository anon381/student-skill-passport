"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Award, Mail, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock candidate data
const candidates = [
  {
    id: 1,
    name: "Sarah Chen",
    program: "Computer Science",
    graduationYear: "2025",
    verifiedSkills: 12,
    skills: [
      { name: "Git Version Control", category: "Technical" },
      { name: "SQL & Database Design", category: "Technical" },
      { name: "Machine Learning", category: "Technical" },
      { name: "Research Methods", category: "Research" },
      { name: "Team Leadership", category: "Soft Skills" },
      { name: "Python Programming", category: "Technical" },
    ],
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    program: "Software Engineering",
    graduationYear: "2024",
    verifiedSkills: 15,
    skills: [
      { name: "Advanced Algorithms", category: "Technical" },
      { name: "React & Next.js", category: "Technical" },
      { name: "Cloud Architecture", category: "Technical" },
      { name: "API Design", category: "Technical" },
      { name: "Project Management", category: "Soft Skills" },
      { name: "Git Version Control", category: "Technical" },
    ],
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    program: "Computer Science",
    graduationYear: "2025",
    verifiedSkills: 10,
    skills: [
      { name: "Technical Writing", category: "Communication" },
      { name: "Python Programming", category: "Technical" },
      { name: "Data Analysis", category: "Technical" },
      { name: "SQL & Database Design", category: "Technical" },
      { name: "Research Methods", category: "Research" },
      { name: "Public Speaking", category: "Communication" },
    ],
  },
  {
    id: 4,
    name: "John Smith",
    program: "Data Science",
    graduationYear: "2024",
    verifiedSkills: 14,
    skills: [
      { name: "Machine Learning", category: "Technical" },
      { name: "Data Visualization", category: "Technical" },
      { name: "Statistical Analysis", category: "Technical" },
      { name: "Python Programming", category: "Technical" },
      { name: "SQL & Database Design", category: "Technical" },
      { name: "Team Collaboration", category: "Soft Skills" },
    ],
  },
]

export default function EmployerSearch() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
        if (userData.user.role !== "employer") {
          router.replace(`/${userData.user.role || ""}` || "/")
          return
        }

        setUser(userData.user)

        // Get all candidates with verified skills
        const searchResponse = await fetch("/api/skills/search")
        if (searchResponse.ok) {
          const searchData = await searchResponse.json()
          setFilteredCandidates(searchData.students)
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setLoading(true)

    try {
      const response = await fetch(`/api/skills/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setFilteredCandidates(data.students)
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Search Talent by Skills</h1>
          <p className="text-muted-foreground">
            Find candidates based on verified competencies, not just grades or degrees
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by skill, name, or program (e.g., Machine Learning, Python, Git)"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <p className="w-full text-sm text-muted-foreground">Popular searches:</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSearch("Machine Learning")}
                className="bg-transparent"
              >
                Machine Learning
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch("Git")} className="bg-transparent">
                Git Version Control
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch("Python")} className="bg-transparent">
                Python
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSearch("SQL")} className="bg-transparent">
                SQL & Database
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Searching..."
              : `${filteredCandidates.length} candidate${filteredCandidates.length !== 1 ? "s" : ""} found`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Candidate Results */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="text-lg">{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{candidate.name}</CardTitle>
                      <CardDescription>{candidate.program}</CardDescription>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="border-chart-1 text-chart-1">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {candidate.skills.length} Verified Skills
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="mb-3 text-sm font-medium">Verified Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill: any, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {skill.skillName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCandidates.length === 0 && !loading && (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No candidates found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or browse all available candidates
                </p>
                <Button className="mt-4" onClick={() => handleSearch("")}>
                  Show All Candidates
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
