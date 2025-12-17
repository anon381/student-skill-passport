# Student Skill Passport

A skills-first portfolio and verification platform for students, lecturers, and employers.

## What it does

- Students collect verified skill badges from courses, projects, clubs, and internships.
- Lecturers verify submissions in one click and track learning outcomes.
- Employers search and view verified competencies instead of relying on GPA or unverified claims.

## Key features

- Role-based dashboards for students, lecturers, and employers
- In-memory auth/session with role-based redirects (no external DB yet)

- Sample Skill Passport preview to showcase how verified skills are presented

## Tech stack

- Next.js App Router (full-stack routes in `app/api`)
- TypeScript, React, Tailwind, Radix UI
- next-themes for light/dark mode
- pnpm for package management

## Local setup

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000 (or the port shown in the console).

## Current limitations

- Data is stored in memory; restarting the dev server clears users and skills.
- No persistence or per-lecturer assignment yet for pending skills.
- Simple cookie-based session; no production hardening or hashing.

## Deployment

Ready for Vercel/Next.js deployment; add a real database and harden auth before production.
