import React from 'react';
import { useIssues } from '../../context/IssueContext';

export const CivicStats = () => {
  const { stats } = useIssues();

  const items = [
    { label: 'Total Reports', value: stats.total, color: 'text-white', dot: 'bg-[#A8A8A8]' },
    { label: 'Pending Review', value: stats.reported, color: 'text-amber-400', dot: 'bg-amber-400' },
    { label: 'In Active Repair', value: stats.inProgress, color: 'text-[#F97316]', dot: 'bg-[#F97316]' },
    { label: 'Resolved Issues', value: stats.resolved, color: 'text-emerald-400', dot: 'bg-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#181818] rounded-xl px-4 py-3 border border-[#2E2E2E] shadow-sm flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-semibold text-[#A8A8A8] block">{item.label}</span>
            <span className={`text-xl sm:text-2xl font-black ${item.color}`}>
              {item.value}
            </span>
          </div>
          <span className={`w-2 h-2 rounded-full ${item.dot}`} />
        </div>
      ))}
    </div>
  );
};
