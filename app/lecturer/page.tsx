"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, X, Clock, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LecturerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

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
        setUser(userData.user)

        // Get pending skills
        const skillsResponse = await fetch("/api/skills/pending")
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json()
          setRequests(skillsData.skills)
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleApprove = async (id: string, studentName: string, skillName: string) => {
    try {
      const response = await fetch("/api/skills/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: id }),
      })

      if (response.ok) {
        setRequests(requests.filter((r) => r.id !== id))
        toast({
          title: "Skill Approved",
          description: `${skillName} has been verified for ${studentName}`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to approve skill",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Approve error:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (id: string, studentName: string, skillName: string) => {
    try {
      const response = await fetch("/api/skills/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: id, reason: "Does not meet requirements" }),
      })

      if (response.ok) {
        setRequests(requests.filter((r) => r.id !== id))
        toast({
          title: "Skill Rejected",
          description: `${skillName} request from ${studentName} has been declined`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to reject skill",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Reject error:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Lecturer Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.department}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-3xl font-bold text-chart-4">{requests.length}</p>
                </div>
                <Clock className="h-10 w-10 text-chart-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved This Month</p>
                  <p className="text-3xl font-bold text-chart-1">0</p>
                </div>
                <CheckCircle className="h-10 w-10 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Verified</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <Award className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approval Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="pending">Pending ({requests.length})</TabsTrigger>
            </TabsList>
          </div>

          {/* Pending Approvals */}
          <TabsContent value="pending" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">No pending skill approvals at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.studentName}</CardTitle>
                          <CardDescription>{request.studentEmail}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-chart-4 text-chart-4">
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">{request.skillName}</h4>
                        <Badge variant="secondary">{request.category}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">Source:</span> {request.issuer}
                        </p>
                        <p>
                          <span className="font-medium">Submitted:</span>{" "}
                          {new Date(request.dateRequested).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="mt-2">
                          <span className="font-medium">Description:</span> {request.description}
                        </p>
                        {request.evidence && (
                          <p className="mt-2">
                            <span className="font-medium">Evidence:</span> {request.evidence}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() => handleApprove(request.id, request.studentName, request.skillName)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Skill
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleReject(request.id, request.studentName, request.skillName)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
