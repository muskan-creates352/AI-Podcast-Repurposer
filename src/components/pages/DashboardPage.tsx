"use client";

import React from 'react';
import { Podcast } from '@/types';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Mic, FileText, Loader2, CheckCircle2, Plus, Clock, Calendar, Layers } from 'lucide-react';

interface DashboardPageProps {
  podcasts: Podcast[];
  onViewPodcast: (id: string) => void;
  onNewPodcast: () => void;
}

export function DashboardPage({ podcasts, onViewPodcast, onNewPodcast }: DashboardPageProps) {
  const contentGenerated = podcasts.reduce((acc, p) => acc + (p.contentCount || 0), 0);
  const processingCount = podcasts.filter(p => p.status === 'processing').length;
  const completedCount = podcasts.filter(p => p.status === 'ready').length;
  
  const recentPodcasts = podcasts.slice(0, 4);

  const contentOverview = [
    { type: 'LinkedIn', count: 10 },
    { type: 'Twitter', count: 8 },
    { type: 'Summary', count: 7 },
    { type: 'Takeaways', count: 5 },
    { type: 'Show Notes', count: 5 },
    { type: 'Instagram', count: 4 },
    { type: 'Video Ideas', count: 2 },
    { type: 'Blog', count: 1 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Welcome back, Muskan 👋</h1>
          <p className="text-gray-400">Turn every podcast episode into content that travels further.</p>
        </div>
        <button 
          onClick={onNewPodcast}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          New Podcast
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Podcasts"
          value={podcasts.length}
          icon={Mic}
          trend="+12%"
        />
        <StatCard
          title="Content Generated"
          value={contentGenerated}
          icon={FileText}
          trend="+24%"
        />
        <StatCard
          title="Processing"
          value={processingCount}
          icon={Loader2}
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Podcasts Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Podcasts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPodcasts.map(podcast => (
              <div key={podcast.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-purple-500/30 transition-colors group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">{podcast.podcastTitle}</h3>
                    <p className="text-sm text-gray-400 truncate">Episode {podcast.episodeNumber || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{podcast.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(podcast.uploadDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{podcast.contentCount || 0} pieces</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                  <StatusBadge status={podcast.status as any} />
                  <button 
                    onClick={() => onViewPodcast(podcast.id)}
                    className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Overview Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Content Overview</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="space-y-5">
              {contentOverview.map((item, index) => {
                const maxCount = 10;
                const width = `${(item.count / maxCount) * 100}%`;
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">{item.type}</span>
                      <span className="text-gray-400">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
