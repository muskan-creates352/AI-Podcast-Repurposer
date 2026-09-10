"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  gradient?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, gradient }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full flex-shrink-0 ${gradient ? 'bg-gradient-to-br from-purple-500 to-cyan-500' : 'bg-gray-800 text-purple-400'}`}>
          <Icon className={gradient ? 'text-white' : 'text-purple-400'} size={24} />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};
