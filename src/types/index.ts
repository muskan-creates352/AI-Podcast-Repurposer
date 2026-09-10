// Podcast episode
export interface Podcast {
  id: string;
  podcastTitle: string;
  episodeTitle: string;
  episodeNumber: number;
  description: string;
  duration: string; // e.g. '45:30'
  uploadDate: string; // ISO date string
  status: 'ready' | 'processing' | 'draft';
  audioFile?: string;
  podcastUrl?: string;
  contentCount: number;
  transcript?: TranscriptSegment[];
  generatedContent?: GeneratedContent[];
}

// Transcript segment with timestamps and speaker labels
export interface TranscriptSegment {
  id: string;
  timestamp: string; // e.g. '00:02:30'
  speaker: string;
  text: string;
}

// AI-generated content piece
export interface GeneratedContent {
  id: string;
  podcastId: string;
  type: ContentType;
  content: string;
  tone: Tone;
  createdAt: string;
  isEdited: boolean;
}

export type ContentType = 
  | 'summary'
  | 'show-notes'
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'blog'
  | 'video-ideas'
  | 'key-takeaways';

export type Tone = 'professional' | 'casual' | 'educational' | 'engaging';

// Analytics data
export interface AnalyticsData {
  totalEpisodes: number;
  totalContentPieces: number;
  mostUsedContentType: string;
  avgContentPerEpisode: number;
  contentByType: { type: string; count: number }[];
  weeklyActivity: { week: string; episodes: number; content: number }[];
  recentActivity: { action: string; podcast: string; date: string; type: string }[];
}

// User preferences
export interface UserPreferences {
  name: string;
  email: string;
  defaultTone: Tone;
  preferredContentTypes: ContentType[];
  aiProvider: string;
  aiModel: string;
}

// For the new podcast form
export interface NewPodcastForm {
  podcastTitle: string;
  episodeTitle: string;
  episodeNumber: number;
  description: string;
  audioFile: File | null;
  podcastUrl: string;
}
