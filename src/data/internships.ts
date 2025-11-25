import { Internship } from "@/types/internships";

export const internships: Internship[] = [
  {
    id: "1",
    title: "Full-Stack Developer Intern",
    company: {
      id: "google",
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
      description:
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products.",
      industry: "Technology",
      size: "10,000+ employees",
      location: "Mountain View, CA",
      website: "https://google.com",
      culture: [
        "Innovation-driven",
        "Collaborative",
        "Global impact",
        "20% time policy",
      ],
      benefits: [
        "Health insurance",
        "Free meals",
        "Gym membership",
        "Learning budget",
        "Remote work options",
      ],
    },
    category: "Software Development",
    format: "Hybrid",
    location: "Mountain View, CA",
    duration: "3 months",
    pay: "Paid",
    salary: "$8,000/month",
    description:
      "Join Google's engineering team to build products that impact billions of users worldwide. Work on cutting-edge technologies with experienced mentors.",
    responsibilities: [
      "Develop and maintain web applications using modern frameworks",
      "Collaborate with cross-functional teams on product features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Contribute to internal tools and infrastructure improvements",
    ],
    requirements: {
      required: [
        "Currently pursuing Computer Science degree or related field",
        "Strong foundation in JavaScript, React, and Node.js",
        "Understanding of RESTful APIs and database design",
        "Excellent problem-solving skills",
      ],
      preferred: [
        "Previous internship experience",
        "Open source contributions",
        "Experience with TypeScript and cloud platforms",
        "Knowledge of CI/CD pipelines",
      ],
    },
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Git"],
    startDate: "June 2025",
    deadline: "March 15, 2025",
    openings: 10,
    applicants: 245,
    reviews: [
      {
        id: "1",
        author: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        role: "Former Intern (2024)",
        rating: 5,
        date: "2 months ago",
        text: "Amazing experience! The mentorship was incredible and I learned so much about scalable systems. The team treats interns like full members.",
        helpful: 24,
      },
      {
        id: "2",
        author: "Sarah Williams",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        role: "Former Intern (2023)",
        rating: 5,
        date: "6 months ago",
        text: "Best internship I've ever had. Real impact on products, great culture, and amazing learning opportunities.",
        helpful: 18,
      },
    ],
    benefits: ["Health insurance", "Free meals", "Gym", "Learning budget"],
    featured: true,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
  },

];
