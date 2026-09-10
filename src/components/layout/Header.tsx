"use client";

import React from "react";
import { Search, Bell, Plus, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onNewPodcast: () => void;
  onMenuToggle?: () => void;
}

export function Header({ title, onNewPodcast, onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 md:px-6">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 text-gray-400 rounded-lg md:hidden hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="hidden p-2 text-gray-400 transition-colors rounded-full md:block hover:text-white hover:bg-gray-700 bg-gray-800">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-gray-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
        </button>

        <button 
          onClick={onNewPodcast}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 md:px-4 md:py-2.5"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">New Podcast</span>
        </button>
      </div>
    </header>
  );
}
