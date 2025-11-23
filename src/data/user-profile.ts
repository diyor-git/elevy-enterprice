export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  headline: string;
  skills: string[];
  certificates: Certificate[];
  courses: Array<{ id: string; name: string; progress: number; date: string }>;
  internships: Array<{ id: string; company: string; role: string; date: string }>;
  startups: Array<{ id: string; name: string; role: string }>;
  applications: Array<{ id: string; company: string; position: string; status: string; date: string }>;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export const sampleUserProfile: UserProfile = {
  id: '1',
  name: 'Alex Johnson',
  avatar: '/avatars/alex.jpg',
  bio: 'Full-stack developer passionate about building scalable applications and mentoring junior developers.',
  location: 'San Francisco, CA',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  headline: 'Full-Stack Developer | Tech Enthusiast',
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'Git'],
  certificates: [
    { id: '1', title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2024-06-15', credentialUrl: '#' },
    { id: '2', title: 'React Advanced Patterns', issuer: 'Udacity', date: '2024-03-20', credentialUrl: '#' }
  ],
  courses: [
    { id: '1', name: 'Advanced React Development', progress: 85, date: '2025-01-10' },
    { id: '2', name: 'System Design Fundamentals', progress: 60, date: '2025-01-05' }
  ],
  internships: [
    { id: '1', company: 'TechCorp Solutions', role: 'Full-Stack Intern', date: 'Summer 2024' }
  ],
  startups: [
    { id: '1', name: 'AI Career Platform', role: 'Co-founder & CTO' }
  ],
  applications: [
    { id: '1', company: 'Google', position: 'Senior Software Engineer', status: 'Interviewing', date: '2025-01-08' },
    { id: '2', company: 'Microsoft', position: 'Cloud Architect', status: 'Applied', date: '2025-01-05' }
  ],
  socialLinks: {
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    portfolio: 'alexjohnson.dev'
  }
};
