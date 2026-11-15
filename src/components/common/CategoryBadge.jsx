import React from 'react';
import {
  AlertTriangle,
  Trash2,
  Lightbulb,
  Droplets,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const iconMap = {
  AlertTriangle,
  Trash2,
  Lightbulb,
  Droplets,
  Building2,
  HelpCircle,
};

export const CategoryBadge = ({ categoryId, showIcon = true, size = 'md' }) => {
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[5];
  const IconComponent = iconMap[category.icon] || HelpCircle;

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1.5 font-bold',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#181818]/90 backdrop-blur-md border border-[#3A3A3A] text-white shadow-sm ${sizeClasses[size] || sizeClasses.md}`}
    >
      {showIcon && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: category.color }}
        />
      )}
      <span className="truncate">{category.label}</span>
    </span>
  );
};
