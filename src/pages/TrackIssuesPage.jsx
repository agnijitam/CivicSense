import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusSquare,
  Clock,
  CheckCircle2,
  MapPin,
  Search,
  Map,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { CategoryBadge } from '../components/common/CategoryBadge';
import { CivicMap } from '../components/home/CivicMap';

export const TrackIssuesPage = () => {
  const navigate = useNavigate();
  const { userReports, issues, selectedIssue, setSelectedIssue } = useIssues();

  const [activeTab, setActiveTab] = useState('all');
  const [scope, setScope] = useState('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(true);

  const targetList = scope === 'user' ? userReports : issues;

  const filteredList = targetList.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (activeTab === 'active') return item.status === 'Reported' || item.status === 'In Progress';
    if (activeTab === 'resolved') return item.status === 'Resolved';
    return true;
  });

  const mapSectionRef = useRef(null);

  const focusOnIssueMap = (issue) => {
    setSelectedIssue(issue);
    setShowMap(true);
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 bg-[#000000] text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Track Grievances
          </h1>
          <p className="text-xs text-[#A8A8A8] mt-0.5">
            Monitor real-time status and live map locations of your complaints
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-md"
        >
          <PlusSquare className="w-4 h-4" />
          <span>New Report</span>
        </Link>
      </div>

      {/* Prominent Live Map of Grievances */}
      <div ref={mapSectionRef} className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#A8A8A8] px-1">
          <span className="font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            Live Map of {scope === 'user' ? 'My Reported Complaints' : 'All Area Issues'} ({filteredList.length} Pins)
          </span>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1 text-[#F97316] hover:text-white font-bold cursor-pointer"
          >
            <span>{showMap ? 'Collapse Map' : 'Expand Map'}</span>
            {showMap ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showMap && (
          <div className="rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-xl">
            <CivicMap
              issues={filteredList}
              onSelectIssue={setSelectedIssue}
              selectedIssue={selectedIssue}
              height="380px"
            />
          </div>
        )}
      </div>

      {/* Scope & Filter Controls */}
      <div className="bg-[#181818] rounded-2xl p-3.5 border border-[#2E2E2E] mb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Scope Toggle */}
          <div className="flex items-center bg-[#121212] p-1 rounded-xl border border-[#2E2E2E] text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setScope('user')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                scope === 'user' ? 'bg-[#2E2E2E] text-white shadow-xs' : 'text-[#888888] hover:text-white'
              }`}
            >
              My Reports ({userReports.length})
            </button>
            <button
              onClick={() => setScope('all_city')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                scope === 'all_city' ? 'bg-[#2E2E2E] text-white shadow-xs' : 'text-[#888888] hover:text-white'
              }`}
            >
              All Grid ({issues.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID or title..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#333333] bg-[#121212] text-xs text-white placeholder:text-[#888888] focus:outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-[#262626] text-xs">
          {['all', 'active', 'resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/40'
                  : 'text-[#888888] hover:text-white hover:bg-[#242424]'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'active' ? 'Active' : 'Resolved'}
            </button>
          ))}
        </div>
      </div>

      {/* Grievance Cards List */}
      {filteredList.length === 0 ? (
        <div className="bg-[#181818] rounded-2xl p-12 text-center border border-[#2E2E2E]">
          <Clock className="w-8 h-8 text-[#888888] mx-auto mb-2" />
          <h3 className="text-sm font-bold text-white">No complaints found</h3>
          <p className="text-xs text-[#888888] mt-1">
            {scope === 'user'
              ? 'Submit an issue to track its repair progress and map pin.'
              : 'No matching complaints found.'}
          </p>
          {scope === 'user' && (
            <Link
              to="/report"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] text-white text-xs font-bold"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Report First Issue</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          <AnimatePresence>
            {filteredList.map((issue) => {
              const stageIdx =
                issue.status === 'Resolved' ? 2 : issue.status === 'In Progress' ? 1 : 0;

              return (
                <motion.div
                  key={issue.id}
                  layout
                  onClick={() => focusOnIssueMap(issue)}
                  className="bg-[#181818] rounded-2xl border border-[#2E2E2E] hover:border-[#444444] transition-all cursor-pointer p-4 sm:p-5 shadow-lg group"
                >
                  <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#262626]">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#121212] text-white border border-[#2E2E2E]">
                          #{issue.id}
                        </span>
                        <CategoryBadge categoryId={issue.category} size="sm" />
                        <StatusBadge status={issue.status} size="sm" />
                        {issue.isUserSubmitted && (
                          <span className="px-2 py-0.5 rounded-full bg-[#F97316]/20 text-[#F97316] text-[10px] font-bold border border-[#F97316]/30">
                            ★ Your Report
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F97316] transition-colors line-clamp-1">
                        {issue.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#A8A8A8]">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <img
                        src={issue.imageUrl}
                        alt="Thumbnail"
                        className="w-16 h-16 rounded-xl object-cover border border-[#333333]"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusOnIssueMap(issue);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#242424] hover:bg-[#333333] border border-[#3A3A3A] text-[#F97316] text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                        title="Focus on Map Pin"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Focus Pin</span>
                      </button>
                    </div>
                  </div>

                  {/* 3-Stage Progress Stepper */}
                  <div className="pt-4">
                    <div className="grid grid-cols-3 gap-2 relative text-center">
                      <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-[#262626] -z-0" />
                      <div
                        className="absolute top-3.5 left-8 h-0.5 bg-[#F97316] transition-all duration-300 -z-0"
                        style={{
                          width:
                            stageIdx === 2
                              ? 'calc(100% - 64px)'
                              : stageIdx === 1
                              ? 'calc(50% - 32px)'
                              : '0%',
                        }}
                      />

                      {/* Step 1 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-[#181818] border-2 border-[#F97316] text-[#F97316] flex items-center justify-center font-bold text-xs shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-[11px] font-bold text-white mt-1.5">
                          1. Reported
                        </span>
                      </div>

                      {/* Step 2 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                            stageIdx >= 1
                              ? 'bg-[#F97316] border-[#F97316] text-white shadow-orange-glow'
                              : 'bg-[#181818] border-[#333333] text-[#888888]'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                        </div>
                        <span
                          className={`text-[11px] font-bold mt-1.5 ${
                            stageIdx >= 1 ? 'text-[#F97316]' : 'text-[#888888]'
                          }`}
                        >
                          2. In Progress
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                            stageIdx >= 2
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                              : 'bg-[#181818] border-[#333333] text-[#888888]'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span
                          className={`text-[11px] font-bold mt-1.5 ${
                            stageIdx >= 2 ? 'text-emerald-400' : 'text-[#888888]'
                          }`}
                        >
                          3. Resolved
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
