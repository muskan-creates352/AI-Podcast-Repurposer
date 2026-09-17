import { Podcast, TranscriptSegment, GeneratedContent, AnalyticsData } from '../types';

export const mockPodcasts: Podcast[] = [
  { id: '1', title: 'The Future of AI in SaaS', description: 'Exploring how generative AI is reshaping B2B software and workflow automation.', category: 'Technology', language: 'English', duration: '45:20', uploadDate: '2026-09-10T10:00:00Z', status: 'ready', contentCount: 12 },
  { id: '2', title: 'Building a Creator-Led Business', description: 'Strategies for leveraging audience trust to build sustainable product revenue.', category: 'Business', language: 'English', duration: '38:15', uploadDate: '2026-09-12T14:30:00Z', status: 'ready', contentCount: 8 },
  { id: '3', title: 'From Ideas to Impact', description: 'A deep dive into execution frameworks for early-stage startup founders.', category: 'Entrepreneurship', language: 'English', duration: '51:00', uploadDate: '2026-09-14T09:15:00Z', status: 'ready', contentCount: 5 },
  { id: '4', title: 'The Modern Content Economy', description: 'How algorithms are changing the way we consume and create media in 2026.', category: 'Media', language: 'English', duration: '42:10', uploadDate: '2026-09-16T11:20:00Z', status: 'processing', contentCount: 0 }
];

export const mockTranscripts: TranscriptSegment[] = [
  { id: 't1', timestamp: '00:00:00', speaker: 'Host', text: 'Welcome back to the podcast. Today, we are exploring a monumental shift in software—AI.' },
  { id: 't2', timestamp: '00:00:15', speaker: 'Guest', text: 'Thanks for having me. The reality is, if you are building SaaS today without an LLM strategy, you are already behind.' },
  { id: 't3', timestamp: '00:00:45', speaker: 'Host', text: 'I completely agree. But where do you see the highest ROI? Is it in content generation, data analysis, or internal tooling?' },
  { id: 't4', timestamp: '00:01:10', speaker: 'Guest', text: 'It is actually in workflow orchestration. Agents communicating with agents to solve complex, multi-step tasks without human intervention.' },
  { id: 't5', timestamp: '00:01:40', speaker: 'Host', text: 'Fascinating. Let us unpack that workflow orchestration concept further.' },
];

export const mockGeneratedContent: GeneratedContent[] = [
  { id: 'c1', podcastId: '1', type: 'LinkedIn Post', platform: 'LinkedIn', tone: 'Professional', content: 'Are you building SaaS without an AI strategy?\n\nIn our latest episode, we discussed why workflow orchestration is the true ROI driver for modern software companies.\n\nKey takeaway: It is no longer just about generating text; it is about agents completing multi-step tasks autonomously.\n\nListen to the full breakdown. 🎙️\n\n#SaaS #ArtificialIntelligence #Startups #FutureOfWork', createdAt: '2026-09-11T11:00:00Z' },
  { id: 'c2', podcastId: '1', type: 'X Post', platform: 'X', tone: 'Engaging', content: 'Stop using AI just to write emails.\n\nThe real alpha is in workflow orchestration—autonomous agents solving complex tasks.\n\nJust dropped a masterclass episode on this. Link below 👇\n\n#AI #TechTrends', createdAt: '2026-09-11T11:15:00Z' },
  { id: 'c3', podcastId: '2', type: 'Summary', platform: 'LinkedIn', tone: 'Educational', content: 'Episode Summary: Building a Creator-Led Business\n\nWe break down how modern creators are shifting from sponsorships to owned products, leveraging audience trust to build sustainable SaaS and e-commerce brands.', createdAt: '2026-09-13T09:00:00Z' },
];

export const mockAnalytics: AnalyticsData = {
  totalPodcasts: 8,
  totalContent: 42,
  processing: 1,
  completed: 7
};
