'use client';

import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ToastProvider } from '@/components/ui/Toast';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { PodcastsPage } from '@/components/pages/PodcastsPage';
import { PodcastDetailPage } from '@/components/pages/PodcastDetailPage';
import CreateContentPage from '@/components/pages/CreateContentPage';
import { AnalyticsPage } from '@/components/pages/AnalyticsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NewPodcastModal from '@/components/modals/NewPodcastModal';
import { usePodcastStore } from '@/hooks/usePodcastStore';

// Page title mapping for the header
const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  podcasts: 'Podcast Library',
  'create-content': 'Create Content',
  analytics: 'Analytics',
  settings: 'Settings',
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isNewPodcastModalOpen, setIsNewPodcastModalOpen] = useState(false);
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { podcasts, addPodcast, deletePodcast } = usePodcastStore();

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    setSelectedPodcastId(null);
    setIsMobileMenuOpen(false);
  }, []);

  const handleViewPodcast = useCallback((id: string) => {
    setSelectedPodcastId(id);
    setCurrentPage('podcast-detail');
  }, []);

  const handleBackToLibrary = useCallback(() => {
    setSelectedPodcastId(null);
    setCurrentPage('podcasts');
  }, []);

  // Determine current title
  const currentTitle = selectedPodcastId 
    ? 'Podcast Details' 
    : pageTitles[currentPage] || 'Dashboard';

  // Render the current page content
  const renderPage = () => {
    if (currentPage === 'podcast-detail' && selectedPodcastId) {
      return (
        <PodcastDetailPage 
          podcastId={selectedPodcastId} 
          podcasts={podcasts}
          onBack={handleBackToLibrary} 
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage 
            podcasts={podcasts}
            onViewPodcast={handleViewPodcast}
            onNewPodcast={() => setIsNewPodcastModalOpen(true)}
          />
        );
      case 'podcasts':
        return (
          <PodcastsPage 
            podcasts={podcasts}
            onViewPodcast={handleViewPodcast}
            onDeletePodcast={deletePodcast}
          />
        );
      case 'create-content':
        return <CreateContentPage podcasts={podcasts} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage 
            podcasts={podcasts}
            onViewPodcast={handleViewPodcast}
            onNewPodcast={() => setIsNewPodcastModalOpen(true)}
          />
        );
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-950">
        {/* Sidebar */}
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          <Header 
            title={currentTitle}
            onNewPodcast={() => setIsNewPodcastModalOpen(true)}
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {renderPage()}
          </main>
        </div>

        {/* New Podcast Modal */}
        <NewPodcastModal
          isOpen={isNewPodcastModalOpen}
          onClose={() => setIsNewPodcastModalOpen(false)}
          onSubmit={addPodcast}
        />
      </div>
    </ToastProvider>
  );
}
