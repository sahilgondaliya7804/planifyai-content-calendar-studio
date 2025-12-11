import { AIContentSuggestion, Platform, ContentType } from '@/types';
import { addDays } from 'date-fns';

interface AIGenerationParams {
  topic: string;
  targetAudience: string;
  platform: Platform;
}

/**
 * Generates AI-powered content suggestions.
 * 
 * This is currently a mock implementation that returns simulated data.
 * To connect to a real AI API (e.g., OpenAI, Claude):
 * 
 * 1. Add your API key to your environment variables:
 *    VITE_AI_API_KEY=your_api_key_here
 * 
 * 2. Uncomment and modify the API call below
 * 
 * 3. Parse the API response and return formatted suggestions
 */
export async function generateContentIdeas(
  params: AIGenerationParams
): Promise<AIContentSuggestion[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // TODO: Replace with real AI API call
  // Example with OpenAI:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Generate 5 content ideas for ${params.platform} about ${params.topic} targeting ${params.targetAudience}...`
      }]
    }),
  });
  const data = await response.json();
  // Parse and return formatted suggestions
  */

  const { topic, targetAudience, platform } = params;
  const today = new Date();

  // Mock suggestions based on input
  const mockSuggestions: AIContentSuggestion[] = [
    {
      id: `ai-${Date.now()}-1`,
      title: `${topic}: Ultimate Guide for ${targetAudience}`,
      caption: `Discover everything you need to know about ${topic}. This comprehensive guide is perfect for ${targetAudience} looking to level up! 🚀`,
      platform,
      suggestedDateRange: {
        start: addDays(today, 1),
        end: addDays(today, 3),
      },
      hashtags: [`#${topic.replace(/\s/g, '')}`, '#tips', '#guide', '#viral'],
      contentType: platform === 'youtube' ? 'video' : platform === 'tiktok' ? 'short' : 'post',
    },
    {
      id: `ai-${Date.now()}-2`,
      title: `5 Myths About ${topic} Debunked`,
      caption: `Think you know everything about ${topic}? Think again! 🤔 Here are 5 common misconceptions that ${targetAudience} need to stop believing.`,
      platform,
      suggestedDateRange: {
        start: addDays(today, 3),
        end: addDays(today, 5),
      },
      hashtags: ['#mythbusters', `#${topic.replace(/\s/g, '')}`, '#facts'],
      contentType: 'reel',
    },
    {
      id: `ai-${Date.now()}-3`,
      title: `Day in the Life: ${topic} Edition`,
      caption: `Ever wondered what a day looks like when you're deep into ${topic}? Follow along as we show ${targetAudience} the real deal! ✨`,
      platform,
      suggestedDateRange: {
        start: addDays(today, 4),
        end: addDays(today, 6),
      },
      hashtags: ['#dayinthelife', '#vlog', `#${topic.replace(/\s/g, '')}`],
      contentType: 'story',
    },
    {
      id: `ai-${Date.now()}-4`,
      title: `${topic} Trends You Can't Ignore in 2024`,
      caption: `The landscape of ${topic} is changing fast. Here's what ${targetAudience} need to watch out for! 📈`,
      platform,
      suggestedDateRange: {
        start: addDays(today, 5),
        end: addDays(today, 7),
      },
      hashtags: ['#trends2024', `#${topic.replace(/\s/g, '')}`, '#insights'],
      contentType: platform === 'linkedin' ? 'article' : 'post',
    },
    {
      id: `ai-${Date.now()}-5`,
      title: `Quick Tips: Master ${topic} in 60 Seconds`,
      caption: `No time? No problem! ⏱️ Here are rapid-fire tips about ${topic} that every ${targetAudience.split(' ')[0]} should know.`,
      platform,
      suggestedDateRange: {
        start: addDays(today, 6),
        end: addDays(today, 8),
      },
      hashtags: ['#quicktips', '#60seconds', `#${topic.replace(/\s/g, '')}`],
      contentType: 'short',
    },
  ];

  return mockSuggestions;
}

/**
 * Generates hashtag suggestions based on topic and platform
 */
export async function generateHashtags(
  topic: string,
  platform: Platform
): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock hashtags - replace with real AI API call
  const baseHashtags = ['#viral', '#trending', '#fyp', '#content', '#creator'];
  const topicHashtag = `#${topic.replace(/\s/g, '').toLowerCase()}`;
  
  return [topicHashtag, ...baseHashtags.slice(0, 4)];
}

/**
 * Generates optimal posting times based on platform and audience
 */
export async function getOptimalPostingTimes(
  platform: Platform
): Promise<{ day: string; time: string }[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock optimal times - replace with analytics-based suggestions
  const times = {
    instagram: [
      { day: 'Monday', time: '11:00 AM' },
      { day: 'Wednesday', time: '7:00 PM' },
      { day: 'Friday', time: '12:00 PM' },
    ],
    twitter: [
      { day: 'Tuesday', time: '9:00 AM' },
      { day: 'Thursday', time: '12:00 PM' },
      { day: 'Saturday', time: '10:00 AM' },
    ],
    youtube: [
      { day: 'Saturday', time: '2:00 PM' },
      { day: 'Sunday', time: '11:00 AM' },
      { day: 'Thursday', time: '5:00 PM' },
    ],
    linkedin: [
      { day: 'Tuesday', time: '10:00 AM' },
      { day: 'Wednesday', time: '12:00 PM' },
      { day: 'Thursday', time: '9:00 AM' },
    ],
    tiktok: [
      { day: 'Tuesday', time: '7:00 PM' },
      { day: 'Thursday', time: '9:00 PM' },
      { day: 'Friday', time: '5:00 PM' },
    ],
  };

  return times[platform];
}
