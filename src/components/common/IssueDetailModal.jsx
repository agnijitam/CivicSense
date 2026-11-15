import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Calendar,
  Heart,
  CheckCircle2,
  Clock,
  Copy,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { CategoryBadge } from './CategoryBadge';
import { useIssues } from '../../context/IssueContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const IssueDetailModal = () => {
  const { selectedIssue, setSelectedIssue, toggleUpvote } = useIssues();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIssue(null);
    };
    if (selectedIssue) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIssue, setSelectedIssue]);

  if (!selectedIssue) return null;

  const copyRefCode = () => {
    navigator.clipboard?.writeText(selectedIssue.id);
    toast.success(`Copied #${selectedIssue.id}`);
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(new Date(selectedIssue.reportedAt));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedIssue(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <div className="min-h-full flex items-center justify-center p-3 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-lg bg-[#181818] rounded-2xl shadow-2xl text-left overflow-hidden relative z-10 border border-[#333333] text-white"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-[#2E2E2E] flex items-center justify-between bg-[#121212]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#181818] border border-[#333333] text-white">
                  #{selectedIssue.id}
                </span>
                <StatusBadge status={selectedIssue.status} size="sm" />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={copyRefCode}
                  title="Copy ID"
                  className="p-1.5 rounded-lg text-[#A8A8A8] hover:text-white hover:bg-[#242424] transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="p-1.5 rounded-lg text-[#A8A8A8] hover:text-white hover:bg-[#242424] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto space-y-4">
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden bg-[#121212] border border-[#2E2E2E] aspect-video">
                <img
                  src={selectedIssue.imageUrl}
                  alt={selectedIssue.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <CategoryBadge categoryId={selectedIssue.category} size="sm" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                  {selectedIssue.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#A8A8A8]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                    <span>{selectedIssue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#121212] p-3.5 rounded-xl border border-[#2E2E2E]">
                <p className="text-xs text-[#D4D4D4] leading-relaxed whitespace-pre-line">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Timeline Updates */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-2">
                  Progress Updates
                </h4>
                <div className="space-y-2">
                  {selectedIssue.timeline?.map((step, idx) => {
                    const isDone = step.status === 'completed';
                    const isCurrent = step.status === 'current';

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs flex items-start gap-3 ${
                          isCurrent
                            ? 'bg-[#F97316]/10 border-[#F97316]/40'
                            : isDone
                            ? 'bg-[#121212] border-[#2E2E2E]'
                            : 'bg-[#121212]/40 border-[#222222] opacity-50'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4 text-[#F97316]" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#555555] block my-1" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-bold text-white">{step.title}</span>
                            <span className="text-[10px] text-[#888888]">{step.date}</span>
                          </div>
                          <p className="text-[11px] text-[#A8A8A8] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-[#121212] border-t border-[#2E2E2E] flex items-center justify-between gap-2">
              <button
                onClick={() => toggleUpvote(selectedIssue.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedIssue.hasUpvoted
                    ? 'bg-[#F97316]/20 border-[#F97316] text-[#F97316]'
                    : 'bg-[#181818] border-[#333333] text-[#A8A8A8] hover:text-white'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    selectedIssue.hasUpvoted ? 'fill-[#F97316] text-[#F97316]' : 'text-[#888888]'
                  }`}
                />
                <span>{selectedIssue.upvotes}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedIssue(null);
                  navigate('/track');
                }}
                className="px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Open in Tracker
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
