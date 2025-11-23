import type { Startup, User, Message, Task, JobPosting, Notification, JobApplicant } from '@/types/startup';

export const defaultUsers: User[] = [
  { 
    id: '1', 
    name: 'Alex Johnson', 
    email: 'alex@startup.com', 
    role: 'CEO', 
    avatar: '👨',
    bio: 'Full-stack developer and entrepreneur with 10+ years of experience',
    location: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/alexjohnson',
    joinedDate: new Date('2024-01-15')
  },
  { 
    id: '2', 
    name: 'Sarah Chen', 
    email: 'sarah@startup.com', 
    role: 'CTO', 
    avatar: '👩',
    bio: 'Cloud architect and AI/ML specialist',
    location: 'San Francisco, CA',
    linkedIn: 'https://linkedin.com/in/sarahchen',
    joinedDate: new Date('2024-01-15')
  },
  { 
    id: '3', 
    name: 'Mike Davis', 
    email: 'mike@startup.com', 
    role: 'Designer', 
    avatar: '👨',
    bio: 'UX/UI designer passionate about user-centered design',
    location: 'New York, NY',
    linkedIn: 'https://linkedin.com/in/mikedavis',
    joinedDate: new Date('2024-02-01')
  },
];

export const defaultMessages: Message[] = [
  { id: '1', author: 'Alex', message: 'Great work on the latest features!', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', author: 'Sarah', message: 'Thanks! We deployed to production this morning.', timestamp: new Date(Date.now() - 1800000) },
];

export const defaultTasks: Task[] = [
  { id: '1', title: 'Design landing page', status: 'todo', assignee: 'Sarah', description: '', priority: 'medium', deadline: undefined, comments: [], activity: [] },
  { id: '2', title: 'Setup database', status: 'in-progress', assignee: 'Mike', description: '', priority: 'high', deadline: undefined, comments: [], activity: [] },
  { id: '3', title: 'API authentication', status: 'in-progress', assignee: 'Alex', description: '', priority: 'critical', deadline: undefined, comments: [], activity: [] },
  { id: '4', title: 'Create documentation', status: 'done', assignee: 'Sarah', description: '', priority: 'low', deadline: undefined, comments: [], activity: [] },
];

const jobApplicants: Record<string, JobApplicant[]> = {
  'job-1': [
    {
      id: 'app-1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: '👨‍💻',
      position: 'Senior Full Stack Engineer',
      appliedDate: new Date(Date.now() - 86400000),
      status: 'reviewing',
      bio: 'Full-stack developer with 8 years of experience building scalable web applications.',
      experience: 'Led development at TechCorp for 5 years, managing 3+ engineers. Built APIs handling 1M+ requests/day.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      id: 'app-2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: '👩‍💻',
      position: 'Senior Full Stack Engineer',
      appliedDate: new Date(Date.now() - 172800000),
      status: 'pending',
      bio: 'Passionate about building products that matter. Experienced with modern web technologies.',
      experience: 'Startup founder turned engineer. Built and sold a SaaS product to 500+ users.',
      skills: ['Vue.js', 'Python', 'MongoDB', 'Firebase']
    },
    {
      id: 'app-3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      avatar: '👨',
      position: 'Senior Full Stack Engineer',
      appliedDate: new Date(Date.now() - 259200000),
      status: 'accepted',
      bio: 'Senior engineer at Google. Interested in joining early-stage startups.',
      experience: '10+ years at Google working on infrastructure and backend systems.',
      skills: ['Go', 'Java', 'Kubernetes', 'Microservices']
    }
  ],
  'job-2': [
    {
      id: 'app-4',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      avatar: '👩',
      position: 'Product Manager',
      appliedDate: new Date(Date.now() - 345600000),
      status: 'pending',
      bio: 'Product manager with a focus on user-centric design and data-driven decisions.',
      experience: 'Product Manager at Airbnb for 3 years, grew feature adoption by 150%.',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Roadmapping']
    },
    {
      id: 'app-5',
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      avatar: '👨',
      position: 'Product Manager',
      appliedDate: new Date(Date.now() - 432000000),
      status: 'rejected',
      bio: 'Experienced PM looking to lead product strategy at innovative startups.',
      experience: 'VP Product at Series B startup, led 5-person PM team.',
      skills: ['Product Leadership', 'Roadmapping', 'B2B SaaS']
    }
  ],
  'job-3': [
    {
      id: 'app-6',
      name: 'Lisa Wong',
      email: 'lisa.wong@email.com',
      avatar: '👩',
      position: 'Frontend Engineer',
      appliedDate: new Date(Date.now() - 518400000),
      status: 'pending',
      bio: 'Frontend specialist with passion for beautiful UX and performant code.',
      experience: '6 years building frontend applications, expert in React and modern tooling.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Performance Optimization']
    }
  ]
};

