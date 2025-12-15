"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Fingerprint,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"

const howSteps = [
  { icon: BookOpenCheck, label: "Student finishes a project" },
  { icon: CheckCircle2, label: "Lecturer verifies the skills" },
  { icon: BadgeCheck, label: "Skills land on the passport" },
  { icon: Search, label: "Employers view & search" },
]

const whoCards = [
  {
    title: "Students",
    lines: ["Turn real work into verified skills", "Stand out beyond GPA"],
    icon: Sparkles,
  },
  {
    title: "Lecturers",
    lines: ["Verify skills in one click", "Track learning outcomes"],
    icon: Users,
  },
  {
    title: "Employers",
    lines: ["Search graduates by skills", "See verified proof, not claims"],
    icon: Compass,
  },
]

const sampleSkills = [
  { name: "React & Next.js", category: "Technical", status: "Verified", issuer: "Web Apps II" },
  { name: "Control Systems", category: "Academic", status: "Verified", issuer: "EME 320" },
  { name: "Team Leadership", category: "Soft", status: "Pending", issuer: "Capstone" },
  { name: "Data Analysis", category: "Technical", status: "Verified", issuer: "Research Lab" },
]

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Top navigation */}
      <nav className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 text-sm font-medium">
          <Link href="#hero" className="flex items-center gap-2 text-foreground" onClick={closeMenu}>
            <Fingerprint className="h-5 w-5 text-primary" />
            <span>Skill Passport</span>
          </Link>
          <div className="hidden items-center gap-4 text-muted-foreground md:flex">
            <Link href="#hero" className="hover:text-primary">Home</Link>
            <Link href="#how" className="hover:text-primary">Flow</Link>
            <Link href="#why" className="hover:text-primary">Why It Matters</Link>
            <Link href="#cta" className="hover:text-primary">Get Started</Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-b bg-background/95 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <Link href="#hero" className="hover:text-primary" onClick={closeMenu}>Home</Link>
              <Link href="#how" className="hover:text-primary" onClick={closeMenu}>Flow</Link>
              <Link href="#why" className="hover:text-primary" onClick={closeMenu}>Why It Matters</Link>
              <Link href="#cta" className="hover:text-primary" onClick={closeMenu}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header id="hero" className="container mx-auto px-4 pb-16 pt-12 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Fingerprint className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-balance">Skills over grades. Proof over promises.</h1>
            <p className="text-lg text-muted-foreground">
              A Skill Passport verifies what you can actually do—so students, lecturers, and employers speak the same language.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Create Your Skill Passport</Button>
            </Link>
            <Link href="#sample" className="text-primary underline-offset-4 hover:underline">
              View Sample Passport
            </Link>
          </div>
        </div>
      </header>

      {/* Who is this for */}
      <section id="who" className="container mx-auto px-4 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Who Is This For?</h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {whoCards.map((card) => (
            <Card key={card.title} className="p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <card.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{card.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">How It Works</h2>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
            {howSteps.map((step, idx) => (
              <Card key={step.label} className="flex flex-col items-center gap-3 p-5 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-inner">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground">Step {idx + 1}</div>
                <div className="text-sm font-medium leading-snug">{step.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Passport */}
      <section id="sample" className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Sample Skill Passport</h2>
        <div className="mx-auto max-w-5xl rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  MT
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Maya Tesfaye</h3>
                  <p className="text-sm text-muted-foreground">B.Sc. Software Engineering • Addis Ababa</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">Technical</Badge>
                <Badge variant="secondary">Academic</Badge>
                <Badge variant="secondary">Soft Skills</Badge>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-chart-1" />
                <span>7 verified skills</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-chart-3" />
                <span>Searchable by employers</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sampleSkills.map((skill) => (
              <Card key={skill.name} className="p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">{skill.category}</div>
                  </div>
                  <Badge variant={skill.status === "Verified" ? "default" : "outline"}>{skill.status}</Badge>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Issued by: {skill.issuer}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section id="why" className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Why This Matters</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            <Card className="p-5 text-center">
              <div className="mb-2 text-lg font-semibold">Grades miss the detail</div>
              <p className="text-sm text-muted-foreground">They don’t show real ability.</p>
            </Card>
            <Card className="p-5 text-center">
              <div className="mb-2 text-lg font-semibold">CVs can be vague</div>
              <p className="text-sm text-muted-foreground">Claims aren’t always verified.</p>
            </Card>
            <Card className="p-5 text-center">
              <div className="mb-2 text-lg font-semibold">Passports prove it</div>
              <p className="text-sm text-muted-foreground">Real, verified skills on record.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Section guide */}
      <section className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-4xl border-primary/30 bg-primary/5 p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <div className="rounded-lg border border-primary/20 bg-background/60 p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-primary">Who It’s For</div>
              <p>What each audience gains — students, lecturers, and employers.</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-background/60 p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-primary">How It Works</div>
              <p>The four-step flow from student work to employer discovery.</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-background/60 p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-primary">Sample Passport</div>
              <p>See a visual mock of a real, verified skill record.</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-background/60 p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-primary">Why It Matters</div>
              <p>Why verification beats grades and unverified CV bullet points.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Final CTA */}
      <section id="cta" className="container mx-auto px-4 pb-20 pt-12">
        <Card className="mx-auto max-w-3xl p-10 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
             </div>
          <div>
            <h2 className="mb-3 text-2xl font-bold">Ready to show proof, not promises?</h2>
            <p className="text-muted-foreground">Publish your Skill Passport and let your verified work speak for you.</p>
          </div>
          <div className="flex justify-center">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
