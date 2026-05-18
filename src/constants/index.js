export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "resume", title: "Resume" },
  { id: "contact", title: "Contact" },
];

export const skills = [
  { name: "Python", level: 90, category: "Backend" },
  { name: "Django / DRF", level: 90, category: "Backend" },
  { name: "React.js", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 85, category: "Frontend" },
  { name: "PostgreSQL", level: 80, category: "Database" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "OpenCV / DeepFace", level: 70, category: "AI/ML" },
  { name: "Firebase FCM", level: 75, category: "Backend" },
  { name: "Redux", level: 78, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "Git / GitHub", level: 88, category: "DevOps" },
  { name: "REST APIs", level: 92, category: "Backend" },
];

export const projects = [
  {
    name: "Qliq Care",
    description:
      "Healthcare caregiver booking platform with real-time location tracking, FCM push notifications, payment gateway integration, and a React admin dashboard.",
    tags: ["Django", "React", "PostgreSQL", "FCM", "Google Maps API", "Payment Gateway"],
    color: "#00f5d4",
    type: "Service-Based",
    role: "Full Stack Developer (Team Lead)",
  },
  {
    name: "Gym Management System",
    description:
      "Face-recognition attendance system for gyms using OpenCV/DeepFace. Includes member management, fee tracking, overdue alerts, and analytics dashboard.",
    tags: ["Django", "React", "OpenCV", "DeepFace", "PostgreSQL", "Bootstrap"],
    color: "#7b5ea7",
    type: "Product-Based",
    role: "Project Manager & Full Stack Developer",
  },
];

export const experience = [
  {
    title: "Full Stack Developer (Team Lead)",
    company: "Techfifo Innovations LLP",
    location: "Palakkad, Kerala",
    period: "March 2023 – Present",
    points: [
      "Led full stack development for 2 major client projects (React + Django).",
      "Built RESTful APIs using Django REST Framework for mobile and web clients.",
      "Implemented JWT auth, RBAC, FCM notifications, and payment integrations.",
      "Conducted code reviews and mentored junior developers in Agile sprints.",
      "Managed PostgreSQL/MySQL with schema design and query optimization.",
      "Deployed applications on cloud servers and managed production environments.",
    ],
  },
];