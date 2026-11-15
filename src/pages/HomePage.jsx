import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PlusSquare, AlertCircle } from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { CivicStats } from '../components/home/CivicStats';
import { CivicMap } from '../components/home/CivicMap';
import { IssueCard } from '../components/home/IssueCard';
import { FilterBar } from '../components/home/FilterBar';
import { RecentIssuesTicker } from '../components/home/RecentIssuesTicker';
import { DELHI_NCR_HUBS } from '../data/mockData';

export const HomePage = () => {
  const { issues, selectedIssue, setSelectedIssue } = useIssues();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedHub, setSelectedHub] = useState(DELHI_NCR_HUBS[0]);
  const [viewMode, setViewMode] = useState('split');

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(query);
        const matchesLoc = issue.location.toLowerCase().includes(query);
        const matchesId = issue.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesId) return false;
      }

      if (selectedCategory !== 'all' && issue.category !== selectedCategory) {
        return false;
      }

      if (selectedStatus !== 'all' && issue.status !== selectedStatus) {
        return false;
      }

      if (selectedHub.name !== 'All NCR') {
        // Always include citizen's newly submitted reports so they are never hidden on the map
        if (!issue.isUserSubmitted) {
          const hubTerm = selectedHub.name.toLowerCase();
          if (!issue.location.toLowerCase().includes(hubTerm)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [issues, searchQuery, selectedCategory, selectedStatus, selectedHub]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 bg-[#000000] text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Neighbourhood Feed
          </h1>
          <p className="text-xs text-[#A8A8A8] mt-0.5">
            Geotagged civic reports across Delhi, Noida & Ghaziabad
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <PlusSquare className="w-4 h-4" />
          <span>Report Problem</span>
        </Link>
      </div>

      {/* Metric Counters */}
      <CivicStats />

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedHub={selectedHub}
        setSelectedHub={setSelectedHub}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={filteredIssues.length}
      />

      {/* Main Views */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Interactive Dark Map */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 order-2 lg:order-1">
            <CivicMap
              issues={filteredIssues}
              center={[selectedHub.lat, selectedHub.lng]}
              zoom={selectedHub.zoom}
              onSelectIssue={setSelectedIssue}
              selectedIssue={selectedIssue}
              height="550px"
            />
          </div>

          {/* Cards Stream */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {filteredIssues.length === 0 ? (
              <div className="bg-[#181818] rounded-2xl p-10 text-center border border-[#2E2E2E]">
                <AlertCircle className="w-8 h-8 text-[#888888] mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white">No complaints found</h3>
                <p className="text-xs text-[#888888] mt-0.5">Try clearing filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <AnimatePresence>
                  {filteredIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      isHighlighted={selectedIssue?.id === issue.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'map' && (
        <CivicMap
          issues={filteredIssues}
          center={[selectedHub.lat, selectedHub.lng]}
          zoom={selectedHub.zoom}
          onSelectIssue={setSelectedIssue}
          selectedIssue={selectedIssue}
          height="650px"
        />
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <AnimatePresence>
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                isHighlighted={selectedIssue?.id === issue.id}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Recent Ticker */}
      <RecentIssuesTicker />
    </div>
  );
};
