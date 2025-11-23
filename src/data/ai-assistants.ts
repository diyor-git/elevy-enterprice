export interface AIAssistant {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  specialization: string[];
}

export const aiAssistants: AIAssistant[] = [
  {
    id: 'learning-mentor',
    name: 'Learning Mentor',
    role: 'AI Learning Guide',
    description: 'Get personalized learning paths, course recommendations, and study tips',
    icon: '📚',
    color: 'bg-blue-100',
    specialization: ['Course Selection', 'Study Plans', 'Career Paths']
  },
  {
    id: 'career-consultant',
    name: 'Career Consultant',
    role: 'AI Career Expert',
    description: 'Professional advice on internships, job search, and career development',
    icon: '💼',
    color: 'bg-purple-100',
    specialization: ['Job Search', 'Resume Tips', 'Interview Prep']
  },
  {
    id: 'startup-mentor',
    name: 'Startup Mentor',
    role: 'AI Startup Advisor',
    description: 'Guidance on building startups, pitching investors, and growing teams',
    icon: '🚀',
    color: 'bg-orange-100',
    specialization: ['MVP Development', 'Funding', 'Team Building']
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    role: 'AI Resume Expert',
    description: 'Create and optimize your resume with AI-powered suggestions',
    icon: '📄',
    color: 'bg-green-100',
    specialization: ['Resume Writing', 'Optimization', 'ATS Scoring']
  },
  {
    id: 'soft-skills',
    name: 'Soft Skills Trainer',
    role: 'AI Communication Coach',
    description: 'Improve communication, leadership, and interpersonal skills',
    icon: '🎯',
    color: 'bg-pink-100',
    specialization: ['Communication', 'Leadership', 'Presentation']
  }
];
