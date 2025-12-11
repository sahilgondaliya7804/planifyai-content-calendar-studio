export type Platform = 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok';

export type PostStatus = 'idea' | 'draft' | 'approved' | 'scheduled' | 'published';

export type ContentType = 'post' | 'reel' | 'story' | 'short' | 'video' | 'article';

export interface Post {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  status: PostStatus;
  contentType: ContentType;
  scheduledDate?: Date;
  publishedDate?: Date;
  tags: string[];
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AIContentSuggestion {
  id: string;
  title: string;
  caption: string;
  platform: Platform;
  suggestedDateRange: {
    start: Date;
    end: Date;
  };
  hashtags: string[];
  contentType: ContentType;
}

export interface AnalyticsData {
  date: string;
  engagement: number;
  views: number;
  posts: number;
}

export interface PlatformStats {
  platform: Platform;
  posts: number;
  engagement: number;
}

export interface ContentTypeStats {
  type: ContentType;
  count: number;
  percentage: number;
}

export interface KPIData {
  scheduledThisWeek: number;
  publishedThisMonth: number;
  bestPlatform: Platform;
  totalEngagement: number;
  growthPercentage: number;
}

export type View = 'calendar' | 'ai' | 'analytics' | 'backlog';

export interface DateRange {
  start: Date;
  end: Date;
}
