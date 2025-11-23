export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  unlockedAt?: string;
}

export interface UserLevel {
  level: number;
  title: string;
  requiredPoints: number;
  color: string;
}

export interface Leaderboard {
  rank: number;
  name: string;
  points: number;
  level: number;
  avatar: string;
}

export const badges: Badge[] = [
  {
    id: 'first-course',
    name: 'Learner',
    description: 'Complete your first course',
    icon: '📚',
    color: 'bg-blue-100',
    requirement: 'Complete 1 course',
    unlockedAt: '2025-01-10'
  },
  {
    id: 'course-master',
    name: 'Course Master',
    description: 'Complete 5 courses',
    icon: '🎓',
    color: 'bg-purple-100',
    requirement: 'Complete 5 courses'
  },
  {
    id: 'forum-contributor',
    name: 'Community Champion',
    description: 'Help 10 people in the forum',
    icon: '🏆',
    color: 'bg-yellow-100',
    requirement: 'Help 10 people',
    unlockedAt: '2024-12-20'
  },
  {
    id: 'startup-founder',
    name: 'Founder',
    description: 'Create your first startup',
    icon: '🚀',
    color: 'bg-orange-100',
    requirement: 'Create 1 startup'
  },
  {
    id: 'interview-ready',
    name: 'Interview Ready',
    description: 'Apply to 10 internships',
    icon: '💼',
    color: 'bg-green-100',
    requirement: 'Apply to 10 internships'
  },
  {
    id: 'networking-pro',
    name: 'Networking Pro',
    description: 'Connect with 50 professionals',
    icon: '🤝',
    color: 'bg-pink-100',
    requirement: 'Connect with 50 people'
  }
];

export const userLevels: UserLevel[] = [
  { level: 1, title: 'Newcomer', requiredPoints: 0, color: 'bg-gray-100' },
  { level: 2, title: 'Learner', requiredPoints: 500, color: 'bg-blue-100' },
  { level: 3, title: 'Scholar', requiredPoints: 1500, color: 'bg-green-100' },
  { level: 4, title: 'Expert', requiredPoints: 3000, color: 'bg-purple-100' },
  { level: 5, title: 'Master', requiredPoints: 5000, color: 'bg-orange-100' }
];

export const leaderboard: Leaderboard[] = [
  { rank: 1, name: 'Alex Johnson', points: 5850, level: 5, avatar: '/avatars/alex.jpg' },
  { rank: 2, name: 'Sarah Chen', points: 5240, level: 4, avatar: '/avatars/sarah.jpg' },
  { rank: 3, name: 'Marcus Wilson', points: 4680, level: 4, avatar: '/avatars/marcus.jpg' },
  { rank: 4, name: 'Emma Davis', points: 3950, level: 3, avatar: '/avatars/emma.jpg' },
  { rank: 5, name: 'Jordan Smith', points: 3420, level: 3, avatar: '/avatars/jordan.jpg' }
];
