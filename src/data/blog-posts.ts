export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: 'career' | 'learning' | 'startup' | 'internship' | 'tech';
  tags: string[];
  image: string;
  readTime: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Landing Your First Internship',
    slug: 'first-internship-guide',
    excerpt: 'Learn the proven strategies used by top students to land competitive internships at leading tech companies.',
    content: 'This comprehensive guide covers everything you need to know about landing your first internship...',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'Career Mentor'
    },
    category: 'internship',
    tags: ['internship', 'career', 'tips', 'job-search'],
    image: '/blog/internship-guide.jpg',
    readTime: 8,
    views: 2450,
    likes: 342,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15'
  },
  {
    id: '2',
    title: 'How to Build an MVP That Gets Funded',
    slug: 'mvp-funding-guide',
    excerpt: 'Discover the key principles for building an MVP that attracts investor attention and gets your startup funded.',
    content: 'Building a successful MVP is about understanding your market and delivering value...',
    author: {
      name: 'Marcus Johnson',
      avatar: '/avatars/marcus.jpg',
      role: 'Startup Advisor'
    },
    category: 'startup',
    tags: ['startup', 'mvp', 'funding', 'entrepreneurship'],
    image: '/blog/mvp-guide.jpg',
    readTime: 10,
    views: 1890,
    likes: 267,
    createdAt: '2025-01-12',
    updatedAt: '2025-01-12'
  },
  {
    id: '3',
    title: 'AI Learning Paths: What To Learn in 2025',
    slug: 'ai-learning-2025',
    excerpt: 'A curated learning path for mastering AI and machine learning skills in 2025.',
    content: 'The AI landscape is rapidly evolving. Here\'s what you should focus on learning this year...',
    author: {
      name: 'Dr. Emma Wilson',
      avatar: '/avatars/emma.jpg',
      role: 'Tech Educator'
    },
    category: 'learning',
    tags: ['ai', 'machine-learning', 'learning-path', 'tech'],
    image: '/blog/ai-learning-2025.jpg',
    readTime: 12,
    views: 3120,
    likes: 521,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10'
  },
  {
    id: '4',
    title: 'Common Mistakes in Technical Interviews and How to Avoid Them',
    slug: 'technical-interview-mistakes',
    excerpt: 'Understand the most common mistakes candidates make in tech interviews and strategies to avoid them.',
    content: 'Technical interviews can be intimidating, but with proper preparation and awareness of common pitfalls...',
    author: {
      name: 'Alex Kumar',
      avatar: '/avatars/alex.jpg',
      role: 'Senior Engineer'
    },
    category: 'career',
    tags: ['interview', 'technical', 'career', 'preparation'],
    image: '/blog/interview-tips.jpg',
    readTime: 7,
    views: 2890,
    likes: 412,
    createdAt: '2025-01-08',
    updatedAt: '2025-01-08'
  }
];

export const blogCategories = [
  { id: 'career', name: 'Career Tips', color: 'bg-blue-100' },
  { id: 'learning', name: 'Learning', color: 'bg-green-100' },
  { id: 'startup', name: 'Startup', color: 'bg-orange-100' },
  { id: 'internship', name: 'Internship', color: 'bg-purple-100' },
  { id: 'tech', name: 'Technology', color: 'bg-pink-100' }
];
