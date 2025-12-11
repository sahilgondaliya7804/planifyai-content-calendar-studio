import { create } from 'zustand';
import { Post, View, DateRange, Platform, PostStatus, ContentType } from '@/types';
import { addDays, subDays, startOfWeek, endOfWeek, addWeeks } from 'date-fns';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation
  currentView: View;
  setCurrentView: (view: View) => void;

  // Sidebar
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Posts
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  movePostToDate: (id: string, newDate: Date) => void;

  // Filters
  selectedPlatforms: Platform[];
  setSelectedPlatforms: (platforms: Platform[]) => void;
  selectedStatuses: PostStatus[];
  setSelectedStatuses: (statuses: PostStatus[]) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modal states
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (isOpen: boolean) => void;
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (isOpen: boolean) => void;
}

// Generate mock data
const generateMockPosts = (): Post[] => {
  const platforms: Platform[] = ['instagram', 'twitter', 'youtube', 'linkedin', 'tiktok'];
  const statuses: PostStatus[] = ['idea', 'draft', 'approved', 'scheduled', 'published'];
  const contentTypes: ContentType[] = ['post', 'reel', 'story', 'short', 'video', 'article'];
  const today = new Date();

  const posts: Post[] = [
    {
      id: '1',
      title: 'Product Launch Announcement',
      description: 'Exciting news about our new feature release! Get ready for something amazing.',
      platform: 'instagram',
      status: 'scheduled',
      contentType: 'reel',
      scheduledDate: addDays(today, 2),
      tags: ['product', 'launch', 'announcement'],
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      createdAt: subDays(today, 5),
      updatedAt: today,
    },
    {
      id: '2',
      title: 'Behind the Scenes',
      description: 'Take a peek at how we create magic in our studio.',
      platform: 'tiktok',
      status: 'draft',
      contentType: 'short',
      tags: ['bts', 'creative', 'team'],
      createdAt: subDays(today, 3),
      updatedAt: subDays(today, 1),
    },
    {
      id: '3',
      title: 'Weekly Tips Thread',
      description: 'Share your best productivity tips with our community.',
      platform: 'twitter',
      status: 'published',
      contentType: 'post',
      scheduledDate: subDays(today, 2),
      publishedDate: subDays(today, 2),
      tags: ['tips', 'productivity', 'community'],
      engagement: { likes: 234, comments: 45, shares: 89, views: 5600 },
      createdAt: subDays(today, 7),
      updatedAt: subDays(today, 2),
    },
    {
      id: '4',
      title: 'Tutorial: Getting Started Guide',
      description: 'Complete walkthrough of our platform features.',
      platform: 'youtube',
      status: 'scheduled',
      contentType: 'video',
      scheduledDate: addDays(today, 5),
      tags: ['tutorial', 'guide', 'beginners'],
      createdAt: subDays(today, 10),
      updatedAt: today,
    },
    {
      id: '5',
      title: 'Industry Insights Report',
      description: 'Our analysis of the latest market trends and what they mean for creators.',
      platform: 'linkedin',
      status: 'approved',
      contentType: 'article',
      tags: ['insights', 'market', 'trends'],
      createdAt: subDays(today, 4),
      updatedAt: subDays(today, 1),
    },
    {
      id: '6',
      title: 'Customer Success Story',
      description: 'How our client increased engagement by 300%.',
      platform: 'instagram',
      status: 'published',
      contentType: 'post',
      publishedDate: subDays(today, 4),
      tags: ['success', 'testimonial', 'growth'],
      engagement: { likes: 567, comments: 78, shares: 123, views: 8900 },
      createdAt: subDays(today, 8),
      updatedAt: subDays(today, 4),
    },
    {
      id: '7',
      title: 'Quick Poll: Favorite Feature',
      description: 'Let us know which feature you love most!',
      platform: 'twitter',
      status: 'scheduled',
      contentType: 'post',
      scheduledDate: addDays(today, 1),
      tags: ['poll', 'engagement', 'community'],
      createdAt: subDays(today, 2),
      updatedAt: today,
    },
    {
      id: '8',
      title: 'Morning Motivation',
      description: 'Start your day with an inspirational quote.',
      platform: 'instagram',
      status: 'idea',
      contentType: 'story',
      tags: ['motivation', 'quotes', 'morning'],
      createdAt: today,
      updatedAt: today,
    },
    {
      id: '9',
      title: 'Live Q&A Session',
      description: 'Join us for a live session answering your questions.',
      platform: 'youtube',
      status: 'approved',
      contentType: 'video',
      scheduledDate: addDays(today, 7),
      tags: ['live', 'qa', 'community'],
      createdAt: subDays(today, 6),
      updatedAt: subDays(today, 2),
    },
    {
      id: '10',
      title: 'Trending Sound Challenge',
      description: 'Join the viral challenge and show your creativity!',
      platform: 'tiktok',
      status: 'draft',
      contentType: 'short',
      tags: ['challenge', 'viral', 'trending'],
      createdAt: subDays(today, 1),
      updatedAt: today,
    },
  ];

  return posts;
};

export const useAppStore = create<AppState>((set) => ({
  // Theme
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Navigation
  currentView: 'calendar',
  setCurrentView: (view) => set({ currentView: view }),

  // Sidebar
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  // Posts
  posts: generateMockPosts(),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updates, updatedAt: new Date() } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  movePostToDate: (id, newDate) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, scheduledDate: newDate, updatedAt: new Date() } : post
      ),
    })),

  // Filters
  selectedPlatforms: [],
  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
  selectedStatuses: [],
  setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),
  dateRange: {
    start: startOfWeek(new Date()),
    end: endOfWeek(addWeeks(new Date(), 2)),
  },
  setDateRange: (range) => set({ dateRange: range }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Modal states
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
  isPostModalOpen: false,
  setIsPostModalOpen: (isOpen) => set({ isPostModalOpen: isOpen }),
  isNewPostModalOpen: false,
  setIsNewPostModalOpen: (isOpen) => set({ isNewPostModalOpen: isOpen }),
}));
