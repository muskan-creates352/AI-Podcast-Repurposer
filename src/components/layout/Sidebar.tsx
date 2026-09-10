"use client";

import React from "react";
import { 
  Radio, 
  LayoutDashboard, 
  Mic, 
  Sparkles, 
  BarChart3, 
  Settings, 
  X
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
    { name: "Podcasts", id: "podcasts", icon: Mic },
    { name: "Create Content", id: "create-content", icon: Sparkles },
    { name: "Analytics", id: "analytics", icon: BarChart3 },
    { name: "Settings", id: "settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-200 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Mobile close button */}
        {onClose && (
          <button 
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Logo area */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">AI Podcast</h1>
            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Repurposer</span>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="h-px bg-gray-800/50 w-full" />
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 768 && onClose) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-l-2 border-purple-500 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50 border-l-2 border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-purple-400" : "text-gray-500"}`} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-bold text-gray-200 shadow-inner border border-gray-600">
              MU
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-white">Muskan</span>
              <span className="text-xs text-gray-400">Creator</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
