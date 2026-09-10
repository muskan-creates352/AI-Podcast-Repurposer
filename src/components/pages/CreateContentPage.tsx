'use client';

import React, { useState } from 'react';
import { Podcast, ContentType, Tone } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, Copy, Save, RefreshCw, FileText, Wand2 } from 'lucide-react';

interface CreateContentPageProps {
  podcasts: Podcast[];
}

const contentTemplates: Record<ContentType, Record<Tone, string[]>> = {
  summary: {
    professional: [
      "In this episode of {podcastTitle}, we explore...",
      "This executive summary of {podcastTitle} covers...",
    ],
    casual: [
      "Hey folks! This week on {podcastTitle}, we talked about...",
      "Just finished recording {podcastTitle}, and it was a blast! We covered...",
    ],
    educational: [
      "In this insightful episode of {podcastTitle}, you will learn...",
      "The core lessons from {podcastTitle} revolve around...",
    ],
    engaging: [
      "You won't believe what we discovered in this episode of {podcastTitle}...",
      "Ready to level up? This episode of {podcastTitle} breaks down...",
    ]
  },
  'show-notes': {
    professional: [
      "Show Notes: {podcastTitle}\n\nTopics Covered:\n- Point 1\n- Point 2\n\nLinks:",
      "Episode Breakdown: {podcastTitle}\n\nKey Segments:\n- Intro\n- Deep Dive\n- Q&A\n\nResources:",
    ],
    casual: [
      "What went down in {podcastTitle}:\n- The funny story about...\n- Why we think...\n\nStuff we mentioned:",
      "Notes for {podcastTitle}:\n\nWe chatted about:\n- Topic A\n- Topic B\n\nLinks below:",
    ],
    educational: [
      "Educational Guide for {podcastTitle}:\n\nKey Concepts:\n1. Concept 1\n2. Concept 2\n\nFurther Reading:",
      "Study Notes for {podcastTitle}:\n\nDefinitions:\n- Term A\n- Term B\n\nReferences:",
    ],
    engaging: [
      "Must-read notes for {podcastTitle}!\n\nHighlights:\n- The surprising truth about...\n- How to actually...\n\nLinks:",
      "Your cheat sheet for {podcastTitle}:\n\nGolden Nuggets:\n- Insight 1\n- Insight 2\n\nResources:",
    ]
  },
  linkedin: {
    professional: [
      "I'm excited to share our latest episode of {podcastTitle}. We discuss key industry trends...",
      "New release: {podcastTitle}. A deep dive into strategic growth and innovation...",
    ],
    casual: [
      "Just wrapped up {podcastTitle}! It was a great chat about...",
      "Sharing some thoughts from our recent episode, {podcastTitle}. Grab a coffee and listen!",
    ],
    educational: [
      "Learning opportunity! In {podcastTitle}, we break down complex topics like...",
      "Want to understand the mechanics of X? Check out {podcastTitle} where we explain...",
    ],
    engaging: [
      "🎙️ Just published a new episode: {podcastTitle}! What's your take on...",
      "Is the industry changing too fast? We debate this in {podcastTitle}. Listen and comment below!",
    ]
  },
  twitter: {
    professional: [
      "We've released a new episode of {podcastTitle} focusing on professional development. Listen here: [link]",
      "Our latest discussion on {podcastTitle} covers strategic insights. #Podcast #Business",
    ],
    casual: [
      "New ep just dropped! 🔥 Check out {podcastTitle} here: [link]",
      "Had so much fun recording {podcastTitle}. Listen now! 🎧",
    ],
    educational: [
      "Learn the basics of X in our new episode of {podcastTitle}. Thread below 🧵",
      "Did you know? We explain this and more in {podcastTitle}. 🧠💡",
    ],
    engaging: [
      "What if everything you knew was wrong? Find out in {podcastTitle}. 🤯 Listen now!",
      "Drop a 💯 if you agree with our latest take in {podcastTitle}!",
    ]
  },
  instagram: {
    professional: [
      "A glimpse into our latest episode of {podcastTitle}. Link in bio to listen.",
      "Professional insights on {podcastTitle}. Swipe to learn more.",
    ],
    casual: [
      "Behind the scenes of {podcastTitle}! 📸 Link in bio.",
      "Just hanging out and talking about stuff on {podcastTitle}. ✌️",
    ],
    educational: [
      "Swipe for a quick lesson from {podcastTitle}! 📚",
      "Did you catch these facts from {podcastTitle}? Learn more at the link in bio.",
    ],
    engaging: [
      "Sound on! 🔊 Snippet from {podcastTitle}. What do you think?",
      "Double tap if you learned something new from {podcastTitle} today! ❤️",
    ]
  },
  blog: {
    professional: [
      "Title: A Comprehensive Guide based on {podcastTitle}\n\nIntroduction:\nIn recent discussions...",
      "Title: Strategic Insights from {podcastTitle}\n\nExecutive Summary:\nWe recently explored...",
    ],
    casual: [
      "Title: My Thoughts on {podcastTitle}\n\nHey everyone! Today I want to talk about...",
      "Title: The Story Behind {podcastTitle}\n\nSo, this happened...",
    ],
    educational: [
      "Title: Understanding Concepts from {podcastTitle}\n\nLesson 1:\nThe fundamental principle...",
      "Title: A Deep Dive into {podcastTitle}\n\nBackground:\nTo understand this fully...",
    ],
    engaging: [
      "Title: The Surprising Truth from {podcastTitle}\n\nYou won't believe what we uncovered...",
      "Title: 5 Things You Missed in {podcastTitle}\n\nNumber 3 will shock you...",
    ]
  },
  'video-ideas': {
    professional: [
      "Video Idea 1: Interview snippets from {podcastTitle}\nVideo Idea 2: Key presentation slides",
      "Video Idea 1: Animated infographic based on {podcastTitle}\nVideo Idea 2: Executive summary talking head",
    ],
    casual: [
      "Video Idea 1: Vlog style BTS of {podcastTitle}\nVideo Idea 2: Funny outtakes reel",
      "Video Idea 1: Reaction video to {podcastTitle}\nVideo Idea 2: Casual sit-down chat",
    ],
    educational: [
      "Video Idea 1: Whiteboard explainer from {podcastTitle}\nVideo Idea 2: Step-by-step tutorial",
      "Video Idea 1: Screen recording demo from {podcastTitle}\nVideo Idea 2: Fact-checking video",
    ],
    engaging: [
      "Video Idea 1: TikTok style hook from {podcastTitle}\nVideo Idea 2: Interactive Q&A live stream",
      "Video Idea 1: Challenge video based on {podcastTitle}\nVideo Idea 2: Poll discussion reel",
    ]
  },
  'key-takeaways': {
    professional: [
      "Key Takeaways from {podcastTitle}:\n1. Strategic alignment is crucial.\n2. Market trends are shifting.",
      "Executive Summary of Takeaways - {podcastTitle}:\n- ROI optimization\n- Risk mitigation",
    ],
    casual: [
      "TL;DR of {podcastTitle}:\n- Stuff happens.\n- It's cool.",
      "Main points from {podcastTitle}:\n- Don't sweat the small stuff.\n- Have fun.",
    ],
    educational: [
      "Core Lessons from {podcastTitle}:\n1. The definition of X.\n2. The application of Y.",
      "Study Guide for {podcastTitle}:\n- Theory A\n- Theory B",
    ],
    engaging: [
      "Mind-blowing Takeaways from {podcastTitle}:\n💥 The secret to success!\n💥 Why you're doing it wrong!",
      "Top 3 Hacks from {podcastTitle}:\n🚀 Boost your productivity.\n🚀 Save time.",
    ]
  }
};

