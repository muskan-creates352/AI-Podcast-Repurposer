"use client";

import React, { useState, useMemo } from 'react';
import { Podcast } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, Mic, Clock, Calendar, Layers, Trash2, Eye, Podcast as PodcastIcon } from 'lucide-react';

interface PodcastsPageProps {
  podcasts: Podcast[];
  onViewPodcast: (id: string) => void;
  onDeletePodcast: (id: string) => void;
}

export function PodcastsPage({ podcasts, onViewPodcast, onDeletePodcast }: PodcastsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Newest');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredAndSortedPodcasts = useMemo(() => {
    let result = podcasts;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.podcastTitle.toLowerCase().includes(lowerQuery) ||
          p.episodeTitle.toLowerCase().includes(lowerQuery)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status.toLowerCase() === statusFilter.toLowerCase());
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'Newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'Oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case 'Title A-Z':
          return a.podcastTitle.localeCompare(b.podcastTitle);
        case 'Title Z-A':
          return b.podcastTitle.localeCompare(a.podcastTitle);
        default:
          return 0;
      }
    });

    return result;
  }, [podcasts, searchQuery, statusFilter, sortOption]);

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      onDeletePodcast(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <select
            className="w-full md:w-auto block pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="ready">Ready</option>
            <option value="processing">Processing</option>
            <option value="draft">Draft</option>
          </select>
          
          <select
            className="w-full md:w-auto block pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm rounded-lg"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Title A-Z">Title A-Z</option>
            <option value="Title Z-A">Title Z-A</option>
          </select>
        </div>
      </div>

      {filteredAndSortedPodcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredAndSortedPodcasts.map((podcast) => (
            <div key={podcast.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col hover:shadow-lg hover:shadow-purple-500/5 transition group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex-shrink-0">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white line-clamp-1">{podcast.podcastTitle}</h3>
                    <p className="text-sm text-gray-400">Episode {podcast.episodeNumber}: {podcast.episodeTitle}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
                {podcast.description || 'No description provided.'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{podcast.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(podcast.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Layers className="h-4 w-4" />
                  <span>{podcast.contentCount || 0} pieces</span>
                </div>
              </div>
              
              <div className="mb-4">
                <StatusBadge status={podcast.status} />
              </div>
              
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-800">
                <button 
                  onClick={() => onViewPodcast(podcast.id)}
                  className="flex-1 flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Eye className="h-4 w-4" /> View Details
                </button>
                <button 
                  onClick={() => setDeleteTargetId(podcast.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                  aria-label="Delete podcast"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={PodcastIcon}
          title={podcasts.length === 0 ? "No podcasts yet" : "No podcasts found"}
          description={podcasts.length === 0 ? "Upload your first podcast to get started." : "Try adjusting your search or filters."}
        />
      )}

      {deleteTargetId && (
        <ConfirmDialog
          isOpen={true}
          title="Delete Podcast"
          message="Are you sure you want to delete this podcast? This action cannot be undone."
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
