import React from 'react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const configs = {
    'Reported': {
      bg: 'bg-amber-500/15',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      dot: 'bg-amber-400',
      label: 'Reported',
    },
    'In Progress': {
      bg: 'bg-[#F97316]/15',
      text: 'text-[#FB923C]',
      border: 'border-[#F97316]/40',
      dot: 'bg-[#F97316]',
      label: 'In Progress',
    },
    'Resolved': {
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      dot: 'bg-emerald-400',
      label: 'Resolved',
    },
  };

  const current = configs[status] || configs['Reported'];

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1.5 font-bold',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm ${current.bg} ${current.text} ${current.border} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className={`inline-block rounded-full w-1.5 h-1.5 ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
};
