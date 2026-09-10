"use client";

import React from 'react';
import { Copy, Pencil, Save, RefreshCw, Type } from 'lucide-react';

interface ContentCardProps {
  title: string;
  type: string;
  content: string;
  onCopy: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  onRegenerate?: () => void;
  isEditing?: boolean;
  editContent?: string;
  onEditChange?: (value: string) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  type,
  content,
  onCopy,
  onEdit,
  onSave,
  onRegenerate,
  isEditing = false,
  editContent,
  onEditChange,
}) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
      <div className="border-b border-gray-800 p-4 flex items-center justify-between bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-800 rounded-lg text-purple-400">
            <Type size={18} />
          </div>
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-xs text-gray-400 capitalize">{type}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          {onRegenerate && (
            <button onClick={onRegenerate} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Regenerate">
              <RefreshCw size={16} />
            </button>
          )}
          {isEditing ? (
            <button onClick={onSave} className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-colors" title="Save">
              <Save size={16} />
            </button>
          ) : (
            <button onClick={onEdit} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Edit">
              <Pencil size={16} />
            </button>
          )}
          <button onClick={onCopy} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Copy">
            <Copy size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 flex-grow bg-gray-950">
        {isEditing && onEditChange ? (
          <textarea
            value={editContent !== undefined ? editContent : content}
            onChange={(e) => onEditChange(e.target.value)}
            className="w-full h-full min-h-[150px] bg-gray-900 text-gray-300 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-y"
          />
        ) : (
          <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};
