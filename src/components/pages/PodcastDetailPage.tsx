"use client";

import React, { useState } from 'react';
import { Podcast, ContentType } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockTranscript } from '@/data/mockTranscripts';
import { mockContent, alternativeContent } from '@/data/mockContent';
import { useToast } from '@/components/ui/Toast';
import { 
  ArrowLeft, Clock, Calendar, Copy, FileText, List, 
  Briefcase, MessageCircle, Camera, BookOpen, Video, Key,
  Pencil, Save, RefreshCw
} from 'lucide-react';

interface PodcastDetailPageProps {
  podcastId: string;
  podcasts: Podcast[];
  onBack: () => void;
}

const ICONS = {
  summary: FileText,
  'show-notes': List,
  linkedin: Briefcase,
  twitter: MessageCircle,
  instagram: Camera,
  blog: BookOpen,
  'video-ideas': Video,
  'key-takeaways': Key,
};

const DISPLAY_NAMES = {
  summary: 'Episode Summary',
  'show-notes': 'Show Notes',
  linkedin: 'LinkedIn Post',
  twitter: 'X/Twitter Post',
  instagram: 'Instagram Caption',
  blog: 'Blog Draft',
  'video-ideas': 'Short-form Video Ideas',
  'key-takeaways': 'Key Takeaways',
};

export function PodcastDetailPage({ podcastId, podcasts, onBack }: PodcastDetailPageProps) {
  const podcast = podcasts.find((p) => p.id === podcastId);
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'content'>('overview');
  const [transcriptSearch, setTranscriptSearch] = useState('');
  
  // States for content editing and regenerating
  const [editingContent, setEditingContent] = useState<Record<string, boolean>>({});
  const [currentContent, setCurrentContent] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (podcast) {
      Object.keys(DISPLAY_NAMES).forEach((type) => {
        const item = mockContent.find(c => c.type === type && c.podcastId === podcast.id);
        initial[type] = item ? item.content : '';
      });
    }
    return initial;
  });
  const [variantIndex, setVariantIndex] = useState<Record<string, number>>({});
  const [regenerating, setRegenerating] = useState<Record<string, boolean>>({});

  const { showToast } = useToast();

  if (!podcast) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Podcast Not Found</h2>
        <button onClick={onBack} className="text-purple-400 hover:text-purple-300 flex items-center justify-center mx-auto">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Library
        </button>
      </div>
    );
  }

  const handleCopyTranscript = () => {
    const text = mockTranscript.map(s => `[${s.timestamp}] ${s.speaker}: ${s.text}`).join('\n');
    navigator.clipboard.writeText(text);
    showToast('Transcript copied to clipboard!', 'success');
  };

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const toggleEdit = (type: string) => {
    setEditingContent(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleContentChange = (type: string, value: string) => {
    setCurrentContent(prev => ({ ...prev, [type]: value }));
  };

  const handleRegenerate = (type: string) => {
    setRegenerating(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      const typeKey = type as ContentType;
      const alts = alternativeContent[typeKey] || [];
      if (alts.length > 0) {
        const currIdx = variantIndex[type] || 0;
        const nextIdx = (currIdx + 1) % alts.length;
        setVariantIndex(prev => ({ ...prev, [type]: nextIdx }));
        setCurrentContent(prev => ({ ...prev, [type]: alts[nextIdx] }));
        showToast(`Regenerated ${DISPLAY_NAMES[typeKey]}`, 'success');
      } else {
        showToast('No alternative content available', 'error');
      }
      setRegenerating(prev => ({ ...prev, [type]: false }));
    }, 500);
  };

  // Helper for transcript highlighting
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-500/30 text-white">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-4 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Library
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">{podcast.podcastTitle}</h1>
        <p className="text-gray-400 text-lg mb-4">Episode {podcast.episodeNumber}: {podcast.episodeTitle}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{podcast.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(podcast.uploadDate).toLocaleDateString()}</span>
          </div>
          <StatusBadge status={podcast.status} />
        </div>
        <p className="text-gray-400 max-w-3xl">{podcast.description}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="-mb-px flex space-x-8">
          {(['overview', 'transcript', 'content'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab 
                  ? 'border-purple-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              {tab === 'overview' ? 'Overview' : tab === 'transcript' ? 'Transcript' : 'AI Content'}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Episode Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-white font-medium">{podcast.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Content Pieces Generated</p>
                  <p className="text-white font-medium">{podcast.contentCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Processing Status</p>
                  <StatusBadge status={podcast.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-300 whitespace-pre-wrap">{podcast.description}</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Content Generation</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(DISPLAY_NAMES).map(([key, name]) => {
                  const hasContent = !!currentContent[key];
                  return (
                    <span 
                      key={key} 
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        hasContent 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                          : 'bg-gray-800 text-gray-500 border-gray-700'
                      }`}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
                Generate All Content
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <input
                type="text"
                placeholder="Search transcript..."
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                className="w-full md:w-96 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                onClick={handleCopyTranscript}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
              >
                <Copy className="h-4 w-4" /> Copy Transcript
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-6">
              {mockTranscript.map((segment, idx) => {
                // Filter out non-matching segments if search is active
                if (transcriptSearch && !segment.text.toLowerCase().includes(transcriptSearch.toLowerCase())) {
                  return null;
                }
                
                return (
                  <div key={idx} className="pb-6 border-b border-gray-800/50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-400 font-mono text-sm">{segment.timestamp}</span>
                      <span className={`font-semibold ${segment.speaker === 'Host' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                        {segment.speaker}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {highlightText(segment.text, transcriptSearch)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(DISPLAY_NAMES).map(([type, title]) => {
                const Icon = ICONS[type as keyof typeof ICONS];
                const contentText = currentContent[type];
                const isEditing = editingContent[type];
                const isRegenerating = regenerating[type];

                return (
                  <div key={type} className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col h-[350px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-5 w-5 text-purple-400" />
                      <h3 className="text-white font-semibold flex-1">{title}</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto mb-4 bg-gray-950/50 rounded-lg border border-gray-800/50 p-4">
                      {isEditing ? (
                        <textarea
                          value={contentText}
                          onChange={(e) => handleContentChange(type, e.target.value)}
                          className="w-full h-full bg-transparent text-gray-300 focus:outline-none resize-none font-sans"
                        />
                      ) : (
                        <div className="text-gray-300 whitespace-pre-wrap font-sans text-sm">
                          {contentText || <span className="text-gray-600 italic">No content generated yet.</span>}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-800/50">
                      <button
                        onClick={() => handleCopyContent(contentText)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                        title="Copy content"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleEdit(type)}
                        className={`p-2 rounded-lg transition ${isEditing ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        title={isEditing ? "Save changes" : "Edit content"}
                      >
                        {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleRegenerate(type)}
                        disabled={isRegenerating}
                        className={`p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition ml-auto ${isRegenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Regenerate alternative"
                      >
                        <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-gray-500 italic text-center mt-8">
              🤖 Content generated using mock data. Connect an AI backend for real content generation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
