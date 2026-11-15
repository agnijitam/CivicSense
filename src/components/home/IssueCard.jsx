import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { CategoryBadge } from '../common/CategoryBadge';
import { useIssues } from '../../context/IssueContext';

export const IssueCard = ({ issue, isHighlighted = false }) => {
  const { setSelectedIssue, toggleUpvote } = useIssues();

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={() => setSelectedIssue(issue)}
      className={`group bg-[#181818] rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg ${
        isHighlighted
          ? 'border-[#F97316] ring-1 ring-[#F97316]/50'
          : 'border-[#2E2E2E] hover:border-[#444444]'
      }`}
    >
      {/* Media Image */}
      <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
        <img
          src={issue.imageUrl}
          alt={issue.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          loading="lazy"
        />
        {/* Top Badges with guaranteed spacing */}
        <div className="absolute top-2.5 left-2.5 z-10 max-w-[55%]">
          <CategoryBadge categoryId={issue.category} size="sm" />
        </div>
        <div className="absolute top-2.5 right-2.5 z-10">
          <StatusBadge status={issue.status} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
            {issue.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#A8A8A8] mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
            <span className="truncate">{issue.location}</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleUpvote(issue.id);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              issue.hasUpvoted
                ? 'bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/40'
                : 'bg-[#242424] text-[#A8A8A8] hover:text-white border border-[#333333]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                issue.hasUpvoted ? 'fill-[#F97316] text-[#F97316]' : 'text-[#888888]'
              }`}
            />
            <span>{issue.upvotes}</span>
          </button>

          <span className="text-xs font-bold text-[#888888] group-hover:text-[#F97316] transition-colors flex items-center gap-0.5">
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
