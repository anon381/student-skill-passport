import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Briefcase, Award, CheckCircle, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Award className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">Student Skill Passport</h1>
          <p className="mb-8 text-xl text-muted-foreground text-balance">
            Beyond grades. Beyond degrees. Verify the skills that matter.
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            A comprehensive platform where students collect verified skill badges, lecturers approve competencies with
            one click, and employers discover talent based on real abilities.
          </p>
        </div>
      </header>

      {/* Role Selection Cards */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">Choose Your Role</h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Student Card */}
          <Card className="flex flex-col p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-chart-1/10 p-3">
                <GraduationCap className="h-8 w-8 text-chart-1" />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold">Students</h3>
            <p className="mb-6 flex-1 text-center text-sm text-muted-foreground">
              Build your skill portfolio with verified badges from clubs, labs, internships, and projects.
            </p>
            <Link href="/student" className="w-full">
              <Button className="w-full">View My Passport</Button>
            </Link>
          </Card>

          {/* Lecturer Card */}
          <Card className="flex flex-col p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-chart-2/10 p-3">
                <Users className="h-8 w-8 text-chart-2" />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold">Lecturers</h3>
            <p className="mb-6 flex-1 text-center text-sm text-muted-foreground">
              Approve student skills with one click. Verify competencies from your courses and projects.
            </p>
            <Link href="/lecturer" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Approve Skills
              </Button>
            </Link>
          </Card>

          {/* Employer Card */}
          <Card className="flex flex-col p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-chart-3/10 p-3">
                <Briefcase className="h-8 w-8 text-chart-3" />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold">Employers</h3>
            <p className="mb-6 flex-1 text-center text-sm text-muted-foreground">
              Search candidates by verified skills, not just GPAs. Find the talent you actually need.
            </p>
            <Link href="/employer" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                Search Talent
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why It Matters</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-10 w-10 text-chart-1" />
              </div>
              <h3 className="mb-2 font-semibold">Bridge the Gap</h3>
              <p className="text-sm text-muted-foreground">
                Address the "graduate but unemployable" challenge with verified skill tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Award className="h-10 w-10 text-chart-2" />
              </div>
              <h3 className="mb-2 font-semibold">Beyond Grades</h3>
              <p className="text-sm text-muted-foreground">
                Showcase practical abilities that degrees alone can't demonstrate to employers.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Search className="h-10 w-10 text-chart-3" />
              </div>
              <h3 className="mb-2 font-semibold">Skills-First Hiring</h3>
              <p className="text-sm text-muted-foreground">
                Employers discover talent based on verified competencies, not just academic records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
