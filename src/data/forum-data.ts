export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
  };
  category: 'general' | 'course-help' | 'internship-tips' | 'startup-advice' | 'resources';
  tags: string[];
  replies: ForumReply[];
  views: number;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isResolved?: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
  };
  upvotes: number;
  isAccepted?: boolean;
  createdAt: string;
}

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best practices for internship interviews',
    content: 'I have been through several internship interviews and would like to share some tips. First, always research the company...',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      avatar: '/avatars/avatar-1.jpg',
      badge: 'Mentor'
    },
    category: 'internship-tips',
    tags: ['interview', 'tips', 'internship'],
    replies: [
      {
        id: 'r1',
        content: 'Great advice! I would also add that practicing STAR method helps a lot.',
        author: {
          id: 'user2',
          name: 'Alex Kumar',
          avatar: '/avatars/avatar-2.jpg'
        },
        upvotes: 24,
        createdAt: '2025-01-15'
      }
    ],
    views: 342,
    createdAt: '2025-01-14',
    updatedAt: '2025-01-15',
    isPinned: true
  },
  {
    id: '2',
    title: 'How to build a startup MVP quickly?',
    content: 'Anyone have experience building an MVP for a startup? Looking for advice on what tools to use and best practices...',
    author: {
      id: 'user3',
      name: 'Jordan Smith',
      avatar: '/avatars/avatar-3.jpg'
    },
    category: 'startup-advice',
    tags: ['startup', 'mvp', 'development'],
    replies: [
      {
        id: 'r2',
        content: 'I recommend using Next.js with a no-code backend like Firebase or Supabase. Speeds up development significantly.',
        author: {
          id: 'user4',
          name: 'Emma Wilson',
          avatar: '/avatars/avatar-4.jpg',
          badge: 'Founder'
        },
        upvotes: 45,
        isAccepted: true,
        createdAt: '2025-01-13'
      }
    ],
    views: 218,
    createdAt: '2025-01-12',
    updatedAt: '2025-01-13',
    isPinned: false,
    isResolved: true
  },
  {
    id: '3',
    title: 'Recommended resources for learning Web Development',
    content: 'Looking for curated resources to learn web development. What are your go-to platforms and courses?',
    author: {
      id: 'user5',
      name: 'Lisa Park',
      avatar: '/avatars/avatar-5.jpg'
    },
    category: 'resources',
    tags: ['web-dev', 'learning', 'resources'],
    replies: [],
    views: 156,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
    isPinned: false
  }
];

export const forumCategories = [
  { id: 'general', name: 'General Discussion', color: 'bg-blue-100' },
  { id: 'course-help', name: 'Course Help', color: 'bg-green-100' },
  { id: 'internship-tips', name: 'Internship Tips', color: 'bg-purple-100' },
  { id: 'startup-advice', name: 'Startup Advice', color: 'bg-orange-100' },
  { id: 'resources', name: 'Resources', color: 'bg-pink-100' }
];
