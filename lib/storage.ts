// Shared in-memory storage for users and skills
// In production, replace this with a real database

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "student" | "lecturer" | "employer"
  program?: string
  department?: string
  company?: string
  github?: string
  linkedin?: string
}

export interface Skill {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  studentProgram: string
  skillName: string
  category: string
  description: string
  evidence: string
  issuer: string
  issuedBy: string
  issuedByEmail: string
  status: "pending" | "approved" | "rejected"
  dateRequested: string
  dateVerified?: string
  rejectionReason?: string
}

export const storage = {
  users: {} as Record<string, User>,
  skills: [] as Skill[],

  // User methods
  createUser(user: User) {
    this.users[user.email] = user
    return user
  },

  getUserByEmail(email: string) {
    return this.users[email]
  },

  // Skill methods
  createSkill(skill: Skill) {
    this.skills.push(skill)
    return skill
  },

  getSkillsByStudentId(studentId: string) {
    return this.skills.filter((s) => s.studentId === studentId)
  },

  getPendingSkills() {
    return this.skills.filter((s) => s.status === "pending")
  },

  getSkillById(id: string) {
    return this.skills.find((s) => s.id === id)
  },

  updateSkill(id: string, updates: Partial<Skill>) {
    const index = this.skills.findIndex((s) => s.id === id)
    if (index !== -1) {
      this.skills[index] = { ...this.skills[index], ...updates }
      return this.skills[index]
    }
    return null
  },

  getAllApprovedSkills() {
    return this.skills.filter((s) => s.status === "approved")
  },
}

export const users = storage.users
export const skills = storage.skills
