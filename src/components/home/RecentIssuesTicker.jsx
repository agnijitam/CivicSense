import React from 'react';
import { Flame, ArrowRight, MapPin } from 'lucide-react';
import { CategoryBadge } from '../common/CategoryBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useIssues } from '../../context/IssueContext';

export const RecentIssuesTicker = () => {
  const { issues, setSelectedIssue } = useIssues();
  const recentIssues = [...issues].slice(0, 4);

  return (
    <div className="mt-8 pt-6 border-t border-[#262626]">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#F97316]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A8A8A8]">
            Recently Reported
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recentIssues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => setSelectedIssue(issue)}
            className="p-3.5 bg-[#181818] rounded-xl border border-[#2E2E2E] hover:border-[#444444] transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <CategoryBadge categoryId={issue.category} size="sm" />
                <StatusBadge status={issue.status} size="sm" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
                {issue.title}
              </h4>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#262626] flex items-center justify-between text-[11px] text-[#888888]">
              <span className="truncate max-w-[120px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F97316] shrink-0" />
                {issue.location.split(',')[0]}
              </span>
              <span className="text-[#F97316] font-bold flex items-center gap-0.5">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
