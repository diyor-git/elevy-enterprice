export interface CompanyReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  founded: number;
  location: string;
  website: string;
  description: string;
  size: string;
  rating: number;
  reviews: CompanyReview[];
  openPositions: number;
  internships: number;
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/logos/techcorp.svg',
    industry: 'Software Development',
    founded: 2018,
    location: 'San Francisco, CA',
    website: 'techcorp.com',
    description: 'Leading provider of cloud-based software solutions for enterprises',
    size: '500-1000',
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        author: 'Jane Doe',
        rating: 5,
        title: 'Great internship experience',
        content: 'Learned a lot during my internship. Great mentorship and team culture.',
        date: '2025-01-10',
        helpful: 24
      }
    ],
    openPositions: 12,
    internships: 5
  },
  {
    id: '2',
    name: 'FinanceHub',
    logo: '/logos/financehub.svg',
    industry: 'Financial Technology',
    founded: 2020,
    location: 'New York, NY',
    website: 'financehub.io',
    description: 'Innovative fintech platform revolutionizing banking and payments',
    size: '200-500',
    rating: 4.3,
    reviews: [
      {
        id: 'r2',
        author: 'John Smith',
        rating: 4,
        title: 'Good learning opportunity',
        content: 'Fast-paced environment with supportive team members.',
        date: '2025-01-05',
        helpful: 18
      }
    ],
    openPositions: 8,
    internships: 3
  },
  {
    id: '3',
    name: 'DataViz Analytics',
    logo: '/logos/dataviz.svg',
    industry: 'Data Analytics',
    founded: 2019,
    location: 'Austin, TX',
    website: 'dataviz.com',
    description: 'Advanced analytics platform helping businesses make data-driven decisions',
    size: '100-200',
    rating: 4.6,
    reviews: [],
    openPositions: 6,
    internships: 4
  }
];
