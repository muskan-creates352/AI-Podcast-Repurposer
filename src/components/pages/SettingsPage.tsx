'use client';

import React, { useState, useEffect } from 'react';
import { usePreferences } from '@/hooks/usePreferences';
import { useToast } from '@/components/ui/Toast';
import { ContentType, Tone } from '@/types';
import { User, Mail, Palette, Bot, Save, Info } from 'lucide-react';

const ALL_CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'show-notes', label: 'Show Notes' },
  { id: 'linkedin', label: 'LinkedIn Post' },
  { id: 'twitter', label: 'X/Twitter Post' },
  { id: 'instagram', label: 'Instagram Caption' },
  { id: 'blog', label: 'Blog Draft' },
  { id: 'video-ideas', label: 'Video Ideas' },
  { id: 'key-takeaways', label: 'Key Takeaways' }
];

export default function SettingsPage() {
  const { preferences, savePreferences } = usePreferences();
  const { showToast } = useToast();

  const [name, setName] = useState(preferences.name || '');
  const [email, setEmail] = useState(preferences.email || '');
  const [defaultTone, setDefaultTone] = useState<Tone>(preferences.defaultTone || 'professional');
  const [preferredContentTypes, setPreferredContentTypes] = useState<ContentType[]>(
    preferences.preferredContentTypes || ['summary', 'show-notes', 'linkedin', 'twitter']
  );

  // Sync state if preferences change externally
  useEffect(() => {
    setName(preferences.name || '');
    setEmail(preferences.email || '');
    setDefaultTone(preferences.defaultTone || 'professional');
    setPreferredContentTypes(preferences.preferredContentTypes || ['summary', 'show-notes', 'linkedin', 'twitter']);
  }, [preferences]);

  const handleToggleContentType = (type: ContentType) => {
    setPreferredContentTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = () => {
    savePreferences({
      name,
      email,
      defaultTone,
      preferredContentTypes,
      aiProvider: preferences.aiProvider || 'Not Connected',
      aiModel: preferences.aiModel || 'Not Connected'
    });
    showToast('Preferences saved successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-cyan-500" />
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Content Preferences Section */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Content Preferences</h2>
          </div>

          <div className="mb-6 max-w-md">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Default Tone</label>
            <select
              value={defaultTone}
              onChange={(e) => setDefaultTone(e.target.value as Tone)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="educational">Educational</option>
              <option value="engaging">Engaging</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Content Types</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ALL_CONTENT_TYPES.map((type) => {
                const isChecked = preferredContentTypes.includes(type.id);
                return (
                  <label
                    key={type.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-purple-500/10 border-purple-500/50 text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleToggleContentType(type.id)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-500'
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{type.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Configuration Section */}
        <section className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-semibold text-white">AI Configuration</h2>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-6 flex gap-3 items-start">
            <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-indigo-200 leading-relaxed">
              AI provider integration is not connected in this frontend MVP. These settings will be functional once the FastAPI backend is configured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">AI Provider</label>
              <input
                type="text"
                disabled
                value="Not Connected"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">AI Model</label>
              <input
                type="text"
                disabled
                value="Not Connected"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Save Action */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-purple-500/20"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
