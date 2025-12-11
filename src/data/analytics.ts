import { AnalyticsData, PlatformStats, ContentTypeStats, KPIData, Platform, ContentType } from '@/types';
import { format, subDays } from 'date-fns';

export const generateAnalyticsData = (): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'MMM dd'),
      engagement: Math.floor(Math.random() * 5000) + 1000,
      views: Math.floor(Math.random() * 15000) + 5000,
      posts: Math.floor(Math.random() * 5) + 1,
    });
  }

  return data;
};

export const generatePlatformStats = (): PlatformStats[] => {
  return [
    { platform: 'instagram', posts: 45, engagement: 23500 },
    { platform: 'twitter', posts: 78, engagement: 15800 },
    { platform: 'youtube', posts: 12, engagement: 45000 },
    { platform: 'linkedin', posts: 23, engagement: 8900 },
    { platform: 'tiktok', posts: 34, engagement: 67000 },
  ];
};

export const generateContentTypeStats = (): ContentTypeStats[] => {
  const types: ContentType[] = ['post', 'reel', 'story', 'short', 'video', 'article'];
  const counts = [35, 28, 45, 22, 15, 12];
  const total = counts.reduce((a, b) => a + b, 0);

  return types.map((type, index) => ({
    type,
    count: counts[index],
    percentage: Math.round((counts[index] / total) * 100),
  }));
};

export const generateKPIData = (): KPIData => {
  return {
    scheduledThisWeek: 12,
    publishedThisMonth: 47,
    bestPlatform: 'tiktok',
    totalEngagement: 160200,
    growthPercentage: 23.5,
  };
};

export const platformColors: Record<Platform, string> = {
  instagram: '#E4405F',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  linkedin: '#0A66C2',
  tiktok: '#00F2EA',
};

export const contentTypeColors: Record<ContentType, string> = {
  post: '#8B5CF6',
  reel: '#EC4899',
  story: '#F59E0B',
  short: '#10B981',
  video: '#EF4444',
  article: '#3B82F6',
};
