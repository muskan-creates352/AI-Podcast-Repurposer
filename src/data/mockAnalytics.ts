import { AnalyticsData } from '../types';

export const mockAnalytics: AnalyticsData = {
  totalEpisodes: 8,
  totalContentPieces: 42,
  mostUsedContentType: 'LinkedIn Post',
  avgContentPerEpisode: 5.25, // 42 / 8
  contentByType: [
    { type: 'LinkedIn', count: 10 },
    { type: 'Twitter', count: 8 },
    { type: 'Summary', count: 7 },
    { type: 'Key Takeaways', count: 5 },
    { type: 'Show Notes', count: 5 },
    { type: 'Instagram', count: 4 },
    { type: 'Video Ideas', count: 2 },
    { type: 'Blog', count: 1 }
  ],
  weeklyActivity: [
    { week: 'Week 1', episodes: 1, content: 5 },
    { week: 'Week 2', episodes: 0, content: 2 },
    { week: 'Week 3', episodes: 2, content: 12 },
    { week: 'Week 4', episodes: 1, content: 6 },
    { week: 'Week 5', episodes: 1, content: 8 },
    { week: 'Week 6', episodes: 1, content: 1 },
    { week: 'Week 7', episodes: 1, content: 8 },
    { week: 'Week 8', episodes: 1, content: 0 },
  ],
  recentActivity: [
    { action: 'Generated', podcast: 'The Future of Generative AI', date: '2 hours ago', type: 'LinkedIn Post' },
    { action: 'Edited', podcast: 'The Future of Generative AI', date: '3 hours ago', type: 'Show Notes' },
    { action: 'Generated', podcast: 'The Future of Generative AI', date: '4 hours ago', type: 'Summary' },
    { action: 'Uploaded', podcast: 'The Future of Generative AI', date: '5 hours ago', type: 'Episode' },
    { action: 'Exported', podcast: 'Building Products in the AI Era', date: '1 day ago', type: 'Twitter Thread' },
    { action: 'Generated', podcast: 'The Creator Economy Explained', date: '3 days ago', type: 'Blog Post' },
    { action: 'Generated', podcast: 'The Creator Economy Explained', date: '3 days ago', type: 'Key Takeaways' },
    { action: 'Uploaded', podcast: 'The Creator Economy Explained', date: '4 days ago', type: 'Episode' },
    { action: 'Edited', podcast: 'From Startup Idea to Product', date: '1 week ago', type: 'Show Notes' },
    { action: 'Generated', podcast: 'From Startup Idea to Product', date: '1 week ago', type: 'Instagram Caption' },
  ],
};
