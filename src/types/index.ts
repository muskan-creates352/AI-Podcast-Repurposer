export interface User {
  name: string;
  role: string;
}

export type PodcastStatus = 'processing' | 'ready' | 'draft' | 'failed';

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  duration: string;
  uploadDate: string;
  status: PodcastStatus;
  contentCount: number;
}

export interface TranscriptSegment {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
}

export type ContentPlatform = 'LinkedIn' | 'Instagram' | 'X' | 'YouTube';
export type ContentType = 'LinkedIn Post' | 'Instagram Caption' | 'X Post' | 'Quote' | 'Summary' | 'Show Notes' | 'Short Video Script';
export type ContentTone = 'Professional' | 'Casual' | 'Educational' | 'Engaging';

export interface GeneratedContent {
  id: string;
  podcastId: string;
  type: ContentType;
  platform: ContentPlatform;
  tone: ContentTone;
  content: string;
  createdAt: string;
}

export interface AnalyticsData {
  totalPodcasts: number;
  totalContent: number;
  processing: number;
  completed: number;
}
