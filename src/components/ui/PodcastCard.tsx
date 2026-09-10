"use client";

import React from 'react';
import { Mic, Trash2, Clock, Calendar, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Podcast } from '@/types';

interface PodcastCardProps {
  podcast: Podcast;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, onView, onDelete }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-200 transform hover:-translate-y-1 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-gray-800 rounded-lg text-purple-500 group-hover:bg-purple-500/10 transition-colors">
            <Mic size={24} />
          </div>
          <StatusBadge status={podcast.status as any} />
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2" title={podcast.podcastTitle}>
          {podcast.podcastTitle}
        </h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-400">
            <Clock size={14} className="mr-2" />
            <span>{podcast.duration || 'Unknown duration'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={14} className="mr-2" />
            <span>{new Date(podcast.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <FileText size={14} className="mr-2" />
            <span>{podcast.contentCount || 0} pieces generated</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <button
            onClick={() => onView(podcast.id)}
            className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:from-purple-300 hover:to-cyan-300"
          >
            View Details
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(podcast.id);
            }}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete podcast"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