const generateMockContent = (type: ContentType, tone: Tone, podcastTitle: string, index: number = 0): string => {
  const templates = contentTemplates[type]?.[tone] || contentTemplates['summary']['professional'];
  const templateIndex = index % templates.length;
  return templates[templateIndex].replace(/{podcastTitle}/g, podcastTitle);
};

export default function CreateContentPage({ podcasts }: CreateContentPageProps) {
  const [selectedPodcastId, setSelectedPodcastId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<ContentType>('summary');
  const [selectedTone, setSelectedTone] = useState<Tone>('professional');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [generationCount, setGenerationCount] = useState<number>(0);
  const { showToast } = useToast();

  const handleGenerate = () => {
    if (!selectedPodcastId) return;
    const podcast = podcasts.find(p => p.id === selectedPodcastId);
    if (!podcast) return;

    const content = generateMockContent(selectedType, selectedTone, podcast.podcastTitle, generationCount);
    setGeneratedContent(content);
    setGenerationCount(prev => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    showToast('Copied to clipboard!', 'success');
  };

  const handleSave = () => {
    showToast('Content saved!', 'success');
  };

  const selectedPodcast = podcasts.find(p => p.id === selectedPodcastId);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Wand2 className="w-6 h-6 text-purple-500" />
          <h1 className="text-xl font-bold text-white">Content Generation Studio</h1>
        </div>
        <p className="text-gray-400">Select a podcast episode and configure content generation options.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Select Episode</label>
            <select
              value={selectedPodcastId}
              onChange={(e) => setSelectedPodcastId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Choose an episode...</option>
              {podcasts.map(podcast => (
                <option key={podcast.id} value={podcast.id}>
                  {podcast.podcastTitle} (Ep. {podcast.episodeNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Content Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ContentType)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="summary">Summary</option>
              <option value="show-notes">Show Notes</option>
              <option value="linkedin">LinkedIn Post</option>
              <option value="twitter">X/Twitter Post</option>
              <option value="instagram">Instagram Caption</option>
              <option value="blog">Blog Draft</option>
              <option value="video-ideas">Video Ideas</option>
              <option value="key-takeaways">Key Takeaways</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Tone</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as Tone)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="educational">Educational</option>
              <option value="engaging">Engaging</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedPodcastId}
          className={`flex items-center justify-center gap-2 mt-6 px-6 py-2.5 rounded-lg text-white font-medium transition-all w-full md:w-auto shadow-lg ${
            !selectedPodcastId
              ? 'bg-gray-700 opacity-50 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 shadow-purple-500/20'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Generate Content
        </button>
      </div>

      {generatedContent && selectedPodcast && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mt-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-semibold text-white capitalize flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  {selectedType.replace('-', ' ')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-medium capitalize">
                  {selectedTone} Tone
                </span>
              </div>
              <p className="text-sm text-gray-400">From: {selectedPodcast.podcastTitle}</p>
            </div>
          </div>

          <textarea
            value={generatedContent}
            onChange={(e) => setGeneratedContent(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y transition-all"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors text-sm font-medium ml-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>

          <p className="text-xs text-gray-500 italic mt-4 flex items-center gap-1.5">
            <span>⚡</span> This content is generated using templates. Connect an AI backend for intelligent content generation.
          </p>
        </div>
      )}
    </div>
  );
}
