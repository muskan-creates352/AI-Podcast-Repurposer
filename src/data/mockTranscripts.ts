import { TranscriptSegment } from '../types';

export const mockTranscript: TranscriptSegment[] = [
  {
    id: 'seg-1',
    timestamp: '00:00:00',
    speaker: 'Host',
    text: 'Welcome back to Tech Talk Daily. I am your host, Alex, and today we have a fascinating topic: The Future of AI in Content Creation. Joining me is Maya, a lead AI researcher.',
  },
  {
    id: 'seg-2',
    timestamp: '00:00:30',
    speaker: 'Guest',
    text: 'Thanks for having me, Alex. It\'s great to be here.',
  },
  {
    id: 'seg-3',
    timestamp: '00:00:35',
    speaker: 'Host',
    text: 'Maya, let\'s jump right in. We hear so much about generative AI taking over content creation. What\'s your take on the current state of things?',
  },
  {
    id: 'seg-4',
    timestamp: '00:01:05',
    speaker: 'Guest',
    text: 'Well, it\'s definitely a transformative period. Right now, AI is fantastic as an assistant. It helps with brainstorming, drafting, and repurposing content. But it still lacks that genuine human touch—the unique voice that audiences really connect with.',
  },
  {
    id: 'seg-5',
    timestamp: '00:02:15',
    speaker: 'Host',
    text: 'That makes sense. So, you see it more as a co-pilot rather than a replacement?',
  },
  {
    id: 'seg-6',
    timestamp: '00:02:25',
    speaker: 'Guest',
    text: 'Exactly. For instance, a creator can record a podcast, and then use AI to quickly draft show notes, social media posts, and blog articles based on that audio. It drastically reduces the manual labor involved in distribution.',
  },
  {
    id: 'seg-7',
    timestamp: '00:03:40',
    speaker: 'Host',
    text: 'What are the main challenges right now? I know hallucination is a big buzzword.',
  },
  {
    id: 'seg-8',
    timestamp: '00:03:55',
    speaker: 'Guest',
    text: 'Hallucination is certainly an issue—where the AI confidently presents false information. But for content repurposing, where the AI is grounded in the original transcript, this risk is significantly lower.',
  },
  {
    id: 'seg-9',
    timestamp: '00:05:10',
    speaker: 'Host',
    text: 'That\'s a great point. Grounding the AI in actual content is key.',
  },
  {
    id: 'seg-10',
    timestamp: '00:05:20',
    speaker: 'Guest',
    text: 'Yes, and the other challenge is maintaining tone. An AI can summarize well, but making sure a Twitter thread sounds exactly like the creator is something that still requires a bit of manual tweaking and good prompting.',
  },
  {
    id: 'seg-11',
    timestamp: '00:07:00',
    speaker: 'Host',
    text: 'So prompt engineering is still a valuable skill?',
  },
  {
    id: 'seg-12',
    timestamp: '00:07:05',
    speaker: 'Guest',
    text: 'Absolutely. Knowing how to guide the AI to get the desired output is crucial. But we are seeing tools emerge that abstract this away, providing easy interfaces for creators.',
  },
  {
    id: 'seg-13',
    timestamp: '00:08:30',
    speaker: 'Host',
    text: 'Looking ahead to the next few years, what excites you the most?',
  },
  {
    id: 'seg-14',
    timestamp: '00:08:45',
    speaker: 'Guest',
    text: 'Multimodal AI. The ability to seamlessly translate a long-form video into a blog post, a short-form video clip, and an infographic all at once. That workflow will become nearly instant.',
  },
  {
    id: 'seg-15',
    timestamp: '00:10:00',
    speaker: 'Host',
    text: 'Wow. That will completely change the economics of content creation. Maya, thank you so much for your insights today.',
  },
  {
    id: 'seg-16',
    timestamp: '00:10:15',
    speaker: 'Guest',
    text: 'My pleasure, Alex. Thanks for having me.',
  }
];
