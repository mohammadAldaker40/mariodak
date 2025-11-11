type Project = {
  id: string
  title: string
  description: string
  category: string
  image: string
}

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
}

type Contact = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
}

const STORAGE_KEYS = {
  PROJECTS: "architect_projects",
  TESTIMONIALS: "architect_testimonials",
  CONTACTS: "architect_contacts",
  VERSION: "architect_version",
}

// Default data moved to content JSON (English default)
import enContent from "@/content/site.en.json"
const DEFAULT_PROJECTS: Project[] = (enContent as any).projects

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Michael Chen",
    role: "CEO",
    company: "TechVentures Inc",
    content:
      "Maria transformed our vision into reality. The new headquarters perfectly balances form and function, creating an inspiring workspace for our team.",
    image: "/professional-businessman.png",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Property Developer",
    company: "Urban Spaces LLC",
    content:
      "Working with Maria was exceptional. Her attention to detail and innovative approach resulted in a project that exceeded all expectations.",
    image: "/professional-businesswoman.png",
  },
  {
    id: "3",
    name: "Robert Martinez",
    role: "Homeowner",
    company: "",
    content:
      "Our dream home became a reality thanks to Maria's expertise. Every detail was thoughtfully considered, resulting in a space we absolutely love.",
    image: "/professional-man.jpg",
  },
]

// Storage utilities
export const storage = {
  // Projects
  getProjects: (): Project[] => {
    if (typeof window === "undefined") return DEFAULT_PROJECTS
    const currentVersion = "2"
    const storedVersion = localStorage.getItem(STORAGE_KEYS.VERSION)
    if (storedVersion !== currentVersion) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS))
      localStorage.setItem(STORAGE_KEYS.VERSION, currentVersion)
      return DEFAULT_PROJECTS
    }
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS)
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS
  },
  setProjects: (projects: Project[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
  },
  addProject: (project: Omit<Project, "id">) => {
    const projects = storage.getProjects()
    const newProject = { id: Date.now().toString(), ...project }
    const updatedProjects = [newProject, ...projects]
    storage.setProjects(updatedProjects)
    return newProject
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    if (typeof window === "undefined") return DEFAULT_TESTIMONIALS
    const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)
    return stored ? JSON.parse(stored) : DEFAULT_TESTIMONIALS
  },
  setTestimonials: (testimonials: Testimonial[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials))
  },

  // Contacts
  getContacts: (): Contact[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS)
    return stored ? JSON.parse(stored) : []
  },
  addContact: (contact: Omit<Contact, "id" | "timestamp">) => {
    const contacts = storage.getContacts()
    const newContact = {
      id: Date.now().toString(),
      ...contact,
      timestamp: new Date().toISOString(),
    }
    const updatedContacts = [newContact, ...contacts]
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updatedContacts))
    }
    return newContact
  },
}