export const defaultStartups: Startup[] = [
  {
    id: '1',
    name: 'TechFlow',
    description: 'AI-powered workflow automation platform',
    description_long: 'TechFlow is revolutionizing how teams collaborate and automate their workflows using cutting-edge AI technology. Our platform integrates with 100+ tools to streamline your entire operational stack.',
    image: '/workflow-automation-dashboard.png',
    category: 'AI/ML',
    stage: 'mvp',
    teamSize: 5,
    featured: true,
    teamMembers: [defaultUsers[0], defaultUsers[1], defaultUsers[2]],
    website: 'https://techflow.io',
    email: 'hello@techflow.io',
    founded: new Date('2023-06-15'),
    location: 'San Francisco, CA',
    techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'OpenAI'],
    hiringStatus: 'actively-hiring',
    seekingInvestors: true,
    productLink: 'https://app.techflow.io',
    metrics: { users: 1250, arr: 45000, monthlyGrowth: 12 },
    fundingRounds: [
      {
        id: 'round-1',
        stage: 'seed',
        amount: 500000,
        date: new Date('2023-08-01'),
        investors: ['Sequoia Capital', 'Andreessen Horowitz'],
        description: 'Seed round to build the MVP'
      }
    ],
    investors: [
      {
        id: 'inv-1',
        name: 'Sequoia Capital',
        type: 'VC',
        invested: 300000,
        date: new Date('2023-08-01'),
        contact: 'invest@sequoia.com'
      },
      {
        id: 'inv-2',
        name: 'Andreessen Horowitz',
        type: 'VC',
        invested: 200000,
        date: new Date('2023-08-01'),
        contact: 'invest@a16z.com'
      }
    ],
    jobs: [
      {
        id: 'job-1',
        title: 'Senior Full Stack Engineer',
        role: 'Developer',
        description: 'Lead the development of our platform',
        location: 'San Francisco, CA',
        salary: { min: 150000, max: 200000 },
        type: 'Full-time',
        posted: new Date(Date.now() - 86400000),
        status: 'open',
        applicants: 3,
        applicantsList: jobApplicants['job-1']
      },
      {
        id: 'job-2',
        title: 'Product Manager',
        role: 'Product Manager',
        description: 'Drive product strategy and roadmap',
        location: 'Remote',
        salary: { min: 120000, max: 160000 },
        type: 'Full-time',
        posted: new Date(Date.now() - 172800000),
        status: 'open',
        applicants: 2,
        applicantsList: jobApplicants['job-2']
      }
    ],
    recentUpdates: [
      {
        title: 'We raised $500K in seed funding!',
        date: new Date(Date.now() - 604800000),
        content: 'Excited to announce our seed round with Sequoia and a16z'
      },
      {
        title: 'New AI features released',
        date: new Date(Date.now() - 1209600000),
        content: 'Launched smart automation recommendations powered by GPT-4'
      }
    ]
  },
  {
    id: '2',
    name: 'DataViz',
    description: 'Real-time data visualization and analytics',
    description_long: 'DataViz helps businesses understand their data through beautiful, interactive visualizations and real-time analytics dashboards.',
    image: '/data-analytics-charts.png',
    category: 'Analytics',
    stage: 'early-stage',
    teamSize: 3,
    featured: true,
    teamMembers: [defaultUsers[1], defaultUsers[2]],
    website: 'https://dataviz.io',
    email: 'hello@dataviz.io',
    founded: new Date('2023-03-20'),
    location: 'New York, NY',
    techStack: ['Vue.js', 'D3.js', 'Python', 'MongoDB'],
    hiringStatus: 'actively-hiring',
    seekingInvestors: true,
    productLink: 'https://app.dataviz.io',
    metrics: { users: 750, arr: 28000, monthlyGrowth: 18 },
    jobs: [
      {
        id: 'job-3',
        title: 'Frontend Engineer',
        role: 'Developer',
        description: 'Build beautiful data visualization components',
        location: 'New York, NY',
        salary: { min: 110000, max: 150000 },
        type: 'Full-time',
        posted: new Date(Date.now() - 259200000),
        status: 'open',
        applicants: 1,
        applicantsList: jobApplicants['job-3']
      }
    ]
  },
  {
    id: '3',
    name: 'HealthConnect',
    description: 'Connecting patients with healthcare providers',
    description_long: 'HealthConnect is building the future of healthcare by connecting patients with trusted medical professionals through a seamless digital platform.',
    image: '/healthcare-platform.png',
    category: 'HealthTech',
    stage: 'growth',
    teamSize: 8,
    featured: false,
    teamMembers: [defaultUsers[0], defaultUsers[1], defaultUsers[2], defaultUsers[0]],
    website: 'https://healthconnect.io',
    email: 'hello@healthconnect.io',
    founded: new Date('2022-09-10'),
    location: 'Boston, MA',
    techStack: ['React Native', 'Node.js', 'Firebase', 'ML'],
    hiringStatus: 'actively-hiring',
    seekingInvestors: false,
    productLink: 'https://app.healthconnect.io',
    metrics: { users: 5000, arr: 150000, monthlyGrowth: 8 },
    fundingRounds: [
      {
        id: 'round-2',
        stage: 'series-a',
        amount: 2000000,
        date: new Date('2023-12-01'),
        investors: ['Founders Fund', 'Y Combinator'],
        description: 'Series A to expand market reach'
      }
    ]
  },
  {
    id: '4',
    name: 'ShopLocal',
    description: 'Empowering local merchants to go digital',
    description_long: 'ShopLocal empowers small businesses and local merchants to establish and grow their online presence without technical expertise.',
    image: '/ecommerce-platform-concept.png',
    category: 'E-commerce',
    stage: 'mvp',
    teamSize: 6,
    featured: false,
    teamMembers: [defaultUsers[0], defaultUsers[2], defaultUsers[1]],
    website: 'https://shoplocal.io',
    email: 'hello@shoplocal.io',
    founded: new Date('2023-11-01'),
    location: 'Austin, TX',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    hiringStatus: 'planning',
    seekingInvestors: true,
    productLink: 'https://app.shoplocal.io',
    metrics: { users: 380, monthlyGrowth: 25 }
  },
];

export const defaultNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'message',
    title: 'New message from Sarah Chen',
    message: 'Thanks for reaching out! Interested in discussing partnership...',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    link: '/messages'
  },
  {
    id: 'notif-2',
    type: 'application',
    title: 'New job application',
    message: '2 new applications for Senior Full Stack Engineer position',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
    link: '/MyStartups'
  },
  {
    id: 'notif-3',
    type: 'view',
    title: 'Profile views increased',
    message: 'Your startup profile was viewed 15 times today',
    timestamp: new Date(Date.now() - 86400000),
    read: true,
    link: '/startups/1'
  },
];

export const CATEGORIES = ['All Categories', 'AI/ML', 'Analytics', 'HealthTech', 'E-commerce'];
export const STAGES = ['mvp', 'growth', 'early-stage', 'idea'];
export const INDUSTRIES = ['Tech', 'Education', 'Healthcare', 'Fintech', 'E-commerce', 'Social', 'AI/ML', 'Gaming', 'Other'];
