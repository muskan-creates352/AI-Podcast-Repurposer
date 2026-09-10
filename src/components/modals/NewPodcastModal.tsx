'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Info } from 'lucide-react';
import { NewPodcastForm } from '@/types';

interface NewPodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: NewPodcastForm) => void;
}

export default function NewPodcastModal({ isOpen, onClose, onSubmit }: NewPodcastModalProps) {
  const [formData, setFormData] = useState<Partial<NewPodcastForm>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.podcastTitle) newErrors.podcastTitle = 'Podcast Title is required';
    if (!formData.episodeTitle) newErrors.episodeTitle = 'Episode Title is required';
    if (!formData.episodeNumber) newErrors.episodeNumber = 'Episode Number is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData as NewPodcastForm);
      setFormData({});
      setErrors({});
      onClose();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData(prev => ({ ...prev, audioFile: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, audioFile: e.target.files![0] }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'episodeNumber' ? (value ? Number(value) : undefined) : value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Add New Podcast</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Podcast Title *
            </label>
            <input
              type="text"
              name="podcastTitle"
              value={formData.podcastTitle || ''}
              onChange={handleChange}
              placeholder="e.g. AI Today"
              className={`w-full bg-gray-800 border ${errors.podcastTitle ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500`}
            />
            {errors.podcastTitle && <p className="mt-1 text-sm text-red-500">{errors.podcastTitle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Episode Title *
              </label>
              <input
                type="text"
                name="episodeTitle"
                value={formData.episodeTitle || ''}
                onChange={handleChange}
                placeholder="e.g. Future of LLMs"
                className={`w-full bg-gray-800 border ${errors.episodeTitle ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500`}
              />
              {errors.episodeTitle && <p className="mt-1 text-sm text-red-500">{errors.episodeTitle}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Episode Number *
              </label>
              <input
                type="number"
                name="episodeNumber"
                value={formData.episodeNumber || ''}
                onChange={handleChange}
                placeholder="e.g. 42"
                min="1"
                className={`w-full bg-gray-800 border ${errors.episodeNumber ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500`}
              />
              {errors.episodeNumber && <p className="mt-1 text-sm text-red-500">{errors.episodeNumber}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Brief description of the episode..."
              rows={3}
              className={`w-full bg-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Podcast URL (Optional)
            </label>
            <input
              type="url"
              name="podcastUrl"
              value={formData.podcastUrl || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Audio File
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-1 flex flex-col items-center justify-center w-full px-4 py-6 bg-gray-800 border-2 border-dashed ${isDragging ? 'border-purple-500 bg-gray-800/80' : 'border-gray-700'} rounded-lg cursor-pointer hover:bg-gray-800/80 transition-colors`}
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              {formData.audioFile ? (
                <p className="text-sm text-purple-400 font-medium text-center truncate w-full px-4">
                  {formData.audioFile.name}
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-300 text-center">
                    Drag and drop your audio file here
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    or click to browse
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 italic">
            <Info className="w-4 h-4" />
            <span>⚡ Audio processing will be simulated in this demo version</span>
          </div>
        </form>

        <div className="p-6 border-t border-gray-800 flex items-center justify-end gap-3 bg-gray-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-transparent hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg shadow-purple-500/25"
          >
            Add Podcast
          </button>
        </div>
      </div>
    </div>
  );
}
